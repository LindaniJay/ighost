const galleryItems = [
  { title: 'Youth Camp Workshop', tag: 'Durban 2026' },
  { title: 'Women Empowerment Awards', tag: 'Johannesburg 2026' },
  { title: 'Community Drug Awareness', tag: 'KwaZulu-Natal 2026' },
  { title: 'Ambassador Onboarding', tag: 'Regional Program' },
  { title: 'Artist Showcase Night', tag: 'Flagship Event' },
  { title: 'Leadership Training Lab', tag: 'Monthly Session' },
];

export default function GalleryPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="rise">
        <span className="kicker">Visual Archive</span>
        <h1
          className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-6xl"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Gallery
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
          A curated view of programs, events, and leadership moments from the IGHOST community.
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, i) => (
          <article key={item.title} className="panel rise overflow-hidden" style={{ animationDelay: `${i * 70}ms` }}>
            <div className="aspect-[4/3] bg-[linear-gradient(135deg,#dde5f1,#f0ebe2)] p-5">
              <div className="h-full w-full rounded-xl border border-white/70 bg-[rgba(255,255,255,0.65)]" />
            </div>
            <div className="p-5">
              <h2
                className="text-lg font-semibold text-[#1e3150]"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-muted">{item.tag}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
