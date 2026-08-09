// Agriculture AI — Mock Field Definitions

export const FIELDS = [
  {
    id: 'FIELD-A',
    name: 'Field 01 — Paddy Zone',
    farmId: 'FARM-001',
    crop: 'Rice',
    area: '2.5 acres',
    status: 'healthy',
    sensorIds: ['SEN-001', 'SEN-002', 'SEN-003'],
    coordinates: { lat: 10.7905, lng: 79.1378 },
    soilType: 'Clay Loam',
    irrigationType: 'Drip Irrigation',
    plantingDate: '2026-06-15',
    expectedHarvest: '2026-10-20',
  },
  {
    id: 'FIELD-B',
    name: 'Field 02 — Vegetable Block',
    farmId: 'FARM-001',
    crop: 'Tomato',
    area: '1.8 acres',
    status: 'healthy',
    sensorIds: ['SEN-004', 'SEN-005', 'SEN-006'],
    coordinates: { lat: 10.7915, lng: 79.1390 },
    soilType: 'Sandy Loam',
    irrigationType: 'Sprinkler',
    plantingDate: '2026-07-01',
    expectedHarvest: '2026-09-15',
  },
];
