// src/app/dashboard/layout.js
import NavBar from './_components/NavBar';
import Logo from './_components/Logo';
import MatrixBackground from './_components/MatrixBackground';
import NoiseOverlay from './_components/NoiseOverlay';
import RouteLoader from './_components/RouteLoader';

export const metadata = {
  title: 'TheEduCode — Secure Learning & Exams',
  description: 'Enterprise-grade platform for secure programming education and assessment.',
};

export default function DashboardLayout({ children }) {
  return (
    <div className="relative isolate min-h-screen bg-[#0b0f14] text-slate-100">
      {/* Background layers visible through glass panels */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <MatrixBackground />
        <NoiseOverlay />
      </div>

      {/* Route progress */}
      <RouteLoader />

      {/* Nav */}
      <div className="sticky top-0 z-40 backdrop-blur-md">
        <NavBar />
      </div>

      {/* Content */}
      <main className="relative z-10">{children}</main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-4 py-10 text-sm text-slate-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Logo className="h-6 w-6" />
              <span>TheEduCode © {new Date().getFullYear()}</span>
            </div>
            <div className="opacity-80">
              Secure learning & proctored exams for colleges and institutes.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}