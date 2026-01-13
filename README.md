# 🐝 Bee Management System

A comprehensive web application for managing beehives, tracking inspections, and recording honey harvests. Built with React frontend and Flask backend.

## Features

- **Hive Management**: Create, edit, and track multiple beehives
- **Inspection Tracking**: Record detailed hive inspections with weather, temperature, queen status, and more
- **Harvest Records**: Track honey and wax production with quality ratings
- **Dashboard**: Overview statistics and quick access to your hives
- **Modern UI**: Beautiful, responsive design with smooth animations

## Tech Stack

### Frontend
- React 18
- Axios for API calls
- Modern CSS with gradients and animations

### Backend
- Flask (Python)
- SQLAlchemy for database management
- SQLite database (can be upgraded to PostgreSQL)

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Linux/Mac: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. Start both the backend and frontend servers
2. Open your browser to `http://localhost:3000`
3. Create your first hive
4. Record inspections and harvests as needed

## API Endpoints

### Hives
- `GET /api/hives` - Get all hives
- `POST /api/hives` - Create a new hive
- `GET /api/hives/<id>` - Get a specific hive
- `PUT /api/hives/<id>` - Update a hive
- `DELETE /api/hives/<id>` - Delete a hive

### Inspections
- `GET /api/inspections` - Get all inspections (optional: `?hive_id=<id>`)
- `POST /api/inspections` - Create a new inspection
- `PUT /api/inspections/<id>` - Update an inspection
- `DELETE /api/inspections/<id>` - Delete an inspection

### Harvests
- `GET /api/harvests` - Get all harvests (optional: `?hive_id=<id>`)
- `POST /api/harvests` - Record a new harvest
- `PUT /api/harvests/<id>` - Update a harvest
- `DELETE /api/harvests/<id>` - Delete a harvest

### Statistics
- `GET /api/stats` - Get dashboard statistics

## Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Create a `Procfile` in the backend directory:
```
web: gunicorn app:app
```

2. Update `requirements.txt` to include:
```
gunicorn==21.2.0
```

3. Set environment variables:
- `DATABASE_URL` (for PostgreSQL on production)
- `FLASK_ENV=production`

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Set environment variable:
- `REACT_APP_API_URL` - Your backend API URL

3. Deploy the `build` folder to your hosting service

## Project Structure

```
bee-management-system/
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── bee_management.db   # SQLite database (created automatically)
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Created with ❤️ for beekeepers everywhere.
