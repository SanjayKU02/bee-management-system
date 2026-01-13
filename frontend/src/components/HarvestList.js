import React from 'react';
import './HarvestList.css';

function HarvestList({ harvests, hives, onEdit, onDelete, onCreate }) {
  const getHiveName = (hiveId) => {
    const hive = hives.find(h => h.id === hiveId);
    return hive ? hive.name : 'Unknown Hive';
  };

  const getQualityStars = (rating) => {
    if (!rating) return 'N/A';
    return '⭐'.repeat(rating);
  };

  return (
    <div className="harvest-list">
      <div className="list-header">
        <h2>Honey Harvests</h2>
        <button className="btn-primary" onClick={onCreate}>
          + Record New Harvest
        </button>
      </div>

      {harvests.length === 0 ? (
        <div className="empty-state">
          <p>No harvests recorded yet. Record your first harvest!</p>
        </div>
      ) : (
        <div className="harvests-grid">
          {harvests.map(harvest => (
            <div key={harvest.id} className="harvest-card">
              <div className="harvest-header">
                <h3>{getHiveName(harvest.hive_id)}</h3>
                <span className="harvest-date">
                  {new Date(harvest.harvest_date).toLocaleDateString()}
                </span>
              </div>
              
              <div className="harvest-details">
                {harvest.honey_weight_kg && (
                  <div className="harvest-stat">
                    <span className="stat-icon">🍯</span>
                    <div className="stat-info">
                      <span className="stat-value">{harvest.honey_weight_kg} kg</span>
                      <span className="stat-label">Honey</span>
                    </div>
                  </div>
                )}
                
                {harvest.wax_weight_kg && (
                  <div className="harvest-stat">
                    <span className="stat-icon">🕯️</span>
                    <div className="stat-info">
                      <span className="stat-value">{harvest.wax_weight_kg} kg</span>
                      <span className="stat-label">Wax</span>
                    </div>
                  </div>
                )}
                
                {harvest.quality_rating && (
                  <div className="harvest-stat">
                    <span className="stat-icon">⭐</span>
                    <div className="stat-info">
                      <span className="stat-value">{getQualityStars(harvest.quality_rating)}</span>
                      <span className="stat-label">Quality</span>
                    </div>
                  </div>
                )}
                
                {harvest.notes && (
                  <div className="detail-item notes">
                    <span className="label">📝 Notes:</span>
                    <span>{harvest.notes}</span>
                  </div>
                )}
              </div>
              
              <div className="harvest-actions">
                <button className="btn-edit" onClick={() => onEdit(harvest)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => onDelete(harvest.id)}>
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

export default HarvestList;
