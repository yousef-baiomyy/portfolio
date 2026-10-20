import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches;
    if (isTouch.current) return;

    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 6px;
      height: 6px;
      background: #00F0FF;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease, background 0.3s ease, border 0.3s ease;
      mix-blend-mode: normal;
    `;
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    document.documentElement.style.cursor = 'none';

    const quickX = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power2.out' });
    const quickY = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power2.out' });

    const onMove = (e: MouseEvent) => {
      quickX(e.clientX);
      quickY(e.clientY);
    };

    const onEnterInteractive = () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.background = 'transparent';
      cursor.style.border = '1px solid #00F0FF';
      cursor.style.mixBlendMode = 'difference';
    };

    const onLeaveInteractive = () => {
      cursor.style.width = '6px';
      cursor.style.height = '6px';
      cursor.style.background = '#00F0FF';
      cursor.style.border = 'none';
      cursor.style.mixBlendMode = 'normal';
    };

    window.addEventListener('mousemove', onMove);

    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
      newInteractives.forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      cursor.remove();
      document.documentElement.style.cursor = '';
    };
  }, []);
}
