/**
 * Agriculture AI Vision Service
 * Simulates real-time multi-stage computer vision inference pipeline
 */

export const AI_PIPELINE_STEPS = [
  { id: 1, name: 'Image Capture & Encryption Check', duration: 400 },
  { id: 2, name: 'Preprocessing & Noise Reduction', duration: 500 },
  { id: 3, name: 'Crop Region & Canopy Segmentation', duration: 600 },
  { id: 4, name: 'Leaf, Stem & Fruit Pathology Scan', duration: 800 },
  { id: 5, name: 'Disease, Pest & Deficiency Detection', duration: 700 },
  { id: 6, name: 'Health Score & Yield Impact Calculation', duration: 500 },
  { id: 7, name: 'Generating Recommendations & Task Dispatch', duration: 400 }
];

export async function runAiScanSimulation(camera, onProgress) {
  for (let i = 0; i < AI_PIPELINE_STEPS.length; i++) {
    const step = AI_PIPELINE_STEPS[i];
    if (onProgress) {
      onProgress({
        stepIndex: i,
        stepName: step.name,
        progressPercent: Math.round(((i + 1) / AI_PIPELINE_STEPS.length) * 100)
      });
    }
    await new Promise((res) => setTimeout(res, step.duration));
  }

  // Generate randomized fresh scan result with variation
  const randScore = Math.floor(65 + Math.random() * 30);
  const healthCategory =
    randScore >= 90 ? 'Excellent' : randScore >= 75 ? 'Good' : randScore >= 60 ? 'Moderate' : 'Critical';

  return {
    scanId: `SCAN-${Date.now()}`,
    timestamp: new Date().toISOString(),
    cameraId: camera.id,
    cameraName: camera.name,
    crop: camera.crop,
    healthScore: randScore,
    overallHealth: healthCategory,
    canopyCoverage: `${Math.floor(60 + Math.random() * 30)}%`,
    leafCountEstimated: Math.floor(1000 + Math.random() * 2000),
    waterStatus: randScore > 75 ? 'Optimal Soil Moisture (75%)' : 'Slight Water Stress (48%)',
    detectedIssues:
      randScore < 75
        ? [
            {
              name: 'Leaf Spot / Fungal Infection',
              type: 'Fungal',
              severity: randScore < 60 ? 'High' : 'Moderate',
              confidence: `${(89 + Math.random() * 8).toFixed(1)}%`,
              affectedArea: '12% of lower canopy',
              boundingBox: { x: 25, y: 30, w: 30, h: 25 },
              heatmapIntensity: 0.75
            }
          ]
        : [],
    recommendations:
      randScore < 75
        ? [
            'Apply recommended Fungicide Spray (Mancozeb 75% WP @ 2g/L).',
            'Avoid overhead sprinkler irrigation for the next 48 hours.',
            'Schedule follow-up AI vision scan in 24 hours.'
          ]
        : [
            'Crop health is optimal. Maintain current fertigation schedule.',
            'Next automated scan scheduled in 1 hour.'
          ]
  };
}
