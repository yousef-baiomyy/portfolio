import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GridCanvas from '../components/GridCanvas';

gsap.registerPlugin(ScrollTrigger);

/* Content lives in src/data/skills.ts — edit skills there. */
import { SKILL_CATEGORIES } from '../data/skills';
import ScrambleText from '../components/ScrambleText';

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic heading
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

      // Cards entrance
      const cards = sectionRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingWords = 'TOOLS & TECHNOLOGIES'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 lg:py-32"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="font-display text-[11px] font-semibold tracking-[0.15em] text-[#00F0FF] uppercase mb-4">
          <ScrambleText text="Capabilities" />
        </div>

        {/* Kinetic Heading */}
        <h2
          ref={headingRef}
          className="kinetic-heading font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.01em] mb-16 lg:mb-24"
        >
          {headingWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
              <span
                className="k-word inline-block"
                data-direction={i % 2 === 0 ? 'left' : 'right'}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="skill-card spotlight group relative border border-[#222] bg-[#0A0A0A] p-8 transition-all duration-300 hover:border-[#00F0FF]"
              style={{
                boxShadow: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 25px rgba(0, 240, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <GridCanvas className="absolute inset-0 opacity-20 pointer-events-auto" />

              <div className="relative z-10">
                {/* Category Title */}
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="font-display text-xl lg:text-2xl font-semibold text-white group-hover:text-[#00F0FF] transition-colors duration-300">
                    {category.title}
                  </h3>
                  {category.inProgress && (
                    <span className="font-mono-custom text-[8px] tracking-widest uppercase px-1.5 py-0.5 border border-yellow-500/40 text-yellow-500/70 shrink-0">
                      IN PROGRESS
                    </span>
                  )}
                </div>

                {/* Skill List */}
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="font-mono-custom text-xs text-[#555] group-hover:text-[#888] transition-colors duration-300 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-[#333] group-hover:bg-[#00F0FF] transition-colors duration-300 shrink-0" />
                      <span>{skill.name}</span>
                      {skill.inProgress && (
                        <span className="font-mono-custom text-[7px] tracking-widest uppercase px-1 py-0.5 border border-yellow-500/30 text-yellow-500/50 ml-auto shrink-0">
                          soon
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
