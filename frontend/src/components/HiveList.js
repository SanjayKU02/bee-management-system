import React from 'react';
import './HiveList.css';

function HiveList({ hives, onEdit, onDelete, onCreate }) {
  return (
    <div className="hive-list">
      <div className="list-header">
        <h2>Hive Management</h2>
        <button className="btn-primary" onClick={onCreate}>
          + Add New Hive
        </button>
      </div>

      {hives.length === 0 ? (
        <div className="empty-state">
          <p>No hives yet. Create your first hive to get started!</p>
        </div>
      ) : (
        <div className="hives-grid">
          {hives.map(hive => (
            <div key={hive.id} className="hive-card">
              <div className="hive-header">
                <h3>{hive.name}</h3>
                <span className={`status-badge ${hive.status?.toLowerCase()}`}>
                  {hive.status}
                </span>
              </div>
              
              <div className="hive-details">
                {hive.location && (
                  <div className="detail-item">
                    <span className="label">📍 Location:</span>
                    <span>{hive.location}</span>
                  </div>
                )}
                
                {hive.queen_age && (
                  <div className="detail-item">
                    <span className="label">👑 Queen Age:</span>
                    <span>{hive.queen_age} days</span>
                  </div>
                )}
                
                {hive.established_date && (
                  <div className="detail-item">
                    <span className="label">📅 Established:</span>
                    <span>{new Date(hive.established_date).toLocaleDateString()}</span>
                  </div>
                )}
                
                {hive.notes && (
                  <div className="detail-item notes">
                    <span className="label">📝 Notes:</span>
                    <span>{hive.notes}</span>
                  </div>
                )}
              </div>
              
              <div className="hive-actions">
                <button className="btn-edit" onClick={() => onEdit(hive)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => onDelete(hive.id)}>
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

export default HiveList;
