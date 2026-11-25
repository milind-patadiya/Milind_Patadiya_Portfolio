import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA, type ProjectItem } from './data/portfolio';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CredentialsSection } from './components/CredentialsSection';
import { ContactSection } from './components/ContactSection';
import type { CameraPresetKey } from './components/Developer3DCanvas';

const CommandPaletteModal = lazy(() =>
  import('./components/CommandPaletteModal').then((m) => ({ default: m.CommandPaletteModal }))
);
const DevTerminalModal = lazy(() =>
  import('./components/DevTerminalModal').then((m) => ({ default: m.DevTerminalModal }))
);
const ProjectInspectorModal = lazy(() =>
  import('./components/ProjectInspectorModal').then((m) => ({ default: m.ProjectInspectorModal }))
);
const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal }))
);

export function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const [commandOpen, setCommandOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [inspectedProject, setInspectedProject] = useState<ProjectItem | null>(null);
  const [wireframe3D, setWireframe3D] = useState(false);
  const [preset3D, setPreset3D] = useState<CameraPresetKey | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showBackTop, setShowBackTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 });

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 2400);
  }, []);

  useEffect(() => {
    const rootEl = document.documentElement;
    if (isDark) {
      rootEl.classList.add('dark');
    } else {
      rootEl.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setCommandOpen(false);
        setTerminalOpen(false);
        setResumeOpen(false);
        setInspectedProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const sectionIds = ['about', 'experience', 'skills', 'projects', 'credentials', 'contact'];
    const onScroll = () => {
      setShowBackTop(window.scrollY > 520);
      const offset = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= offset) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
      showToast('Email copied to clipboard');
    } catch {
      showToast(PORTFOLIO_DATA.profile.email);
    }
  };

  return (
    <div className="bg-architectural-grid relative min-h-screen">
      {/* Subtle Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="no-print fixed top-0 right-0 left-0 z-50 h-[2px] origin-left bg-[var(--accent)]"
      />

      <Navbar
        isDark={isDark}
        onToggleTheme={() => setIsDark((v) => !v)}
        onOpenCommandPalette={() => setCommandOpen(true)}
        onOpenResumeModal={() => setResumeOpen(true)}
        onOpenTerminalModal={() => setTerminalOpen(true)}
        activeSection={activeSection}
      />

      <main className="no-print">
        <HeroSection
          isDark={isDark}
          wireframe3D={wireframe3D}
          onWireframeChange={setWireframe3D}
          preset3D={preset3D}
          onOpenResumeModal={() => setResumeOpen(true)}
          onCopyToast={showToast}
        />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection onInspectProject={setInspectedProject} />
        <CredentialsSection />
        <ContactSection onCopyToast={showToast} />
      </main>

      <footer className="no-print border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-[var(--text-muted)] sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-[var(--text-primary)]">Milind Patadiya</span> —
            Full-Stack &amp; Flutter Developer
          </p>
          <div className="flex items-center gap-4 font-mono-code">
            <button
              type="button"
              onClick={() => setTerminalOpen(true)}
              className="hover:text-[var(--text-primary)]"
            >
              $ terminal
            </button>
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="hover:text-[var(--text-primary)]"
            >
              ⌘K menu
            </button>
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="hover:text-[var(--text-primary)]"
            >
              CV.pdf
            </button>
          </div>
        </div>
      </footer>

      {showBackTop && (
        <a
          href="#top"
          aria-label="Back to top"
          className="no-print fixed right-4 bottom-4 z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-lg transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] sm:right-5 sm:bottom-5"
        >
          <ArrowUp className="h-4 w-4" />
        </a>
      )}

      {toastMsg && (
        <div className="no-print fixed bottom-5 left-1/2 z-50 flex w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] shadow-xl">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span className="truncate">{toastMsg}</span>
        </div>
      )}

      <Suspense fallback={null}>
        <CommandPaletteModal
          open={commandOpen}
          onClose={() => setCommandOpen(false)}
          isDark={isDark}
          wireframe3D={wireframe3D}
          onToggleTheme={() => setIsDark((v) => !v)}
          onToggleWireframe={() => setWireframe3D((v) => !v)}
          onSelect3DPreset={(p) => {
            setPreset3D(null);
            window.requestAnimationFrame(() => setPreset3D(p));
          }}
          onOpenResume={() => setResumeOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
          onCopyEmail={handleCopyEmail}
        />

        <DevTerminalModal
          open={terminalOpen}
          onClose={() => setTerminalOpen(false)}
          onToggleWireframe={() => setWireframe3D((v) => !v)}
        />

        <ProjectInspectorModal
          project={inspectedProject}
          onClose={() => setInspectedProject(null)}
        />

        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      </Suspense>
    </div>
  );
}

export default App;
