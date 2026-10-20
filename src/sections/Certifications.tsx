import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, ExternalLink, Maximize2, Award } from 'lucide-react';

/* Content lives in src/data/certificates.ts — edit certificates there. */
import { CERTIFICATES, IN_PROGRESS } from '../data/certificates';
import type { Certificate } from '../data/certificates';
import ScrambleText from '../components/ScrambleText';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────── */
function Lightbox({ list, index, onClose, onMove }: {
  list: Certificate[]; index: number; onClose: () => void; onMove: (dir: number) => void;
}) {
  const cert = list[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onMove]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 lb-fade"
      data-lenis-prevent
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      <div className="relative w-full max-w-5xl flex flex-col items-center lb-zoom" onClick={(e) => e.stopPropagation()}>
        {/* Top bar */}
        <div className="w-full flex items-center justify-between gap-4 mb-3">
          <div className="min-w-0">
            <div className="font-mono-custom text-[10px] tracking-widest text-[#00F0FF] uppercase truncate">{cert.issuer} · {cert.date}</div>
            <div className="font-display text-base sm:text-lg text-white truncate">{cert.title}</div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono-custom text-[10px] tracking-widest text-[#555]">{index + 1} / {list.length}</span>
            {cert.verifyUrl && (
              <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 font-mono-custom text-[10px] tracking-wider text-[#00F0FF] hover:text-white uppercase transition-colors">
                <ExternalLink size={12} /> Verify
              </a>
            )}
            <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center border border-[#333] text-white hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full flex items-center justify-center">
          <img
            key={cert.image}
            src={cert.image}
            alt={`${cert.title} — ${cert.issuer}`}
            className="max-h-[74vh] w-auto max-w-full object-contain border border-[#222] lb-img"
          />
          <button onClick={() => onMove(-1)} aria-label="Previous certificate"
            className="absolute left-1 sm:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#0A0A0A]/80 border border-[#333] text-white hover:bg-[#00F0FF] hover:text-black hover:border-[#00F0FF] transition-all">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => onMove(1)} aria-label="Next certificate"
            className="absolute right-1 sm:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#0A0A0A]/80 border border-[#333] text-white hover:bg-[#00F0FF] hover:text-black hover:border-[#00F0FF] transition-all">
            <ChevronRight size={18} />
          </button>
        </div>

        {cert.credentialId && (
          <div className="mt-3 font-mono-custom text-[10px] tracking-wider text-[#555] break-all text-center">
            Credential ID · <span className="text-[#888]">{cert.credentialId}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION
───────────────────────────────────────────── */
export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [issuer, setIssuer] = useState('All');
  const [open, setOpen] = useState<number | null>(null);
  const [touched, setTouched] = useState(false); // tab switched at least once

  const issuers = useMemo(() => {
    const names = Array.from(new Set(CERTIFICATES.map((c) => c.issuer)));
    return ['All', ...names];
  }, []);

  const list = issuer === 'All' ? CERTIFICATES : CERTIFICATES.filter((c) => c.issuer === issuer);

  const move = useCallback((dir: number) => {
    setOpen((i) => (i === null ? i : (i + dir + list.length) % list.length));
  }, [list.length]);
  const close = useCallback(() => setOpen(null), []);

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
      gsap.set('.cert-card', { opacity: 0 });
      ScrollTrigger.batch('.cert-card', {
        start: 'top 92%',
        once: true,
        onEnter: (els) => gsap.fromTo(els,
          { y: 50, opacity: 0, rotateX: 8 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out', overwrite: true }),
      });
      gsap.fromTo('.cert-progress', { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.cert-progress', start: 'top 95%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const headingWords = 'CERTIFICATIONS & LEARNING'.split(' ');

  return (
    <section ref={sectionRef} id="certifications" className="relative py-24 lg:py-32" style={{ zIndex: 2 }}>
      {open !== null && list[open] && <Lightbox list={list} index={open} onClose={close} onMove={move} />}

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="font-display text-[11px] font-semibold tracking-[0.15em] text-[#00F0FF] uppercase mb-4">
          <ScrambleText text="Credentials" />
        </div>

        <h2 ref={headingRef} className="kinetic-heading font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.01em] mb-10">
          {headingWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
              <span className="k-word inline-block">{word}</span>
            </span>
          ))}
        </h2>

        {/* Issuer filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {issuers.map((name) => (
            <button
              key={name}
              onClick={() => { setIssuer(name); setTouched(true); }}
              className={`font-mono-custom text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                issuer === name
                  ? 'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/5'
                  : 'border-[#222] text-[#555] hover:border-[#444] hover:text-[#888]'
              }`}
            >
              {name}
              <span className={`ml-2 text-[9px] ${issuer === name ? 'text-[#00F0FF]/60' : 'text-[#333]'}`}>
                {name === 'All' ? CERTIFICATES.length : CERTIFICATES.filter((c) => c.issuer === name).length}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div key={issuer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1200px' }}>
          {list.map((c, i) => (
            <article
              key={c.title + c.issuer}
              className={`cert-card spotlight group relative border bg-[#0A0A0A] flex flex-col transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#00F0FF] hover:shadow-[0_0_30px_rgba(0,240,255,0.08)] ${
                c.type === 'Diploma' ? 'border-[#00F0FF]/40' : 'border-[#222]'
              } ${touched ? 'tab-anim' : ''}`}
              style={touched ? { animationDelay: `${i * 60}ms` } : undefined}
            >
              <button
                onClick={() => setOpen(i)}
                className="relative aspect-[4/3] overflow-hidden bg-[#0D0D0D] border-b border-[#1a1a1a] cursor-zoom-in"
                aria-label={`View ${c.title} certificate`}
              >
                <img
                  src={c.image}
                  alt={`${c.title} — ${c.issuer}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 font-mono-custom text-[9px] tracking-widest uppercase text-black bg-[#00F0FF] px-2 py-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Maximize2 size={10} /> View
                </span>
                {c.type === 'Diploma' && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 font-mono-custom text-[9px] tracking-widest uppercase text-[#00F0FF] bg-[#0A0A0A]/85 border border-[#00F0FF]/50 px-2 py-1">
                    <Award size={10} /> Diploma
                  </span>
                )}
              </button>

              <div className="relative z-10 p-5 flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono-custom text-[10px] tracking-widest text-[#00F0FF]/80 uppercase truncate">{c.issuer}</span>
                  <span className="font-mono-custom text-[10px] tracking-widest text-[#555] uppercase shrink-0">{c.date}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white leading-snug group-hover:text-[#00F0FF] transition-colors duration-300">
                  {c.title}
                </h3>
                {c.note && <p className="text-xs text-[#666] leading-relaxed">{c.note}</p>}
                <div className="mt-auto pt-3 flex items-center justify-between gap-3 border-t border-[#161616]">
                  <span className="font-mono-custom text-[9px] tracking-wider text-[#444] truncate" title={c.credentialId}>
                    {c.credentialId ? `ID · ${c.credentialId}` : c.type}
                  </span>
                  {c.verifyUrl && (
                    <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono-custom text-[10px] tracking-wider text-[#00F0FF] uppercase hover:text-white transition-colors shrink-0">
                      <ExternalLink size={11} /> Verify
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Currently learning */}
        {IN_PROGRESS.length > 0 && (
          <div className="mt-14">
            <div className="font-mono-custom text-[10px] tracking-widest text-[#555] uppercase mb-4">Currently in progress</div>
            <div className="flex flex-wrap gap-3">
              {IN_PROGRESS.map((p) => (
                <div key={p.title} className="cert-progress inline-flex items-center gap-3 border border-[#222] bg-[#0A0A0A] px-4 py-3">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-yellow-500/70 animate-ping" />
                    <span className="relative w-2 h-2 rounded-full bg-yellow-500/80" />
                  </span>
                  <span className="font-display text-sm text-white">{p.title}</span>
                  <span className="font-mono-custom text-[10px] tracking-wider text-[#555] uppercase">{p.issuer}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
