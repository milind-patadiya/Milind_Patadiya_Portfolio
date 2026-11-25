import React, { useEffect, useRef, useState } from 'react';
import { Terminal, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface DevTerminalModalProps {
  open: boolean;
  onClose: () => void;
  onToggleWireframe: () => void;
}

interface LogEntry {
  cmd?: string;
  lines: string[];
  tone?: 'info' | 'accent' | 'error';
}

const HELP_LINES = [
  'Available commands:',
  '  whoami      -> Developer summary & status',
  '  experience  -> Internship history at eLogics Corporation',
  '  skills      -> Technical stack & engineering concepts',
  '  projects    -> Shipped web, Flutter & Kotlin projects',
  '  education   -> B.Tech, Diploma & SSC records',
  '  certs       -> Verified certifications & competition',
  '  contact     -> Email, phone, GitHub & location',
  '  wireframe   -> Toggle 3D model wireframe',
  '  clear       -> Clear terminal output',
];

export const DevTerminalModal: React.FC<DevTerminalModalProps> = ({
  open,
  onClose,
  onToggleWireframe,
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([
    {
      lines: [
        'Milind Patadiya Portfolio CLI v1.0',
        'Type "help" or click a command chip below.',
      ],
      tone: 'accent',
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, open]);

  if (!open) return null;

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    let lines: string[] = [];
    let tone: LogEntry['tone'] = 'info';

    switch (cmd) {
      case 'help':
        lines = HELP_LINES;
        break;
      case 'whoami':
        lines = [
          `${PORTFOLIO_DATA.profile.name} — ${PORTFOLIO_DATA.profile.headline}`,
          `Location : ${PORTFOLIO_DATA.profile.location}`,
          `Status   : ${PORTFOLIO_DATA.profile.availability}`,
          PORTFOLIO_DATA.profile.summary,
        ];
        tone = 'accent';
        break;
      case 'experience':
        lines = PORTFOLIO_DATA.experience.flatMap((e) => [
          `${e.role} @ ${e.company} (${e.period}) — ${e.location}`,
          ...e.bullets.map((b) => `  • ${b}`),
        ]);
        break;
      case 'skills':
        lines = PORTFOLIO_DATA.skills.map((s) => `${s.category}: ${s.items.join(', ')}`);
        break;
      case 'projects':
        lines = PORTFOLIO_DATA.projects.flatMap((p) => [
          `[${p.category}] ${p.title} (${p.tech.join(', ')})`,
          `  ${p.summary}`,
          p.githubUrl ? `  Repo: ${p.githubUrl}` : '  Note: Pure native Kotlin implementation',
        ]);
        break;
      case 'education':
        lines = PORTFOLIO_DATA.education.map(
          (e) => `${e.degree} — ${e.institution} (${e.period}) [${e.metricLabel}: ${e.metricValue}]`
        );
        break;
      case 'certs':
        lines = [
          `Certifications: ${PORTFOLIO_DATA.certifications.map((c) => c.title).join(' • ')}`,
          `Activities: ${PORTFOLIO_DATA.activities.map((a) => `${a.title} (${a.organization})`).join(', ')}`,
        ];
        break;
      case 'contact':
        lines = [
          `Email   : ${PORTFOLIO_DATA.profile.email}`,
          `Phone   : ${PORTFOLIO_DATA.profile.phone}`,
          `GitHub  : ${PORTFOLIO_DATA.profile.githubUrl}`,
          `Location: ${PORTFOLIO_DATA.profile.location}`,
        ];
        tone = 'accent';
        break;
      case 'wireframe':
        onToggleWireframe();
        lines = ['Toggled 3D Developer Model Wireframe mode.'];
        tone = 'accent';
        break;
      default:
        lines = [`Command not found: "${cmd}". Type "help" for available commands.`];
        tone = 'error';
    }

    setHistory((prev) => [...prev, { cmd: raw, lines, tone }]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
  };

  const quickChips = ['whoami', 'experience', 'skills', 'projects', 'certs', 'wireframe'];

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#30363d] bg-[#0d1117] text-[#e6edf3] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#21262d] bg-[#161b22] px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Terminal className="h-4 w-4 text-[#8b949e]" />
            <span className="font-mono-code text-xs font-medium text-[#e6edf3]">
              milind@portfolio:~/workspace
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#8b949e] hover:bg-[#21262d] hover:text-white"
            aria-label="Close terminal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex shrink-0 flex-wrap gap-1.5 border-b border-[#21262d] bg-[#090c10] px-3 py-2.5 sm:px-4">
          {quickChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => runCommand(chip)}
              className="rounded border border-[#30363d] bg-[#161b22] px-2.5 py-1 font-mono-code text-[11px] text-[#c9d1d9] transition hover:border-[#8b949e] hover:text-white"
            >
              $ {chip}
            </button>
          ))}
        </div>

        <div
          ref={scrollRef}
          className="min-h-[180px] flex-1 space-y-4 overflow-y-auto p-4 font-mono-code text-xs leading-relaxed sm:h-80"
        >
          {history.map((entry, idx) => (
            <div key={idx} className="space-y-1">
              {entry.cmd && (
                <div className="text-[#7ee787]">
                  <span className="text-[#6e7681]">milind@rajkot:~$</span> {entry.cmd}
                </div>
              )}
              {entry.lines.map((line, lIdx) => (
                <div
                  key={lIdx}
                  className={
                    entry.tone === 'error'
                      ? 'text-[#ff7b72]'
                      : entry.tone === 'accent'
                      ? 'text-[#79c0ff]'
                      : 'text-[#c9d1d9]'
                  }
                >
                  {line}
                </div>
              ))}
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-[#21262d] bg-[#090c10] px-4 py-3 font-mono-code text-xs"
        >
          <span className="text-[#7ee787]">$</span>
          <input
            type="text"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command (help, skills, projects, wireframe)..."
            className="w-full bg-transparent text-[#e6edf3] placeholder:text-[#6e7681] focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
};
