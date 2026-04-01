import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { MessageCircle } from 'lucide-react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, STORE_ID } from '../../firebaseConfig';

type Product = {
  id: string;
  name?: string;
  category?: string;
  price?: string | number;
  description?: string;
  img?: string;
  tag?: string;
  length?: string;
  updatedAt?: string;
};

export function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!STORE_ID) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const productsQuery = query(collection(db, 'stores', STORE_ID, 'products'), orderBy('updatedAt', 'desc'));
    const unsub = onSnapshot(
      productsQuery,
      (snap) => {
        const nextProducts = snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Product, 'id'>) }));
        setProducts(nextProducts);
        setLoading(false);
      },
      () => {
        setProducts([]);
        setLoading(false);
      },
    );

    return () => unsub();
  }, []);

  const categories = useMemo(() => {
    const dynamicCategories = Array.from(
      new Set(products.map((product) => (product.category || '').trim()).filter((category) => category.length > 0)),
    );
    return ['All', ...dynamicCategories];
  }, [products]);

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => (p.category || '') === activeCategory);

  function getDisplayPrice(price: Product['price']) {
    if (typeof price === 'number') {
      return `$${price}`;
    }
    if (typeof price === 'string' && price.trim().length > 0) {
      return price;
    }
    return 'Contact for price';
  }

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh', paddingTop: '80px' }}>
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

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <p className="mb-8 text-sm" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
            Loading products...
          </p>
        ) : (
          <p className="mb-8 text-sm" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
            Showing {filtered.length} item{filtered.length !== 1 ? 's' : ''}{activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          </p>
        )}

        {!loading && filtered.length === 0 && (
          <div className="rounded-3xl p-10 text-center" style={{ background: '#F5EFE6', border: '1px solid #E8D5C4' }}>
            <p style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
              No products available right now.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{ background: '#F5EFE6', border: '1px solid #E8D5C4', boxShadow: '0 2px 12px rgba(124,92,72,0.08)' }}
            >
              <div className="relative h-52 overflow-hidden">
                <ImageWithFallback
                  src={product.img || '/Amber-about-image.jpg'}
                  alt={product.name || 'Product image'}
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
                  {product.category || 'Uncategorized'}
                </p>
                <h3 className="mb-2 leading-snug" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 600, fontSize: '1rem' }}>
                  {product.name || 'Untitled Product'}
                </h3>
                {product.length && (
                  <p className="text-xs mb-2" style={{ color: '#8FA68C', fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
                    📏 {product.length}
                  </p>
                )}
                <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
                  {product.description || 'No description available.'}
                </p>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 700, fontSize: '1rem' }}>
                    {getDisplayPrice(product.price)}
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
