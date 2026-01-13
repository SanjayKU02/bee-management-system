import React, { useState, useEffect } from 'react';
import './Form.css';

function InspectionForm({ inspection, hives, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    hive_id: '',
    inspection_date: new Date().toISOString().split('T')[0],
    weather: '',
    temperature: '',
    queen_seen: false,
    eggs_present: false,
    brood_pattern: '',
    population: '',
    food_stores: '',
    pests_diseases: '',
    treatment_applied: '',
    notes: ''
  });

  useEffect(() => {
    if (inspection) {
      setFormData({
        hive_id: inspection.hive_id || '',
        inspection_date: inspection.inspection_date || new Date().toISOString().split('T')[0],
        weather: inspection.weather || '',
        temperature: inspection.temperature || '',
        queen_seen: inspection.queen_seen || false,
        eggs_present: inspection.eggs_present || false,
        brood_pattern: inspection.brood_pattern || '',
        population: inspection.population || '',
        food_stores: inspection.food_stores || '',
        pests_diseases: inspection.pests_diseases || '',
        treatment_applied: inspection.treatment_applied || '',
        notes: inspection.notes || ''
      });
    }
  }, [inspection]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{inspection ? 'Edit Inspection' : 'Record New Inspection'}</h2>
      
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
        <label>Inspection Date *</label>
        <input
          type="date"
          name="inspection_date"
          value={formData.inspection_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Weather</label>
          <input
            type="text"
            name="weather"
            value={formData.weather}
            onChange={handleChange}
            placeholder="e.g., Sunny, Cloudy"
          />
        </div>

        <div className="form-group">
          <label>Temperature (°C)</label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            step="0.1"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="queen_seen"
              checked={formData.queen_seen}
              onChange={handleChange}
            />
            Queen Seen
          </label>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="eggs_present"
              checked={formData.eggs_present}
              onChange={handleChange}
            />
            Eggs Present
          </label>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Brood Pattern</label>
          <select
            name="brood_pattern"
            value={formData.brood_pattern}
            onChange={handleChange}
          >
            <option value="">Select pattern</option>
            <option value="Solid">Solid</option>
            <option value="Spotty">Spotty</option>
            <option value="Scattered">Scattered</option>
          </select>
        </div>

        <div className="form-group">
          <label>Population</label>
          <select
            name="population"
            value={formData.population}
            onChange={handleChange}
          >
            <option value="">Select population</option>
            <option value="Strong">Strong</option>
            <option value="Moderate">Moderate</option>
            <option value="Weak">Weak</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Food Stores</label>
        <select
          name="food_stores"
          value={formData.food_stores}
          onChange={handleChange}
        >
          <option value="">Select food stores</option>
          <option value="Abundant">Abundant</option>
          <option value="Adequate">Adequate</option>
          <option value="Low">Low</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div className="form-group">
        <label>Pests/Diseases</label>
        <textarea
          name="pests_diseases"
          value={formData.pests_diseases}
          onChange={handleChange}
          rows="2"
          placeholder="Describe any pests or diseases observed"
        />
      </div>

      <div className="form-group">
        <label>Treatment Applied</label>
        <textarea
          name="treatment_applied"
          value={formData.treatment_applied}
          onChange={handleChange}
          rows="2"
          placeholder="Describe any treatments applied"
        />
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
          {inspection ? 'Update' : 'Record'} Inspection
        </button>
      </div>
    </form>
  );
}

export default InspectionForm;
