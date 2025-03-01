import React, { useState, useEffect, useRef } from 'react';
import { Circle, Video, Camera, Square, X, Pause, Play, Mic, MicOff, Clock } from 'lucide-react';

interface FloatingBubbleProps {
  onExit: () => void;
}

const FloatingBubble: React.FC<FloatingBubbleProps> = ({ onExit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const dragStartTime = useRef<number>(0);

  // Handle recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    // In a real app, this would trigger the actual recording
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In a real app, this would stop the recording and save the file
  };

  const takeScreenshot = () => {
    // In a real app, this would capture a screenshot
    alert('Screenshot taken!');
  };

  const toggleMicrophone = () => {
    setIsMicEnabled(!isMicEnabled);
    // In a real app, this would enable/disable the microphone
  };

  // Mouse event handlers for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (bubbleRef.current) {
      const rect = bubbleRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
      dragStartTime.current = Date.now();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - 60, e.clientX - dragOffset.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 60, e.clientY - dragOffset.y));
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (isDragging) {
      const dragDuration = Date.now() - dragStartTime.current;
      // If the drag was very short (less than 150ms), consider it a click
      if (dragDuration < 150 && !isExpanded) {
        onExit();
      }
      setIsDragging(false);
    }
  };

  // Add and remove event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isExpanded]);

  return (
    <div 
      ref={bubbleRef}
      className="fixed z-50 select-none"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      {/* Main Bubble */}
      <div 
        onMouseDown={handleMouseDown}
        className={`flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isRecording ? 'bg-red-600 text-white' : 'bg-purple-700 text-white'
        }`}
        style={{ width: '60px', height: '60px' }}
        title="Drag to move, click to return to app"
      >
        {isRecording ? (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-pulse h-3 w-3 rounded-full bg-white mb-1"></div>
            <div className="text-xs font-bold">{formatTime(recordingTime)}</div>
          </div>
        ) : (
          <Circle className="h-6 w-6" />
        )}
      </div>

      {/* Expanded Menu */}
      {isExpanded && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden" style={{ width: '200px', right: position.x > window.innerWidth / 2 ? '70px' : 'auto', left: position.x <= window.innerWidth / 2 ? '70px' : 'auto' }}>
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-gray-700">Capture Controls</h3>
            <button 
              onClick={toggleExpand}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="p-3 space-y-2">
            <button
              onClick={toggleRecording}
              className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {isRecording ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Recording
                </>
              )}
            </button>
            
            <button
              onClick={takeScreenshot}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Camera className="h-4 w-4 mr-2" />
              Take Screenshot
            </button>
            
            {isRecording && (
              <button
                onClick={toggleMicrophone}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                {isMicEnabled ? (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    Mute Microphone
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Unmute Microphone
                  </>
                )}
              </button>
            )}
            
            <button
              onClick={onExit}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              Exit Recording Mode
            </button>
          </div>
        </div>
      )}

      {/* Quick Action Buttons (visible when not expanded) */}
      {!isExpanded && (
        <div className="absolute flex flex-col space-y-2 mt-2" style={{ right: position.x > window.innerWidth / 2 ? '70px' : 'auto', left: position.x <= window.innerWidth / 2 ? '70px' : 'auto' }}>
          <button
            onClick={toggleExpand}
            className="flex items-center justify-center rounded-full bg-white shadow-md text-purple-700 hover:bg-gray-100 transition-colors"
            style={{ width: '40px', height: '40px' }}
          >
            <Square className="h-5 w-5" />
          </button>
          
          <button
            onClick={takeScreenshot}
            className="flex items-center justify-center rounded-full bg-white shadow-md text-indigo-600 hover:bg-gray-100 transition-colors"
            style={{ width: '40px', height: '40px' }}
          >
            <Camera className="h-5 w-5" />
          </button>
          
          {isRecording && (
            <button
              onClick={toggleMicrophone}
              className={`flex items-center justify-center rounded-full shadow-md transition-colors ${
                isMicEnabled ? 'bg-white text-purple-700 hover:bg-gray-100' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
              style={{ width: '40px', height: '40px' }}
            >
              {isMicEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </button>
          )}
          
          <button
            onClick={toggleRecording}
            className={`flex items-center justify-center rounded-full shadow-md text-white ${
              isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
            }`}
            style={{ width: '40px', height: '40px' }}
          >
            {isRecording ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingBubble;