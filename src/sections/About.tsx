import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Content lives in src/data/profile.ts — edit texts & stats there. */
import { PROFILE, STATS } from '../data/profile';
import ScrambleText from '../components/ScrambleText';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic text effect on heading
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.k-word');
        words.forEach((word, i) => {
          const direction = i % 2 === 0 ? -1 : 1;
          gsap.fromTo(
            word,
            {
              xPercent: direction * 50,
              skewX: direction * 2,
              opacity: 0.3,
            },
            {
              xPercent: 0,
              skewX: 0,
              opacity: 1,
              ease: 'sine.out',
              scrollTrigger: {
                trigger: headingRef.current,
                start: 'top bottom-=10%',
                end: 'center center',
                scrub: true,
              },
            }
          );
        });
      }

      // Text fade in
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Image scale in
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
            },
          }
        );
      }
      // Count-up stats
      sectionRef.current?.querySelectorAll<HTMLElement>('.stat-num').forEach((el) => {
        const target = Number(el.dataset.value || 0);
        const suffix = el.dataset.suffix || '';
        if (el.dataset.plain === '1') return;
        const obj = { v: 0 };
        el.textContent = '0' + suffix;
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
        });
      });

      // Timeline items slide in
      const items = sectionRef.current?.querySelectorAll('.tl-item');
      if (items && items.length) {
        gsap.fromTo(items, { x: -24, opacity: 0 }, {
          x: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: items[0], start: 'top 90%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingWords = PROFILE.aboutHeading.split(' ');

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-[100dvh] flex items-center py-24 lg:py-32"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div>
            {/* Section Label */}
            <div className="font-display text-[11px] font-semibold tracking-[0.15em] text-[#00F0FF] uppercase mb-8">
              <ScrambleText text="About" />
            </div>

            {/* Kinetic Heading */}
            <h2
              ref={headingRef}
              className="kinetic-heading font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.01em] mb-10"
            >
              {headingWords.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden mr-[0.3em]"
                >
                  <span
                    className="k-word inline-block"
                    data-direction={i % 2 === 0 ? 'left' : 'right'}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            {/* Bio Text */}
            <div ref={textRef} className="space-y-6" style={{ opacity: 0 }}>
              {PROFILE.aboutParagraphs.map((para, i) => (
                <p key={i} className="text-base text-[#777] leading-[1.7]">{para}</p>
              ))}

              {/* Quick Stats — numbers count up on scroll */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#222]">
                {STATS.map((st) => (
                  <div key={st.label}>
                    <div
                      className="stat-num font-display text-2xl lg:text-3xl font-semibold text-white tabular-nums"
                      data-value={st.value}
                      data-suffix={st.suffix}
                      data-plain={'plain' in st && st.plain ? '1' : '0'}
                    >
                      {st.value}{st.suffix}
                    </div>
                    <div className="font-mono-custom text-[10px] tracking-wider text-[#555] uppercase mt-1">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Experience & Education */}
              <div className="pt-6 space-y-4">
                {PROFILE.timeline.map((t) => (
                  <div key={t.title} className="tl-item relative pl-5 border-l border-[#222] hover:border-[#00F0FF] transition-colors duration-300">
                    <span className="absolute -left-[3px] top-1.5 w-[5px] h-[5px] bg-[#00F0FF]" />
                    <div className="font-mono-custom text-[10px] tracking-widest text-[#00F0FF]/80 uppercase">{t.period}</div>
                    <div className="font-display text-base text-white mt-1">{t.title}</div>
                    <div className="text-sm text-[#555]">{t.place}</div>
                    {'note' in t && t.note && <div className="text-xs text-[#444] mt-0.5">{t.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Portrait */}
          <div ref={imageRef} className="relative" style={{ opacity: 0 }}>
            <div className="relative border border-[#222] overflow-hidden group">
              <img
                src="/portrait.jpg"
                alt="Yousef Mohamed Baiomy"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                style={{ minHeight: '400px', maxHeight: '600px' }}
              />
              {/* Cyan overlay on hover */}
              <div
                className="absolute inset-0 bg-[#00F0FF] mix-blend-screen opacity-0 group-hover:opacity-[0.15] transition-opacity duration-400 pointer-events-none"
              />
            </div>
            {/* Decorative corner */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t border-l border-[#00F0FF]" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b border-r border-[#00F0FF]" />
          </div>
        </div>
      </div>
    </section>
  );
}
