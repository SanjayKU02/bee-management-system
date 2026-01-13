// Temporary localStorage-based API until backend is deployed
// This allows you to use the app immediately!

const STORAGE_KEYS = {
  hives: 'bee_hives',
  inspections: 'bee_inspections',
  harvests: 'bee_harvests'
};

const api = {
  // Hives
  async getHives() {
    const data = localStorage.getItem(STORAGE_KEYS.hives);
    return data ? JSON.parse(data) : [];
  },

  async createHive(data) {
    const hives = await this.getHives();
    const newHive = {
      id: Date.now(),
      ...data,
      created_at: new Date().toISOString()
    };
    hives.push(newHive);
    localStorage.setItem(STORAGE_KEYS.hives, JSON.stringify(hives));
    return newHive;
  },

  async updateHive(id, data) {
    const hives = await this.getHives();
    const index = hives.findIndex(h => h.id === id);
    if (index !== -1) {
      hives[index] = { ...hives[index], ...data };
      localStorage.setItem(STORAGE_KEYS.hives, JSON.stringify(hives));
    }
    return hives[index];
  },

  async deleteHive(id) {
    const hives = await this.getHives();
    const filtered = hives.filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEYS.hives, JSON.stringify(filtered));
    return { message: 'Deleted' };
  },

  // Inspections
  async getInspections(hiveId = null) {
    const data = localStorage.getItem(STORAGE_KEYS.inspections);
    const inspections = data ? JSON.parse(data) : [];
    return hiveId ? inspections.filter(i => i.hive_id === hiveId) : inspections;
  },

  async createInspection(data) {
    const inspections = await this.getInspections();
    const newInspection = {
      id: Date.now(),
      ...data,
      created_at: new Date().toISOString()
    };
    inspections.push(newInspection);
    localStorage.setItem(STORAGE_KEYS.inspections, JSON.stringify(inspections));
    return newInspection;
  },

  async updateInspection(id, data) {
    const inspections = await this.getInspections();
    const index = inspections.findIndex(i => i.id === id);
    if (index !== -1) {
      inspections[index] = { ...inspections[index], ...data };
      localStorage.setItem(STORAGE_KEYS.inspections, JSON.stringify(inspections));
    }
    return inspections[index];
  },

  async deleteInspection(id) {
    const inspections = await this.getInspections();
    const filtered = inspections.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.inspections, JSON.stringify(filtered));
    return { message: 'Deleted' };
  },

  // Harvests
  async getHarvests(hiveId = null) {
    const data = localStorage.getItem(STORAGE_KEYS.harvests);
    const harvests = data ? JSON.parse(data) : [];
    return hiveId ? harvests.filter(h => h.hive_id === hiveId) : harvests;
  },

  async createHarvest(data) {
    const harvests = await this.getHarvests();
    const newHarvest = {
      id: Date.now(),
      ...data,
      created_at: new Date().toISOString()
    };
    harvests.push(newHarvest);
    localStorage.setItem(STORAGE_KEYS.harvests, JSON.stringify(harvests));
    return newHarvest;
  },

  async updateHarvest(id, data) {
    const harvests = await this.getHarvests();
    const index = harvests.findIndex(h => h.id === id);
    if (index !== -1) {
      harvests[index] = { ...harvests[index], ...data };
      localStorage.setItem(STORAGE_KEYS.harvests, JSON.stringify(harvests));
    }
    return harvests[index];
  },

  async deleteHarvest(id) {
    const harvests = await this.getHarvests();
    const filtered = harvests.filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEYS.harvests, JSON.stringify(filtered));
    return { message: 'Deleted' };
  },

  // Stats
  async getStats() {
    const hives = await this.getHives();
    const inspections = await this.getInspections();
    const harvests = await this.getHarvests();
    
    const totalHoney = harvests.reduce((sum, h) => sum + (parseFloat(h.honey_weight_kg) || 0), 0);
    
    return {
      total_hives: hives.length,
      active_hives: hives.filter(h => h.status === 'Active').length,
      total_inspections: inspections.length,
      total_harvests: harvests.length,
      total_honey_kg: Math.round(totalHoney * 100) / 100
    };
  },

  // Generic methods
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
