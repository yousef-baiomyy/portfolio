import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        onComplete?.();
      },
    });

    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
    tl.set(overlayRef.current, { display: 'none' });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center"
    >
      <div ref={textRef} className="text-center">
        <div className="font-display text-lg font-semibold tracking-[0.15em] text-[#00F0FF] uppercase">
          Youssef Bayoumi
        </div>
        <div className="font-mono-custom text-[10px] tracking-[0.3em] text-[#555] uppercase mt-3">
          Loading
        </div>
        <div className="mt-6 w-32 h-[1px] bg-[#222] mx-auto overflow-hidden">
          <div
            className="h-full bg-[#00F0FF]"
            style={{
              animation: 'loadBar 1.5s ease-in-out forwards',
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes loadBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
