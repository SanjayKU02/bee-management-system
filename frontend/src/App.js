import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import HiveList from './components/HiveList';
import InspectionList from './components/InspectionList';
import HarvestList from './components/HarvestList';
import HiveForm from './components/HiveForm';
import InspectionForm from './components/InspectionForm';
import HarvestForm from './components/HarvestForm';
// Use localStorage API for immediate functionality (works without backend)
import api from './services/api-localStorage';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hives, setHives] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [harvests, setHarvests] = useState([]);
  const [stats, setStats] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formType, setFormType] = useState('hive');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [hivesData, inspectionsData, harvestsData, statsData] = await Promise.all([
        api.getHives(),
        api.getInspections(),
        api.getHarvests(),
        api.getStats()
      ]);
      setHives(hivesData);
      setInspections(inspectionsData);
      setHarvests(harvestsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleCreate = (type) => {
    setFormType(type);
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (type, item) => {
    setFormType(type);
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (type, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.deleteItem(type, id);
        loadData();
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item');
      }
    }
  };

  const handleFormSubmit = async (type, data) => {
    try {
      if (editingItem) {
        await api.updateItem(type, editingItem.id, data);
      } else {
        await api.createItem(type, data);
      }
      setShowForm(false);
      setEditingItem(null);
      loadData();
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🐝 Bee Management System</h1>
        <nav className="nav-tabs">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === 'hives' ? 'active' : ''}
            onClick={() => setActiveTab('hives')}
          >
            Hives
          </button>
          <button 
            className={activeTab === 'inspections' ? 'active' : ''}
            onClick={() => setActiveTab('inspections')}
          >
            Inspections
          </button>
          <button 
            className={activeTab === 'harvests' ? 'active' : ''}
            onClick={() => setActiveTab('harvests')}
          >
            Harvests
          </button>
        </nav>
      </header>

      <main className="App-main">
        {activeTab === 'dashboard' && (
          <Dashboard stats={stats} hives={hives} />
        )}
        {activeTab === 'hives' && (
          <HiveList 
            hives={hives} 
            onEdit={(hive) => handleEdit('hive', hive)}
            onDelete={(id) => handleDelete('hive', id)}
            onCreate={() => handleCreate('hive')}
          />
        )}
        {activeTab === 'inspections' && (
          <InspectionList 
            inspections={inspections}
            hives={hives}
            onEdit={(inspection) => handleEdit('inspection', inspection)}
            onDelete={(id) => handleDelete('inspection', id)}
            onCreate={() => handleCreate('inspection')}
          />
        )}
        {activeTab === 'harvests' && (
          <HarvestList 
            harvests={harvests}
            hives={hives}
            onEdit={(harvest) => handleEdit('harvest', harvest)}
            onDelete={(id) => handleDelete('harvest', id)}
            onCreate={() => handleCreate('harvest')}
          />
        )}
      </main>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {formType === 'hive' && (
              <HiveForm 
                hive={editingItem}
                onSubmit={(data) => handleFormSubmit('hive', data)}
                onCancel={() => setShowForm(false)}
              />
            )}
            {formType === 'inspection' && (
              <InspectionForm 
                inspection={editingItem}
                hives={hives}
                onSubmit={(data) => handleFormSubmit('inspection', data)}
                onCancel={() => setShowForm(false)}
              />
            )}
            {formType === 'harvest' && (
              <HarvestForm 
                harvest={editingItem}
                hives={hives}
                onSubmit={(data) => handleFormSubmit('harvest', data)}
                onCancel={() => setShowForm(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
