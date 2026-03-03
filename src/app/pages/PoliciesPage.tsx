import { AlertCircle, Package, RefreshCw, Truck, ShieldCheck, Ban } from 'lucide-react';

const sections = [
  {
    icon: <AlertCircle size={22} />,
    title: 'Custom Orders & Deposits',
    content: [
      'All custom dread sets and custom loom designs require a non-refundable deposit.',
      'This deposit covers materials and secures your spot in my schedule.',
      'Once the deposit is paid, I begin ordering supplies and crafting your set.',
    ],
  },
  {
    icon: <Ban size={22} />,
    title: 'Cancellations',
    content: [
      'Because every order is handmade and materials are purchased specifically for you, cancellations are not accepted once work has begun.',
      'Deposits are non-refundable.',
      'If you need to reschedule an install appointment, reach out as soon as possible.',
    ],
  },
  {
    icon: <AlertCircle size={22} />,
    title: 'No-Show Policy',
    content: [
      'If you miss your appointment without notice, your deposit is forfeited.',
      'A new deposit will be required to book again.',
      'Please always reach out ahead of time if anything changes.',
    ],
  },
  {
    icon: <Truck size={22} />,
    title: 'Shipping',
    content: [
      'Ready-to-ship items go out as quickly as possible.',
      'Custom orders ship once completed and approved.',
      'Shipping costs vary based on weight and location.',
      'Tracking will always be provided.',
      'I ship within the United States.',
    ],
  },
  {
    icon: <RefreshCw size={22} />,
    title: 'Returns & Refunds',
    content: [
      'Because all items are handmade and created with ordered materials, all sales are final.',
      'This includes: dread sets, custom orders, tools, the handmade dread loom, and accessories.',
      'If there is ever an issue with your order, please message me — I always want you to feel taken care of.',
      'If an item arrives damaged, please contact me within 48 hours.',
    ],
  },
  {
    icon: <Package size={22} />,
    title: 'Store Policies',
    content: [
      'No maintenance services offered at this time.',
      'Deposits required for installs and custom sets.',
      'Shipping is not included in custom set pricing.',
      'Custom sets require clear communication and time to create.',
    ],
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Quality Promise',
    content: [
      'Everything I make is crafted with high-quality materials, intention, care, and comfort in mind.',
      'My goal is to create affordable, beautiful dreads that help you feel confident and expressive.',
      "If you're ever unhappy with something, message me — I will always do my best to make it right.",
    ],
  },
];

export function PoliciesPage() {
  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Header */}
      <div className="py-16 px-4 text-center" style={{ background: '#F5EFE6', borderBottom: '1px solid #E8D5C4' }}>
        <p className="mb-2 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
          Important Info
        </p>
        <h1
          className="mb-4"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#2C1E18', fontWeight: 700 }}
        >
          Policies
        </h1>
        <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
          Please take a moment to read through my policies. These are in place to protect both of us and keep everything running smoothly.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Payment Methods Note */}
        <div
          className="p-6 rounded-2xl mb-12 text-center"
          style={{ background: '#2C1E18' }}
        >
          <h3 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#FAF7F2', fontWeight: 600, fontSize: '1.2rem' }}>
            💳 Payment Methods Accepted
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mb-3">
            {['Stripe', 'Credit/Debit Cards'].map((m) => (
              <span
                key={m}
                className="px-4 py-2 rounded-full text-sm"
                style={{ background: '#3D2518', color: '#E8D5C4', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}
              >
                {m}
              </span>
            ))}
          </div>
          <p className="text-xs" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
            Available for installs, custom sets, and product purchases. Affirm-style payment plans may be available — ask me!
          </p>
        </div>

        {/* Policy Sections */}
        <div className="flex flex-col gap-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl p-7"
              style={{ background: '#F5EFE6', border: '1px solid #E8D5C4' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#FAF7F2', color: '#C4785A' }}>
                  {section.icon}
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 600, fontSize: '1.2rem' }}>
                  {section.title}
                </h2>
              </div>
              <ul className="flex flex-col gap-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: '#5A3E30', fontFamily: "'Nunito', sans-serif" }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#C4785A' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Note at bottom */}
        <div
          className="mt-12 p-6 rounded-2xl text-center"
          style={{ background: '#FFF3E8', border: '1px solid #E8D5C4' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: '#5A3E30', fontFamily: "'Nunito', sans-serif" }}>
            💛 My policies exist to keep everything fair, honest, and clear. If you ever have questions or concerns about anything, please don't hesitate to reach out. I'm always here.
          </p>
        </div>
      </div>
    </div>
  );
}
