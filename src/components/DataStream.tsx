import { useEffect, useRef } from 'react';

class Particle {
  w: number;
  h: number;
  z: number = 0;
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  size: number = 0;
  speedMult: number = 1;
  opacity: number = 0;
  trail: { x: number; y: number }[] = [];

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.init();
  }

  init() {
    this.z = Math.random() * 2 + 0.5;
    this.x = Math.random() * this.w;
    this.y = (this.h / 2) + (Math.random() - 0.5) * (this.h * 0.2);
    this.vx = -(Math.random() * 1.5 + 0.5) * 0.5;
    this.size = (Math.random() * 1.5 + 0.5) * 0.6;
    this.speedMult = Math.pow(this.z, 2);
    this.opacity = Math.random() * 0.4 + 0.1;
    this.trail = [];
  }

  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 8) {
      this.trail.shift();
    }
    this.x += this.vx * this.speedMult;
    this.y += Math.sin(this.x * 0.01) * 0.1 * this.z;
    this.opacity -= 0.003;

    if (this.x < -20 || this.opacity <= 0) {
      this.x = this.w + 20;
      this.y = (this.h / 2) + (Math.random() - 0.5) * (this.h * 0.2);
      this.opacity = Math.random() * 0.4 + 0.1;
    }
  }

  draw(ctx: CanvasRenderingContext2D, hue: number) {
    const size = this.size * this.z * 1.5;
    const alpha = this.opacity * this.z;
    const color = `hsla(${hue}, 100%, ${50 + this.z * 20}%, ${alpha})`;

    for (let i = 0; i < this.trail.length; i++) {
      const p = this.trail[i];
      const trailAlpha = alpha * (i / this.trail.length) * 0.3;
      const trailSize = size * (i / this.trail.length);
      if (trailAlpha > 0.01) {
        ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${trailAlpha})`;
        ctx.fillRect(p.x - trailSize / 2, p.y - trailSize / 2, trailSize, trailSize);
      }
    }

    ctx.fillStyle = color;
    ctx.fillRect(this.x - size / 2, this.y - size / 2, size, size);
  }
}

export default function DataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const particleCount = 180;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(w, h));
    }

    let hue = 180;
    const hueSpeed = 0.05;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, w, h);

      hue += hueSpeed;
      if (hue > 260) hue = 180;
      if (hue < 180) hue = 260;

      for (const p of particles) {
        p.update();
        p.draw(ctx, hue);
      }
    };

    animate();

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      for (const p of particles) {
        p.w = w;
        p.h = h;
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="data-stream-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0,
        transition: 'opacity 1s ease',
        pointerEvents: 'none',
      }}
    />
  );
}
