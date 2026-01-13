import React from 'react';
import './InspectionList.css';

function InspectionList({ inspections, hives, onEdit, onDelete, onCreate }) {
  const getHiveName = (hiveId) => {
    const hive = hives.find(h => h.id === hiveId);
    return hive ? hive.name : 'Unknown Hive';
  };

  return (
    <div className="inspection-list">
      <div className="list-header">
        <h2>Hive Inspections</h2>
        <button className="btn-primary" onClick={onCreate}>
          + Add New Inspection
        </button>
      </div>

      {inspections.length === 0 ? (
        <div className="empty-state">
          <p>No inspections yet. Record your first inspection!</p>
        </div>
      ) : (
        <div className="inspections-grid">
          {inspections.map(inspection => (
            <div key={inspection.id} className="inspection-card">
              <div className="inspection-header">
                <h3>{getHiveName(inspection.hive_id)}</h3>
                <span className="inspection-date">
                  {new Date(inspection.inspection_date).toLocaleDateString()}
                </span>
              </div>
              
              <div className="inspection-details">
                {inspection.temperature && (
                  <div className="detail-item">
                    <span className="label">🌡️ Temperature:</span>
                    <span>{inspection.temperature}°C</span>
                  </div>
                )}
                
                {inspection.weather && (
                  <div className="detail-item">
                    <span className="label">☁️ Weather:</span>
                    <span>{inspection.weather}</span>
                  </div>
                )}
                
                <div className="detail-item">
                  <span className="label">👑 Queen Seen:</span>
                  <span>{inspection.queen_seen ? '✅ Yes' : '❌ No'}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">🥚 Eggs Present:</span>
                  <span>{inspection.eggs_present ? '✅ Yes' : '❌ No'}</span>
                </div>
                
                {inspection.population && (
                  <div className="detail-item">
                    <span className="label">👥 Population:</span>
                    <span>{inspection.population}</span>
                  </div>
                )}
                
                {inspection.food_stores && (
                  <div className="detail-item">
                    <span className="label">🍯 Food Stores:</span>
                    <span>{inspection.food_stores}</span>
                  </div>
                )}
                
                {inspection.pests_diseases && (
                  <div className="detail-item notes">
                    <span className="label">⚠️ Pests/Diseases:</span>
                    <span>{inspection.pests_diseases}</span>
                  </div>
                )}
                
                {inspection.notes && (
                  <div className="detail-item notes">
                    <span className="label">📝 Notes:</span>
                    <span>{inspection.notes}</span>
                  </div>
                )}
              </div>
              
              <div className="inspection-actions">
                <button className="btn-edit" onClick={() => onEdit(inspection)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => onDelete(inspection.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InspectionList;
