import React from 'react';
import { Printer, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-700 bg-white p-4 text-slate-900 shadow-2xl sm:rounded-3xl sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Action Bar (hidden when printing) */}
        <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4 sm:mb-6">
          <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-slate-500">
            Formatted Curriculum Vitae Preview
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Close resume preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable ATS CV Document */}
        <div className="space-y-5 text-sm leading-relaxed">
          <header className="border-b-2 border-slate-900 pb-4 text-center">
            <h1 className="font-display text-2xl font-bold tracking-wide uppercase text-slate-950">
              {PORTFOLIO_DATA.profile.name}
            </h1>
            <p className="mt-1 text-sm font-medium italic text-slate-700">
              {PORTFOLIO_DATA.profile.headline}
            </p>
            <p className="mt-1.5 text-xs text-slate-600">
              {PORTFOLIO_DATA.profile.email} &nbsp;|&nbsp; {PORTFOLIO_DATA.profile.phone} &nbsp;|&nbsp;{' '}
              {PORTFOLIO_DATA.profile.location}
            </p>
            <p className="mt-1 text-xs font-medium text-blue-700">
              GitHub: {PORTFOLIO_DATA.profile.githubUrl}
            </p>
          </header>

          <section>
            <h2 className="border-b border-slate-300 pb-1 font-display text-xs font-bold uppercase tracking-wider text-slate-900">
              Professional Summary
            </h2>
            <p className="mt-2 text-xs text-slate-700">{PORTFOLIO_DATA.profile.summary}</p>
          </section>

          <section>
            <h2 className="border-b border-slate-300 pb-1 font-display text-xs font-bold uppercase tracking-wider text-slate-900">
              Internship Experience
            </h2>
            {PORTFOLIO_DATA.experience.map((exp) => (
              <div key={exp.company} className="mt-2">
                <div className="flex flex-wrap justify-between font-semibold text-slate-900 text-xs">
                  <span>
                    {exp.role} — {exp.company}, {exp.location}
                  </span>
                  <span className="text-slate-600">{exp.period}</span>
                </div>
                <ul className="mt-1.5 list-disc space-y-1 pl-5 text-xs text-slate-700">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2 className="border-b border-slate-300 pb-1 font-display text-xs font-bold uppercase tracking-wider text-slate-900">
              Education
            </h2>
            <div className="mt-2 space-y-2">
              {PORTFOLIO_DATA.education.map((edu) => (
                <div key={edu.degree} className="flex flex-wrap justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-900">{edu.degree}</p>
                    <p className="text-slate-600">
                      {edu.institution}
                      {edu.accreditation ? ` | ${edu.accreditation}` : ''} | {edu.metricLabel}:{' '}
                      {edu.metricValue}
                    </p>
                  </div>
                  <span className="text-slate-600">{edu.period}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="border-b border-slate-300 pb-1 font-display text-xs font-bold uppercase tracking-wider text-slate-900">
              Technical Skills
            </h2>
            <div className="mt-2 space-y-1 text-xs text-slate-700">
              {PORTFOLIO_DATA.skills.map((s) => (
                <p key={s.id}>
                  <strong className="text-slate-900">{s.category}:</strong> {s.items.join(', ')}
                </p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="border-b border-slate-300 pb-1 font-display text-xs font-bold uppercase tracking-wider text-slate-900">
              Projects
            </h2>
            <div className="mt-2 space-y-2.5">
              {PORTFOLIO_DATA.projects.map((p) => (
                <div key={p.id} className="text-xs">
                  <p className="font-semibold text-slate-900">{p.title}</p>
                  <p className="text-slate-600">
                    <strong>Tech:</strong> {p.tech.join(', ')}
                    {p.githubLabel ? ` | GitHub: ${p.githubLabel}` : ''}
                  </p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-slate-700">
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="border-b border-slate-300 pb-1 font-display text-xs font-bold uppercase tracking-wider text-slate-900">
              Certifications &amp; Languages
            </h2>
            <p className="mt-2 text-xs text-slate-700">
              <strong>Certifications:</strong>{' '}
              {PORTFOLIO_DATA.certifications.map((c) => c.title).join(' • ')}
            </p>
            <p className="mt-1 text-xs text-slate-700">
              <strong>Languages &amp; Activities:</strong>{' '}
              {PORTFOLIO_DATA.languages.map((l) => `${l.name} (${l.proficiency})`).join(' • ')} •{' '}
              {PORTFOLIO_DATA.activities[0].title}, {PORTFOLIO_DATA.activities[0].organization}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
