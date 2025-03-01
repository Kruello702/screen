import React, { useState } from 'react';
import { Camera, Video, Settings, Layers, LogIn, UserPlus, X, Check, Monitor, Image as ImageIcon, Mic, Clock, Cloud, Layout, Scissors, Music, Smile, Share2 } from 'lucide-react';
import AuthForm from './components/AuthForm';
import BubbleExtension from './components/BubbleExtension';
import FloatingBubble from './components/FloatingBubble';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('videos');
  const [isRecordingMode, setIsRecordingMode] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const startRecordingMode = () => {
    setIsRecordingMode(true);
  };

  const exitRecordingMode = () => {
    setIsRecordingMode(false);
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />;
  }

  if (isRecordingMode) {
    return <FloatingBubble onExit={exitRecordingMode} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Camera className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">Capture Screen</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setActiveTab('videos')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'videos' ? 'bg-purple-900' : 'hover:bg-purple-600'}`}
              >
                <div className="flex items-center">
                  <Video className="h-5 w-5 mr-1" />
                  Videos
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('images')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'images' ? 'bg-purple-900' : 'hover:bg-purple-600'}`}
              >
                <div className="flex items-center">
                  <ImageIcon className="h-5 w-5 mr-1" />
                  Images
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'settings' ? 'bg-purple-900' : 'hover:bg-purple-600'}`}
              >
                <div className="flex items-center">
                  <Settings className="h-5 w-5 mr-1" />
                  Settings
                </div>
              </button>
              <div className="ml-4 border-l pl-4">
                <BubbleExtension />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'videos' && <VideosSection onStartRecording={startRecordingMode} />}
        {activeTab === 'images' && <ImagesSection onStartScreenshot={startRecordingMode} />}
        {activeTab === 'settings' && <SettingsSection />}
      </main>
    </div>
  );
}

function LandingPage({ onLogin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="md:w-1/2 text-center md:text-left text-white mb-10 md:mb-0 md:pr-10">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Capture Screen
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            The ultimate screen recording solution for Ubuntu. Capture, edit, and share your screen with powerful TikTok-style editing tools.
          </p>
          <div className="space-y-4">
            <FeatureItem icon={<Video />} title="Advanced Screen Recording">
              Record your screen with customizable settings and webcam overlay
            </FeatureItem>
            <FeatureItem icon={<Scissors />} title="TikTok-Style Editing">
              Powerful video editing with filters, effects, and transitions
            </FeatureItem>
            <FeatureItem icon={<Layers />} title="Floating Bubble">
              Quick access to recording functions from any application
            </FeatureItem>
            <FeatureItem icon={<Cloud />} title="Cloud Integration">
              Instantly sync your recordings to your favorite cloud storage
            </FeatureItem>
          </div>
        </div>
        <div className="md:w-1/2 max-w-md w-full">
          <AuthForm onLogin={onLogin} />
        </div>
      </div>
      <footer className="bg-purple-800 bg-opacity-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white">
            © 2025 Capture Screen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureItem({ icon, title, children }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 h-6 w-6 text-purple-300">
        {icon}
      </div>
      <div className="ml-3">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="mt-1 text-purple-200">{children}</p>
      </div>
    </div>
  );
}

function VideosSection({ onStartRecording }) {
  // Mock data for videos
  const videos = [
    { id: 1, title: 'Project Demo', date: '2025-05-10', duration: '2:45', thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=300&h=200' },
    { id: 2, title: 'Tutorial Recording', date: '2025-05-08', duration: '5:12', thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=300&h=200' },
    { id: 3, title: 'Meeting Recording', date: '2025-05-05', duration: '15:30', thumbnail: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=300&h=200' },
    { id: 4, title: 'Bug Reproduction', date: '2025-05-01', duration: '1:20', thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=300&h=200' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Videos</h2>
        <button 
          onClick={onStartRecording}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Video className="h-5 w-5 mr-2" />
          New Recording
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-1">{video.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{video.date}</p>
              <div className="flex justify-between">
                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">Edit</button>
                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">Share</button>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImagesSection({ onStartScreenshot }) {
  // Mock data for images
  const images = [
    { id: 1, title: 'Dashboard Screenshot', date: '2025-05-10', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&h=200' },
    { id: 2, title: 'Error Message', date: '2025-05-08', thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=300&h=200' },
    { id: 3, title: 'Website Design', date: '2025-05-05', thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=300&h=200' },
    { id: 4, title: 'Chart Screenshot', date: '2025-05-01', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&h=200' },
    { id: 5, title: 'UI Mockup', date: '2025-04-28', thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=300&h=200' },
    { id: 6, title: 'Terminal Output', date: '2025-04-25', thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=300&h=200' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Screenshots</h2>
        <button 
          onClick={onStartScreenshot}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Camera className="h-5 w-5 mr-2" />
          New Screenshot
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {images.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img src={image.thumbnail} alt={image.title} className="w-full h-32 object-cover" />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-800 text-sm truncate">{image.title}</h3>
              <p className="text-xs text-gray-500 mb-2">{image.date}</p>
              <div className="flex justify-between text-xs">
                <button className="text-purple-600 hover:text-purple-800 font-medium">View</button>
                <button className="text-purple-600 hover:text-purple-800 font-medium">Edit</button>
                <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">Recording Preferences</h3>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video Quality</label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
              <option>Low (480p)</option>
              <option selected>Medium (720p)</option>
              <option>High (1080p)</option>
              <option>Ultra (4K)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Frame Rate</label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
              <option>24 fps</option>
              <option selected>30 fps</option>
              <option>60 fps</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="flex-grow flex flex-col">
              <span className="text-sm font-medium text-gray-700">Record Microphone Audio</span>
              <span className="text-sm text-gray-500">Capture audio from your microphone during recordings</span>
            </span>
            <button className="bg-purple-600 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="flex-grow flex flex-col">
              <span className="text-sm font-medium text-gray-700">Record System Audio</span>
              <span className="text-sm text-gray-500">Capture audio from your system during recordings</span>
            </span>
            <button className="bg-purple-600 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">Hotkeys</h3>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Start/Stop Recording</span>
            <div className="flex space-x-1">
              <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl</kbd>
              <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Alt</kbd>
              <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">R</kbd>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Take Screenshot</span>
            <div className="flex space-x-1">
              <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl</kbd>
              <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Alt</kbd>
              <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">S</kbd>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Toggle Bubble</span>
            <div className="flex space-x-1">
              <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl</kbd>
              <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Alt</kbd>
              <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">B</kbd>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">Storage</h3>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Save Location</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input type="text" className="focus:ring-purple-500 focus:border-purple-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300" placeholder="/home/user/Videos/CaptureScreen" />
              <button className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 text-sm">
                Browse
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="flex-grow flex flex-col">
              <span className="text-sm font-medium text-gray-700">Cloud Sync</span>
              <span className="text-sm text-gray-500">Automatically upload recordings to cloud storage</span>
            </span>
            <button className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cloud Provider</label>
            <select disabled className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-gray-100 text-gray-500">
              <option>Google Drive</option>
              <option>Dropbox</option>
              <option>OneDrive</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;