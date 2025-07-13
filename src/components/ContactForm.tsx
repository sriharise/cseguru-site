'use client';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import ContactBanner from '@/components/ContactBanner';
import SocialIcons from '@/components/SocialIcons';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [token, setToken] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!token) return alert('Please complete the CAPTCHA');
    setLoading(true);

    try {
      const res = await fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        body: JSON.stringify({ ...form, token }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
        else alert(data.error || 'Something went wrong');
      } catch (error) {
        alert('Something went wrong while sending the message.');
      } finally {
        setLoading(false);
      }
  };

  return submitted ? (
    <section className="text-gray-800">
      {/* Banner */}
      <ContactBanner />
      <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="p-4 text-green-600">Thanks! Your message has been sent.</div>
        <SocialIcons />
      </div>
    </section>
  ) : (
    <section className="text-gray-800">
      {/* Banner */}
      <ContactBanner />
      <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-6">
        {loading && (
          <div className="flex items-center justify-center gap-2 text-blue-600 font-medium">
            <svg className="w-5 h-5 animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Please wait... sending your message
          </div>
        )}
        <form onSubmit={handleSubmit} className="max-w-xl p-4 mx-auto space-y-4 bg-white rounded shadow">
          <input name="name" type="text" placeholder="Name" onChange={handleChange} className="w-full p-2 border" required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border" required />
          <textarea name="message" placeholder="Message" onChange={handleChange} className="w-full p-2 border min-h-[100px]" required />
          <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''} onChange={setToken} />
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-600'}`}
            >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
        <SocialIcons />
      </div>
    </section>
  );
}
