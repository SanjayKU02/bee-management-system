import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  async getHives() {
    const response = await axios.get(`${API_BASE_URL}/hives`);
    return response.data;
  },

  async getHive(id) {
    const response = await axios.get(`${API_BASE_URL}/hives/${id}`);
    return response.data;
  },

  async createHive(data) {
    const response = await axios.post(`${API_BASE_URL}/hives`, data);
    return response.data;
  },

  async updateHive(id, data) {
    const response = await axios.put(`${API_BASE_URL}/hives/${id}`, data);
    return response.data;
  },

  async deleteHive(id) {
    const response = await axios.delete(`${API_BASE_URL}/hives/${id}`);
    return response.data;
  },

  async getInspections(hiveId = null) {
    const url = hiveId 
      ? `${API_BASE_URL}/inspections?hive_id=${hiveId}`
      : `${API_BASE_URL}/inspections`;
    const response = await axios.get(url);
    return response.data;
  },

  async createInspection(data) {
    const response = await axios.post(`${API_BASE_URL}/inspections`, data);
    return response.data;
  },

  async updateInspection(id, data) {
    const response = await axios.put(`${API_BASE_URL}/inspections/${id}`, data);
    return response.data;
  },

  async deleteInspection(id) {
    const response = await axios.delete(`${API_BASE_URL}/inspections/${id}`);
    return response.data;
  },

  async getHarvests(hiveId = null) {
    const url = hiveId 
      ? `${API_BASE_URL}/harvests?hive_id=${hiveId}`
      : `${API_BASE_URL}/harvests`;
    const response = await axios.get(url);
    return response.data;
  },

  async createHarvest(data) {
    const response = await axios.post(`${API_BASE_URL}/harvests`, data);
    return response.data;
  },

  async updateHarvest(id, data) {
    const response = await axios.put(`${API_BASE_URL}/harvests/${id}`, data);
    return response.data;
  },

  async deleteHarvest(id) {
    const response = await axios.delete(`${API_BASE_URL}/harvests/${id}`);
    return response.data;
  },

  async getStats() {
    const response = await axios.get(`${API_BASE_URL}/stats`);
    return response.data;
  },

  // Generic methods for App.js
  async createItem(type, data) {
    if (type === 'hive') return this.createHive(data);
    if (type === 'inspection') return this.createInspection(data);
    if (type === 'harvest') return this.createHarvest(data);
    throw new Error(`Unknown type: ${type}`);
  },

  async updateItem(type, id, data) {
    if (type === 'hive') return this.updateHive(id, data);
    if (type === 'inspection') return this.updateInspection(id, data);
    if (type === 'harvest') return this.updateHarvest(id, data);
    throw new Error(`Unknown type: ${type}`);
  },

  async deleteItem(type, id) {
    if (type === 'hive') return this.deleteHive(id);
    if (type === 'inspection') return this.deleteInspection(id);
    if (type === 'harvest') return this.deleteHarvest(id);
    throw new Error(`Unknown type: ${type}`);
  }
};

export default api;
