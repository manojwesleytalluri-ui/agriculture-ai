import React, { useState } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { Camera, X, Check, Upload, Image as ImageIcon } from 'lucide-react';

export default function CameraRegistrationModal({ onClose }) {
  const { setCameras, setSelectedCameraId } = useAgriculture();

  const [name, setName] = useState('');
  const [farm, setFarm] = useState('My Smart Farm');
  const [field, setField] = useState('Field A');
  const [crop, setCrop] = useState('');
  const [cropVariety, setCropVariety] = useState('');
  const [captureInterval, setCaptureInterval] = useState('Every 1 Hour');
  const [resolution, setResolution] = useState('4K Ultra HD');
  const [imageUrl, setImageUrl] = useState('');

  // Sample placeholder image options if user doesn't provide a URL
  const defaultImages = [
    'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1000&q=80'
  ];

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setImageUrl(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalImage = imageUrl || defaultImages[Math.floor(Math.random() * defaultImages.length)];
    const newId = `CAM-${Math.floor(101 + Math.random() * 900)}`;

    const newCam = {
      id: newId,
      name: name || `Field Camera (${crop || 'Crop'})`,
      farm: farm || 'My Smart Farm',
      field: field || 'Field A',
      crop: crop || 'General Crop',
      cropVariety: cropVariety || 'Standard Hybrid',
      status: 'Online',
      battery: 100,
      solarCharging: true,
      signalStrength: '98% (5G)',
      captureInterval,
      lastCaptureTime: 'Just Registered',
      resolution,
      firmware: 'v3.8.4-AgriAI',
      gps: { lat: 17.385 + Math.random() * 0.01, lng: 78.486 + Math.random() * 0.01 },
      heightMeters: 4.0,
      angleDegrees: 45,
      healthScore: 90,
      imageUrl: finalImage,
      historyImages: [
        { date: 'Today (Initial)', url: finalImage, score: 90 }
      ],
      lastAnalysis: {
        timestamp: new Date().toISOString(),
        overallHealth: 'Excellent',
        healthScore: 90,
        growthStage: 'Monitoring Started',
        growthStageProgress: 15,
        canopyCoverage: '45%',
        leafCountEstimated: 500,
        detectedIssues: [],
        waterStatus: 'Optimal Soil Moisture',
        recommendations: ['Camera registered successfully. Autonomous monitoring active.']
      }
    };

    setCameras((prev) => [newCam, ...prev]);
    setSelectedCameraId(newId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-emerald-950 border border-emerald-700/60 p-6 rounded-2xl max-w-lg w-full space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            <h3 className="font-serif font-bold text-lg text-white">Register Installed Field Camera</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-emerald-400 hover:bg-emerald-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-emerald-300">Camera Name / Label</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. North Sector Paddy Cam 01"
              className="w-full mt-1 bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-emerald-500/70"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-emerald-300">Farm Name</label>
              <input
                type="text"
                value={farm}
                onChange={(e) => setFarm(e.target.value)}
                placeholder="e.g. Green Valley Farm"
                className="w-full mt-1 bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-emerald-300">Field Name / ID</label>
              <input
                type="text"
                value={field}
                onChange={(e) => setField(e.target.value)}
                placeholder="e.g. Field A1"
                className="w-full mt-1 bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-emerald-300">Crop Name</label>
              <input
                type="text"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                placeholder="e.g. Rice, Cotton, Tomato, Wheat"
                className="w-full mt-1 bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-emerald-500/70"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-emerald-300">Crop Variety</label>
              <input
                type="text"
                value={cropVariety}
                onChange={(e) => setCropVariety(e.target.value)}
                placeholder="e.g. Basmati 1121, Bt Hybrid"
                className="w-full mt-1 bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-emerald-300">Capture Schedule</label>
              <select
                value={captureInterval}
                onChange={(e) => setCaptureInterval(e.target.value)}
                className="w-full mt-1 bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="Every 15 Mins">Every 15 Mins</option>
                <option value="Every 30 Mins">Every 30 Mins</option>
                <option value="Every 1 Hour">Every 1 Hour</option>
                <option value="Every 2 Hours">Every 2 Hours</option>
                <option value="Daily">Daily</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-emerald-300">Image Resolution</label>
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full mt-1 bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="4K Ultra HD">4K Ultra HD</option>
                <option value="1080p Full HD">1080p Full HD</option>
                <option value="720p HD">720p HD</option>
              </select>
            </div>
          </div>

          {/* Upload / Custom Image URL Input */}
          <div className="space-y-2 pt-1 border-t border-emerald-800/40">
            <label className="font-semibold text-emerald-300 block">Field Snapshot Image (File Upload or Image URL)</label>
            
            <div className="flex items-center gap-2">
              <label className="flex-1 cursor-pointer bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/60 rounded-xl p-2.5 flex items-center justify-center gap-2 text-emerald-200 font-semibold transition-colors">
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Choose Image File...</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="hidden"
                />
              </label>
            </div>

            <div className="relative">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Or paste image URL (https://...)"
                className="w-full bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 text-xs placeholder-emerald-500/70"
              />
            </div>

            {imageUrl && (
              <div className="h-28 rounded-xl overflow-hidden border border-emerald-700/60 relative bg-black">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 bg-black/70 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-mono">Image Selected</span>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-emerald-900 text-emerald-200 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-emerald-950 font-bold"
            >
              Save Camera & Start Monitoring
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
