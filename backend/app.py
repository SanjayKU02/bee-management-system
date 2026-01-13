from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or \
    'sqlite:///' + os.path.join(basedir, 'bee_management.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class Hive(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200))
    queen_age = db.Column(db.Integer)
    established_date = db.Column(db.Date)
    status = db.Column(db.String(50), default='Active')
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    inspections = db.relationship('Inspection', backref='hive', lazy=True, cascade='all, delete-orphan')
    harvests = db.relationship('Harvest', backref='hive', lazy=True, cascade='all, delete-orphan')

class Inspection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hive_id = db.Column(db.Integer, db.ForeignKey('hive.id'), nullable=False)
    inspection_date = db.Column(db.Date, nullable=False)
    weather = db.Column(db.String(100))
    temperature = db.Column(db.Float)
    queen_seen = db.Column(db.Boolean, default=False)
    eggs_present = db.Column(db.Boolean, default=False)
    brood_pattern = db.Column(db.String(100))
    population = db.Column(db.String(50))
    food_stores = db.Column(db.String(50))
    pests_diseases = db.Column(db.Text)
    treatment_applied = db.Column(db.Text)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Harvest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hive_id = db.Column(db.Integer, db.ForeignKey('hive.id'), nullable=False)
    harvest_date = db.Column(db.Date, nullable=False)
    honey_weight_kg = db.Column(db.Float)
    wax_weight_kg = db.Column(db.Float)
    quality_rating = db.Column(db.Integer)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Initialize database
with app.app_context():
    db.create_all()

# Routes - Hives
@app.route('/api/hives', methods=['GET'])
def get_hives():
    hives = Hive.query.all()
    return jsonify([{
        'id': h.id,
        'name': h.name,
        'location': h.location,
        'queen_age': h.queen_age,
        'established_date': h.established_date.strftime('%Y-%m-%d') if h.established_date else None,
        'status': h.status,
        'notes': h.notes,
        'created_at': h.created_at.isoformat()
    } for h in hives])

@app.route('/api/hives', methods=['POST'])
def create_hive():
    data = request.json
    hive = Hive(
        name=data['name'],
        location=data.get('location'),
        queen_age=data.get('queen_age'),
        established_date=datetime.strptime(data['established_date'], '%Y-%m-%d').date() if data.get('established_date') else None,
        status=data.get('status', 'Active'),
        notes=data.get('notes')
    )
    db.session.add(hive)
    db.session.commit()
    return jsonify({'id': hive.id, 'message': 'Hive created successfully'}), 201

@app.route('/api/hives/<int:hive_id>', methods=['GET'])
def get_hive(hive_id):
    hive = Hive.query.get_or_404(hive_id)
    return jsonify({
        'id': hive.id,
        'name': hive.name,
        'location': hive.location,
        'queen_age': hive.queen_age,
        'established_date': hive.established_date.strftime('%Y-%m-%d') if hive.established_date else None,
        'status': hive.status,
        'notes': hive.notes,
        'created_at': hive.created_at.isoformat()
    })

@app.route('/api/hives/<int:hive_id>', methods=['PUT'])
def update_hive(hive_id):
    hive = Hive.query.get_or_404(hive_id)
    data = request.json
    hive.name = data.get('name', hive.name)
    hive.location = data.get('location', hive.location)
    hive.queen_age = data.get('queen_age', hive.queen_age)
    if data.get('established_date'):
        hive.established_date = datetime.strptime(data['established_date'], '%Y-%m-%d').date()
    hive.status = data.get('status', hive.status)
    hive.notes = data.get('notes', hive.notes)
    db.session.commit()
    return jsonify({'message': 'Hive updated successfully'})

@app.route('/api/hives/<int:hive_id>', methods=['DELETE'])
def delete_hive(hive_id):
    hive = Hive.query.get_or_404(hive_id)
    db.session.delete(hive)
    db.session.commit()
    return jsonify({'message': 'Hive deleted successfully'})

# Routes - Inspections
@app.route('/api/inspections', methods=['GET'])
def get_inspections():
    hive_id = request.args.get('hive_id')
    query = Inspection.query
    if hive_id:
        query = query.filter_by(hive_id=hive_id)
    inspections = query.order_by(Inspection.inspection_date.desc()).all()
    return jsonify([{
        'id': i.id,
        'hive_id': i.hive_id,
        'inspection_date': i.inspection_date.strftime('%Y-%m-%d'),
        'weather': i.weather,
        'temperature': i.temperature,
        'queen_seen': i.queen_seen,
        'eggs_present': i.eggs_present,
        'brood_pattern': i.brood_pattern,
        'population': i.population,
        'food_stores': i.food_stores,
        'pests_diseases': i.pests_diseases,
        'treatment_applied': i.treatment_applied,
        'notes': i.notes,
        'created_at': i.created_at.isoformat()
    } for i in inspections])

@app.route('/api/inspections', methods=['POST'])
def create_inspection():
    data = request.json
    inspection = Inspection(
        hive_id=data['hive_id'],
        inspection_date=datetime.strptime(data['inspection_date'], '%Y-%m-%d').date(),
        weather=data.get('weather'),
        temperature=data.get('temperature'),
        queen_seen=data.get('queen_seen', False),
        eggs_present=data.get('eggs_present', False),
        brood_pattern=data.get('brood_pattern'),
        population=data.get('population'),
        food_stores=data.get('food_stores'),
        pests_diseases=data.get('pests_diseases'),
        treatment_applied=data.get('treatment_applied'),
        notes=data.get('notes')
    )
    db.session.add(inspection)
    db.session.commit()
    return jsonify({'id': inspection.id, 'message': 'Inspection created successfully'}), 201

@app.route('/api/inspections/<int:inspection_id>', methods=['PUT'])
def update_inspection(inspection_id):
    inspection = Inspection.query.get_or_404(inspection_id)
    data = request.json
    inspection.hive_id = data.get('hive_id', inspection.hive_id)
    if data.get('inspection_date'):
        inspection.inspection_date = datetime.strptime(data['inspection_date'], '%Y-%m-%d').date()
    inspection.weather = data.get('weather', inspection.weather)
    inspection.temperature = data.get('temperature', inspection.temperature)
    inspection.queen_seen = data.get('queen_seen', inspection.queen_seen)
    inspection.eggs_present = data.get('eggs_present', inspection.eggs_present)
    inspection.brood_pattern = data.get('brood_pattern', inspection.brood_pattern)
    inspection.population = data.get('population', inspection.population)
    inspection.food_stores = data.get('food_stores', inspection.food_stores)
    inspection.pests_diseases = data.get('pests_diseases', inspection.pests_diseases)
    inspection.treatment_applied = data.get('treatment_applied', inspection.treatment_applied)
    inspection.notes = data.get('notes', inspection.notes)
    db.session.commit()
    return jsonify({'message': 'Inspection updated successfully'})

@app.route('/api/inspections/<int:inspection_id>', methods=['DELETE'])
def delete_inspection(inspection_id):
    inspection = Inspection.query.get_or_404(inspection_id)
    db.session.delete(inspection)
    db.session.commit()
    return jsonify({'message': 'Inspection deleted successfully'})

# Routes - Harvests
@app.route('/api/harvests', methods=['GET'])
def get_harvests():
    hive_id = request.args.get('hive_id')
    query = Harvest.query
    if hive_id:
        query = query.filter_by(hive_id=hive_id)
    harvests = query.order_by(Harvest.harvest_date.desc()).all()
    return jsonify([{
        'id': h.id,
        'hive_id': h.hive_id,
        'harvest_date': h.harvest_date.strftime('%Y-%m-%d'),
        'honey_weight_kg': h.honey_weight_kg,
        'wax_weight_kg': h.wax_weight_kg,
        'quality_rating': h.quality_rating,
        'notes': h.notes,
        'created_at': h.created_at.isoformat()
    } for h in harvests])

@app.route('/api/harvests', methods=['POST'])
def create_harvest():
    data = request.json
    harvest = Harvest(
        hive_id=data['hive_id'],
        harvest_date=datetime.strptime(data['harvest_date'], '%Y-%m-%d').date(),
        honey_weight_kg=data.get('honey_weight_kg'),
        wax_weight_kg=data.get('wax_weight_kg'),
        quality_rating=data.get('quality_rating'),
        notes=data.get('notes')
    )
    db.session.add(harvest)
    db.session.commit()
    return jsonify({'id': harvest.id, 'message': 'Harvest recorded successfully'}), 201

@app.route('/api/harvests/<int:harvest_id>', methods=['PUT'])
def update_harvest(harvest_id):
    harvest = Harvest.query.get_or_404(harvest_id)
    data = request.json
    harvest.hive_id = data.get('hive_id', harvest.hive_id)
    if data.get('harvest_date'):
        harvest.harvest_date = datetime.strptime(data['harvest_date'], '%Y-%m-%d').date()
    harvest.honey_weight_kg = data.get('honey_weight_kg', harvest.honey_weight_kg)
    harvest.wax_weight_kg = data.get('wax_weight_kg', harvest.wax_weight_kg)
    harvest.quality_rating = data.get('quality_rating', harvest.quality_rating)
    harvest.notes = data.get('notes', harvest.notes)
    db.session.commit()
    return jsonify({'message': 'Harvest updated successfully'})

@app.route('/api/harvests/<int:harvest_id>', methods=['DELETE'])
def delete_harvest(harvest_id):
    harvest = Harvest.query.get_or_404(harvest_id)
    db.session.delete(harvest)
    db.session.commit()
    return jsonify({'message': 'Harvest deleted successfully'})

# Dashboard stats
@app.route('/api/stats', methods=['GET'])
def get_stats():
    total_hives = Hive.query.count()
    active_hives = Hive.query.filter_by(status='Active').count()
    total_inspections = Inspection.query.count()
    total_harvests = Harvest.query.count()
    total_honey = db.session.query(db.func.sum(Harvest.honey_weight_kg)).scalar() or 0
    
    return jsonify({
        'total_hives': total_hives,
        'active_hives': active_hives,
        'total_inspections': total_inspections,
        'total_harvests': total_harvests,
        'total_honey_kg': round(total_honey, 2)
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
