import { useEffect, useRef, useState } from 'react';

const CHARS = '01<>/{}[]#$%&*+=ABCDEF';

/** Text that "decodes" from random data characters when it scrolls into view. */
export default function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const duration = 700;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const done = Math.floor(p * text.length);
        setOut(
          text
            .split('')
            .map((ch, i) => (ch === ' ' || i < done ? ch : CHARS[(Math.random() * CHARS.length) | 0]))
            .join('')
        );
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}
