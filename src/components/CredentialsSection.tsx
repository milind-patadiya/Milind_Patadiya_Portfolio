import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe2, GraduationCap, Medal, Trophy } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const CredentialsSection: React.FC = () => {
  return (
    <section id="credentials" className="scroll-mt-24 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Education Timeline */}
          <div className="min-w-0 lg:col-span-7">
            <span className="font-mono-code text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
              05 — Academic Foundation
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Education
            </h2>

            <div className="relative mt-7 space-y-4 before:absolute before:top-4 before:bottom-4 before:left-3.5 before:w-px before:bg-[var(--border-subtle)] sm:mt-8 sm:space-y-5 sm:before:left-5">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="relative pl-10 sm:pl-14"
                >
                  <div
                    className={`absolute top-5 left-1 flex h-5 w-5 items-center justify-center rounded-full border-2 sm:left-2.5 ${
                      edu.status === 'Current'
                        ? 'border-[var(--accent)] bg-[var(--bg-elevated)]'
                        : 'border-[var(--border-strong)] bg-[var(--bg-elevated)]'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        edu.status === 'Current' ? 'bg-[var(--accent)]' : 'bg-[var(--text-muted)]'
                      }`}
                    />
                  </div>

                  <div className="surface-card min-w-0 rounded-2xl p-4 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 font-mono-code text-xs font-medium text-[var(--text-secondary)]">
                        <GraduationCap className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                        {edu.period}
                      </span>
                      <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2.5 py-0.5 font-mono-code text-xs font-semibold text-[var(--text-primary)]">
                        {edu.metricLabel}: {edu.metricValue}
                      </span>
                    </div>

                    <h3 className="mt-2.5 font-display text-lg font-bold text-[var(--text-primary)] sm:text-xl">
                      {edu.degree}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {edu.institution}
                      {edu.accreditation ? (
                        <span className="ml-2 inline-block rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2 py-0.5 font-mono-code text-[11px] font-medium text-[var(--text-primary)]">
                          {edu.accreditation}
                        </span>
                      ) : null}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications, Languages & Activities */}
          <div className="min-w-0 space-y-8 lg:col-span-5">
            <div>
              <span className="font-mono-code text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
                06 — Credentials
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Certifications
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {PORTFOLIO_DATA.certifications.map((cert, idx) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    className="surface-card flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-xl p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)]">
                        <Award className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-sm font-semibold text-[var(--text-primary)]">
                          {cert.title}
                        </h3>
                        <p className="truncate text-xs text-[var(--text-secondary)]">
                          {cert.issuerHint}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded border border-[var(--border-subtle)] px-2 py-0.5 font-mono-code text-[10px] text-[var(--text-muted)]">
                      {cert.domain}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="surface-card rounded-2xl p-6">
              <div className="flex items-center gap-2 font-mono-code text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                <Trophy className="h-4 w-4 text-[var(--text-primary)]" />
                <span>Technical Activities</span>
              </div>
              {PORTFOLIO_DATA.activities.map((act) => (
                <div key={act.title} className="mt-3">
                  <p className="font-display text-base font-semibold text-[var(--text-primary)]">
                    {act.title}
                  </p>
                  <p className="text-xs font-medium text-[var(--accent)]">{act.organization}</p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">{act.detail}</p>
                </div>
              ))}

              <div className="mt-6 border-t border-[var(--border-subtle)] pt-5">
                <div className="flex items-center gap-2 font-mono-code text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  <Globe2 className="h-4 w-4 text-[var(--text-primary)]" />
                  <span>Languages</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PORTFOLIO_DATA.languages.map((lang) => (
                    <div
                      key={lang.name}
                      className="flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs"
                    >
                      <Medal className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                      <span className="font-semibold text-[var(--text-primary)]">{lang.name}</span>
                      <span className="text-[var(--text-muted)]">({lang.proficiency})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
