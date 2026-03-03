import { useState } from 'react';
import { MessageCircle, Facebook } from 'lucide-react';

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
    </svg>
  );
}

type FormData = {
  name: string;
  email: string;
  interest: string;
  message: string;
};

export function ContactPage() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Header */}
      <div className="py-16 px-4 text-center" style={{ background: '#F5EFE6', borderBottom: '1px solid #E8D5C4' }}>
        <p className="mb-2 tracking-widest uppercase text-xs" style={{ color: '#C4785A', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
          Let's Talk
        </p>
        <h1
          className="mb-4"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#2C1E18', fontWeight: 700 }}
        >
          Get in Touch
        </h1>
        <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
          Have questions? Want a custom order? Need help choosing a set? I'm always here to help.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* What you can reach me about */}
            <div className="rounded-2xl p-6" style={{ background: '#F5EFE6', border: '1px solid #E8D5C4' }}>
              <h3 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 600, fontSize: '1.1rem' }}>
                I Can Help With...
              </h3>
              <ul className="flex flex-col gap-2">
                {[
                  '💬 Custom order quotes',
                  '🎨 Color questions & options',
                  '📏 Length & style guidance',
                  '✂️ Booking installs',
                  '🌿 Dread loom inquiries',
                  '📦 Order questions',
                  '✨ Anything on your mind!',
                ].map((item) => (
                  <li key={item} className="text-sm" style={{ color: '#5A3E30', fontFamily: "'Nunito', sans-serif" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment */}
            <div className="rounded-2xl p-6" style={{ background: '#F5EFE6', border: '1px solid #E8D5C4' }}>
              <h3 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 600, fontSize: '1.1rem' }}>
                💳 Payments
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Stripe', 'Credit/Debit Cards'].map((m) => (
                  <span
                    key={m}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{ background: '#2C1E18', color: '#E8D5C4', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}
                  >
                    {m}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs" style={{ color: '#8FA68C', fontFamily: "'Nunito', sans-serif" }}>
                Ask about payment plan options!
              </p>
            </div>

            {/* Social Media */}
            <div className="rounded-2xl p-6" style={{ background: '#2C1E18' }}>
              <h3 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#FAF7F2', fontWeight: 600, fontSize: '1.1rem' }}>
                Find Me Online
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href="https://facebook.com/ChronicDreads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105"
                  style={{ background: '#3D2518', color: '#E8D5C4', textDecoration: 'none' }}
                >
                  <Facebook size={18} style={{ color: '#C4785A' }} />
                  <span className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
                    Chronic Dreads on Facebook
                  </span>
                </a>
                <a
                  href="https://tiktok.com/@ChronicDreads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105"
                  style={{ background: '#3D2518', color: '#E8D5C4', textDecoration: 'none' }}
                >
                  <TikTokIcon size={18} />
                  <span className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
                    Chronic Dreads on TikTok
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="rounded-3xl p-12 text-center flex flex-col items-center justify-center h-full"
                style={{ background: '#F5EFE6', border: '1px solid #E8D5C4' }}
              >
                <span className="text-5xl mb-6">💌</span>
                <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 700, fontSize: '1.8rem' }}>
                  Message Sent!
                </h2>
                <p className="mb-6 leading-relaxed" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif" }}>
                  Thank you for reaching out! I'll get back to you as soon as I can. I'm so excited to create something beautiful with you. 🌿
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', interest: '', message: '' }); }}
                  className="px-6 py-3 rounded-full text-sm"
                  style={{ background: '#C4785A', color: '#FAF7F2', fontFamily: "'Nunito', sans-serif", fontWeight: 700, cursor: 'pointer', border: 'none' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl p-8"
                style={{ background: '#F5EFE6', border: '1px solid #E8D5C4' }}
              >
                <div className="flex items-center gap-2 mb-8">
                  <MessageCircle size={20} style={{ color: '#C4785A' }} />
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#2C1E18', fontWeight: 600, fontSize: '1.3rem' }}>
                    Send Me a Message
                  </h2>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs mb-2 tracking-wider uppercase" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="First & last name"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{
                          background: '#FAF7F2',
                          border: '1px solid #E8D5C4',
                          color: '#2C1E18',
                          fontFamily: "'Nunito', sans-serif",
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-2 tracking-wider uppercase" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{
                          background: '#FAF7F2',
                          border: '1px solid #E8D5C4',
                          color: '#2C1E18',
                          fontFamily: "'Nunito', sans-serif",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs mb-2 tracking-wider uppercase" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                      What Can I Help With?
                    </label>
                    <select
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        background: '#FAF7F2',
                        border: '1px solid #E8D5C4',
                        color: form.interest ? '#2C1E18' : '#A0856A',
                        fontFamily: "'Nunito', sans-serif",
                        cursor: 'pointer',
                      }}
                    >
                      <option value="">Select a topic...</option>
                      <option value="custom-order">Custom Dread Set</option>
                      <option value="ready-to-ship">Ready-to-Ship Item</option>
                      <option value="install">Booking an Install</option>
                      <option value="loom">Dread Loom Inquiry</option>
                      <option value="color-question">Color Question</option>
                      <option value="smoking-accessories">Smoking Accessories</option>
                      <option value="general">General Question</option>
                      <option value="other">Something Else</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs mb-2 tracking-wider uppercase" style={{ color: '#7C5C48', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me what you're looking for — colors, length, style ideas, or anything on your mind..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-200"
                      style={{
                        background: '#FAF7F2',
                        border: '1px solid #E8D5C4',
                        color: '#2C1E18',
                        fontFamily: "'Nunito', sans-serif",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: '#C4785A',
                      color: '#FAF7F2',
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    Send Message 💌
                  </button>

                  <p className="text-xs text-center" style={{ color: '#A0856A', fontFamily: "'Nunito', sans-serif" }}>
                    I'll get back to you as soon as I can. No question is too small!
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
