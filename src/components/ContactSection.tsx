import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Mail, MapPin, Phone, Send } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface ContactSectionProps {
  onCopyToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onCopyToast }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const handleCopy = async (text: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      onCopyToast(`${field === 'email' ? 'Email' : 'Phone number'} copied`);
      window.setTimeout(() => setCopiedField(null), 1800);
    } catch {
      // Ignore clipboard failure silently
    }
  };

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(
      subject.trim() || `Portfolio Inquiry from ${name.trim() || 'Visitor'}`
    );
    const mailBody = encodeURIComponent(
      `Hi Milind,\n\n${message.trim() || 'I saw your portfolio and would like to connect.'}\n\nBest regards,\n${name.trim() || ''}`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${mailSubject}&body=${mailBody}`;
    onCopyToast('Opening your email client...');
  };

  return (
    <section id="contact" className="scroll-mt-24 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="surface-card overflow-hidden rounded-2xl p-5 sm:p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left Info */}
            <div className="min-w-0 lg:col-span-5">
              <span className="font-mono-code text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
                07 — Contact
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Let’s Build Something Reliable
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                Looking for internships, collaborative full-stack web builds (.NET, PHP, JS,
                MySQL), or cross-platform Flutter &amp; Kotlin mobile projects. Reach out directly
                or send a quick brief.
              </p>

              <div className="mt-7 space-y-3">
                <div className="flex items-center justify-between gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3.5">
                  <a
                    href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                    className="flex min-w-0 items-center gap-3 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)]"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                    <span className="truncate">{PORTFOLIO_DATA.profile.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(PORTFOLIO_DATA.profile.email, 'email')}
                    className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
                    aria-label="Copy email"
                  >
                    {copiedField === 'email' ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3.5">
                  <a
                    href={PORTFOLIO_DATA.profile.phoneHref}
                    className="flex items-center gap-3 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)]"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                    <span>{PORTFOLIO_DATA.profile.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(PORTFOLIO_DATA.profile.phone, 'phone')}
                    className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
                    aria-label="Copy phone"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3.5 text-sm text-[var(--text-secondary)]">
                  <MapPin className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                  <span>{PORTFOLIO_DATA.profile.location}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={PORTFOLIO_DATA.profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] transition hover:border-[var(--border-strong)]"
                >
                  <GitHubIcon className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PORTFOLIO_DATA.profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] transition hover:border-[var(--border-strong)]"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Right Quick Email Composer */}
            <form onSubmit={handleComposeSubmit} className="min-w-0 space-y-4 lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block font-mono-code text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Recruiter / Founder / Teammate"
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-1.5 block font-mono-code text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Topic / Role
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Internship / Full-Stack / Flutter"
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block font-mono-code text-xs font-medium text-[var(--text-secondary)]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share project details, internship opportunity, or technical question..."
                  className="w-full resize-none rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition hover:opacity-90 sm:w-auto"
              >
                <Send className="h-4 w-4" />
                <span>Send via Email Client</span>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
