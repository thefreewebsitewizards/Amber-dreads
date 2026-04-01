import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Sparkles, Package, Scissors, Leaf } from 'lucide-react';

const categories = [
  {
    title: 'Woolies',
    description: 'Soft, lightweight, and hypoallergenic. Handmade with cozy Chronic Dreads magic.',
    img: 'https://images.unsplash.com/photo-1567634088512-ed1306515fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    tag: 'Ready to Ship',
  },
  {
    title: 'Crochet Dreads',
    description: 'Textured, structured, and full of natural definition. Bold expressive texture.',
    img: 'https://images.unsplash.com/photo-1571454870742-43c314f3a81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    tag: 'Popular',
  },
  {
    title: 'Carabiner Braids',
    description: 'Clip directly into your hair. Easy, colorful, expressive. Stack & layer your vibe.',
    img: 'https://images.unsplash.com/photo-1636871400631-dcf00cda6421?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    tag: 'New',
  },
  {
    title: 'Dread Loom',
    description: 'Handcrafted wooden loom designed to support your dread-making process with ease.',
    img: 'https://images.unsplash.com/photo-1667482116370-4d8c21327dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    tag: 'Handmade Tool',
  },
];

const features = [
  { icon: <Sparkles size={22} />, title: 'Handmade', desc: 'Every piece is handmade with care, where quiet hands create gentle magic.' },
  { icon: <Leaf size={22} />, title: 'High‑Quality', desc: 'Premium materials that are soft, durable, and comfortable.' },
  { icon: <Package size={22} />, title: 'Ready to Ship', desc: 'What you see is what I have on hand, ready to go.' },
  { icon: <Scissors size={22} />, title: 'Custom Orders', desc: 'Want a different color? Just message me — I can order it.' },
];

export function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ marginTop: 0, paddingTop: '80px' }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1743963923776-71abd3fef92c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600"
          alt="Chronic Dreads hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Warm overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(44,30,24,0.72) 0%, rgba(124,92,72,0.55) 60%, rgba(196,120,90,0.35) 100%)' }} />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="mb-4 tracking-widest uppercase text-sm" style={{ color: '#E8D5C4', fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
            Handmade • High‑Quality • Comfortable • Affordable
          </p>
          <h1
            className="mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
              fontWeight: 700,
              color: '#FAF7F2',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            Chronic Dreads
          </h1>
          <p
            className="mb-10 leading-relaxed"
            style={{
              color: '#E8D5C4',
              fontFamily: "'Nunito', sans-serif",
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              fontWeight: 400,
            }}
          >
            Where quiet hands create gentle magic.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105"
              style={{
                background: '#C4785A',
                color: '#FAF7F2',
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(196,120,90,0.4)',
              }}
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(250,247,242,0.15)',
                color: '#FAF7F2',
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                textDecoration: 'none',
                border: '2px solid rgba(250,247,242,0.5)',
                backdropFilter: 'blur(4px)',
              }}
            >
              Custom Orders
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 px-4" style={{ background: '#FAF7F2' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-3 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
            Welcome
          </p>
          <h2
            className="mb-8"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#2C1E18', fontWeight: 600 }}
          >
            Welcome to Chronic Dreads
          </h2>
          <p className="mb-5 leading-relaxed" style={{ color: '#5A3E30', fontFamily: "'Nunito', sans-serif", fontSize: '1.05rem' }}>
            A space built on healing, creativity, and confidence. Every set of dreads here is handmade with high‑quality materials, crafted to be soft, comfortable, and affordable. My mission is simple: to help people feel expressive, grounded, and confident in their own skin.
          </p>
          <p className="leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif", fontSize: '1rem' }}>
            Everything shown in my shop is what I currently have on hand and ready to ship. If you want a different color or style, I can order it — just message me anytime. 💌
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4" style={{ background: '#F5EFE6' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl text-center"
                style={{ background: '#FAF7F2', border: '1px solid #E8D5C4' }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#F5EFE6', color: '#C4785A' }}>
                  {f.icon}
                </div>
                <h3 className="mb-2 text-base" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 600 }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Categories Preview */}
      <section className="py-20 px-4" style={{ background: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="mb-2 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
              Browse the Collection
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#2C1E18', fontWeight: 600 }}>
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to="/shop"
                className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ textDecoration: 'none', boxShadow: '0 4px 20px rgba(124,92,72,0.10)', background: '#F5EFE6' }}
              >
                <div className="relative h-52 overflow-hidden">
                  <ImageWithFallback
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs"
                    style={{ background: 'rgba(196,120,90,0.9)', color: '#FAF7F2', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}
                  >
                    {cat.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 600, fontSize: '1.1rem' }}>
                    {cat.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-block px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105"
              style={{
                background: '#7C5C48',
                color: '#FAF7F2',
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Orders CTA */}
      <section className="py-20 px-4" style={{ background: '#2C1E18' }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-3xl mb-4 block">✨</span>
          <h2
            className="mb-5"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#FAF7F2', fontWeight: 600 }}
          >
            Don't see your color?
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: '#C4A48A', fontFamily: "'Nunito', sans-serif", fontSize: '1.05rem' }}>
            I can order any color or style for you. Custom sets are a huge part of what I do — your colors, your length, your vibe.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105"
            style={{
              background: '#C4785A',
              color: '#FAF7F2',
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(196,120,90,0.4)',
            }}
          >
            Message Me →
          </Link>
        </div>
      </section>
    </div>
  );
}
