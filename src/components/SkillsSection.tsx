import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, Server, Smartphone, Wrench } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  languages: Code2,
  frontend: Layout,
  mobile: Smartphone,
  backend: Server,
  database: Database,
  'tools-concepts': Wrench,
};

export const SkillsSection: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  const visibleGroups =
    selectedGroup === 'all'
      ? PORTFOLIO_DATA.skills
      : PORTFOLIO_DATA.skills.filter((g) => g.id === selectedGroup);

  return (
    <section id="skills" className="scroll-mt-24 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="font-mono-code text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
              03 — Technical Stack
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Skills &amp; Engineering Capabilities
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedGroup('all')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${selectedGroup === 'all'
                ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                : 'border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                }`}
            >
              All Stacks
            </button>
            {PORTFOLIO_DATA.skills.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setSelectedGroup(group.id)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${selectedGroup === group.id
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                  : 'border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  }`}
              >
                {group.category.replace(' & Engineering Concepts', '')}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-4 sm:mt-9 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {visibleGroups.map((group, idx) => {
            const Icon = ICON_MAP[group.id] || Code2;
            const isWide = group.id === 'tools-concepts' && selectedGroup === 'all';
            return (
              <motion.div
                key={group.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`surface-card min-w-0 rounded-2xl p-5 sm:p-6 ${
                  isWide ? 'sm:col-span-2 lg:col-span-3' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                      {group.category}
                    </h3>
                    <span className="font-mono-code text-[11px] text-[var(--text-muted)]">
                      {group.items.length} items
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-[var(--text-secondary)]">{group.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1.5 font-mono-code text-xs font-medium text-[var(--text-primary)] transition hover:border-[var(--border-strong)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
