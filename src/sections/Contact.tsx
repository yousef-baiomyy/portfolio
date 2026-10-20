import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, MapPin, Send, Mail, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading kinetic
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

      // Email fade in
      if (emailRef.current) {
        gsap.fromTo(
          emailRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: emailRef.current, start: 'top 85%' },
          }
        );
      }

      // Socials fade in
      if (socialsRef.current) {
        const items = socialsRef.current.querySelectorAll('a');
        gsap.fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: socialsRef.current, start: 'top 85%' },
          }
        );
      }

      // Form fade in
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const headingWords = "LET'S BUILD SOMETHING".split(' ');

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 lg:py-40 bg-[#0A0A0A]"
      style={{ zIndex: 2 }}
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#222]" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Kinetic Heading */}
        <h2
          ref={headingRef}
          className="kinetic-heading font-display text-4xl sm:text-5xl lg:text-7xl font-semibold text-white tracking-[-0.01em] text-center mb-6"
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

        {/* Email */}
        <div className="text-center mb-12">
          <a
            ref={emailRef}
            href="mailto:yousefbaiomy7@gmail.com"
            className="inline-block font-display text-2xl lg:text-4xl font-medium text-[#00F0FF] hover:text-white transition-colors duration-300 relative group"
            style={{ opacity: 0 }}
          >
            yousefbaiomy7@gmail.com
            <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#00F0FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </a>
        </div>

        {/* Social Links */}
        <div ref={socialsRef} className="flex flex-wrap justify-center gap-4 mb-20">
          {[
            {
              icon: Github,
              label: 'GitHub',
              href: 'https://github.com/yousef-baiomyy',
            },
            {
              icon: Linkedin,
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/yousef-baiomy-1b8bb737a',
            },
            {
              icon: Mail,
              label: 'Email',
              href: 'mailto:yousefbaiomy7@gmail.com',
            },
            {
              icon: Phone,
              label: 'WhatsApp',
              href: 'https://wa.me/201095762957',
            },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-[#222] font-mono-custom text-xs text-[#555] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300"
              style={{ opacity: 0 }}
            >
              <Icon size={14} />
              <span>{label}</span>
            </a>
          ))}
          {/* Instagram */}
          <a
            href="https://www.instagram.com/yousef_baiomyy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-[#222] font-mono-custom text-xs text-[#555] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300"
            style={{ opacity: 0 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            <span>Instagram</span>
          </a>
          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=100009754510246"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-[#222] font-mono-custom text-xs text-[#555] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300"
            style={{ opacity: 0 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span>Facebook</span>
          </a>
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto"
          style={{ opacity: 0 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="font-mono-custom text-[10px] tracking-wider text-[#555] uppercase block mb-2">
                Name
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
                className="w-full bg-[#050505] border border-[#222] px-4 py-3 text-white text-sm font-inter focus:border-[#00F0FF] focus:outline-none transition-colors duration-300"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="font-mono-custom text-[10px] tracking-wider text-[#555] uppercase block mb-2">
                Email
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
                className="w-full bg-[#050505] border border-[#222] px-4 py-3 text-white text-sm font-inter focus:border-[#00F0FF] focus:outline-none transition-colors duration-300"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="font-mono-custom text-[10px] tracking-wider text-[#555] uppercase block mb-2">
              Subject
            </label>
            <input
              type="text"
              value={formState.subject}
              onChange={(e) => setFormState((p) => ({ ...p, subject: e.target.value }))}
              className="w-full bg-[#050505] border border-[#222] px-4 py-3 text-white text-sm font-inter focus:border-[#00F0FF] focus:outline-none transition-colors duration-300"
              placeholder="What's this about?"
              required
            />
          </div>

          <div className="mb-6">
            <label className="font-mono-custom text-[10px] tracking-wider text-[#555] uppercase block mb-2">
              Message
            </label>
            <textarea
              value={formState.message}
              onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
              rows={5}
              className="w-full bg-[#050505] border border-[#222] px-4 py-3 text-white text-sm font-inter focus:border-[#00F0FF] focus:outline-none transition-colors duration-300 resize-none"
              placeholder="Tell me about your project..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00F0FF] text-[#050505] font-display text-sm font-semibold uppercase tracking-wider hover:bg-white transition-colors duration-300 disabled:opacity-50"
          >
            {submitted ? (
              <>
                Message Sent
                <span className="w-2 h-2 bg-[#050505] rounded-full animate-pulse" />
              </>
            ) : (
              <>
                Send Message
                <Send size={14} />
              </>
            )}
          </button>
        </form>

        {/* Location */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-2 text-[#555]">
            <MapPin size={14} />
            <span className="font-mono-custom text-xs">Cairo, Egypt</span>
          </div>
        </div>
      </div>
    </section>
  );
}
