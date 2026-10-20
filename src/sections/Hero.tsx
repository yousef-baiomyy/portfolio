import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Github, Linkedin, FileText, Briefcase, Mail } from 'lucide-react';

/* Content lives in src/data/profile.ts — edit texts there. */
import { PROFILE } from '../data/profile';
import LiveQuery from '../components/LiveQuery';
const TYPING_WORDS = PROFILE.typingWords;
const ROLES = PROFILE.roles;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    if (labelRef.current) {
      const chars = labelRef.current.querySelectorAll('.char');
      tl.fromTo(
        chars,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.02, duration: 0.8, ease: 'power3.out' },
        0
      );
    }

    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.word');
      tl.fromTo(
        words,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.05, duration: 1.2, ease: 'power3.out' },
        0.3
      );
    }

    if (rolesRef.current) {
      tl.fromTo(
        rolesRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0.6
      );
    }

    if (typingRef.current) {
      tl.fromTo(
        typingRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0.8
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        1.0
      );
    }

    if (buttonsRef.current) {
      const btns = buttonsRef.current.querySelectorAll('a, button');
      tl.fromTo(
        btns,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out' },
        1.2
      );
    }

    if (socialsRef.current) {
      tl.fromTo(
        socialsRef.current.querySelectorAll('a'),
        { y: 16, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.5, ease: 'back.out(2)' },
        1.45
      );
    }

    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.5
      );
    }

    return () => { tl.kill(); };
  }, []);

  // Typing effect
  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    const typeSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
      } else {
        setTypedText((prev) =>
          isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, wordIndex, isDeleting]);

  const labelText = PROFILE.label;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center"
      style={{ zIndex: 1, pointerEvents: 'none' }}
    >
      <div className="relative w-full max-w-[1280px] mx-auto px-6 lg:px-12 py-20">
        {/* Live SQL console — wide screens only */}
        <div className="hidden xl:block absolute right-12 top-1/2 -translate-y-1/2 w-[420px] lq-enter">
          <LiveQuery />
        </div>

        <div className="max-w-2xl">
          {/* Label */}
          <div
            ref={labelRef}
            className="font-display text-xs font-semibold tracking-[0.15em] text-[#00F0FF] uppercase mb-6 overflow-hidden"
          >
            {labelText.split('').map((char, i) => (
              <span key={i} className="char inline-block" style={{ opacity: 0 }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-semibold text-white leading-[0.95] tracking-[-0.02em] glow-cyan"
          >
            <span className="overflow-hidden block">
              <span className="word inline-block" style={{ opacity: 0 }}>{PROFILE.firstName}</span>
            </span>
            <span className="overflow-hidden block ml-[0.1em]">
              <span className="word inline-block" style={{ opacity: 0 }}>{PROFILE.lastName}</span>
            </span>
          </h1>

          {/* Roles */}
          <div ref={rolesRef} className="mt-8 flex flex-wrap gap-3" style={{ opacity: 0 }}>
            {ROLES.map((role, i) => (
              <span
                key={role}
                className="font-mono-custom text-[11px] tracking-[0.05em] text-[#555] uppercase"
              >
                {role}
                {i < ROLES.length - 1 && <span className="ml-3 text-[#333]">/</span>}
              </span>
            ))}
          </div>

          {/* Typing Effect */}
          <div ref={typingRef} className="mt-6 h-8" style={{ opacity: 0 }}>
            <span className="font-mono-custom text-sm text-[#00F0FF]">
              &gt; {typedText}
              <span className="inline-block w-[2px] h-4 bg-[#00F0FF] ml-1 animate-pulse" />
            </span>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mt-6 text-base text-[#555] max-w-[440px] leading-relaxed"
            style={{ opacity: 0 }}
          >
            {PROFILE.heroSubtitle}
          </p>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href={PROFILE.cvFile}
              download
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00F0FF] text-[#050505] font-display text-sm font-semibold uppercase tracking-wider hover:bg-white transition-colors duration-300"
              style={{ pointerEvents: 'auto' }}
            >
              <FileText size={16} />
              Download CV
            </a>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#222] text-white font-display text-sm font-semibold uppercase tracking-wider hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300"
              style={{ pointerEvents: 'auto' }}
            >
              <Briefcase size={16} />
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#222] text-white font-display text-sm font-semibold uppercase tracking-wider hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300"
              style={{ pointerEvents: 'auto' }}
            >
              <Mail size={16} />
              Contact Me
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex gap-3" ref={socialsRef}>
            <a href="https://github.com/yousef-baiomyy" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[#222] text-[#555] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300"
              style={{ pointerEvents: 'auto' }} aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/yousef-baiomy-1b8bb737a" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[#222] text-[#555] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300"
              style={{ pointerEvents: 'auto' }} aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://wa.me/201095762957" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[#222] text-[#555] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300"
              style={{ pointerEvents: 'auto' }} aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="https://www.instagram.com/yousef_baiomyy" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[#222] text-[#555] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300"
              style={{ pointerEvents: 'auto' }} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100009754510246" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[#222] text-[#555] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300"
              style={{ pointerEvents: 'auto' }} aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-6 lg:left-12 flex flex-col items-center gap-3"
        style={{ opacity: 0 }}
      >
        <span
          className="font-display text-[10px] font-semibold tracking-[0.15em] text-[#555] uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div className="relative w-[1px] h-16 bg-[#222]">
          <div
            className="absolute top-0 left-0 w-full bg-[#00F0FF]"
            style={{
              height: '8px',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(56px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
