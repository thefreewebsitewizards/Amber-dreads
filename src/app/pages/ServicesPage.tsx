import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CheckCircle, Clock, Heart, MessageCircle } from 'lucide-react';

const services = [
  {
    title: 'Dread Extension Installs',
    icon: '✂️',
    price: '$100 total',
    deposit: '$20 non-refundable deposit at booking',
    note: 'The deposit holds your spot. The full $100 is due at appointment — deposit does not go toward the total.',
    items: [
      'You supply or purchase dreads from my shop',
      'Calm, welcoming studio environment',
      'Soft, lightweight, hypoallergenic materials used',
      'Gentle, patient approach',
      'Clear communication about your vision',
    ],
  },
  {
    title: 'Custom Dread Sets',
    icon: '🎨',
    price: '$300 total',
    deposit: '$150 non-refundable deposit to begin',
    note: 'Remaining $150 + shipping due once the set is finished and ready to ship.',
    items: [
      'Your colors, your length, your vibe',
      'Progress updates and photos throughout',
      'Ships once completed and approved',
      'Takes approx. 3 weeks or more depending on set size',
      'Clear communication every step of the way',
    ],
  },
];

const pricing = [
  { item: 'Single Bundle of 5 Dreads', price: '$25 + shipping' },
  { item: 'Premade Full Set (50 dreads)', price: '$250 + shipping' },
  { item: 'Dread Clips', price: '$50 + shipping' },
  { item: 'Clip-Ins', price: '$25 + shipping' },
  { item: 'Dread Falls', price: '$30 + shipping' },
  { item: 'Carabiner Braids (pair)', price: '$100 + shipping' },
  { item: 'Carabiner Braids Small (pair)', price: '$75 + shipping' },
  { item: 'Dread Extension Install', price: '$100 (+ $20 deposit to book)' },
  { item: 'Custom Dread Set', price: '$300 (50% deposit to begin)' },
  { item: 'Standard Dread Loom', price: '$120 + shipping' },
  { item: 'Customized Dread Loom', price: '$150 + shipping' },
];

const howItWorks = [
  { step: '1', title: 'Message Me', desc: 'Share your colors, length, and style ideas.' },
  { step: '2', title: 'Pay Your Deposit', desc: 'Non-refundable deposit secures your spot.' },
  { step: '3', title: 'I Order & Create', desc: 'I order materials and begin crafting your set.' },
  { step: '4', title: 'Progress Updates', desc: 'I send photos and updates along the way.' },
  { step: '5', title: 'Ships to You', desc: 'Your custom set ships once completed and approved.' },
];

export function ServicesPage() {
  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Header */}
      <div className="relative py-20 px-4 text-center overflow-hidden" style={{ background: '#F5EFE6', borderBottom: '1px solid #E8D5C4' }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1766139904648-0b2b161c0e92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"
          alt="Studio services"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10">
          <p className="mb-2 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
            Book With Me
          </p>
          <h1
            className="mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#2C1E18', fontWeight: 700 }}
          >
            Services
          </h1>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
            A soft, safe creative space where you can relax, feel seen, and ease into the process.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl p-8"
              style={{ background: '#F5EFE6', border: '1px solid #E8D5C4' }}
            >
              <span className="text-4xl mb-4 block">{service.icon}</span>
              <h2 className="mb-3" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 700, fontSize: '1.5rem' }}>
                {service.title}
              </h2>
              <div className="mb-4 p-4 rounded-2xl" style={{ background: '#2C1E18' }}>
                <p className="text-lg mb-1" style={{ color: '#FAF7F2', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                  {service.price}
                </p>
                <p className="text-xs" style={{ color: '#C4A48A', fontFamily: "'Nunito', sans-serif" }}>
                  {service.deposit}
                </p>
              </div>
              <p className="text-xs mb-5 p-3 rounded-xl italic" style={{ color: '#7C5C48', background: '#FAF7F2', fontFamily: "'Nunito', sans-serif" }}>
                ℹ️ {service.note}
              </p>
              <ul className="flex flex-col gap-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: '#5A3E30', fontFamily: "'Nunito', sans-serif" }}>
                    <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: '#8FA68C' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pricing Table */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="mb-2 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
              Transparent Pricing
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#2C1E18', fontWeight: 600 }}>
              Full Price List
            </h2>
          </div>

          <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid #E8D5C4' }}>
            {pricing.map((row, i) => (
              <div
                key={row.item}
                className="flex items-center justify-between px-6 py-4"
                style={{
                  background: i % 2 === 0 ? '#FAF7F2' : '#F5EFE6',
                  borderBottom: i < pricing.length - 1 ? '1px solid #E8D5C4' : 'none',
                }}
              >
                <span className="text-sm" style={{ color: '#2C1E18', fontFamily: "'Nunito', sans-serif", fontWeight: 500 }}>
                  {row.item}
                </span>
                <span className="text-sm" style={{ color: '#C4785A', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                  {row.price}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-center" style={{ color: '#8FA68C', fontFamily: "'Nunito', sans-serif" }}>
            * All prices + shipping unless otherwise noted. Custom options always available — just message me!
          </p>
        </div>

        {/* How Custom Orders Work */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <p className="mb-2 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
              Custom Sets
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#2C1E18', fontWeight: 600 }}>
              How It Works
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="flex-1 flex flex-col items-center text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-lg"
                  style={{ background: '#C4785A', color: '#FAF7F2', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                >
                  {step.step}
                </div>
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute" />
                )}
                <h4 className="mb-1 text-sm" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 600 }}>
                  {step.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What to Expect */}
        <div className="rounded-3xl p-10 mb-12 text-center" style={{ background: '#2C1E18' }}>
          <Heart size={24} className="mx-auto mb-4" style={{ color: '#C4785A' }} />
          <h3 className="mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#FAF7F2', fontWeight: 600, fontSize: '1.5rem' }}>
            What to Expect
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: '🌿', text: 'A calm, welcoming environment' },
              { icon: '💬', text: 'Clear communication about your vision' },
              { icon: '🧶', text: 'Soft, lightweight, hypoallergenic materials' },
              { icon: '🕊️', text: 'A gentle, patient approach' },
            ].map((item) => (
              <div key={item.text} className="p-4 rounded-2xl" style={{ background: 'rgba(250,247,242,0.07)' }}>
                <span className="text-2xl block mb-2">{item.icon}</span>
                <p className="text-xs leading-relaxed" style={{ color: '#C4A48A', fontFamily: "'Nunito', sans-serif" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: '#C4785A',
              color: '#FAF7F2',
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <MessageCircle size={16} />
            Book Your Appointment →
          </Link>
        </div>

        {/* Deposit Policy */}
        <div
          className="p-6 rounded-2xl flex items-start gap-4"
          style={{ background: '#FFF3E8', border: '1px solid #E8D5C4' }}
        >
          <Clock size={20} className="shrink-0 mt-0.5" style={{ color: '#C4785A' }} />
          <div>
            <p className="text-sm mb-1" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: '#2C1E18' }}>
              Deposit Policy
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
              All custom orders and installs require a non-refundable deposit. If you need to reschedule, reach out as soon as possible. No-shows forfeit their deposit and will require a new deposit to rebook.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
