import React, { useState } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { UserCircle, Edit, Save, MapPin, Sprout, Cpu, X } from 'lucide-react';

export default function FarmerProfilePage() {
  const { farmer, setFarmer, theme, toggleTheme } = useAgriculture();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...farmer });

  const handleSave = () => {
    setFarmer(editData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
          <UserCircle className="w-6 h-6" style={{ color: 'var(--color-primary)' }} /> Farmer Profile
        </h2>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Manage your profile and farm settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile Card */}
        <div className="card p-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-bold text-white mb-3"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
            {farmer.name.charAt(0)}
          </div>
          <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{farmer.name}</h3>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{farmer.email}</p>
          <div className="flex items-center justify-center gap-1 mt-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            <MapPin className="w-3 h-3" /> {farmer.location}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <p className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>{farmer.fieldsCount}</p>
              <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>Fields</p>
            </div>
            <div>
              <p className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>{farmer.sensorsCount}</p>
              <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>Sensors</p>
            </div>
            <div>
              <p className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>{farmer.crops.length}</p>
              <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>Crops</p>
            </div>
          </div>

          <button onClick={() => setIsEditing(!isEditing)}
            className="mt-4 w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
            <Edit className="w-3.5 h-3.5" /> Edit Profile
          </button>
        </div>

        {/* Details / Edit */}
        <div className="lg:col-span-2 space-y-4">
          {/* Farm Details */}
          <div className="card p-5">
            <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>🌾 Farm Information</h3>
            {isEditing ? (
              <div className="space-y-3">
                {[
                  { label: 'Name', key: 'name' },
                  { label: 'Farm Name', key: 'farmName' },
                  { label: 'Email', key: 'email' },
                  { label: 'Location', key: 'location' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-[10px] font-bold uppercase block mb-1" style={{ color: 'var(--color-text-muted)' }}>{field.label}</label>
                    <input value={editData[field.key]} onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg text-xs"
                      style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }} />
                  </div>
                ))}
                <div className="flex gap-2">
                  <button onClick={handleSave}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white flex items-center gap-1"
                    style={{ background: 'var(--color-primary)' }}>
                    <Save className="w-3.5 h-3.5" /> Save
                  </button>
                  <button onClick={() => { setIsEditing(false); setEditData({ ...farmer }); }}
                    className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1"
                    style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text)' }}>
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Farm Name', value: farmer.farmName },
                  { label: 'Location', value: farmer.location },
                  { label: 'Email', value: farmer.email },
                  { label: 'Crops', value: farmer.crops.join(', ') },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--color-border-light)' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
                    <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="card p-5">
            <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>⚙️ Settings</h3>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>Dark Mode</p>
                <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>Toggle between light and dark themes</p>
              </div>
              <button onClick={toggleTheme}
                className="w-12 h-6 rounded-full relative transition-colors"
                style={{ background: theme === 'dark' ? 'var(--color-primary)' : 'var(--color-border)' }}>
                <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
                  style={{ left: theme === 'dark' ? '26px' : '2px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
