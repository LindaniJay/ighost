import React from 'react';

const timeline = [
  { year: '2021', text: 'IGHOST founded by Miss A. Mhlongo (iGhostikazi).' },
  { year: '2022', text: 'First summer camps and youth stage programs launched.' },
  { year: '2023', text: 'Women empowerment and awareness initiatives expanded.' },
  { year: '2024', text: 'Regional partnerships increased public reach and impact.' },
  { year: '2025+', text: 'Scaling creative leadership programs across communities.' },
];

export default function AboutPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="rise">
        <span className="kicker">About IGHOST</span>
        <h1
          className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-6xl"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Designed for Impact, Built for People
        </h1>
        <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">
          IGHOST is a non-profit creative platform that uses events, mentorship, and educational
          experiences to unlock potential in artists and communities.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="panel p-6 md:p-8 rise">
          <h2
            className="text-2xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Mission
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Connect talented individuals with practical opportunities, guidance, and exposure that
            lead to confidence, craft, and long-term success.
          </p>
        </article>

        <article className="panel p-6 md:p-8 rise" style={{ animationDelay: '90ms' }}>
          <h2
            className="text-2xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Vision
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Become a benchmark for creative empowerment in South Africa, recognized for integrity,
            innovation, and measurable social value.
          </p>
        </article>
      </section>

      <section className="mt-8 panel p-6 md:p-8 rise">
        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Core Values</span>
            <h2
              className="mt-2 text-3xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Integrity. Empowerment. Creativity.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {['Transparency in action', 'Leadership through service', 'Expression with purpose'].map((value) => (
              <div key={value} className="rounded-xl border border-[#d9dee8] bg-white px-4 py-4 text-sm text-[#263244]">
                {value}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rise">
        <h2
          className="text-3xl font-semibold text-[#121522] md:text-4xl"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Milestones
        </h2>
        <div className="mt-5 space-y-3">
          {timeline.map((item, idx) => (
            <article key={item.year} className="panel flex flex-col gap-2 p-5 md:flex-row md:items-center md:gap-5" style={{ animationDelay: `${idx * 70}ms` }}>
              <span
                className="text-lg font-semibold text-[#2e4f7a]"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                {item.year}
              </span>
              <p className="text-sm text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
