import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 8px;
      height: 8px;
      background: #00F0FF;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: width 0.25s ease, height 0.25s ease, background 0.25s ease;
    `;
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    const ring = document.createElement('div');
    ring.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      border: 1px solid rgba(0, 240, 255, 0.4);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
      opacity: 0.6;
    `;
    document.body.appendChild(ring);
    ringRef.current = ring;

    document.documentElement.style.cursor = 'none';
    const style = document.createElement('style');
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    const quickX = gsap.quickTo(cursor, 'x', { duration: 0.08, ease: 'power3' });
    const quickY = gsap.quickTo(cursor, 'y', { duration: 0.08, ease: 'power3' });
    const ringQuickX = gsap.quickTo(ring, 'x', { duration: 0.18, ease: 'power3' });
    const ringQuickY = gsap.quickTo(ring, 'y', { duration: 0.18, ease: 'power3' });

    const onMove = (e: MouseEvent) => {
      quickX(e.clientX);
      quickY(e.clientY);
      ringQuickX(e.clientX);
      ringQuickY(e.clientY);
    };

    const onEnterInteractive = () => {
      cursor.style.width = '48px';
      cursor.style.height = '48px';
      cursor.style.background = 'rgba(0, 240, 255, 0.1)';
      ring.style.opacity = '0';
    };

    const onLeaveInteractive = () => {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
      cursor.style.background = '#00F0FF';
      ring.style.opacity = '0.6';
    };

    window.addEventListener('mousemove', onMove);

    const addListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      cursor.remove();
      ring.remove();
      style.remove();
      document.documentElement.style.cursor = '';
    };
  }, []);

  return null;
}
