import { useState } from 'react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { MessageCircle } from 'lucide-react';

const DREAD_IMG = 'https://images.unsplash.com/photo-1571454870742-43c314f3a81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600';
const WOOL_IMG = 'https://images.unsplash.com/photo-1567634088512-ed1306515fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600';
const BRAID_IMG = 'https://images.unsplash.com/photo-1636871400631-dcf00cda6421?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600';
const LOOM_IMG = 'https://images.unsplash.com/photo-1667482116370-4d8c21327dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600';
const EARRING_IMG = 'https://images.unsplash.com/photo-1762762905725-2319584a69ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600';
const SMOKE_IMG = 'https://images.unsplash.com/photo-1674348016481-9e93a9e2471b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600';
const HAIR_IMG = 'https://images.unsplash.com/photo-1741551148964-a7c5be0eb68b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600';
const FIBER_IMG = 'https://images.unsplash.com/photo-1766405831946-2b7f1653ed8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600';

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  img: string;
  tag?: string;
  length?: string;
};

const products: Product[] = [
  // Woolies
  {
    id: 'w1', name: 'Black & Red Woolies', category: 'Woolies', price: '$25 + shipping',
    description: '5-pack, ~24 in long. Soft, lightweight, hypoallergenic. Ready to ship.',
    img: WOOL_IMG, tag: 'Ready to Ship', length: '~24 in',
  },
  {
    id: 'w2', name: 'Undyed Natural Woolies', category: 'Woolies', price: '$25 + shipping',
    description: '5-pack, ~24 in long. Pure, undyed natural wool. Soft and grounding.',
    img: FIBER_IMG, tag: 'Ready to Ship', length: '~24 in',
  },

  // Crochet Dreads
  {
    id: 'c1', name: 'Blonde & Brown Crochet Ombre', category: 'Crochet Dreads', price: '$25 + shipping',
    description: 'DE 5-pack, ~24 in. Warm blonde to brown ombre — soft and natural.',
    img: DREAD_IMG, tag: 'DE', length: '~24 in',
  },
  {
    id: 'c2', name: 'Dark Brown & Light Brown Ombre', category: 'Crochet Dreads', price: '$25 + shipping',
    description: 'DE 5-pack, ~24 in. Rich dark brown fading into warm light brown.',
    img: DREAD_IMG, tag: 'DE', length: '~24 in',
  },
  {
    id: 'c3', name: 'Gray & Black Ombre', category: 'Crochet Dreads', price: '$25 + shipping',
    description: 'DE 5-pack, ~24 in. Stunning gray and black ombre crochet.',
    img: DREAD_IMG, tag: 'DE', length: '~24 in',
  },
  {
    id: 'c4', name: 'Blonde Crochet', category: 'Crochet Dreads', price: '$25 + shipping',
    description: 'DE 5-pack, ~24 in. Classic, bright blonde crochet dreads.',
    img: DREAD_IMG, tag: 'DE', length: '~24 in',
  },
  {
    id: 'c5', name: 'Brown Ombre Crochet', category: 'Crochet Dreads', price: '$25 + shipping',
    description: 'DE 5-pack, ~24 in. Beautiful warm brown ombre.',
    img: DREAD_IMG, tag: 'DE', length: '~24 in',
  },
  {
    id: 'c6', name: 'Rainbow Crochet', category: 'Crochet Dreads', price: '$25 + shipping',
    description: 'DE 5-pack, ~24 in. All the colors of the rainbow in one gorgeous set.',
    img: HAIR_IMG, tag: 'DE', length: '~24 in',
  },
  {
    id: 'c7', name: 'Green Ombre Crochet', category: 'Crochet Dreads', price: '$25 + shipping',
    description: 'DE 5-pack, ~24 in. Earthy green to light ombre — nature vibes.',
    img: DREAD_IMG, tag: 'DE', length: '~24 in',
  },
  {
    id: 'c8', name: 'Blue Crochet', category: 'Crochet Dreads', price: '$25 + shipping',
    description: 'SE 5-pack, ~24 in. Cool blue crochet dreads.',
    img: DREAD_IMG, tag: 'SE', length: '~24 in',
  },
  {
    id: 'c9', name: 'Pink Crochet', category: 'Crochet Dreads', price: '$25 + shipping',
    description: 'DE 5-pack, ~24 in. Soft and dreamy pink crochet dreads.',
    img: HAIR_IMG, tag: 'DE', length: '~24 in',
  },

  // Twist & Seal
  {
    id: 't1', name: 'Twist & Seal Dreads', category: 'Twist & Seal Dreads', price: '$25 + shipping',
    description: 'Lightweight with a gentle twist. Easy to wear, comfortable, and perfect for adding dimension.',
    img: FIBER_IMG, tag: 'Custom Colors Available', length: '~24 in',
  },

  // Curls/Waves
  {
    id: 'cu1', name: 'Curls & Waves', category: 'Curls/Waves', price: '$25 + shipping',
    description: 'Full of flow and personality. Adds softness, volume, and movement — a dreamy, natural look.',
    img: HAIR_IMG, tag: 'Custom Colors Available',
  },

  // Dread Falls
  {
    id: 'df1', name: 'Dread Falls', category: 'Dread Falls', price: '$30 + shipping',
    description: 'Full, flowing pieces for instant volume, color, and movement. Perfect for festivals, cosplay, or expressive styling.',
    img: HAIR_IMG, tag: 'Ready to Ship',
  },

  // Dread Clips
  {
    id: 'dc1', name: 'Dread Clips', category: 'Dread Clips', price: '$50 + shipping',
    description: 'Clip-in dread accents. Add instant flair without commitment. Perfect for trying new colors or enhancing your everyday look.',
    img: BRAID_IMG, tag: 'Ready to Ship',
  },

  // Clip-Ins
  {
    id: 'cl1a', name: 'Clip-Ins (A)', category: 'Clip-Ins', price: '$25 + shipping',
    description: 'Lightweight, easy-to-use clip-in extensions. Take the dreads off the clip and braid them directly into your hair.',
    img: BRAID_IMG, tag: 'Option A',
  },
  {
    id: 'cl1b', name: 'Clip-Ins (B)', category: 'Clip-Ins', price: '$25 + shipping',
    description: 'Versatile clip-in dreads. Quick changes and expressive styling. Clip on or braid in — your choice.',
    img: BRAID_IMG, tag: 'Option B',
  },
  {
    id: 'cl1c', name: 'Clip-Ins (C)', category: 'Clip-Ins', price: '$25 + shipping',
    description: 'Clip-in extensions that blend seamlessly into natural hair or existing dreads. Great for layering.',
    img: BRAID_IMG, tag: 'Option C',
  },

  // Carabiner Braids
  {
    id: 'cb1', name: 'Light + Dark Brown Carabiner Braids', category: 'Carabiner Braids', price: '$100/pair + shipping',
    description: 'Brazilian wool, orange wrap & skull cherries. ~24 in. Hook directly into your hair — no commitment needed.',
    img: BRAID_IMG, tag: 'Pair', length: '~24 in',
  },
  {
    id: 'cb2', name: 'Blue & Black Carabiner Braids (Blue Wrap)', category: 'Carabiner Braids', price: '$100/pair + shipping',
    description: 'Brazilian wool with blue wrap. ~24 in. Cool, edgy, and expressive.',
    img: BRAID_IMG, tag: 'Pair', length: '~24 in',
  },
  {
    id: 'cb3', name: 'Black Carabiner Braids (Green Wrap)', category: 'Carabiner Braids', price: '$100/pair + shipping',
    description: 'Black Brazilian wool with green wrap. ~24 in. Dark and earthy vibes.',
    img: BRAID_IMG, tag: 'Pair', length: '~24 in',
  },
  {
    id: 'cb4', name: 'Blue & Black Carabiner Braids', category: 'Carabiner Braids', price: '$100/pair + shipping',
    description: 'Brazilian wool, no wrap. ~24 in. Clean, bold, and easy to style.',
    img: BRAID_IMG, tag: 'Pair', length: '~24 in',
  },
  {
    id: 'cb5', name: 'White & Black Small Carabiner Braids', category: 'Carabiner Braids', price: '$75/pair + shipping',
    description: 'White & black Brazilian wool, white wrap. Small style — subtle and elegant.',
    img: BRAID_IMG, tag: 'Small Pair',
  },
  {
    id: 'cb6', name: 'Multi-Color Carabiner Braids', category: 'Carabiner Braids', price: '$100/pair + shipping',
    description: 'White, black, orange & black Brazilian wool with brown and red wrap. ~24 in. Bold and layered.',
    img: BRAID_IMG, tag: 'Pair', length: '~24 in',
  },

  // Dread Loom
  {
    id: 'l1', name: 'Standard Handmade Dread Loom', category: 'Dread Loom', price: '$120 + shipping',
    description: 'Solid wood, warm stain finish. Adjustable clamp, stable base. Perfect for sealing, twisting, crocheting, and prepping sets.',
    img: LOOM_IMG, tag: 'Handmade',
  },
  {
    id: 'l2', name: 'Customized Dread Loom', category: 'Dread Loom', price: '$150 + shipping',
    description: 'Custom designs available — woodburning, personal touches, added features. Message me with your vision.',
    img: LOOM_IMG, tag: 'Custom',
  },

  // Earrings
  {
    id: 'e1', name: 'Handmade Earrings', category: 'Earrings', price: '$10 + shipping',
    description: 'Cozy, whimsical handmade earrings. All hypoallergenic. Crafted to complement your style and add a touch of magic.',
    img: EARRING_IMG, tag: 'Hypoallergenic',
  },

  // Smoking Accessories
  {
    id: 's1', name: 'Roach Clips', category: 'Smoking Accessories', price: '$5 + shipping',
    description: 'Themed roach clips: child, clown, puzzle, hockey mask, black cat, ghost dog, skull, dreadhead, chronic, leaf, pothead, 420, penguin, mushroom, bat, pickle, panda, cow, and more!',
    img: SMOKE_IMG, tag: 'Many Designs',
  },
  {
    id: 's2', name: 'Rolling Trays', category: 'Smoking Accessories', price: '$5 + shipping',
    description: 'Functional and fun rolling trays with cozy, whimsical vibes.',
    img: SMOKE_IMG, tag: 'Ready to Ship',
  },
  {
    id: 's3', name: 'Stash Jars & Stash Pouches', category: 'Smoking Accessories', price: '$6 + shipping',
    description: 'Keep your stash safe and stylish. Jars and fabric pouches available.',
    img: SMOKE_IMG, tag: 'Ready to Ship',
  },
];

