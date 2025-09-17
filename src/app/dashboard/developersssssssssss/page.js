// src/app/dashboard/developers/page.js
export default function DevelopersPage() {
  const teams = [
    {
      name: 'Frontend',
      stack: 'Next.js, React, Tailwind, Zustand, SWR',
      focus: 'UX, performance, accessibility, component systems',
      img: 'https://i.pravatar.cc/300?img=5',
    },
    {
      name: 'Backend',
      stack: 'Node.js, Nest.js/Express, PostgreSQL, Redis, Kafka',
      focus: 'APIs, multi-tenant data, queues, scaling',
      img: 'https://i.pravatar.cc/300?img=12',
    },
    {
      name: 'Security',
      stack: 'AuthN/Z, SSO (SAML/OAuth), WebRTC, CSP, SigV4',
      focus: 'Proctoring pipelines, audit, threat modeling',
      img: 'https://i.pravatar.cc/300?img=32',
    },
    {
      name: 'Testing / QA',
      stack: 'Playwright, Cypress, Jest, k6, OWASP ZAP',
      focus: 'E2E tests, load tests, integrity checks',
      img: 'https://i.pravatar.cc/300?img=21',
    },
    {
      name: 'HR',
      stack: 'ATS, Onboarding, Culture',
      focus: 'Hiring, talent growth, compliance',
      img: 'https://i.pravatar.cc/300?img=10',
    },
    {
      name: 'R&D',
      stack: 'AI/ML, LLMs, CV, anomaly detection',
      focus: 'Proctoring AI, code understanding, insights',
      img: 'https://i.pravatar.cc/300?img=49',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 mb-28">
      <header className="mt-10 md:mt-16 mb-8">
        <h1 className="text-4xl font-semibold text-white">Developers & Teams</h1>
        <p className="text-slate-300 mt-2">Meet the crews building TheEduCode experience.</p>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((t, i) => (
          <div key={i} className="group rounded-2xl bg-white/5 border border-cyan-400/20 backdrop-blur-xl p-6 hover:bg-white/10 transition">
            <div className="flex items-center gap-4">
              <img src={t.img} alt={`${t.name} avatar`} className="h-12 w-12 rounded-full border border-cyan-400/30 object-cover" />
              <div>
                <h3 className="text-lg font-semibold text-white">{t.name}</h3>
                <div className="text-xs text-cyan-200/90">Team</div>
              </div>
            </div>
            <p className="text-slate-300 mt-3"><span className="text-slate-200/90">Stack:</span> {t.stack}</p>
            <p className="text-slate-300"><span className="text-slate-200/90">Focus:</span> {t.focus}</p>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 group-hover:w-24 transition-all"></div>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-cyan-400/20 backdrop-blur-xl p-8">
        <h3 className="text-xl font-semibold text-white">We’re hiring</h3>
        <p className="text-slate-200 mt-2">Frontend, Backend, Security, and QA roles open. Join us in building secure education.</p>
        <a className="inline-block mt-4 rounded-xl px-4 py-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition" href="/dashboard/contact">Contact HR</a>
      </section>
    </div>
  );
}