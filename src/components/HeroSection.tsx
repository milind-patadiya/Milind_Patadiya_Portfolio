import React, { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, FileText, MapPin } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';
import { PORTFOLIO_DATA } from '../data/portfolio';
import type { CameraPresetKey } from './Developer3DCanvas';

const Developer3DCanvas = lazy(() =>
  import('./Developer3DCanvas').then((m) => ({ default: m.Developer3DCanvas }))
);

interface HeroSectionProps {
  isDark: boolean;
  wireframe3D: boolean;
  onWireframeChange: (next: boolean) => void;
  preset3D: CameraPresetKey | null;
  onOpenResumeModal: () => void;
  onCopyToast: (label: string) => void;
}

const ROTATING_TITLES = [
  'Full-Stack Web Developer',
  'Flutter Cross-Platform Dev',
  'Native Kotlin Android Dev',
  '.NET Internship Experience',
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  isDark,
  wireframe3D,
  onWireframeChange,
  preset3D,
  onOpenResumeModal,
  onCopyToast,
}) => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIdx((i) => (i + 1) % ROTATING_TITLES.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
      setCopiedEmail(true);
      onCopyToast('Email copied to clipboard');
      window.setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      window.location.href = `mailto:${PORTFOLIO_DATA.profile.email}`;
    }
  };

  return (
    <section id="top" className="relative pt-6 pb-12 sm:pt-12 sm:pb-16 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Engineering Identity (min-w-0 prevents grid blowout on narrow phones) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 lg:col-span-6"
          >
            {/* Status Row */}
            <div className="inline-flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-medium sm:rounded-full sm:px-3.5">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                <span className="text-[var(--text-primary)]">
                  {PORTFOLIO_DATA.profile.availability}
                </span>
              </span>
              <span className="hidden text-[var(--text-muted)] sm:inline">·</span>
              <span className="inline-flex items-center gap-1 text-[var(--text-secondary)]">
                <MapPin className="h-3 w-3 shrink-0" />
                Rajkot, India
              </span>
            </div>

            <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:mt-6 sm:text-5xl lg:text-6xl">
              Milind Patadiya
            </h1>

            {/* Dynamic Role Switcher */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2 text-sm font-medium sm:mt-4 sm:gap-2.5 sm:text-lg">
              <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)] px-2.5 py-0.5 font-mono-code text-xs font-medium text-[var(--accent)] sm:text-sm">
                B.Tech CS ’27
              </span>
              <span className="text-[var(--text-muted)]">/</span>
              <motion.span
                key={roleIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="font-display font-medium text-[var(--text-secondary)]"
              >
                {ROTATING_TITLES[roleIdx]}
              </motion.span>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] sm:mt-5 sm:text-base lg:text-[17px]">
              {PORTFOLIO_DATA.profile.summary}
            </p>

            {/* Primary CTA Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--btn-primary-text)] transition hover:opacity-90 sm:px-5"
              >
                <span>View Projects</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--border-strong)]"
              >
                <FileText className="h-4 w-4 text-[var(--text-secondary)]" />
                <span>Resume / CV</span>
              </button>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex max-w-full items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3.5 py-2.5 font-mono-code text-xs text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 shrink-0" />
                )}
                <span className="truncate">{PORTFOLIO_DATA.profile.email}</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)] sm:mt-6 sm:gap-4">
              <a
                href={PORTFOLIO_DATA.profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition hover:text-[var(--text-primary)]"
              >
                <GitHubIcon className="h-4 w-4 shrink-0" />
                <span>github.com/milind-patadiya</span>
              </a>
              <span className="text-[var(--border-strong)]">|</span>
              <a
                href={PORTFOLIO_DATA.profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition hover:text-[var(--text-primary)]"
              >
                <LinkedInIcon className="h-4 w-4 shrink-0" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Key Engineering Metric Strip */}
            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-9 sm:gap-3 xl:grid-cols-4">
              {PORTFOLIO_DATA.metrics.map((m) => (
                <div key={m.label} className="surface-card min-w-0 rounded-xl p-3 sm:rounded-2xl sm:p-3.5">
                  <p className="font-mono-code text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                    {m.label}
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                    {m.value}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[var(--text-secondary)]">
                    {m.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive 360° 3D Developer Studio Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 lg:col-span-6"
          >
            <Suspense
              fallback={
                <div className="surface-card flex h-[340px] w-full flex-col items-center justify-center rounded-2xl sm:h-[460px] lg:h-[520px]">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--text-primary)] border-t-transparent" />
                  <p className="mt-3 font-mono-code text-xs text-[var(--text-secondary)]">
                    Loading 360° 3D Studio...
                  </p>
                </div>
              }
            >
              <Developer3DCanvas
                isDark={isDark}
                wireframeExternal={wireframe3D}
                onWireframeChange={onWireframeChange}
                presetExternal={preset3D}
              />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
