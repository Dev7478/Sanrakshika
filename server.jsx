const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Mock data
const mockSpeciesData = [
  { id: 1, name: 'Bengal Tiger', status: 'Endangered', population: 2500 },
  { id: 2, name: 'Indian Rhinoceros', status: 'Vulnerable', population: 3500 },
  { id: 3, name: 'Asiatic Lion', status: 'Endangered', population: 674 }
];

const mockHabitatData = [
  { id: 1, name: 'Sundarbans', type: 'Mangrove Forest', area: '10000 sq km' },
  { id: 2, name: 'Kaziranga', type: 'Grassland', area: '430 sq km' },
  { id: 3, name: 'Gir Forest', type: 'Dry Deciduous Forest', area: '1412 sq km' }
];

const mockRealTimeData = {
  timestamp: new Date().toISOString(),
  activeAlerts: 3,
  temperature: 25.5,
  humidity: 65,
  airQuality: 'Good'
};

// API Routes
app.get('/api/monitoring/species', (req, res) => {
  res.json(mockSpeciesData);
});

app.get('/api/monitoring/habitat', (req, res) => {
  res.json(mockHabitatData);
});

app.get('/api/monitoring/realtime', (req, res) => {
  res.json(mockRealTimeData);
});

// Start server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
}); 