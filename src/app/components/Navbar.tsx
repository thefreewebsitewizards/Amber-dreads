import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/policies', label: 'Policies' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(250,247,242,0.97)' : '#FAF7F2',
        boxShadow: scrolled ? '0 2px 16px rgba(124,92,72,0.10)' : 'none',
        borderBottom: '1px solid #E8D5C4',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/Amber-dreads-logo.png"
              alt="Amber Dreads logo"
              className="h-9 w-9 md:h-10 md:w-10 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span
                className="text-xl md:text-2xl"
                style={{ fontFamily: "'Playfair Display', serif", color: '#3D2518', fontWeight: 700, letterSpacing: '-0.01em' }}
              >
                Chronic Dreads
              </span>
              <span className="text-xs tracking-widest uppercase" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
                Handmade with Intention
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 rounded-lg text-sm transition-all duration-200"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: isActive(link.to) ? 700 : 500,
                  color: isActive(link.to) ? '#C4785A' : '#3D2518',
                  background: isActive(link.to) ? '#F5EFE6' : 'transparent',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg"
            style={{ color: '#3D2518' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="lg:hidden border-t"
          style={{ background: '#FAF7F2', borderColor: '#E8D5C4' }}
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-3 rounded-xl text-base transition-all duration-200"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: isActive(link.to) ? 700 : 500,
                  color: isActive(link.to) ? '#C4785A' : '#3D2518',
                  background: isActive(link.to) ? '#F5EFE6' : 'transparent',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
