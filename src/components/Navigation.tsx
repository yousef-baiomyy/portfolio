import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

interface NavigationProps {
  onMenuToggle?: (open: boolean) => void;
}

export default function Navigation({ onMenuToggle }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) toggleMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev;
      onMenuToggle?.(next);

      if (next) {
        document.body.style.overflow = 'hidden';
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'flex' });
        gsap.fromTo(
          panelRef.current,
          { xPercent: -100 },
          { xPercent: 0, duration: 0.6, ease: 'power3.inOut' }
        );
        if (itemsRef.current) {
          const items = itemsRef.current.querySelectorAll('.menu-item');
          gsap.fromTo(
            items,
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.08, duration: 0.5, delay: 0.2 }
          );
        }
      } else {
        document.body.style.overflow = '';
        if (itemsRef.current) {
          const items = itemsRef.current.querySelectorAll('.menu-item');
          gsap.to(items, { x: 40, opacity: 0, duration: 0.3 });
        }
        gsap.to(panelRef.current, { xPercent: 100, duration: 0.5, ease: 'power3.inOut', delay: 0.1 });
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.4, onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        }});
      }

      return next;
    });
  }, [onMenuToggle]);

  const handleNavClick = (href: string) => {
    toggleMenu();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  };

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.9)' : 'transparent',
          borderBottom: scrolled ? '1px solid #222' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo / Hamburger */}
          <button
            onClick={toggleMenu}
            className="relative z-[60] w-10 h-10 flex flex-col justify-center items-center gap-1.5 group"
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-[1.5px] bg-white transition-all duration-300"
              style={{
                transform: menuOpen ? 'rotate(45deg) translateY(4.5px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-[1.5px] bg-white transition-all duration-300"
              style={{
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-[1.5px] bg-white transition-all duration-300"
              style={{
                transform: menuOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none',
              }}
            />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-[#555] hover:text-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00F0FF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right side placeholder for balance */}
          <div className="w-10" />
        </div>
      </nav>

      {/* Full-screen Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[55] items-center justify-center"
        style={{
          background: 'rgba(5, 5, 5, 0.97)',
          display: 'none',
          opacity: 0,
        }}
      >
        <div ref={panelRef} className="absolute inset-0 bg-[#050505]" />
        <div ref={itemsRef} className="relative z-10 flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="menu-item relative font-display text-5xl md:text-7xl font-semibold text-white hover:text-[#00F0FF] transition-colors duration-300 group"
            >
              {link.label}
              <svg
                className="link__svg"
                viewBox="0 0 150 20"
                preserveAspectRatio="none"
              >
                <path
                  className="link__path"
                  d="M 0 10 Q 75 0 150 10"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
