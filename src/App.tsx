import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Pyramid from './components/Pyramid';
import DataStream from './components/DataStream';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';
import Pipeline from './sections/Pipeline';
import ScrollProgress from './components/ScrollProgress';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, []);

  // Spotlight glow that follows the mouse on cards (desktop mouse only)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest?.('.spotlight') as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

  // Data stream visibility toggle
  useEffect(() => {
    if (!loaded) return;

    const dataStreamCanvas = document.getElementById('data-stream-canvas');
    if (!dataStreamCanvas) return;

    ScrollTrigger.create({
      trigger: '#about',
      start: 'top 80%',
      end: 'bottom top',
      onEnter: () => {
        gsap.to(dataStreamCanvas, { opacity: 1, duration: 1 });
      },
      onLeaveBack: () => {
        gsap.to(dataStreamCanvas, { opacity: 0, duration: 1 });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === '#about') st.kill();
      });
    };
  }, [loaded]);

  const handleMenuToggle = (open: boolean) => {
    if (lenisRef.current) {
      if (open) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  };

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <CustomCursor />
      <ScrollProgress />

      {/* Background Effects */}
      <Pyramid />
      <DataStream />

      {/* Navigation */}
      <Navigation onMenuToggle={handleMenuToggle} />

      {/* Page Content */}
      <main>
        <Hero />
        <Pipeline />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
