import React, { useState } from 'react';
import { CheckCircle2, Dices, ExternalLink, FolderGit2, Layers, RotateCcw, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolio';

interface ProjectInspectorModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const LADDERS: Record<number, number> = { 4: 14, 9: 31, 21: 42, 28: 76, 51: 67, 71: 91 };
const SNAKES: Record<number, number> = { 17: 7, 54: 34, 62: 19, 64: 60, 87: 24, 95: 75, 98: 79 };

const SnakesAndLaddersSimulator: React.FC = () => {
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(1);
  const [turn, setTurn] = useState<1 | 2>(1);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [log, setLog] = useState('Player 1 ready — roll the dice to test pure Kotlin board rules.');

  const winner = p1 === 100 ? 1 : p2 === 100 ? 2 : null;

  const rollDice = () => {
    if (winner) return;
    const dice = Math.floor(Math.random() * 6) + 1;
    setLastRoll(dice);

    const curr = turn === 1 ? p1 : p2;
    let next = curr + dice;
    let eventNote = '';

    if (next > 100) {
      next = curr;
      eventNote = `Rolled ${dice} — overshoot (>100), stays at ${curr}.`;
    } else if (LADDERS[next]) {
      const dest = LADDERS[next];
      eventNote = `Rolled ${dice} → ${next} (Ladder! Climbs to ${dest})`;
      next = dest;
    } else if (SNAKES[next]) {
      const dest = SNAKES[next];
      eventNote = `Rolled ${dice} → ${next} (Snake! Slides to ${dest})`;
      next = dest;
    } else {
      eventNote = `Rolled ${dice} → moved to square ${next}.`;
    }

    if (turn === 1) setP1(next);
    else setP2(next);

    if (next === 100) {
      setLog(`Player ${turn} wins! (${eventNote})`);
    } else {
      setLog(`Player ${turn}: ${eventNote}`);
      setTurn(turn === 1 ? 2 : 1);
    }
  };

  const reset = () => {
    setP1(1);
    setP2(1);
    setTurn(1);
    setLastRoll(null);
    setLog('Board reset. Player 1 starts.');
  };

  return (
    <div className="mt-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono-code text-xs font-semibold text-[var(--text-primary)]">
          INTERACTIVE LOGIC DEMO (2-PLAYER ENGINE)
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={rollDice}
            disabled={Boolean(winner)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--btn-primary-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--btn-primary-text)] transition hover:opacity-90 disabled:opacity-40"
          >
            <Dices className="h-3.5 w-3.5" />
            <span>{winner ? `P${winner} Won!` : `Roll P${turn} Dice`}</span>
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-[var(--border-subtle)] p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            title="Reset simulator"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 font-mono-code text-xs">
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-2 sm:p-2.5">
          <span className="text-[10px] text-[var(--text-muted)]">PLAYER 1</span>
          <p className="mt-0.5 text-sm font-bold text-[var(--accent)] sm:text-base">Sq. {p1}</p>
        </div>
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-2 sm:p-2.5">
          <span className="text-[10px] text-[var(--text-muted)]">PLAYER 2</span>
          <p className="mt-0.5 text-sm font-bold text-[var(--text-primary)] sm:text-base">Sq. {p2}</p>
        </div>
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-2 sm:p-2.5">
          <span className="text-[10px] text-[var(--text-muted)]">DICE</span>
          <p className="mt-0.5 text-sm font-bold text-[var(--text-secondary)] sm:text-base">
            {lastRoll ?? '—'}
          </p>
        </div>
      </div>
      <p className="mt-2.5 font-mono-code text-[11px] text-[var(--text-secondary)]">{log}</p>
    </div>
  );
};

export const ProjectInspectorModal: React.FC<ProjectInspectorModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-5 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2.5 py-1 font-mono-code text-[11px] font-medium text-[var(--text-secondary)]">
              <Layers className="h-3.5 w-3.5 text-[var(--accent)]" />
              {project.category} · {project.featuredLabel}
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold text-[var(--text-primary)]">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{project.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[var(--border-subtle)] p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            aria-label="Close project details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)]">{project.summary}</p>

        <div className="mt-6">
          <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Implemented Features
          </h4>
          <ul className="mt-3 space-y-2.5">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Architecture &amp; Engineering Notes
          </h4>
          <ul className="mt-3 space-y-2.5">
            {project.architectureNotes.map((note) => (
              <li
                key={note}
                className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-muted)]" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {project.id === 'snakes-and-ladders' && <SnakesAndLaddersSimulator />}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-5">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2.5 py-1 font-mono-code text-xs"
              >
                {t}
              </span>
            ))}
          </div>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] px-4 py-2 text-xs font-semibold text-[var(--btn-primary-text)] transition hover:opacity-90"
            >
              <FolderGit2 className="h-4 w-4" />
              <span>Open Repository</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
