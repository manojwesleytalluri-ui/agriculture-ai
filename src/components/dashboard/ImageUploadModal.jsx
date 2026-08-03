import React, { useState, useRef } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { Upload, Camera, Image, Sparkles, X, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ImageUploadModal({ isOpen, onClose }) {
  const { analyzeUploadedImage, setActiveTab } = useAgriculture();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageName, setImageName] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageName(file.name.replace(/\.[^/.]+$/, ""));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (previewUrl) {
      analyzeUploadedImage(previewUrl, imageName || 'Custom Crop Upload');
      onClose();
      setActiveTab('vision_scanner');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#1E3922] text-white border-2 border-[#3A6B3F] rounded-2xl sm:rounded-3xl max-w-lg w-[95%] sm:w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2A4D2E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4D8B43] text-white flex items-center justify-center shadow-md">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-serif">
                Upload Image File for AI Telemetry
              </h3>
              <p className="text-xs text-[#85D67A] font-semibold">
                Upload crop photo from camera or file to extract telemetry data
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#274E2B] transition-colors"
          >
            <X className="w-5 h-5 text-gray-300 hover:text-white" />
          </button>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          
          {/* Dropzone / Upload Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#4D8B43] bg-[#152B18] rounded-2xl p-6 text-center cursor-pointer hover:bg-[#1E3922] transition-colors space-y-3 relative group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {previewUrl ? (
              <div className="relative rounded-xl overflow-hidden max-h-56 mx-auto border border-[#3A6B3F] shadow-md">
                <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover" />
                <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/80 text-[#85D67A] text-[10px] font-bold">
                  Click to Change File
                </div>
              </div>
            ) : (
              <div className="space-y-2 py-4">
                <div className="w-12 h-12 rounded-2xl bg-[#274E2B] border border-[#4D8B43] flex items-center justify-center mx-auto text-[#85D67A] group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-white">
                    Click to Upload Crop Image File
                  </p>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Supports JPG, PNG, WEBP from your Camera or File Storage
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Optional Custom Image Title */}
          <div>
            <label className="block text-xs font-bold text-gray-200 mb-1">
              Field / Crop Label
            </label>
            <input
              type="text"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              placeholder="e.g. Tomato Field Row 3 or Greenhouse Leaf"
              className="w-full bg-[#152B18] border border-[#3A6B3F] rounded-xl px-4 py-2.5 text-sm text-white font-bold placeholder-gray-500 focus:outline-none focus:border-[#4D8B43]"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={!previewUrl}
              className="w-full py-3.5 rounded-2xl bg-[#4D8B43] hover:bg-[#3E7335] disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Analyze Image & Extract Telemetry Data</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
