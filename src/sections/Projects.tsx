import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X, Github, BookOpen, ChevronLeft, ChevronRight, ExternalLink, Lock } from 'lucide-react';
import GridCanvas from '../components/GridCanvas';

gsap.registerPlugin(ScrollTrigger);

/* Content lives in src/data/projects.ts — edit projects there. */
import { CATEGORIES, PROJECTS } from '../data/projects';
import type { Project, Category } from '../data/projects';
import ScrambleText from '../components/ScrambleText';


/* ─────────────────────────────────────────────
   README MODAL
───────────────────────────────────────────── */

function ReadmeModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Very minimal markdown renderer: headers, bold, table, list, code, hr
  function renderReadme(text: string) {
    const lines = text.split('\n');
    const elements: ReactElement[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // H2
      if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-xl font-display font-semibold text-[#00F0FF] mt-6 mb-2 border-b border-[#00F0FF]/20 pb-1">{line.slice(3)}</h2>);
        i++; continue;
      }
      // H3
      if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-base font-display font-semibold text-white mt-4 mb-1">{line.slice(4)}</h3>);
        i++; continue;
      }
      // H4
      if (line.startsWith('#### ')) {
        elements.push(<h4 key={i} className="text-sm font-display font-semibold text-[#00F0FF]/80 mt-3 mb-1">{line.slice(5)}</h4>);
        i++; continue;
      }
      // HR
      if (line.startsWith('---')) {
        elements.push(<hr key={i} className="border-[#222] my-3" />);
        i++; continue;
      }
      // Table (starts with |)
      if (line.startsWith('|')) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].startsWith('|')) {
          tableLines.push(lines[i]);
          i++;
        }
        const rows = tableLines.filter(l => !l.match(/^\|[-\s|]+\|$/));
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-3">
            <table className="text-xs w-full border-collapse">
              {rows.map((row, ri) => (
                <tr key={ri} className={ri === 0 ? 'bg-[#00F0FF]/10 text-[#00F0FF]' : 'border-t border-[#222] text-[#888]'}>
                  {row.split('|').filter((_, ci) => ci > 0 && ci < row.split('|').length - 1).map((cell, ci) => (
                    <td key={ci} className="px-3 py-1.5 whitespace-nowrap">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </table>
          </div>
        );
        continue;
      }
      // Image gallery (consecutive ![caption](src) lines)
      if (line.match(/^!\[.*\]\(.*\)\s*$/)) {
        const imgs: { alt: string; src: string }[] = [];
        while (i < lines.length) {
          const m = lines[i].match(/^!\[(.*?)\]\((.*?)\)\s*$/);
          if (!m) break;
          imgs.push({ alt: m[1], src: m[2] });
          i++;
        }
        elements.push(
          <div key={`gallery-${i}`} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {imgs.map((img, gi) => (
              <figure key={gi} className="group/shot border border-[#222] bg-[#0D0D0D] overflow-hidden">
                <div className="overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-500 group-hover/shot:scale-[1.03]"
                  />
                </div>
                {img.alt && (
                  <figcaption className="text-[11px] leading-snug text-[#888] px-3 py-2 border-t border-[#1a1a1a]">
                    {img.alt}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        );
        continue;
      }
      // Bullet list
      if (line.match(/^[-*] /)) {
        const items: string[] = [];
        while (i < lines.length && lines[i].match(/^[-*] /)) {
          items.push(lines[i].slice(2));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="list-none space-y-1 my-2">
            {items.map((item, ii) => (
              <li key={ii} className="text-sm text-[#888] flex gap-2">
                <span className="text-[#00F0FF] mt-0.5 shrink-0">›</span>
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/`(.+?)`/g, '<code class="font-mono text-[#00F0FF]/80 bg-[#00F0FF]/10 px-1 rounded">$1</code>').replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#00F0FF] underline underline-offset-2 hover:text-white break-all">$1</a>') }} />
              </li>
            ))}
          </ul>
        );
        continue;
      }
      // Code block
      if (line.startsWith('```')) {
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <pre key={`code-${i}`} className="bg-[#0D0D0D] border border-[#222] rounded p-3 my-2 overflow-x-auto text-xs text-[#00F0FF]/70 font-mono">
            {codeLines.join('\n')}
          </pre>
        );
        i++; continue;
      }
      // Empty line
      if (line.trim() === '') { elements.push(<div key={i} className="h-1" />); i++; continue; }
      // Normal paragraph
      elements.push(
        <p key={i} className="text-sm text-[#888] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/`(.+?)`/g, '<code class="font-mono text-[#00F0FF]/80 bg-[#00F0FF]/10 px-1 rounded">$1</code>').replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#00F0FF] underline underline-offset-2 hover:text-white break-all">$1</a>') }}
        />
      );
      i++;
    }
    return elements;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
    >
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#0A0A0A] border border-[#222] overflow-hidden flex flex-col"
        style={{ boxShadow: '0 0 60px rgba(0,240,255,0.08)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a] shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen size={14} className="text-[#00F0FF] shrink-0" />
            <span className="font-mono-custom text-[10px] tracking-widest text-[#00F0FF] uppercase truncate">
              {project.liveDemo || !project.github ? `${project.title} — Details` : 'README.md'}
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono-custom text-[10px] tracking-wider text-[#00F0FF] hover:text-white uppercase transition-colors">
                <ExternalLink size={12} /> Live Demo
              </a>
            )}
            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono-custom text-[10px] tracking-wider text-[#555] hover:text-white uppercase transition-colors">
                <Github size={12} /> GitHub
              </a>
            ) : project.private ? (
              <span className="flex items-center gap-1.5 font-mono-custom text-[10px] tracking-wider text-[#555] uppercase">
                <Lock size={12} /> Private
              </span>
            ) : null}
            <button onClick={onClose} className="text-[#555] hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-6 py-4 flex-1 scrollbar-thin">
          {renderReadme(project.readme)}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECT IMAGE (with carousel arrows for multi-image projects)
───────────────────────────────────────────── */

function ProjectImage({ project }: { project: Project }) {
  const imgs = project.images && project.images.length > 1 ? project.images : [project.image];
  const [idx, setIdx] = useState(0);
  const multi = imgs.length > 1;

  const go = (dir: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((prev) => (prev + dir + imgs.length) % imgs.length);
  };

  return (
    <div className="aspect-[16/10] overflow-hidden relative">
      {imgs.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${project.title} — view ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          style={{ opacity: i === idx ? 1 : 0, pointerEvents: i === idx ? 'auto' : 'none' }}
        />
      ))}

      {multi && (
        <>
          {/* Prev */}
          <button
            onClick={go(-1)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center bg-[#0A0A0A]/70 border border-[#333] text-white hover:bg-[#00F0FF] hover:text-black hover:border-[#00F0FF] transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronLeft size={18} />
          </button>
          {/* Next */}
          <button
            onClick={go(1)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center bg-[#0A0A0A]/70 border border-[#333] text-white hover:bg-[#00F0FF] hover:text-black hover:border-[#00F0FF] transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {imgs.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === idx ? 'w-5 bg-[#00F0FF]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute top-3 right-3 z-20 font-mono-custom text-[9px] tracking-widest text-white bg-[#0A0A0A]/70 border border-[#333] px-2 py-1 backdrop-blur-sm">
            {idx + 1} / {imgs.length}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [openReadme, setOpenReadme] = useState<Project | null>(null);
  const [tabTouched, setTabTouched] = useState(false);

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.k-word');
        words.forEach((word, i) => {
          const direction = i % 2 === 0 ? -1 : 1;
          gsap.fromTo(word,
            { xPercent: direction * 50, skewX: direction * 2, opacity: 0.3 },
            { xPercent: 0, skewX: 0, opacity: 1, ease: 'sine.out',
              scrollTrigger: { trigger: headingRef.current, start: 'top bottom-=10%', end: 'center center', scrub: true } }
          );
        });
      }
      const cards = sectionRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const headingWords = 'SELECTED WORK'.split(' ');

  return (
    <section ref={sectionRef} id="work" className="relative py-24 lg:py-32" style={{ zIndex: 2 }}>
      {openReadme && <ReadmeModal project={openReadme} onClose={() => setOpenReadme(null)} />}

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">

        {/* Section Label */}
        <div className="font-display text-[11px] font-semibold tracking-[0.15em] text-[#00F0FF] uppercase mb-4">
          <ScrambleText text="Portfolio" />
        </div>

        {/* Kinetic Heading */}
        <h2 ref={headingRef} className="kinetic-heading font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.01em] mb-10">
          {headingWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
              <span className="k-word inline-block" data-direction={i % 2 === 0 ? 'left' : 'right'}>{word}</span>
            </span>
          ))}
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-16">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setTabTouched(true); }}
              className={`font-mono-custom text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                activeCategory === cat
                  ? 'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/5'
                  : 'border-[#222] text-[#555] hover:border-[#444] hover:text-[#888]'
              }`}
            >
              {cat}
              <span className={`ml-2 text-[9px] ${activeCategory === cat ? 'text-[#00F0FF]/60' : 'text-[#333]'}`}>
                {cat === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Category Label */}
        {activeCategory !== 'All' && (
          <div className="mb-10">
            <div className="inline-flex items-center gap-3">
              <div className="w-6 h-px bg-[#00F0FF]" />
              <span className="font-display text-sm font-semibold text-[#00F0FF] tracking-wider uppercase">{activeCategory}</span>
            </div>
          </div>
        )}

        {/* Project Cards */}
        <div key={activeCategory} className="flex flex-col gap-12 lg:gap-16">
          {filtered.map((project, index) => (
            <div
              key={project.title}
              style={tabTouched ? { animationDelay: `${index * 90}ms`, boxShadow: 'none' } : { boxShadow: 'none' }}
              className={`project-card spotlight ${tabTouched ? 'tab-anim' : ''} group relative border border-[#222] bg-[#0A0A0A] overflow-hidden transition-all duration-300 hover:border-[#00F0FF]`}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.1)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              <GridCanvas className="absolute inset-0 opacity-30 pointer-events-auto" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="font-mono-custom text-[9px] tracking-widest uppercase px-2 py-1 bg-[#0A0A0A]/80 border border-[#333] text-[#555]">
                  {project.category}
                </span>
              </div>

              <div className={`relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-0 ${index % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>

                {/* Image */}
                <div className="lg:col-span-7 relative overflow-hidden" style={{ direction: 'ltr' }}>
                  <ProjectImage project={project} />
                </div>

                {/* Content */}
                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center" style={{ direction: 'ltr' }}>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono-custom text-[10px] tracking-wider text-[#00F0FF] uppercase px-2 py-1 border border-[#00F0FF]/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className={`font-display text-2xl lg:text-3xl font-semibold text-white group-hover:text-[#00F0FF] transition-colors duration-300 ${project.subtitle ? 'mb-1' : 'mb-4'}`}>
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="font-mono-custom text-[11px] tracking-wider text-[#00F0FF]/70 uppercase mb-4">
                      {project.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-sm text-[#555] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-6 mb-6">
                    <div>
                      <span className="font-mono-custom text-[10px] tracking-wider text-[#555] uppercase block">Difficulty</span>
                      <span className="font-display text-sm text-white">{project.difficulty}</span>
                    </div>
                    <div>
                      <span className="font-mono-custom text-[10px] tracking-wider text-[#555] uppercase block">Year</span>
                      <span className="font-display text-sm text-white">{project.year}</span>
                    </div>
                  </div>

                  {/* CTAs — primary: Live Demo → GitHub → (private) Details */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                    {project.liveDemo ? (
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-display text-xs font-semibold tracking-wider text-black bg-[#00F0FF] px-4 py-2 uppercase hover:bg-white transition-colors duration-300 group/link">
                        <ExternalLink size={13} />
                        Live Demo
                        <ArrowRight size={13} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                      </a>
                    ) : project.github ? (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-display text-xs font-semibold tracking-wider text-black bg-[#00F0FF] px-4 py-2 uppercase hover:bg-white transition-colors duration-300 group/link">
                        <Github size={13} />
                        View on GitHub
                        <ArrowRight size={13} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                      </a>
                    ) : (
                      <button onClick={() => setOpenReadme(project)}
                        className="inline-flex items-center gap-2 font-display text-xs font-semibold tracking-wider text-black bg-[#00F0FF] px-4 py-2 uppercase hover:bg-white transition-colors duration-300 group/link">
                        <BookOpen size={13} />
                        View Case Study
                        <ArrowRight size={13} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                      </button>
                    )}
                    {project.liveDemo && project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono-custom text-[10px] tracking-wider text-[#555] uppercase hover:text-[#00F0FF] transition-colors duration-200">
                        <Github size={13} />
                        GitHub
                      </a>
                    )}
                    {project.private && (
                      <span className="inline-flex items-center gap-1.5 font-mono-custom text-[10px] tracking-wider text-[#555] uppercase">
                        <Lock size={12} />
                        Private repository
                      </span>
                    )}
                    {(project.liveDemo || project.github) && (
                      <button onClick={() => setOpenReadme(project)}
                        className="inline-flex items-center gap-1.5 font-mono-custom text-[10px] tracking-wider text-[#555] uppercase hover:text-[#00F0FF] transition-colors duration-200">
                        <BookOpen size={12} />
                        {project.liveDemo ? 'Details' : 'README'}
                      </button>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
