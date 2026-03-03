import { Link } from 'react-router';
import { Heart } from 'lucide-react';

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer style={{ background: '#2C1E18', color: '#E8D5C4', fontFamily: "'Nunito', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/Amber-dreads-logo.png"
                alt="Amber Dreads logo"
                className="h-8 w-8 object-contain"
              />
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: '#FAF7F2' }}>
                Chronic Dreads
              </span>
            </div>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: '#C4A48A' }}>
              Handmade Dreadlock Extensions & Tools<br />
              Affordable • Comfortable • High‑Quality
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/ChronicDreads"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200"
                style={{ background: '#3D2518', color: '#E8D5C4' }}
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="https://tiktok.com/@ChronicDreads"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200"
                style={{ background: '#3D2518', color: '#E8D5C4' }}
                aria-label="TikTok"
              >
                <TikTokIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm tracking-widest uppercase" style={{ color: '#C4785A', fontWeight: 700 }}>
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/shop', label: 'Shop' },
                { to: '/services', label: 'Services' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/about', label: 'About' },
                { to: '/policies', label: 'Policies' },
                { to: '/faq', label: 'FAQ' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm transition-all duration-200 hover:text-[#C4785A]"
                  style={{ color: '#C4A48A', textDecoration: 'none' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Payment */}
          <div>
            <h4 className="mb-4 text-sm tracking-widest uppercase" style={{ color: '#C4785A', fontWeight: 700 }}>
              Payments Accepted
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Stripe', 'Credit/Debit Cards'].map((method) => (
                <span
                  key={method}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{ background: '#3D2518', color: '#E8D5C4', fontWeight: 600 }}
                >
                  {method}
                </span>
              ))}
            </div>
            <p className="text-sm mb-2" style={{ color: '#C4A48A' }}>
              ✉️ Have a question? Message me anytime.
            </p>
            <Link
              to="/contact"
              className="inline-block px-4 py-2 rounded-full text-sm transition-all duration-200"
              style={{ background: '#C4785A', color: '#FAF7F2', fontWeight: 600, textDecoration: 'none' }}
            >
              Get in Touch →
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid #3D2518' }}>
          <p className="text-xs" style={{ color: '#7C5C48' }}>
            © 2026 Chronic Dreads. All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: '#7C5C48' }}>
            Made with <Heart size={12} className="inline" style={{ color: '#C4785A' }} /> and intention
          </p>
        </div>
      </div>
    </footer>
  );
}
