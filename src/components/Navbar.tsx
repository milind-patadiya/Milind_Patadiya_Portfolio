import React, { useState } from 'react';
import { Command, FileText, Menu, Moon, Sun, Terminal, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
  onOpenResumeModal: () => void;
  onOpenTerminalModal: () => void;
  activeSection: string;
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'credentials', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenCommandPalette,
  onOpenResumeModal,
  onOpenTerminalModal,
  activeSection,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Monogram & Brand */}
        <a
          href="#top"
          className="group flex min-w-0 items-center gap-2.5 focus:outline-none"
          aria-label="Milind Patadiya Home"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] font-display text-sm font-bold tracking-tight text-[var(--text-primary)] transition group-hover:border-[var(--accent)]">
            {PORTFOLIO_DATA.profile.initials}
          </div>
          <div className="min-w-0 leading-tight">
            <span className="block truncate font-display text-sm font-semibold tracking-tight text-[var(--text-primary)]">
              Milind Patadiya
            </span>
            <span className="block truncate font-mono-code text-[11px] text-[var(--text-muted)]">
              Full-Stack &amp; Flutter
            </span>
          </div>
        </a>

        {/* Desktop Nav (lg+ avoids crowding on 768px-1023px tablets) */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary Navigation">
          {NAV_LINKS.map((item) => {
            const active = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? 'bg-[var(--bg-card-hover)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Utility Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="hidden items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] md:inline-flex"
            title="Open Command Palette (Ctrl+K)"
          >
            <Command className="h-3.5 w-3.5" />
            <span>Search</span>
            <kbd className="rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-1.5 py-0.5 font-mono-code text-[10px] text-[var(--text-muted)]">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onOpenTerminalModal}
            className="hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2 text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] sm:inline-flex"
            title="Launch Interactive Dev Terminal"
            aria-label="Open interactive terminal"
          >
            <Terminal className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2 text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle color theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenResumeModal}
            className="hidden items-center gap-1.5 rounded-lg bg-[var(--btn-primary-bg)] px-3.5 py-2 text-xs font-semibold text-[var(--btn-primary-text)] transition hover:opacity-90 sm:inline-flex"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>View CV</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2 text-[var(--text-primary)] lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileOpen && (
        <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-4 lg:hidden">
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {NAV_LINKS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  activeSection === item.id
                    ? 'bg-[var(--bg-card-hover)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 border-t border-[var(--border-subtle)] pt-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenCommandPalette();
              }}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border-subtle)] px-3 py-2 text-xs font-medium"
            >
              <Command className="h-3.5 w-3.5" />
              Quick Nav
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenTerminalModal();
              }}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border-subtle)] px-3 py-2 text-xs font-medium"
            >
              <Terminal className="h-3.5 w-3.5" />
              Terminal
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenResumeModal();
              }}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--btn-primary-bg)] px-3 py-2.5 text-xs font-semibold text-[var(--btn-primary-text)] sm:w-auto sm:flex-1"
            >
              <FileText className="h-3.5 w-3.5" />
              View CV
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
