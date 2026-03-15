const testimonials = [
  {
    name: 'Sipho M.',
    text: 'IGHOST helped me discover my talent and gave me the confidence to perform on stage. The camps are amazing!'
  },
  {
    name: 'Thandi N.',
    text: 'Being an ambassador has opened doors for me. The support and training are top-notch.'
  },
  {
    name: 'Lerato K.',
    text: 'I love the IGHOST merchandise and the community. Everyone is so welcoming and supportive.'
  }
];

export default function TestimonialsPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="rise">
        <span className="kicker">Community Voices</span>
        <h1
          className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-6xl"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Testimonials
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
          Real feedback from members of our artist and ambassador community.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        {testimonials.map((t, idx) => (
          <article key={idx} className="panel rise p-6 md:p-8" style={{ animationDelay: `${idx * 80}ms` }}>
            <p className="text-lg leading-relaxed text-[#263345] md:text-xl">&quot;{t.text}&quot;</p>
            <p
              className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-[#2e4f7a]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              {t.name}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
