import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleText from '../components/ScrambleText';
import LiveQuery from '../components/LiveQuery';

/* Content lives in src/data/showcase.ts — edit the steps there. */
import { PIPELINE } from '../data/showcase';
import type { Glyph } from '../data/showcase';

gsap.registerPlugin(ScrollTrigger);

/* ── Tiny animated "data" illustrations, one per stage (pure CSS) ── */
function StageGlyph({ type }: { type: Glyph }) {
  if (type === 'collect') {
    return (
      <div className="g-collect">
        {[72, 48, 88, 60, 40].map((w, i) => (
          <i key={i} style={{ width: `${w}%`, animationDelay: `${i * 0.32}s` }} />
        ))}
      </div>
    );
  }
  if (type === 'clean') {
    const bad = new Set([2, 7, 11, 16]);
    return (
      <div className="g-clean">
        {Array.from({ length: 18 }).map((_, i) => (
          <i key={i} className={bad.has(i) ? 'bad' : ''} style={bad.has(i) ? { animationDelay: `${(i % 4) * 0.35}s` } : undefined} />
        ))}
        <b />
      </div>
    );
  }
  if (type === 'model') {
    return (
      <div className="g-model">
        <div className="tbl">{[0, 1, 2, 3].map((i) => <i key={i} className={i === 1 ? 'key' : ''} />)}</div>
        <div className="join"><span /></div>
        <div className="tbl">{[0, 1, 2, 3].map((i) => <i key={i} className={i === 2 ? 'key' : ''} />)}</div>
      </div>
    );
  }
  if (type === 'visualize') {
    return (
      <div className="g-viz">
        {[0.45, 0.8, 0.6, 1, 0.7, 0.9].map((h, i) => (
          <i key={i} style={{ ['--h' as string]: h, animationDelay: `${i * 0.18}s` } as React.CSSProperties} />
        ))}
      </div>
    );
  }
  return (
    <div className="g-decide">
      <svg viewBox="0 0 120 48" preserveAspectRatio="none" aria-hidden="true">
        <polyline points="2,40 22,34 40,37 58,24 76,27 96,12 118,6" />
      </svg>
      <span className="kpi">KPI ▲</span>
    </div>
  );
}

function Flow({ vertical = false }: { vertical?: boolean }) {
  return (
    <div className={vertical ? 'flow-v' : 'flow-h'} aria-hidden="true">
      <span />
      <span style={{ animationDelay: '0.55s' }} />
      <span style={{ animationDelay: '1.1s' }} />
    </div>
  );
}

export default function Pipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        headingRef.current.querySelectorAll('.k-word').forEach((word, i) => {
          const d = i % 2 === 0 ? -1 : 1;
          gsap.fromTo(word,
            { xPercent: d * 50, skewX: d * 2, opacity: 0.3 },
            { xPercent: 0, skewX: 0, opacity: 1, ease: 'sine.out',
              scrollTrigger: { trigger: headingRef.current, start: 'top bottom-=10%', end: 'center center', scrub: true } });
        });
      }
      gsap.fromTo('.pipe-node',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.pipe-row', start: 'top 85%' } });
      gsap.fromTo('.pipe-flow',
        { opacity: 0 },
        { opacity: 1, stagger: 0.12, duration: 0.6, delay: 0.3,
          scrollTrigger: { trigger: '.pipe-row', start: 'top 85%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const headingWords = 'FROM RAW DATA TO DECISIONS'.split(' ');

  return (
    <section ref={sectionRef} id="pipeline" className="relative py-24 lg:py-28" style={{ zIndex: 2 }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="font-display text-[11px] font-semibold tracking-[0.15em] text-[#00F0FF] uppercase mb-4">
          <ScrambleText text="How I work" />
        </div>

        <h2 ref={headingRef} className="kinetic-heading font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.01em] mb-6">
          {headingWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
              <span className="k-word inline-block">{word}</span>
            </span>
          ))}
        </h2>
        <p className="text-base text-[#666] max-w-xl leading-relaxed mb-14">
          The same pipeline runs behind every project on this page — from messy raw files to the KPIs and dashboards people actually decide with.
        </p>

        <div className="pipe-row flex flex-col lg:flex-row lg:items-stretch">
          {PIPELINE.map((stage, i) => (
            <div key={stage.step} className="contents">
              <div className="pipe-node spotlight group relative flex-1 border border-[#222] bg-[#0A0A0A]/85 p-5 transition-colors duration-300 hover:border-[#00F0FF]">
                <div className="relative z-[2] h-14 mb-5 overflow-hidden">
                  <StageGlyph type={stage.glyph} />
                </div>
                <div className="relative z-[2]">
                  <div className="font-mono-custom text-[10px] tracking-widest text-[#00F0FF]/80">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-display text-xl font-semibold text-white mt-1 group-hover:text-[#00F0FF] transition-colors duration-300">
                    {stage.step}
                  </div>
                  <div className="font-mono-custom text-[10px] tracking-wider text-[#555] uppercase mt-2 leading-relaxed">
                    {stage.tools}
                  </div>
                </div>
              </div>
              {i < PIPELINE.length - 1 && (
                <div className="pipe-flow flex items-center justify-center lg:w-10 h-10 lg:h-auto shrink-0">
                  <div className="hidden lg:block w-full"><Flow /></div>
                  <div className="lg:hidden h-full"><Flow vertical /></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* On screens without room in the hero, the live SQL console lives here */}
        <div className="xl:hidden mt-14 max-w-[520px]">
          <LiveQuery />
        </div>
      </div>
    </section>
  );
}
