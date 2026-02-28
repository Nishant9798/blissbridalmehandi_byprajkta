import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ImageUpload from './ImageUpload';
import ImageManager from './ImageManager';
import BookingList from './BookingList';
import { HiUpload, HiPhotograph, HiCalendar, HiLogout } from 'react-icons/hi';
import toast from 'react-hot-toast';

const TABS = [
  { id: 'upload', label: 'Upload Image', icon: HiUpload },
  { id: 'manage', label: 'Manage Images', icon: HiPhotograph },
  { id: 'bookings', label: 'View Bookings', icon: HiCalendar },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('upload');
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out');
    } catch {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <h1 className="font-vibes text-gold text-2xl">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 text-sm transition-colors"
          >
            <HiLogout size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          {activeTab === 'upload' && <ImageUpload />}
          {activeTab === 'manage' && <ImageManager />}
          {activeTab === 'bookings' && <BookingList />}
        </div>
      </div>
    </div>
  );
}
