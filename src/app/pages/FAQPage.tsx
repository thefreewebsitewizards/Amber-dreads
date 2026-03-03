import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

const faqs = [
  {
    q: 'Do you take custom orders?',
    a: 'Yes — custom sets are a huge part of what I do! I can create a set in your colors, your length, and your vibe. Just message me to get started.',
  },
  {
    q: "What if you don't have the color I want?",
    a: "I can order any color you need. Just send me a message with what you're looking for and I'll make it happen.",
  },
  {
    q: 'How long do custom orders take?',
    a: "It depends on the size of the set and my current workload. Custom sets typically take around 3 weeks or more depending on the set. I'll always give you a timeline before you pay your deposit.",
  },
  {
    q: 'Are your dreads comfortable?',
    a: 'Yes — comfort is one of my top priorities. I use high-quality materials and hand-craft each piece to be soft and wearable. Your comfort matters to me.',
  },
  {
    q: 'Do you offer installs?',
    a: 'Yes! Message me to schedule your install appointment. A $20 non-refundable deposit is required at booking to hold your spot.',
  },
  {
    q: "What's the difference between ready-to-ship and custom?",
    a: 'Ready-to-ship items are already made, exactly as shown, and ship quickly. Custom sets are made just for you — your colors, your length, your vibe. Custom takes about 3 weeks or more depending on the set.',
  },
  {
    q: 'Can I return or exchange my order?',
    a: 'All sales are final because everything is handmade and materials are purchased specifically for each order. If something arrives damaged or there\'s an issue, please message me within 48 hours — I always want you to feel taken care of.',
  },
  {
    q: 'How much is the dread loom?',
    a: 'The standard handmade dread loom is $120 + shipping. Custom loom designs (woodburning, personal touches) are $150 + shipping.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'I accept Stripe and credit/debit cards. Payment plan options may be available — just ask!',
  },
  {
    q: 'Do you ship everywhere?',
    a: 'I ship within the United States. Shipping costs vary based on product weight and location. Tracking is always provided.',
  },
  {
    q: 'What are the clip-ins like?',
    a: 'Clip-ins have a standard clip that attaches easily to your hair. You can also remove the dreads from the clip and braid them directly into your hair — super versatile!',
  },
  {
    q: 'What are carabiner braids?',
    a: 'Carabiner braids have a carabiner clip that hooks directly into your hair. Perfect for layering, stacking, or switching up your vibe without a full install. Pairs available in standard (~$100) and small (~$75) sizes.',
  },
  {
    q: 'Can I message you with questions?',
    a: "Always. I'm here to help with colors, sizing, custom ideas, or anything else. There are no silly questions — reach out anytime!",
  },
  {
    q: 'What materials do you use?',
    a: 'I use high-quality synthetic and wool materials depending on the product. All materials are chosen for comfort, softness, and durability. Many products are hypoallergenic.',
  },
];

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Header */}
      <div className="py-16 px-4 text-center" style={{ background: '#F5EFE6', borderBottom: '1px solid #E8D5C4' }}>
        <p className="mb-2 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
          Got Questions?
        </p>
        <h1
          className="mb-4"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#2C1E18', fontWeight: 700 }}
        >
          FAQ
        </h1>
        <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
          Everything you need to know. Don't see your question here? Message me anytime — I love to chat.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{ background: '#F5EFE6', border: '1px solid #E8D5C4' }}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                onClick={() => toggle(i)}
                style={{ cursor: 'pointer', background: 'none', border: 'none' }}
              >
                <span
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#2C1E18',
                    fontWeight: openIndex === i ? 700 : 600,
                    fontSize: '1rem',
                  }}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className="shrink-0 mt-0.5 transition-transform duration-300"
                  style={{
                    color: '#C4785A',
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <div className="pt-2" style={{ borderTop: '1px solid #E8D5C4' }}>
                    <p
                      className="pt-4 text-sm leading-relaxed"
                      style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-14 p-8 rounded-3xl text-center"
          style={{ background: '#2C1E18' }}
        >
          <span className="text-3xl mb-4 block">💌</span>
          <h3 className="mb-3" style={{ fontFamily: "'Playfair Display', serif", color: '#FAF7F2', fontWeight: 600, fontSize: '1.4rem' }}>
            Still have questions?
          </h3>
          <p className="mb-6 text-sm leading-relaxed" style={{ color: '#C4A48A', fontFamily: "'Nunito', sans-serif" }}>
            I'm always here to help. Message me about colors, sizing, custom ideas, or anything else on your mind.
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
