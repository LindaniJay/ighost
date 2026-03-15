"use client";
import React from 'react';
import AmbassadorForm from '../../components/AmbassadorForm';

const requirements = [
  'R500 upfront contract payment',
  'Professional ID picture',
  'Certified ID copy or birth certificate (below 18)',
  'Proof of residence',
  'Active TikTok or Facebook Account',
  'Follow all our social media pages',
  'Active contact number',
  'Proof of Account (Banking details and address)'
];

const benefits = [
  'Black Ghost Membership T-shirt',
  'Leadership & training skills',
  'Airtime every month end',
  'Discounts on event tickets and clothing',
  'Free photoshoots',
  'Commission for referrals',
  'Charity work beneficiaries',
  'Free Ghost items for 10+ customers monthly',
  'Paying gigs & extra support',
  'Free tickets to select events'
];

export default function AmbassadorsPage() {
  return (
    <div className="app-shell section-spacing">
      <section className="rise">
        <span className="kicker">Ambassador Program</span>
        <h1
          className="architect-heading mt-5 text-4xl font-semibold text-[#121522] md:text-6xl"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Represent the Brand With Purpose
        </h1>
        <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">
          Join a structured leadership pathway where ambassadors support events, amplify our
          message, and grow through training, exposure, and real responsibility.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="panel p-6 md:p-7 rise">
          <h2
            className="text-2xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Requirements
          </h2>
          <ul className="mt-4 space-y-2">
            {requirements.map((req, idx) => (
              <li key={idx} className="rounded-lg border border-[#d7dce5] bg-white px-3 py-2 text-sm text-[#2d3746]">
                {req}
              </li>
            ))}
          </ul>
        </article>

        <article className="panel p-6 md:p-7 rise" style={{ animationDelay: '90ms' }}>
          <h2
            className="text-2xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Benefits
          </h2>
          <ul className="mt-4 space-y-2">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="rounded-lg border border-[#d7dce5] bg-white px-3 py-2 text-sm text-[#2d3746]">
                {benefit}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 rise">
        <AmbassadorForm onSubmit={() => {}} />
      </section>

      <section className="mt-8 panel p-6 md:p-7 rise" style={{ animationDelay: '140ms' }}>
        <h2
          className="text-2xl font-semibold text-[#121522]"
          style={{ fontFamily: 'var(--font-space), sans-serif' }}
        >
          Terms and Commitments
        </h2>
        <div className="mt-4 space-y-3 text-sm text-muted">
          <p>
            The ambassador role runs on a 12-month contract and includes attendance at official
            events, shoots, and campaign activities.
          </p>
          <p>
            IGHOST may use approved ambassador content for promotional and community engagement
            purposes across digital and event channels.
          </p>
          <p className="font-medium text-[#243041]">
            We expect ambassadors to lead by example and represent the values of the organization.
          </p>
        </div>
      </section>
    </div>
  );
}
