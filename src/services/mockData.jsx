// Mock data for testing and demonstration
export const speciesData = [
  {
    id: 1,
    name: 'Bengal Tiger',
    scientificName: 'Panthera tigris tigris',
    status: 'Endangered',
    population: 2500,
    location: 'India, Bangladesh, Nepal',
    lastSighted: '2024-03-15',
    image: '/images/species/tiger.jpg',
    threats: ['Poaching', 'Habitat Loss', 'Human Conflict'],
    conservationStatus: 'IUCN Red List: Endangered',
    monitoringData: {
      daily: [120, 125, 118, 122, 127],
      weekly: [850, 865, 870, 868, 872],
      monthly: [3400, 3450, 3500, 3480, 3520]
    }
  },
  {
    id: 2,
    name: 'Asian Elephant',
    scientificName: 'Elephas maximus',
    status: 'Endangered',
    population: 40000,
    location: 'South and Southeast Asia',
    lastSighted: '2024-03-10',
    image: '/images/species/elephant.jpg',
    threats: ['Habitat Loss', 'Poaching', 'Human-Elephant Conflict'],
    conservationStatus: 'IUCN Red List: Endangered',
    monitoringData: {
      daily: [150, 152, 148, 151, 153],
      weekly: [1050, 1060, 1055, 1065, 1070],
      monthly: [4200, 4250, 4300, 4280, 4320]
    }
  },
  {
    id: 3,
    name: 'Snow Leopard',
    scientificName: 'Panthera uncia',
    status: 'Vulnerable',
    population: 4000,
    location: 'Himalayan Mountains',
    lastSighted: '2024-03-05',
    image: '/images/species/leopard.jpg',
    threats: ['Poaching', 'Climate Change', 'Habitat Fragmentation'],
    conservationStatus: 'IUCN Red List: Vulnerable',
    monitoringData: {
      daily: [80, 82, 79, 81, 83],
      weekly: [560, 570, 565, 575, 580],
      monthly: [2240, 2280, 2300, 2290, 2320]
    }
  }
];

// Mock data for habitat monitoring
export const habitatData = [
  {
    id: 1,
    name: 'Sundarbans Mangrove Forest',
    type: 'Mangrove',
    area: '10,000 km²',
    location: 'Bangladesh, India',
    status: 'Protected',
    threats: ['Climate Change', 'Deforestation', 'Pollution'],
    monitoringData: {
      temperature: {
        daily: [28, 29, 27, 30, 28],
        weekly: [196, 203, 189, 210, 196],
        monthly: [840, 870, 860, 880, 850]
      },
      humidity: {
        daily: [85, 82, 88, 80, 86],
        weekly: [595, 574, 616, 560, 602],
        monthly: [2380, 2420, 2460, 2440, 2480]
      },
      rainfall: {
        daily: [5, 8, 3, 10, 4],
        weekly: [35, 56, 21, 70, 28],
        monthly: [140, 160, 150, 170, 145]
      }
    }
  },
  {
    id: 2,
    name: 'Western Ghats',
    type: 'Tropical Forest',
    area: '160,000 km²',
    location: 'India',
    status: 'Protected',
    threats: ['Deforestation', 'Mining', 'Human Settlement'],
    monitoringData: {
      temperature: {
        daily: [25, 26, 24, 27, 25],
        weekly: [175, 182, 168, 189, 175],
        monthly: [700, 730, 720, 740, 710]
      },
      humidity: {
        daily: [80, 75, 85, 70, 82],
        weekly: [560, 525, 595, 490, 574],
        monthly: [2240, 2280, 2320, 2300, 2340]
      },
      rainfall: {
        daily: [8, 12, 5, 15, 6],
        weekly: [56, 84, 35, 105, 42],
        monthly: [224, 256, 240, 260, 230]
      }
    }
  }
];

// Mock data for cryopreservation
export const cryopreservationData = [
  {
    id: 1,
    specimenId: 'CRY-001',
    species: 'Bengal Tiger',
    type: 'Genetic Material',
    collectionDate: '2023-12-15',
    status: 'Active',
    location: 'Main Storage Facility',
    temperature: -196,
    viability: 95,
    quantity: 50,
    lastChecked: '2024-02-15',
    nextCheck: '2024-05-15',
    notes: 'High quality genetic material, excellent preservation conditions maintained.'
  },
  {
    id: 2,
    specimenId: 'CRY-002',
    species: 'Asian Elephant',
    type: 'Sperm Sample',
    collectionDate: '2023-11-20',
    status: 'Active',
    location: 'Main Storage Facility',
    temperature: -196,
    viability: 92,
    quantity: 30,
    lastChecked: '2024-02-10',
    nextCheck: '2024-05-10',
    notes: 'Good viability rate, regular monitoring in place.'
  },
  {
    id: 3,
    specimenId: 'CRY-003',
    species: 'Snow Leopard',
    type: 'Embryo',
    collectionDate: '2024-01-05',
    status: 'Active',
    location: 'Main Storage Facility',
    temperature: -196,
    viability: 88,
    quantity: 20,
    lastChecked: '2024-02-05',
    nextCheck: '2024-05-05',
    notes: 'Recent collection, initial viability assessment promising.'
  }
];

