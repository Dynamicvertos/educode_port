// src/app/dashboard/features/page.js
export default function FeaturesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 mb-28">
      <header className="mt-10 md:mt-16 mb-10">
        <h1 className="text-4xl font-semibold text-white">Enterprise Features</h1>
        <p className="text-slate-300 mt-2">
          EduCode is a next‑generation educational platform purpose‑built for secure programming education and assessment.
          This page captures the full enterprise proposal — structured, scannable, and deep.
        </p>
      </header>

      {/* 1. Institutional Features */}
      <Section title="1. Institutional Features" id="institutional" />

      <Grid>
        <FeatureCard title="1.1 Institution Dashboard & Analytics" points={[
          'Comprehensive metrics: enrollment, batch activity, completion rates, performance analytics',
          'Quick actions: fast navigation to core functions',
          'Resource tracking: real‑time institutional capacity & usage',
        ]}/>
        <FeatureCard title="1.2 Batch Management" points={[
          'Lifecycle tools: create, configure, monitor, archive with automated UUIDs',
          'Advanced ops: bulk creation, cloning for recurring programs',
          'Seamless integration with course workflows',
        ]}/>
        <FeatureCard title="1.3 Course Management" points={[
          'Multi‑step creation: metadata, unit/sub‑unit design, multimedia integration',
          'CMS: PDF uploads, video integration, interactive tools',
          'Version control: rollback capability for content updates',
        ]}/>
        <FeatureCard title="1.4 Assessment & Examination" points={[
          'Question bank: MCQs & coding with difficulty tagging',
          'Exam config: secure codes, time limits, proctoring settings',
          'Assessment analytics: reports for institutions and faculty',
        ]}/>
        <FeatureCard title="1.5 Advanced Content Creation" points={[
          'Monaco editor: pro code editor with debugging & validation',
          'Dynamic test cases: sample/hidden with automated testing',
          'Multimedia: efficient upload, organization, delivery',
        ]}/>
      </Grid>

      {/* 2. Student Learning & Assessment */}
      <Section title="2. Student Learning & Assessment" id="student" />

      <Grid>
        <FeatureCard title="2.1 Secure Learning Environment" points={[
          'Multi‑layer authentication: verified access only',
          'Course navigation: structured progression with real‑time tracking',
          'Integrated resources: secure PDF viewer & video player with metrics',
        ]}/>
        <FeatureCard title="2.2 Interactive Learning Tools" points={[
          'AI‑powered assistant: contextual help, debugging, recommendations',
          'Code editor: Java, Python, C++, JavaScript — linting & suggestions',
        ]}/>
        <FeatureCard title="2.3 Secure Examination System" points={[
          'Assessment modes: MCQ, coding, hybrid',
          'Security: locked‑down browser, process monitoring, clipboard/network block',
        ]}/>
        <FeatureCard title="2.4 Real‑Time Proctoring" points={[
          'AI monitoring: face tracking, motion/noise detection, live alerts',
          'Video surveillance: low‑bitrate secure recording for institutions',
          'Integrity controls: prevent tab switching, VM use, devtools',
        ]}/>
        <FeatureCard title="2.5 Platform Security" points={[
          'Device validation: OS, browser, hardware checks pre‑exam',
          'Network: VPN/proxy detection, encrypted comms',
          'Anti‑tampering: VM detection, memory protection, devtools block',
        ]}/>
      </Grid>

      {/* 3. Technical Infrastructure */}
      <Section title="3. Technical Infrastructure" id="tech" />

      <Grid>
        <FeatureCard title="3.1 Security Architecture" points={[
          'End‑to‑end encryption for data and communication',
          'Secure Browser: Electron‑based with kernel‑level monitoring',
          'Threat detection: prevents screen‑share exploits, debugging hooks, unauthorized access',
        ]}/>
        <FeatureCard title="3.2 Performance & Scalability" points={[
          'Concurrent: up to 2,500 students per exam slot',
          'Load balancing: distributed nodes for reliability',
          'Real‑time sync: instant updates across sessions',
          'Bandwidth optimization: compression for PDFs, videos, exams',
        ]}/>
        <FeatureCard title="3.3 Integration Capabilities" points={[
          'REST APIs for third‑party tools',
          'SSO: institutional auth (SAML/OAuth/LDAP)',
          'LMS integration and analytics export for BI',
        ]}/>
        <FeatureCard title="3.4 Data Privacy" points={[
          'GDPR compliant processes',
          'Minimal collection: only essential data',
          'Audit logging with full visibility',
          'Retention policies: configurable purge',
        ]}/>
      </Grid>

      {/* 4. Deployment & Hosting */}
      <Section title="4. Deployment & Hosting" id="deploy" />

      <Grid>
        <FeatureCard title="4.1 Cloud (AWS + Vercel)" points={[
          'Auto‑scaling for 20k+ students',
          'Multi‑region low‑latency hosting',
          'Disaster recovery: automated failover & backups',
          'Cost optimization: pay‑per‑use scaling',
        ]}/>
        <FeatureCard title="4.2 On‑Premise" points={[
          'Institutional data residency & compliance',
          'Custom configurations for private networks',
          'Full support: maintenance & updates included',
        ]}/>
      </Grid>

      {/* 5. Compliance & Certification */}
      <Section title="5. Compliance & Certification" id="compliance" />

      <Grid>
        <FeatureCard title="Standards & Integrity" points={[
          'Penetration tested & secured',
          'Accessibility: WCAG 2.1 AA',
          'Academic integrity aligned with global best practices',
          'Learning analytics compatible with standards',
        ]}/>
      </Grid>

      {/* 6. Support & Training */}
      <Section title="6. Support & Training" id="support" />

      <Grid>
        <FeatureCard title="Enterprise Care" points={[
          'Onboarding & setup assistance',
          'Staff & student training: workshops, guides, orientation',
          '24/7 support: dedicated enterprise line',
          'Regular updates: security patches & features',
          'Custom development: on‑demand features',
        ]}/>
      </Grid>

      {/* Conclusion */}
      <Section title="Conclusion" id="conclusion" />
      <div className="rounded-2xl bg-white/5 border border-cyan-400/20 backdrop-blur-xl p-6">
        <p className="text-slate-300">
          EduCode is an enterprise‑ready, secure, and scalable edtech platform with advanced proctoring, real‑time AI assistance, and professional‑grade tools. Flexible deployment, compliance‑first design, and enterprise support make it ideal for universities, colleges, and large‑scale training organizations.
        </p>
      </div>
    </div>
  );
}

function Section({ title, id }) {
  return (
    <div id={id} className="mb-5 mt-12">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
    </div>
  );
}

function Grid({ children }) {
  return <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</section>;
}

function FeatureCard({ title, points }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-cyan-400/20 backdrop-blur-xl p-6 hover:bg-white/10 transition shadow-[0_0_30px_-12px_rgba(0,229,255,0.3)]">
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <ul className="list-disc pl-5 text-slate-300 space-y-1">
        {points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </div>
  );
}