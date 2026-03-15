"use client";
import React from 'react';
import { ClockIcon, EventIcon, LocationIcon } from './Icons';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  stream?: string;
  format?: string;
  seatsLeft?: number;
  onRegister?: () => void;
  disabled?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  title, 
  date, 
  location, 
  description, 
  stream,
  format,
  seatsLeft,
  onRegister, 
  disabled 
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-ZA', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const eventYear = new Date(date).getFullYear();

  return (
    <article className="panel group relative overflow-hidden p-6 md:p-7 rise">
      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-[rgba(202,168,106,0.2)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#2e4f7a,#caa86a)]" />

      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-[#d3d8e2] bg-[#f6f8fc] text-[#2e4f7a]">
            <EventIcon size={20} />
          </div>
          <div>
            <h3
              className="text-xl font-semibold text-[#121522]"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              {title}
            </h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted">
              <LocationIcon size={15} className="text-[#5f7695]" />
              {location}
            </p>
          </div>
        </div>

        <span className="rounded-full border border-[#d7dde7] bg-white px-2.5 py-1 text-xs font-semibold tracking-[0.08em] text-[#45618a]">
          {eventYear}
        </span>
      </div>

      {(stream || format || typeof seatsLeft === 'number') && (
        <div className="mb-4 flex flex-wrap gap-2">
          {stream && (
            <span className="rounded-full border border-[#d7dde7] bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#45618a]">
              {stream}
            </span>
          )}
          {format && (
            <span className="rounded-full border border-[#d7dde7] bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#45618a]">
              {format}
            </span>
          )}
          {typeof seatsLeft === 'number' && (
            <span className="rounded-full border border-[#e0d4be] bg-[#fbf6ec] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#765b2f]">
              {seatsLeft} seats left
            </span>
          )}
        </div>
      )}

      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d8dde6] bg-white px-3 py-1.5 text-sm font-medium text-[#263248]">
        <ClockIcon size={16} className="text-[#5f7695]" />
        {formattedDate}
      </div>

      <p className="mb-7 text-sm leading-relaxed text-muted">{description}</p>

      {onRegister && (
        <button
          className={`w-full rounded-xl px-4 py-3 text-sm font-semibold ${
            disabled
              ? 'cursor-not-allowed bg-[#d8dce5] text-[#616a79]'
              : 'bg-[#2e4f7a] text-white hover:bg-[#243c5d] group-hover:shadow-[0_8px_20px_rgba(36,60,93,0.28)]'
          }`}
          onClick={onRegister}
          disabled={disabled}
        >
          {disabled ? 'Registering...' : 'Register for Event'}
        </button>
      )}
    </article>
  );
};

export default EventCard;