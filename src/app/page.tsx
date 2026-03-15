import Link from 'next/link';

const servicePillars = [
  {
    title: 'Artist Development',
    text: 'Mentorship, stage craft, branding, and practical growth paths for emerging talent.',
  },
  {
    title: 'Community Programs',
    text: 'Wellness, awareness, and leadership programs designed for long-term social impact.',
  },
  {
    title: 'Creative Commerce',
    text: 'Merchandise and partnerships that fund projects and keep opportunities sustainable.',
  },
];

const performanceStats = [
  { value: '500+', label: 'Artists Supported' },
  { value: '50+', label: 'Events Executed' },
  { value: '1,000+', label: 'Youth Reached' },
  { value: '10+', label: 'Years Collective Experience' },
];

const operatingModel = [
  {
    title: 'Discovery',
    text: 'Talent identification through auditions, referrals, and community scouting sessions.',
  },
  {
    title: 'Development',
    text: 'Structured coaching in performance, communication, professionalism, and digital presence.',
  },
  {
    title: 'Deployment',
    text: 'Placement into events, campaigns, partnerships, and public opportunities for real-world growth.',
  },
];

const focusAreas = [
  'Youth empowerment programs in underserved communities',
  'Women leadership and visibility initiatives',
  'Substance-abuse awareness and recovery advocacy',
  'Creative economy pathways for sustainable income',
];

export default function Home() {
  return (
    <div>
      <section className="app-shell section-spacing pt-12 md:pt-16">
        <div className="grid gap-8 md:grid-cols-[1.3fr_0.9fr] md:items-end">
          <div className="rise">
            <span className="kicker">New Design System</span>
            <h1
              className="architect-heading mt-5 text-4xl font-semibold text-[#121522] sm:text-6xl lg:text-7xl"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Building Culture With Intentional Structure
            </h1>
            <p className="mt-6 max-w-2xl text-base text-muted md:text-lg">
              IGHOST blends entertainment, education, and leadership into a single professional
              ecosystem for artists and communities. Every program is designed with purpose,
              quality, and measurable outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/events" className="btn-primary">
                Explore Programs
              </Link>
              <Link href="/about" className="btn-secondary">
                See Our Foundation
              </Link>
            </div>
          </div>

          <div className="panel rise p-6" style={{ animationDelay: '120ms' }}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7695]">
              2026 Focus
            </p>
            <h2
              className="mt-2 text-2xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Architecture of Opportunity
            </h2>
            <p className="mt-3 text-sm text-muted">
              Delivering high-quality events, ambassador pathways, and public programs that help
              young leaders become visible, skilled, and employable.
            </p>
            <div className="mt-6 space-y-3">
              {['Live experiences', 'Leadership training', 'Brand collaboration'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl border border-[#d8dde6] bg-white px-3 py-2">
                  <span className="text-sm font-medium text-[#243041]">{item}</span>
                  <span className="h-2 w-2 rounded-full bg-[#caa86a]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="app-shell section-spacing pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {performanceStats.map((stat, index) => (
            <article key={stat.label} className="panel rise p-5" style={{ animationDelay: `${index * 80}ms` }}>
              <p
                className="text-3xl font-semibold text-[#121522]"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="app-shell section-spacing">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <span className="kicker">What We Build</span>
            <h2
              className="architect-heading mt-4 text-3xl font-semibold text-[#121522] md:text-4xl"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              Three Pillars, One Mission
            </h2>
          </div>
          <Link href="/contact" className="btn-secondary hidden sm:inline-flex">
            Start a Collaboration
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {servicePillars.map((pillar, index) => (
            <article key={pillar.title} className="panel rise p-6" style={{ animationDelay: `${index * 90}ms` }}>
              <h3
                className="text-xl font-semibold text-[#121522]"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="app-shell section-spacing pt-2">
        <div className="mb-7">
          <span className="kicker">How We Operate</span>
          <h2
            className="architect-heading mt-4 text-3xl font-semibold text-[#121522] md:text-4xl"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            A Practical Model for Scalable Impact
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted md:text-base">
            Our programs are built like a professional pipeline, not one-off activations. Each
            participant moves through clear stages with measurable outcomes.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {operatingModel.map((step, index) => (
            <article key={step.title} className="panel rise p-6" style={{ animationDelay: `${index * 85}ms` }}>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">
                Stage {index + 1}
              </p>
              <h3
                className="mt-2 text-2xl font-semibold text-[#121522]"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="app-shell section-spacing pt-2">
        <div className="panel rise p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1.15fr_1fr] md:items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">
                2026 Strategic Priorities
              </span>
              <h2
                className="mt-2 text-3xl font-semibold text-[#121522] md:text-4xl"
                style={{ fontFamily: 'var(--font-space), sans-serif' }}
              >
                Focus Areas We Are Expanding
              </h2>
              <p className="mt-3 text-sm text-muted md:text-base">
                IGHOST is increasing geographic reach, improving program quality, and creating more
                direct opportunities for youth and creative professionals in South Africa.
              </p>
            </div>

            <ul className="grid gap-3">
              {focusAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3 text-sm text-[#263244]"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="app-shell section-spacing pt-2">
        <div className="rounded-[1.6rem] border border-[#d4d9e2] bg-[linear-gradient(130deg,#1d2a3d,#2e4f7a)] px-6 py-10 text-white md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#d9e4f5]">Join IGHOST</p>
          <h2
            className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Bring your talent into a system that is designed to help it grow.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-[#d9e1ec] md:text-base">
            Register for upcoming events, apply to become an ambassador, or partner with us in
            building the next generation of creators.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/ambassadors" className="btn-secondary !border-white/35 !bg-white !text-[#1d2a3d]">
              Become an Ambassador
            </Link>
            <Link href="/events" className="btn-secondary !border-white/35 !bg-transparent !text-white hover:!bg-white/10">
              View Event Calendar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