// Mock data for emergency alerts
export const emergencyAlerts = [
  {
    id: 1,
    type: 'Poaching Alert',
    location: 'Sundarbans Region',
    severity: 'High',
    status: 'Active',
    timestamp: '2024-03-15T10:30:00Z',
    description: 'Suspicious activity detected in protected area, possible poaching attempt.',
    coordinates: {
      lat: 21.9497,
      lng: 89.1833
    },
    affectedSpecies: ['Bengal Tiger'],
    responseTeam: 'Tiger Protection Unit',
    updates: [
      {
        timestamp: '2024-03-15T11:00:00Z',
        status: 'Response team dispatched',
        details: 'Unit en route to location'
      },
      {
        timestamp: '2024-03-15T11:30:00Z',
        status: 'Situation contained',
        details: 'No evidence of poaching found, area secured'
      }
    ]
  },
  {
    id: 2,
    type: 'Habitat Threat',
    location: 'Western Ghats',
    severity: 'Medium',
    status: 'Active',
    timestamp: '2024-03-14T15:45:00Z',
    description: 'Unauthorized logging activity detected in protected forest area.',
    coordinates: {
      lat: 10.8505,
      lng: 76.2711
    },
    affectedSpecies: ['Asian Elephant', 'Snow Leopard'],
    responseTeam: 'Forest Protection Unit',
    updates: [
      {
        timestamp: '2024-03-14T16:00:00Z',
        status: 'Investigation initiated',
        details: 'Team dispatched to verify activity'
      }
    ]
  }
];

// Mock data for analytics
export const analyticsData = {
  speciesPopulation: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bengal Tiger',
        data: [2400, 2420, 2450, 2480, 2500, 2520],
        borderColor: '#00f2ff',
        backgroundColor: 'rgba(0, 242, 255, 0.1)'
      },
      {
        label: 'Asian Elephant',
        data: [38000, 38500, 39000, 39500, 40000, 40500],
        borderColor: '#0066ff',
        backgroundColor: 'rgba(0, 102, 255, 0.1)'
      },
      {
        label: 'Snow Leopard',
        data: [3800, 3850, 3900, 3950, 4000, 4050],
        borderColor: '#ff00f2',
        backgroundColor: 'rgba(255, 0, 242, 0.1)'
      }
    ]
  },
  habitatHealth: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sundarbans',
        data: [85, 84, 83, 82, 81, 80],
        borderColor: '#00f2ff',
        backgroundColor: 'rgba(0, 242, 255, 0.1)'
      },
      {
        label: 'Western Ghats',
        data: [90, 89, 88, 87, 86, 85],
        borderColor: '#0066ff',
        backgroundColor: 'rgba(0, 102, 255, 0.1)'
      }
    ]
  },
  threatAnalysis: {
    labels: ['Poaching', 'Habitat Loss', 'Climate Change', 'Human Conflict', 'Disease'],
    datasets: [
      {
        label: 'Bengal Tiger',
        data: [40, 30, 15, 10, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ]
      },
      {
        label: 'Asian Elephant',
        data: [20, 35, 20, 20, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ]
      },
      {
        label: 'Snow Leopard',
        data: [30, 25, 25, 15, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ]
      }
    ]
  },
  conservationImpact: {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Species Recovery',
        data: [65, 70, 75, 80, 85],
        borderColor: '#00f2ff',
        backgroundColor: 'rgba(0, 242, 255, 0.1)'
      },
      {
        label: 'Habitat Protection',
        data: [60, 65, 70, 75, 80],
        borderColor: '#0066ff',
        backgroundColor: 'rgba(0, 102, 255, 0.1)'
      },
      {
        label: 'Community Engagement',
        data: [55, 60, 65, 70, 75],
        borderColor: '#ff00f2',
        backgroundColor: 'rgba(255, 0, 242, 0.1)'
      }
    ]
  }
}; 