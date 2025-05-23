"use client";

import React from 'react';

interface DebugProps {
  loadedImages: string[];
  currentSlideIndex: number;
  isLoadingQueued: boolean;
}

const Debug: React.FC<DebugProps> = ({ loadedImages, currentSlideIndex, isLoadingQueued }) => {
  return (
    <div className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs w-full z-50">
      <h3 className="font-semibold text-gray-800 mb-2">Debug Info</h3>
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">Current Slide:</span> {currentSlideIndex + 1}
        </div>
        <div>
          <span className="font-medium">Loading Queue:</span>{' '}
          {isLoadingQueued ? 'Active' : 'Inactive'}
        </div>
        <div>
          <span className="font-medium">Loaded Images:</span>
          <div className="mt-1 max-h-32 overflow-y-auto">
            {loadedImages.map((src, index) => (
              <div key={index} className="text-xs truncate text-gray-600">
                {src.split('/').pop()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Debug;
