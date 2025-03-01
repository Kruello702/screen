import React, { useState } from 'react';
import { Circle, Video, Camera, Square, X } from 'lucide-react';

const BubbleExtension: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const toggleBubble = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setIsExpanded(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real app, this would trigger the actual recording
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In a real app, this would stop the recording
  };

  const takeScreenshot = () => {
    // In a real app, this would capture a screenshot
    alert('Screenshot taken!');
  };

  return (
    <div className="relative">
      <button
        onClick={toggleBubble}
        className={`flex items-center justify-center rounded-full transition-all duration-300 ${
          isActive ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
        style={{ width: '36px', height: '36px' }}
      >
        <Circle className="h-5 w-5" />
      </button>

      {isActive && (
        <div className="absolute right-0 mt-2 z-50">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Capture Bubble</h3>
              <button 
                onClick={toggleBubble}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-3 space-y-2">
              {isRecording ? (
                <button
                  onClick={stopRecording}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <X className="h-4 w-4 mr-2" />
                  Stop Recording
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Start Recording
                </button>
              )}
              
              <button
                onClick={takeScreenshot}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Camera className="h-4 w-4 mr-2" />
                Take Screenshot
              </button>
              
              <button
                onClick={toggleExpand}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Square className="h-4 w-4 mr-2" />
                {isExpanded ? 'Hide Selection Box' : 'Show Selection Box'}
              </button>
            </div>
            
            {isExpanded && (
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">
                  Drag to select an area for screenshot
                </div>
                <div className="bg-gray-200 border border-dashed border-gray-400 h-32 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Selection Area</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BubbleExtension;