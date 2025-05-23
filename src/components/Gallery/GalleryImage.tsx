import React, { useState, useEffect } from 'react';

interface GalleryImageProps {
  src: string;
  alt: string;
  shouldLoad: boolean;
  className?: string;
  onLoad?: () => void;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ 
  src, 
  alt, 
  shouldLoad, 
  className,
  onLoad 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (shouldLoad && !isLoaded && !isLoading) {
      setIsLoading(true);
      setImageSrc(src);
    }
  }, [shouldLoad, isLoaded, isLoading, src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setIsLoading(false);
    onLoad?.();
  };

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          {isLoading && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
          )}
          {!isLoading && shouldLoad && (
            <div className="text-sm text-gray-500">Loading...</div>
          )}
          {!shouldLoad && (
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          )}
        </div>
      )}
      
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          onLoad={handleImageLoad}
        />
      )}
    </div>
  );
};

export default GalleryImage;