const faqs = [
  {
    question: 'How do I become an ambassador?',
    answer: 'Visit the Ambassadors page and fill out the application form.'
  },
  {
    question: 'How do I register for an event?',
    answer: 'Go to the Events page and click Register on your chosen event.'
  },
  {
    question: 'How do I buy IGHOST merchandise?',
    answer: 'Browse the Shop page and add items to your cart.'
  },
  {
    question: 'How can I contact IGHOST?',
    answer: 'Use the Contact page to send us a message.'
  }
];

export default function FAQPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="rise">
        <span className="kicker">FAQ</span>
        <h1
          className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-6xl"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Frequently Asked Questions
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
          Common questions about events, ambassador applications, and IGHOST services.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        {faqs.map((faq, idx) => (
          <article key={idx} className="panel rise p-5 md:p-6" style={{ animationDelay: `${idx * 70}ms` }}>
            <h2
              className="text-lg font-semibold text-[#1d2f4a]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              {faq.question}
            </h2>
            <p className="mt-2 text-sm text-muted">{faq.answer}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
