import React, { useState, useEffect } from 'react';
import './Form.css';

function HiveForm({ hive, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    queen_age: '',
    established_date: '',
    status: 'Active',
    notes: ''
  });

  useEffect(() => {
    if (hive) {
      setFormData({
        name: hive.name || '',
        location: hive.location || '',
        queen_age: hive.queen_age || '',
        established_date: hive.established_date || '',
        status: hive.status || 'Active',
        notes: hive.notes || ''
      });
    }
  }, [hive]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{hive ? 'Edit Hive' : 'Create New Hive'}</h2>
      
      <div className="form-group">
        <label>Hive Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Queen Age (days)</label>
          <input
            type="number"
            name="queen_age"
            value={formData.queen_age}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Established Date</label>
          <input
            type="date"
            name="established_date"
            value={formData.established_date}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-submit">
          {hive ? 'Update' : 'Create'} Hive
        </button>
      </div>
    </form>
  );
}

export default HiveForm;
