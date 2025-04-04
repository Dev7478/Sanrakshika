import {
  speciesData,
  habitatData,
  cryopreservationData,
  emergencyAlerts,
  analyticsData
} from './mockData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service
export const mockApi = {
  // Species Monitoring
  getSpecies: async () => {
    await delay(800);
    return { data: speciesData };
  },

  getSpeciesById: async (id) => {
    await delay(500);
    const species = speciesData.find(s => s.id === id);
    return { data: species };
  },

  // Habitat Monitoring
  getHabitats: async () => {
    await delay(800);
    return { data: habitatData };
  },

  getHabitatById: async (id) => {
    await delay(500);
    const habitat = habitatData.find(h => h.id === id);
    return { data: habitat };
  },

  // Cryopreservation
  getCryopreservation: async () => {
    await delay(800);
    return { data: cryopreservationData };
  },

  getCryopreservationById: async (id) => {
    await delay(500);
    const specimen = cryopreservationData.find(c => c.id === id);
    return { data: specimen };
  },

  // Emergency Alerts
  getEmergencyAlerts: async () => {
    await delay(800);
    return { data: emergencyAlerts };
  },

  getEmergencyAlertById: async (id) => {
    await delay(500);
    const alert = emergencyAlerts.find(a => a.id === id);
    return { data: alert };
  },

  // Analytics
  getAnalytics: async () => {
    await delay(1000);
    return { data: analyticsData };
  },

  // Simulated real-time updates
  subscribeToUpdates: (callback) => {
    const interval = setInterval(() => {
      // Simulate random updates
      const randomUpdates = {
        species: speciesData.map(species => ({
          id: species.id,
          population: species.population + Math.floor(Math.random() * 10) - 5
        })),
        habitats: habitatData.map(habitat => ({
          id: habitat.id,
          temperature: habitat.monitoringData.temperature.daily[0] + (Math.random() * 2 - 1)
        })),
        alerts: emergencyAlerts.map(alert => ({
          id: alert.id,
          status: Math.random() > 0.7 ? 'Updated' : alert.status
        }))
      };
      callback(randomUpdates);
    }, 5000);

    return () => clearInterval(interval);
  }
}; 