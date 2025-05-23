import React from 'react';
import Gallery from './components/Gallery/Gallery';
import { galleryData } from './data/galleryData';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Image Gallery</h1>
      <div className="w-full max-w-6xl my-[1200px]">
        <Gallery slides={galleryData} />
      </div>
    </div>
  );
}

export default App;