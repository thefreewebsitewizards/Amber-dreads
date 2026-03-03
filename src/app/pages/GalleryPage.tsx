import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const galleryItems = [
  {
    id: 'g1',
    img: 'https://images.unsplash.com/photo-1571454870742-43c314f3a81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    label: 'Crochet Dreads',
    category: 'Dreads',
  },
  {
    id: 'g2',
    img: 'https://images.unsplash.com/photo-1743963923776-71abd3fef92c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    label: 'Bohemian Style',
    category: 'Installs',
  },
  {
    id: 'g3',
    img: 'https://images.unsplash.com/photo-1567634088512-ed1306515fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    label: 'Woolie Bundles',
    category: 'Woolies',
  },
  {
    id: 'g4',
    img: 'https://images.unsplash.com/photo-1741551148964-a7c5be0eb68b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    label: 'Colorful Extensions',
    category: 'Dreads',
  },
  {
    id: 'g5',
    img: 'https://images.unsplash.com/photo-1766405831946-2b7f1653ed8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    label: 'Natural Fiber Texture',
    category: 'Dreads',
  },
  {
    id: 'g6',
    img: 'https://images.unsplash.com/photo-1636871400631-dcf00cda6421?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    label: 'Festival Braids',
    category: 'Carabiner Braids',
  },
  {
    id: 'g7',
    img: 'https://images.unsplash.com/photo-1667482116370-4d8c21327dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    label: 'Handmade Dread Loom',
    category: 'Tools',
  },
  {
    id: 'g8',
    img: 'https://images.unsplash.com/photo-1762762905725-2319584a69ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    label: 'Handmade Earrings',
    category: 'Accessories',
  },
  {
    id: 'g9',
    img: 'https://images.unsplash.com/photo-1674348016481-9e93a9e2471b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    label: 'Glass Art & Accessories',
    category: 'Smoking',
  },
  {
    id: 'g10',
    img: 'https://images.unsplash.com/photo-1766139904648-0b2b161c0e92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    label: 'Colorful Craft Work',
    category: 'Process',
  },
  {
    id: 'g11',
    img: 'https://images.unsplash.com/photo-1758437053633-0cf081264919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    label: 'The Studio',
    category: 'Behind the Scenes',
  },
  {
    id: 'g12',
    img: 'https://images.unsplash.com/photo-1651507225850-4721bd4b537e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    label: 'Creativity & Healing',
    category: 'Behind the Scenes',
  },
];

const categories = ['All', 'Dreads', 'Woolies', 'Carabiner Braids', 'Tools', 'Accessories', 'Smoking', 'Installs', 'Behind the Scenes', 'Process'];

import { useState } from 'react';

export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Header */}
      <div className="py-16 px-4 text-center" style={{ background: '#F5EFE6', borderBottom: '1px solid #E8D5C4' }}>
        <p className="mb-2 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
          The Collection
        </p>
        <h1
          className="mb-4"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#2C1E18', fontWeight: 700 }}
        >
          Gallery
        </h1>
        <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
          A look at what I create — dreads, tools, accessories, and everything in between. This is my work, my art, my heart.
        </p>
      </div>

      {/* Filter */}
      <div className="sticky top-16 md:top-20 z-40 py-4 px-4 overflow-x-auto" style={{ background: 'rgba(250,247,242,0.97)', borderBottom: '1px solid #E8D5C4' }}>
        <div className="flex gap-2 max-w-7xl mx-auto min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200"
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: activeFilter === cat ? 700 : 500,
                background: activeFilter === cat ? '#C4785A' : '#F5EFE6',
                color: activeFilter === cat ? '#FAF7F2' : '#7C5C48',
                border: '1px solid',
                borderColor: activeFilter === cat ? '#C4785A' : '#E8D5C4',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-4 rounded-2xl overflow-hidden group relative"
              style={{ boxShadow: '0 2px 12px rgba(124,92,72,0.08)' }}
            >
              <ImageWithFallback
                src={item.img}
                alt={item.label}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4"
                style={{ background: 'linear-gradient(to top, rgba(44,30,24,0.75), transparent)' }}
              >
                <span className="text-xs px-2 py-1 rounded-full mb-1" style={{ background: 'rgba(196,120,90,0.9)', color: '#FAF7F2', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                  {item.category}
                </span>
                <span className="text-sm" style={{ color: '#FAF7F2', fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
              No items in this category yet. Check back soon!
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-3xl p-10 text-center" style={{ background: '#2C1E18' }}>
          <span className="text-3xl mb-4 block">🌿</span>
          <h3 className="mb-3" style={{ fontFamily: "'Playfair Display', serif", color: '#FAF7F2', fontWeight: 600, fontSize: '1.4rem' }}>
            Like what you see?
          </h3>
          <p className="mb-6 text-sm leading-relaxed max-w-sm mx-auto" style={{ color: '#C4A48A', fontFamily: "'Nunito', sans-serif" }}>
            Shop what's on hand or reach out for a custom set made just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-block px-8 py-3 rounded-full text-sm transition-all duration-300 hover:scale-105"
              style={{ background: '#C4785A', color: '#FAF7F2', fontFamily: "'Nunito', sans-serif", fontWeight: 700, textDecoration: 'none' }}
            >
              Shop Now →
            </Link>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 rounded-full text-sm transition-all duration-300 hover:scale-105"
              style={{ background: 'rgba(250,247,242,0.1)', color: '#FAF7F2', fontFamily: "'Nunito', sans-serif", fontWeight: 700, textDecoration: 'none', border: '2px solid rgba(250,247,242,0.3)' }}
            >
              Custom Order →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
