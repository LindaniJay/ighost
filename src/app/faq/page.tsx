const faqs = [
  {
    question: 'How do I become an ambassador?',
    answer: 'Visit the Ambassadors page, review the requirements, and submit your application with the requested supporting details.'
  },
  {
    question: 'How do I register for an event?',
    answer: 'Go to the Events page, choose the event you want, and submit your registration so the team can follow up.'
  },
  {
    question: 'What are the ambassador requirements?',
    answer: 'The PDF lists an upfront R500 contract payment, a professional ID picture, proof of residence, a certified ID copy or birth certificate for minors, proof of account, an active contact number, and active social media participation.'
  },
  {
    question: 'How can I contact IGHOST?',
    answer: 'The presentation highlights WhatsApp on +27 65 252 3189 as the main contact channel.'
  },
  {
    question: 'What does IGHOST focus on?',
    answer: 'IGHOST focuses on talent development, artists health, women empowerment, and drug awareness.'
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
          Common questions based on the IGHOST presentation, ambassador program, and event process.
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
