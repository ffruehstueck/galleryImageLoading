import React, { useState, useEffect } from 'react';
import { GallerySlideType } from '../../types/gallery';
import GalleryImage from './GalleryImage';
import useInView from '../../hooks/useInView';

interface GallerySlideProps {
  slide: GallerySlideType;
  isActive: boolean;
  onImageLoad: (src: string) => void;
  onLoadingQueueChange: (isQueued: boolean) => void;
}

const GallerySlide: React.FC<GallerySlideProps> = ({
  slide,
  isActive,
  onImageLoad,
  onLoadingQueueChange
}) => {
  const [expanded, setExpanded] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.5, delay: 2000 });
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleMainImageClick = () => {
    setExpanded(!expanded);
    setHasInteracted(true);
  };

  // Load images if:
  // 1. The slide is active (currently visible in viewport)
  // 2. OR the slide has been in view for the delay period
  // 3. OR user has interacted with the slide
  const shouldLoad = isActive || inView || hasInteracted;

  // Load hidden images if:
  // 1. The slide is in view
  // 2. OR it's the active slide
  const shouldLoadHidden = inView || isActive;

  useEffect(() => {
    onLoadingQueueChange(inView && !hasInteracted);
  }, [inView, hasInteracted, onLoadingQueueChange]);

  return (
    <div
      ref={ref}
      className={`
        min-w-full md:min-w-[50%] h-[60vh] snap-center p-4 transition-all duration-500
        ${isActive ? 'ring-4 ring-blue-500/50 rounded-xl' : ''}
      `}
    >
      <div
        className={`
          relative h-full rounded-xl overflow-hidden shadow-lg transition-all duration-500
          ${expanded ? 'scale-95 opacity-90' : 'scale-100 opacity-100'}
        `}
      >
        {/* Main Image */}
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={handleMainImageClick}
        >
          {inView ? "isinview" : "not in view"}
          <GalleryImage
            src={slide.mainImage.src}
            alt={slide.mainImage.alt}
            shouldLoad={shouldLoad}
            className={`
              w-full h-full object-cover transition-transform duration-700
              ${expanded ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}
            `}
            onLoad={() => onImageLoad(slide.mainImage.src)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <h3 className="text-xl font-semibold">{slide.title}</h3>
            <p className="text-sm opacity-90">{slide.description}</p>
          </div>
        </div>

        {/* Hidden Images */}
        <div
          className={`
            grid grid-cols-2 h-full w-full gap-2 p-2 absolute inset-0 bg-gray-900/20 backdrop-blur-sm
            transition-all duration-700 
            ${expanded ? 'opacity-100 z-20' : 'opacity-0 -z-10'}
          `}
        >
          {slide.hiddenImages.map((image, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-lg h-full shadow-md">
              <GalleryImage
                src={image.src}
                alt={image.alt}
                shouldLoad={shouldLoadHidden}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onLoad={() => onImageLoad(image.src)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white">
                <p className="text-sm font-medium">{image.alt}</p>
              </div>
            </div>
          ))}

          <button
            className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full p-2 z-30 hover:bg-white transition-colors"
            onClick={() => setExpanded(false)}
            aria-label="Close expanded view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GallerySlide;
