// src/app/dashboard/about/page.js
export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 mb-28">
      <header className="mt-10 md:mt-16 mb-8">
        <h1 className="text-4xl font-semibold text-white">About TheEduCode</h1>
        <p className="text-slate-300 mt-2">
          We provide a secure platform for colleges and institutes where students learn, practice, and take exams — all in one place.
          Our mission is integrity‑first education, at scale. Our vision is to integrate every type of learning — theory, labs, projects, simulations, certifications, and assessments — into one seamless, secure experience.
        </p>
      </header>

      {/* Core principles */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AboutCard
          title="Mission"
          body="Empower education with integrity. We make online learning and assessment simple, accessible, and cheat‑resistant — designed for real classrooms and real outcomes."
        />
        <AboutCard
          title="Vision"
          body="One platform for every way to learn: courses, code labs, data notebooks, design studios, IoT/robotics, simulations, capstones, and micro‑credentials — unified by a single learner graph."
        />
        <AboutCard
          title="Security‑first"
          body="Zero‑trust design, encryption everywhere, rigorous audits, privacy by default, and proctoring that balances integrity with student dignity."
        />
        <AboutCard
          title="For Institutes"
          body="Multi‑tenant architecture with SSO, roles, reporting, observability, and a modular ecosystem that fits campus processes — not the other way around."
        />
      </section>


      {/* Story */}
      <section className="mt-12 rounded-2xl bg-white/5 border border-cyan-400/20 backdrop-blur-xl p-8">
        <h3 className="text-xl font-semibold text-white">Story</h3>
        <p className="text-slate-300">
          TheEduCode began as a research project to restore trust in online assessments and make technical learning truly hands‑on.
          It is evolving with colleges and training partners to blend secure assessment with modern, project‑based education —
          unifying content, practice, proctoring, and analytics into a coherent, student‑centered experience.
        </p>
      </section>

      {/* Innovation roadmap */}
      <section className="mt-12">
        <h3 className="text-2xl font-semibold text-white mb-4">Innovation Roadmap</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RoadmapCard
            title="AI Copilot for Learning"
            points={[
              'Context‑aware hints, code explanations, and debugging guidance',
              'Faculty tools for rubric generation and feedback drafting',
            ]}
          />
          <RoadmapCard
            title="Integrity 2.0"
            points={[
              'Multi‑signal proctoring with on‑device checks',
              'Behavioral anomaly detection with transparent appeals',
            ]}
          />
          <RoadmapCard
            title="Interoperability"
            points={[
              'LTI Advantage, SCORM, and webhook events',
              'Extensible runtimes, problem types, and grading APIs',
            ]}
          />
          <RoadmapCard
            title="Accessibility & Reach"
            points={[
              'WCAG‑aligned experiences and keyboard‑first UX',
              'Low‑bandwidth modes, offline cache, and resumable uploads',
            ]}
          />
          <RoadmapCard
            title="Observability"
            points={[
              'Unified learner graph across courses and assessments',
              'Program‑level insights and outcome alignment',
            ]}
          />
          <RoadmapCard
            title="Program Design"
            points={[
              'Reusable learning blocks and templates',
              'Multi‑campus governance with audit‑first changes',
            ]}
          />
        </div>
      </section>

      {/* Invite */}
      <section className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-cyan-400/20 backdrop-blur-xl p-8">
        <h3 className="text-xl font-semibold text-white">Build the future of learning with us</h3>
        <p className="text-slate-300 mt-2">
          Whether you’re modernizing a program or launching a new one, TheEduCode brings secure assessment and rich learning
          together — for coding, data, design, robotics, and beyond.
        </p>
        <a
          href="/dashboard/contact"
          className="inline-block mt-4 rounded-xl px-4 py-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
        >
          Partner with us
        </a>
      </section>
    </div>
  );
}

function AboutCard({ title, body }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-cyan-400/20 backdrop-blur-xl p-6 hover:bg-white/10 transition">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-300">{body}</p>
    </div>
  );
}

function RoadmapCard({ title, points = [] }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-cyan-400/20 backdrop-blur-xl p-6 hover:bg-white/10 transition">
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <ul className="list-disc pl-5 text-slate-300 mt-2 space-y-1 text-sm">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}