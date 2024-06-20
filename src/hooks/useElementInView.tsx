import { MutableRefObject, useEffect, useState } from "react";

type IntersectionObserverOptions = {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
};

export function useElementInView(ref: MutableRefObject<null>, options: IntersectionObserverOptions = {}) {
    const [inView, setInview] = useState(false)

    useEffect(() => {
      const callback = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          setInview(() => true)
        }else{
            setInview(() => false)
        }
      };
  
      const observer = new IntersectionObserver(callback, options);
      if(ref.current) observer.observe(ref.current);


      return () => observer.disconnect() // Cleanup on unmount
    }, [ref, options]);

    return inView
  }