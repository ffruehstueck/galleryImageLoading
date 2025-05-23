import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GallerySlide from './GallerySlide';
import { GallerySlideType } from '../../types/gallery';
import useGalleryNavigation from '../../hooks/useGalleryNavigation';
import Debug from '../Debug/Debug';

interface GalleryProps {
  slides: GallerySlideType[];
}

const Gallery: React.FC<GalleryProps> = ({ slides }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [isLoadingQueued, setIsLoadingQueued] = useState(false);
  
  const { 
    scrollToNext, 
    scrollToPrevious, 
    hasNext, 
    hasPrevious,
    handleScroll
  } = useGalleryNavigation(scrollContainerRef, slides.length, setActiveSlideIndex);

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => [...new Set([...prev, src])]);
  };

  return (
    <div className="relative w-full">
      <Debug 
        loadedImages={loadedImages}
        currentSlideIndex={activeSlideIndex}
        isLoadingQueued={isLoadingQueued}
      />
      
      {/* Main Gallery Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
        onScroll={handleScroll}
      >
        {slides.map((slide, index) => (
          <GallerySlide 
            key={slide.id} 
            slide={slide} 
            isActive={activeSlideIndex === index}
            onImageLoad={handleImageLoad}
            onLoadingQueueChange={setIsLoadingQueued}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 pointer-events-none px-4">
        <button 
          onClick={scrollToPrevious}
          className={`p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md text-gray-800 hover:bg-white transition-all pointer-events-auto
            ${!hasPrevious ? 'opacity-0' : 'opacity-100'}`}
          disabled={!hasPrevious}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={scrollToNext}
          className={`p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md text-gray-800 hover:bg-white transition-all pointer-events-auto
            ${!hasNext ? 'opacity-0' : 'opacity-100'}`}
          disabled={!hasNext}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSlideIndex === index ? 'bg-gray-800 w-4' : 'bg-gray-400'
            }`}
            onClick={() => {
              if (scrollContainerRef.current) {
                const slideWidth = scrollContainerRef.current.offsetWidth;
                scrollContainerRef.current.scrollTo({
                  left: slideWidth * index,
                  behavior: 'smooth'
                });
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;