import React, { useEffect, useState } from 'react';
import {
  Box,
  Compass,
  Copy,
  FileText,
  Layers,
  Moon,
  Search,
  Sun,
  Terminal,
  X,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import type { CameraPresetKey } from './Developer3DCanvas';

interface CommandPaletteModalProps {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
  wireframe3D: boolean;
  onToggleTheme: () => void;
  onToggleWireframe: () => void;
  onSelect3DPreset: (preset: CameraPresetKey) => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  onCopyEmail: () => void;
}

interface ActionItem {
  id: string;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  open,
  onClose,
  isDark,
  wireframe3D,
  onToggleTheme,
  onToggleWireframe,
  onSelect3DPreset,
  onOpenResume,
  onOpenTerminal,
  onCopyEmail,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  if (!open) return null;

  const scrollTo = (hash: string) => {
    onClose();
    const el = document.querySelector(hash);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const actions: ActionItem[] = [
    {
      id: '3d-hero',
      label: '3D Camera: Hero 3/4 View',
      hint: '360° Model',
      icon: Compass,
      run: () => {
        onSelect3DPreset('hero');
        scrollTo('#top');
      },
    },
    {
      id: '3d-back',
      label: '3D Camera: Inspect Back 180° Rig',
      hint: '360° Model',
      icon: Box,
      run: () => {
        onSelect3DPreset('back');
        scrollTo('#top');
      },
    },
    {
      id: '3d-screens',
      label: '3D Camera: Focus Code Monitors',
      hint: '360° Model',
      icon: Compass,
      run: () => {
        onSelect3DPreset('screens');
        scrollTo('#top');
      },
    },
    {
      id: 'wireframe',
      label: wireframe3D ? 'Disable 3D Wireframe' : 'Enable 3D Wireframe',
      hint: '3D Mode',
      icon: Layers,
      run: () => {
        onToggleWireframe();
        onClose();
      },
    },
    {
      id: 'terminal',
      label: 'Open Interactive Developer Terminal',
      hint: 'CLI',
      icon: Terminal,
      run: () => {
        onClose();
        onOpenTerminal();
      },
    },
    {
      id: 'resume',
      label: 'Open Formatted CV / Printable Resume',
      hint: 'Document',
      icon: FileText,
      run: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'theme',
      label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      hint: 'Theme',
      icon: isDark ? Sun : Moon,
      run: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'copy-email',
      label: `Copy Email (${PORTFOLIO_DATA.profile.email})`,
      hint: 'Contact',
      icon: Copy,
      run: () => {
        onCopyEmail();
        onClose();
      },
    },
    {
      id: 'nav-exp',
      label: 'Jump to Internship Experience',
      hint: 'Section',
      icon: Compass,
      run: () => scrollTo('#experience'),
    },
    {
      id: 'nav-skills',
      label: 'Jump to Technical Skills',
      hint: 'Section',
      icon: Compass,
      run: () => scrollTo('#skills'),
    },
    {
      id: 'nav-projects',
      label: 'Jump to Projects',
      hint: 'Section',
      icon: Compass,
      run: () => scrollTo('#projects'),
    },
    {
      id: 'nav-edu',
      label: 'Jump to Education & Certifications',
      hint: 'Section',
      icon: Compass,
      run: () => scrollTo('#credentials'),
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.label.toLowerCase().includes(query.toLowerCase()) ||
      a.hint.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-start justify-center bg-black/65 p-3 pt-8 backdrop-blur-sm sm:p-4 sm:pt-20"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3.5">
          <Search className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, section, or 3D view..."
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[65dvh] overflow-y-auto p-2 sm:max-h-80">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
              No matching command found.
            </p>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.run}
                  className="flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition hover:bg-[var(--bg-card-hover)]"
                >
                  <span className="flex items-center gap-3 font-medium text-[var(--text-primary)]">
                    <Icon className="h-4 w-4 text-[var(--text-muted)]" />
                    <span>{item.label}</span>
                  </span>
                  <span className="rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2 py-0.5 font-mono-code text-[10px] text-[var(--text-muted)]">
                    {item.hint}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
