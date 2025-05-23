import { useEffect, useState, RefObject } from 'react';

function useGalleryNavigation(
  scrollContainerRef: RefObject<HTMLDivElement>,
  slideCount: number,
  setActiveSlideIndex: (index: number) => void
) {
  const [hasNext, setHasNext] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(false);

  const scrollToNext = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerWidth = container.offsetWidth;
    const currentScroll = container.scrollLeft;
    
    container.scrollTo({
      left: currentScroll + containerWidth,
      behavior: 'smooth'
    });
  };

  const scrollToPrevious = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerWidth = container.offsetWidth;
    const currentScroll = container.scrollLeft;
    
    container.scrollTo({
      left: currentScroll - containerWidth,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerWidth = container.offsetWidth;
    const scrollWidth = container.scrollWidth;
    const scrollLeft = container.scrollLeft;
    
    // Calculate which slide is currently visible
    const slideIndex = Math.round(scrollLeft / containerWidth);
    setActiveSlideIndex(slideIndex);
    
    // Determine if we have next/previous slides
    setHasPrevious(scrollLeft > 10);
    setHasNext(scrollLeft < scrollWidth - containerWidth - 10);
  };

  // Attach scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainerRef]);

  return {
    scrollToNext,
    scrollToPrevious,
    hasNext,
    hasPrevious,
    handleScroll
  };
}

export default useGalleryNavigation;