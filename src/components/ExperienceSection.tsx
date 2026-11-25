import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Cpu, Layers, MapPin, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

const PILLARS = [
  {
    icon: Layers,
    title: 'End-to-End Delivery',
    desc: 'From database schemas in MySQL & Firestore to responsive Bootstrap / Flutter interfaces with complete authentication flows.',
  },
  {
    icon: ShieldCheck,
    title: 'Production Discipline',
    desc: 'Collaborated alongside senior engineers at eLogics Corporation on ASP.NET MVC and .NET Core production builds and QA debugging.',
  },
  {
    icon: Cpu,
    title: 'Web + Native & Cross-Platform',
    desc: 'Comfortable shifting between server-rendered PHP / .NET web portals, Flutter Dart apps, and dependency-free Kotlin Android engines.',
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Engineering Approach */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono-code text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
                01 — Profile
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Built with Full-Stack &amp; Mobile Precision
              </h2>
            </div>
            <p className="max-w-md text-sm text-[var(--text-secondary)]">
              Combining diploma + B.Tech Computer Engineering fundamentals with real internship
              experience and shipped end-to-end applications.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className={`surface-card min-w-0 rounded-2xl p-5 sm:p-6 ${
                    idx === 2 ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-[var(--text-primary)]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Internship Experience */}
        <div id="experience" className="scroll-mt-24">
          <span className="font-mono-code text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
            02 — Experience
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Internship Experience
          </h2>

          <div className="mt-6 space-y-6 sm:mt-8">
            {PORTFOLIO_DATA.experience.map((exp) => (
              <motion.article
                key={exp.company}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="surface-card relative overflow-hidden rounded-2xl p-5 sm:p-8"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-[var(--border-subtle)] pb-5 sm:flex-row sm:items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2.5 py-1 font-mono-code text-[11px] font-medium text-[var(--text-secondary)]">
                      <Briefcase className="h-3.5 w-3.5 text-[var(--accent)]" />
                      {exp.type}
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold text-[var(--text-primary)]">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-base font-medium text-[var(--accent)]">{exp.company}</p>
                  </div>

                  <div className="flex flex-col gap-1.5 font-mono-code text-xs text-[var(--text-secondary)] sm:text-right">
                    <span className="inline-flex items-center gap-1.5 sm:justify-end">
                      <Calendar className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 sm:justify-end">
                      <MapPin className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="mt-5 space-y-3">
                  {exp.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[15px]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1 font-mono-code text-xs text-[var(--text-primary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
