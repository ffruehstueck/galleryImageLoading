import { useState, useEffect, useRef, RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

function useInView<T extends HTMLElement>(
  options: UseInViewOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', delay = 0 } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      
      if (entry.isIntersecting) {
        if (delay) {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          
          timerRef.current = setTimeout(() => {
            setInView(true);
          }, delay);
        } else {
          setInView(true);
        }
      } else {
        setInView(false);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: Array.isArray(threshold) ? threshold : [threshold],
      rootMargin,
    });

    observer.observe(element);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, delay]);

  return [ref, inView];
}

export default useInView;