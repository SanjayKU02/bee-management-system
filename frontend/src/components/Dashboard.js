import React from 'react';
import './Dashboard.css';

function Dashboard({ stats, hives }) {
  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-info">
            <h3>{stats.total_hives || 0}</h3>
            <p>Total Hives</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.active_hives || 0}</h3>
            <p>Active Hives</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🔍</div>
          <div className="stat-info">
            <h3>{stats.total_inspections || 0}</h3>
            <p>Total Inspections</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🍯</div>
          <div className="stat-info">
            <h3>{stats.total_honey_kg || 0} kg</h3>
            <p>Total Honey Harvested</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>{stats.total_harvests || 0}</h3>
            <p>Total Harvests</p>
          </div>
        </div>
      </div>

      {hives && hives.length > 0 && (
        <div className="recent-hives">
          <h3>Your Hives</h3>
          <div className="hives-list">
            {hives.slice(0, 5).map(hive => (
              <div key={hive.id} className="hive-card-mini">
                <h4>{hive.name}</h4>
                <p>{hive.location || 'No location'}</p>
                <span className={`status-badge ${hive.status.toLowerCase()}`}>
                  {hive.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
