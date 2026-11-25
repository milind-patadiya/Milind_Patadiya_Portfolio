import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, ExternalLink, FolderGit2, Smartphone } from 'lucide-react';
import { PORTFOLIO_DATA, type ProjectItem } from '../data/portfolio';

interface ProjectsSectionProps {
  onInspectProject: (project: ProjectItem) => void;
}

type CategoryFilter = 'All' | ProjectItem['category'];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onInspectProject }) => {
  const [filter, setFilter] = useState<CategoryFilter>('All');

  const filtered =
    filter === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === filter);

  const categories: CategoryFilter[] = ['All', 'Full-Stack Web', 'Mobile', 'Native Android'];

  return (
    <section id="projects" className="scroll-mt-24 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="font-mono-code text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
              04 — Selected Work
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Shipped Projects &amp; Systems
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition sm:px-3.5 ${filter === cat
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                  : 'border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-5 sm:mt-9 md:grid-cols-2 lg:gap-6">
          {filtered.map((project, idx) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="surface-card group flex min-w-0 flex-col justify-between rounded-2xl p-5 sm:p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2.5 py-1 font-mono-code text-[11px] font-medium text-[var(--text-secondary)]">
                    {project.category === 'Full-Stack Web' ? (
                      <Code2 className="h-3.5 w-3.5 text-[var(--accent)]" />
                    ) : (
                      <Smartphone className="h-3.5 w-3.5 text-[var(--accent)]" />
                    )}
                    {project.featuredLabel}
                  </span>

                  <span className="font-mono-code text-[11px] text-[var(--text-muted)]">
                    0{idx + 1}
                  </span>
                </div>

                {/* Clean Architectural Header Block */}
                <div
                  onClick={() => onInspectProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onInspectProject(project);
                  }}
                  className="mt-4 cursor-pointer rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 transition group-hover:border-[var(--border-strong)]"
                >
                  <div className="flex items-center justify-between font-mono-code text-[10px] text-[var(--text-muted)]">
                    <span>{project.category.toUpperCase()}</span>
                    <span className="inline-flex items-center gap-1 text-[var(--text-secondary)] group-hover:text-[var(--accent)]">
                      Inspect
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-[var(--text-primary)]">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    {project.subtitle}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {project.summary}
                </p>

                <ul className="mt-4 space-y-2">
                  {project.highlights.slice(0, 2).map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2.5 py-1 font-mono-code text-[11px] text-[var(--text-primary)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onInspectProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)] transition hover:underline"
                  >
                    <span>Architecture Breakdown</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition hover:border-[var(--border-strong)]"
                    >
                      <FolderGit2 className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                      <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                    </a>
                  ) : (
                    <span className="rounded-lg border border-[var(--border-subtle)] px-2.5 py-1 font-mono-code text-[10px] text-[var(--text-muted)]">
                      Pure Kotlin
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