const categories = [
  'All',
  'Woolies',
  'Crochet Dreads',
  'Twist & Seal Dreads',
  'Curls/Waves',
  'Dread Falls',
  'Dread Clips',
  'Clip-Ins',
  'Carabiner Braids',
  'Dread Loom',
  'Earrings',
  'Smoking Accessories',
];

export function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Header */}
      <div className="py-16 px-4 text-center" style={{ background: '#F5EFE6', borderBottom: '1px solid #E8D5C4' }}>
        <p className="mb-2 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
          Ready to Ship
        </p>
        <h1
          className="mb-4"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#2C1E18', fontWeight: 700 }}
        >
          The Shop
        </h1>
        <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
          Everything shown here is currently on hand and ready to ship. Want a different color? I can order it — just message me! 💌
        </p>
      </div>

      {/* Category Filter */}
      <div className="sticky top-16 md:top-20 z-40 py-4 px-4 overflow-x-auto" style={{ background: 'rgba(250,247,242,0.97)', borderBottom: '1px solid #E8D5C4' }}>
        <div className="flex gap-2 max-w-7xl mx-auto min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200"
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: activeCategory === cat ? 700 : 500,
                background: activeCategory === cat ? '#C4785A' : '#F5EFE6',
                color: activeCategory === cat ? '#FAF7F2' : '#7C5C48',
                border: '1px solid',
                borderColor: activeCategory === cat ? '#C4785A' : '#E8D5C4',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="mb-8 text-sm" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
          Showing {filtered.length} item{filtered.length !== 1 ? 's' : ''}{activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{ background: '#F5EFE6', border: '1px solid #E8D5C4', boxShadow: '0 2px 12px rgba(124,92,72,0.08)' }}
            >
              <div className="relative h-52 overflow-hidden">
                <ImageWithFallback
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.tag && (
                  <span
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs"
                    style={{ background: 'rgba(196,120,90,0.9)', color: '#FAF7F2', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}
                  >
                    {product.tag}
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs mb-1 tracking-wider uppercase" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
                  {product.category}
                </p>
                <h3 className="mb-2 leading-snug" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 600, fontSize: '1rem' }}>
                  {product.name}
                </h3>
                {product.length && (
                  <p className="text-xs mb-2" style={{ color: '#8FA68C', fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
                    📏 {product.length}
                  </p>
                )}
                <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 700, fontSize: '1rem' }}>
                    {product.price}
                  </span>
                  <Link
                    to="/contact"
                    className="px-4 py-2 rounded-full text-xs transition-all duration-200 hover:scale-105"
                    style={{
                      background: '#C4785A',
                      color: '#FAF7F2',
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Order Note */}
        <div
          className="mt-16 p-8 rounded-3xl text-center"
          style={{ background: '#2C1E18' }}
        >
          <MessageCircle size={28} className="mx-auto mb-4" style={{ color: '#C4785A' }} />
          <h3 className="mb-3" style={{ fontFamily: "'Playfair Display', serif", color: '#FAF7F2', fontWeight: 600, fontSize: '1.4rem' }}>
            Don't see what you're looking for?
          </h3>
          <p className="mb-6 text-sm leading-relaxed max-w-md mx-auto" style={{ color: '#C4A48A', fontFamily: "'Nunito', sans-serif" }}>
            I can order any color or custom set for you. Full sets of 50 dreads available for $250. Just send me a message!
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 rounded-full text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: '#C4785A',
              color: '#FAF7F2',
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Message Me →
          </Link>
        </div>
      </div>
    </div>
  );
}
