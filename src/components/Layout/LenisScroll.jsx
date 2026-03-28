import { useEffect } from 'react';
import { ReactLenis } from 'lenis/react';

export default function LenisScroll({ children }) {
  useEffect(() => {
    // Scroll triggers or configs can be instantiated here.
    return () => {};
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
