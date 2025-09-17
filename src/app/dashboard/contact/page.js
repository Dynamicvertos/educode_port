// src/app/dashboard/contact/page.js
'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    setTimeout(() => {
      setLoading(false);
      setStatus('Thanks! We’ll get back to you within 1–2 business days.');
      e.currentTarget.reset();
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 mb-28">
      <header className="mt-10 md:mt-16 mb-8">
        <h1 className="text-4xl font-semibold text-white">Contact Us</h1>
        <p className="text-slate-300 mt-2">Enterprise inquiries, partnerships, and support.</p>
      </header>

      <form onSubmit={onSubmit} className="rounded-2xl bg-white/5 border border-cyan-400/20 backdrop-blur-xl p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Name" placeholder="Your name" required />
          <Field type="email" label="Email" placeholder="you@institute.edu" required />
        </div>
        <Field as="textarea" rows={5} className="mt-4" label="Message" placeholder="Tell us about your needs…" required />
        <div className="mt-6 flex items-center gap-3">
          <button className="rounded-xl px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold shadow-[0_0_40px_-10px_rgba(0,255,200,0.6)] hover:scale-[1.02] transition flex items-center gap-2">
            {loading && <span className="h-4 w-4 rounded-full border-2 border-black/60 border-t-transparent animate-spin" />}
            Send
          </button>
          {status && <span className="text-sm text-emerald-300">{status}</span>}
        </div>
      </form>

      <section className="mt-8 text-sm text-slate-300">
        <div>EduCode Enterprise Solutions</div>
        <div>Email: <a className="text-white underline" href="mailto:theeducodeofficial@gmail.com">theeducodeofficial@gmail.com</a></div>
        <div className="mt-1">Phone: <a className="text-white underline" href="tel:+916296489227">+91-6296489227</a></div>
      </section>
    </div>
  );
}

function Field({ as = 'input', label, className = '', ...props }) {
  const Comp = as;
  return (
    <div className={className}>
      <label className="text-sm text-slate-300">{label}</label>
      <Comp
        className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
        {...props}
      />
    </div>
  );
}