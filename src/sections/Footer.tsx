import { ArrowUp, Github, Linkedin, Mail, Phone } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { icon: Github, href: 'https://github.com/yousef-baiomyy', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/yousef-baiomy-1b8bb737a', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:yousefbaiomy7@gmail.com', label: 'Email' },
  { icon: Phone, href: 'https://wa.me/201095762957', label: 'WhatsApp' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-[#222]" style={{ zIndex: 2 }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Logo & Copyright */}
          <div>
            <div className="font-display text-lg font-semibold text-white tracking-[-0.01em] mb-2">
              Yousef Baiomy
            </div>
            <div className="font-mono-custom text-[10px] tracking-wider text-[#555] uppercase">
              Data Analyst & Future Data Engineer
            </div>
            <div className="font-mono-custom text-[10px] tracking-wider text-[#555] mt-4">
              &copy; {new Date().getFullYear()} All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <div className="font-mono-custom text-[10px] tracking-wider text-[#555] uppercase mb-2">
              Quick Links
            </div>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-inter text-sm text-[#555] hover:text-white transition-colors duration-300 w-fit"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Socials & Back to Top */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <div className="flex gap-3 flex-wrap justify-end">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-[#222] text-[#555] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
              {/* Instagram */}
              <a href="https://www.instagram.com/yousef_baiomyy" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center border border-[#222] text-[#555] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=100009754510246" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center border border-[#222] text-[#555] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 font-mono-custom text-[10px] tracking-wider text-[#555] uppercase hover:text-[#00F0FF] transition-colors duration-300 group"
            >
              Back to Top
              <ArrowUp size={12} className="transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#111] py-4">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="font-mono-custom text-[10px] text-[#333]">
            Built with React & Tailwind CSS
          </span>
          <span className="font-mono-custom text-[10px] text-[#333]">
            Designed by Yousef Baiomy
          </span>
        </div>
      </div>
    </footer>
  );
}
