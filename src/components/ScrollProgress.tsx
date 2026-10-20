import { useEffect, useRef } from 'react';

/** Thin "data loading" bar at the very top that fills as you scroll. */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[70] pointer-events-none" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          transform: 'scaleX(0)',
          background: 'linear-gradient(90deg, rgba(0,240,255,0.2), #00F0FF)',
          boxShadow: '0 0 10px rgba(0,240,255,0.6)',
        }}
      />
    </div>
  );
}
