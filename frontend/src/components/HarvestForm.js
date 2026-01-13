import React, { useState, useEffect } from 'react';
import './Form.css';

function HarvestForm({ harvest, hives, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    hive_id: '',
    harvest_date: new Date().toISOString().split('T')[0],
    honey_weight_kg: '',
    wax_weight_kg: '',
    quality_rating: '',
    notes: ''
  });

  useEffect(() => {
    if (harvest) {
      setFormData({
        hive_id: harvest.hive_id || '',
        harvest_date: harvest.harvest_date || new Date().toISOString().split('T')[0],
        honey_weight_kg: harvest.honey_weight_kg || '',
        wax_weight_kg: harvest.wax_weight_kg || '',
        quality_rating: harvest.quality_rating || '',
        notes: harvest.notes || ''
      });
    }
  }, [harvest]);

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
      <h2>{harvest ? 'Edit Harvest' : 'Record New Harvest'}</h2>
      
      <div className="form-group">
        <label>Hive *</label>
        <select
          name="hive_id"
          value={formData.hive_id}
          onChange={handleChange}
          required
        >
          <option value="">Select a hive</option>
          {hives.map(hive => (
            <option key={hive.id} value={hive.id}>
              {hive.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Harvest Date *</label>
        <input
          type="date"
          name="harvest_date"
          value={formData.harvest_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Honey Weight (kg)</label>
          <input
            type="number"
            name="honey_weight_kg"
            value={formData.honey_weight_kg}
            onChange={handleChange}
            step="0.1"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Wax Weight (kg)</label>
          <input
            type="number"
            name="wax_weight_kg"
            value={formData.wax_weight_kg}
            onChange={handleChange}
            step="0.1"
            min="0"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Quality Rating</label>
        <select
          name="quality_rating"
          value={formData.quality_rating}
          onChange={handleChange}
        >
          <option value="">Select rating</option>
          <option value="1">⭐ (1 star)</option>
          <option value="2">⭐⭐ (2 stars)</option>
          <option value="3">⭐⭐⭐ (3 stars)</option>
          <option value="4">⭐⭐⭐⭐ (4 stars)</option>
          <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
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
          {harvest ? 'Update' : 'Record'} Harvest
        </button>
      </div>
    </form>
  );
}

export default HarvestForm;
