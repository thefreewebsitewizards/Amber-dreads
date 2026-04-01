import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Heart, Sparkles, Leaf, Star } from 'lucide-react';

const offerings = [
  'Handmade dreadlock extensions',
  'High‑quality materials',
  'Soft, wearable, long‑lasting sets',
  'Affordable pricing',
  'Custom colors & custom sets',
  'Tools & accessories for dread makers',
];

const values = [
  { icon: <Heart size={20} />, title: 'Healing', desc: 'This business was born from a major turning point — choosing healing and clarity.' },
  { icon: <Sparkles size={20} />, title: 'Creativity', desc: 'Every piece is an expression of creativity, color, and whimsical energy.' },
  { icon: <Leaf size={20} />, title: 'Intention', desc: 'Every set is crafted with care, purpose, and love for the process.' },
  { icon: <Star size={20} />, title: 'Confidence', desc: 'My mission is to help you feel expressive, grounded, and confident.' },
];

export function AboutPage() {
  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1651507225850-4721bd4b537e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400"
          alt="About Chronic Dreads"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(44,30,24,0.65) 0%, rgba(124,92,72,0.5) 100%)' }}>
          <div className="text-center px-4">
            <p className="mb-2 tracking-widest uppercase text-xs" style={{ color: '#E8D5C4', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
              My Story
            </p>
            <h1
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#FAF7F2', fontWeight: 700 }}
            >
              About Chronic Dreads
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="mb-3 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
              Where It All Started
            </p>
            <h2 className="mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#2C1E18', fontWeight: 600 }}>
              My Story
            </h2>
            <div className="flex flex-col gap-4">
              <p className="leading-relaxed" style={{ color: '#5A3E30', fontFamily: "'Nunito', sans-serif", fontSize: '1rem' }}>
                Chronic Dreads was born during a major turning point in my life — a moment when I chose healing, clarity, and creativity. I'd always loved dreads but never had the confidence to wear them myself. When I began rebuilding my life, I finally gave myself permission to dive into something I'd always wanted.
              </p>
              <p className="leading-relaxed" style={{ color: '#5A3E30', fontFamily: "'Nunito', sans-serif", fontSize: '1rem' }}>
                What started as a personal dream quickly became my new passion. This business became the thing that grounded me, excited me, and kept me moving forward. It's my new addiction — the healthy kind — and I put everything I have into it.
              </p>
              <p className="leading-relaxed" style={{ color: '#5A3E30', fontFamily: "'Nunito', sans-serif", fontSize: '1rem' }}>
                Thank you for being here. This business is my heart, my second chance, and my way of giving confidence back to others.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(124,92,72,0.2)' }}>
              <ImageWithFallback
                src="/Amber-about-image.jpg"
                alt="Amber Dreads story"
                className="w-full h-96 object-cover"
              />
            </div>
            {/* Decorative element */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full flex items-center justify-center text-3xl"
              style={{ background: '#C4785A', zIndex: 10 }}
            >
              <img
                src="/Amber-dreads-new-logo.png"
                alt="Amber Dreads logo"
                className="h-16 w-16 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Mission */}
        <div
          className="rounded-3xl p-10 text-center mb-20"
          style={{ background: '#2C1E18' }}
        >
          <span className="text-3xl mb-4 block">✨</span>
          <p className="mb-3 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
            Mission
          </p>
          <h2 className="mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#FAF7F2', fontWeight: 600, fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
            My Mission
          </h2>
          <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#C4A48A', fontFamily: "'Nunito', sans-serif", fontSize: '1.05rem' }}>
            To create beautiful, comfortable, high‑quality dreads that help people feel confident, expressive, and themselves — without breaking the bank.
          </p>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="mb-2 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
              What Drives Me
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#2C1E18', fontWeight: 600 }}>
              My Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl text-center"
                style={{ background: '#F5EFE6', border: '1px solid #E8D5C4' }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#FAF7F2', color: '#C4785A' }}>
                  {v.icon}
                </div>
                <h4 className="mb-2 text-sm" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 600 }}>
                  {v.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What I Offer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <p className="mb-3 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
              The Lineup
            </p>
            <h2 className="mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#2C1E18', fontWeight: 600 }}>
              What I Offer
            </h2>
            <ul className="flex flex-col gap-3">
              {offerings.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: '#C4785A' }} />
                  <span className="text-sm" style={{ color: '#5A3E30', fontFamily: "'Nunito', sans-serif" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-3xl p-8"
            style={{ background: '#F5EFE6', border: '1px solid #E8D5C4' }}
          >
            <h3 className="mb-5" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 600, fontSize: '1.3rem' }}>
              Quality Promise 💛
            </h3>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
              Everything I make is crafted with:
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['High‑quality materials', 'Intention', 'Care', 'Comfort in mind'].map((q) => (
                <span
                  key={q}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{ background: '#FAF7F2', color: '#7C5C48', border: '1px solid #E8D5C4', fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}
                >
                  {q}
                </span>
              ))}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
              My goal is to create affordable, beautiful dreads that help you feel confident and expressive — always.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/shop"
            className="inline-block px-8 py-4 rounded-full text-base mr-4 transition-all duration-300 hover:scale-105"
            style={{
              background: '#C4785A',
              color: '#FAF7F2',
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Shop Now →
          </Link>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105"
            style={{
              background: 'transparent',
              color: '#7C5C48',
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              textDecoration: 'none',
              border: '2px solid #E8D5C4',
            }}
          >
            Say Hello →
          </Link>
        </div>
      </div>
    </div>
  );
}
