"use client";

import React, { useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import app from '../../utils/firebase';
import { defaultEvents, defaultProducts, type EventItem, type ProductItem } from '../../utils/contentData';

type ManagedEvent = EventItem & { id: string };
type ManagedProduct = ProductItem & { id: string };

type TabMode = 'events' | 'products';

const ACCESS_STORAGE_KEY = 'ighost-admin-unlocked';

const emptyEventForm: EventItem = {
  title: '',
  date: '',
  location: '',
  description: '',
  stream: '',
  format: 'In Person',
  seatsLeft: 0,
};

const emptyProductForm: ProductItem = {
  image: '',
  name: '',
  price: 0,
  sizes: ['S', 'M', 'L'],
  category: 'IGHOST Signature',
  edition: '2026 Capsule',
};

function parseEvent(raw: Record<string, unknown>, id: string): ManagedEvent | null {
  const seats = Number(raw.seatsLeft);
  if (
    typeof raw.title !== 'string' ||
    typeof raw.date !== 'string' ||
    typeof raw.location !== 'string' ||
    typeof raw.description !== 'string' ||
    typeof raw.stream !== 'string' ||
    typeof raw.format !== 'string' ||
    Number.isNaN(seats)
  ) {
    return null;
  }

  return {
    id,
    title: raw.title,
    date: raw.date,
    location: raw.location,
    description: raw.description,
    stream: raw.stream,
    format: raw.format,
    seatsLeft: seats,
  };
}

function parseProduct(raw: Record<string, unknown>, id: string): ManagedProduct | null {
  const price = Number(raw.price);
  const sizes = Array.isArray(raw.sizes)
    ? raw.sizes.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];

  if (
    typeof raw.image !== 'string' ||
    typeof raw.name !== 'string' ||
    Number.isNaN(price) ||
    sizes.length === 0 ||
    typeof raw.category !== 'string' ||
    typeof raw.edition !== 'string'
  ) {
    return null;
  }

  return {
    id,
    image: raw.image,
    name: raw.name,
    price,
    sizes,
    category: raw.category,
    edition: raw.edition,
  };
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabMode>('events');
  const [events, setEvents] = useState<ManagedEvent[]>([]);
  const [products, setProducts] = useState<ManagedProduct[]>([]);
  const [eventForm, setEventForm] = useState<EventItem>(emptyEventForm);
  const [productForm, setProductForm] = useState<ProductItem>(emptyProductForm);
  const [eventEditId, setEventEditId] = useState<string | null>(null);
  const [productEditId, setProductEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accessInput, setAccessInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const adminCode = process.env.NEXT_PUBLIC_ADMIN_ACCESS_CODE;

  const hasContent = useMemo(() => events.length > 0 || products.length > 0, [events.length, products.length]);

  const loadContent = async () => {
    setLoading(true);
    setError(null);

    try {
      const db = getFirestore(app);

      const eventSnapshot = await getDocs(query(collection(db, 'events'), orderBy('createdAt', 'desc')));
      const parsedEvents = eventSnapshot.docs
        .map((item) => parseEvent(item.data() as Record<string, unknown>, item.id))
        .filter((item): item is ManagedEvent => item !== null);

      const productSnapshot = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')));
      const parsedProducts = productSnapshot.docs
        .map((item) => parseProduct(item.data() as Record<string, unknown>, item.id))
        .filter((item): item is ManagedProduct => item !== null);

      setEvents(parsedEvents);
      setProducts(parsedProducts);
    } catch {
      setError('Failed to load content. Check Firebase settings and Firestore rules.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!adminCode) {
      setUnlocked(true);
      return;
    }

    const wasUnlocked = typeof window !== 'undefined' && localStorage.getItem(ACCESS_STORAGE_KEY) === 'true';
    setUnlocked(wasUnlocked);
  }, [adminCode]);

  useEffect(() => {
    if (!unlocked) {
      return;
    }

    loadContent();
  }, [unlocked]);

  const handleUnlock = () => {
    if (!adminCode) {
      setUnlocked(true);
      return;
    }

    if (accessInput.trim() === adminCode) {
      setUnlocked(true);
      localStorage.setItem(ACCESS_STORAGE_KEY, 'true');
      setError(null);
      return;
    }

    setError('Invalid admin access code.');
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const db = getFirestore(app);
      const payload = {
        ...eventForm,
        seatsLeft: Number(eventForm.seatsLeft),
        updatedAt: serverTimestamp(),
      };

      if (eventEditId) {
        await updateDoc(doc(db, 'events', eventEditId), payload);
        setMessage('Event updated successfully.');
      } else {
        await addDoc(collection(db, 'events'), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        setMessage('Event created successfully.');
      }

      setEventForm(emptyEventForm);
      setEventEditId(null);
      await loadContent();
    } catch {
      setError('Could not save event.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const db = getFirestore(app);
      const payload = {
        ...productForm,
        price: Number(productForm.price),
        sizes: productForm.sizes,
        updatedAt: serverTimestamp(),
      };

      if (productEditId) {
        await updateDoc(doc(db, 'products', productEditId), payload);
        setMessage('Product updated successfully.');
      } else {
        await addDoc(collection(db, 'products'), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        setMessage('Product created successfully.');
      }

      setProductForm(emptyProductForm);
      setProductEditId(null);
      await loadContent();
    } catch {
      setError('Could not save product.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    setError(null);
    setMessage(null);

    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, 'events', id));
      setMessage('Event deleted.');
      await loadContent();
    } catch {
      setError('Could not delete event.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setError(null);
    setMessage(null);

    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, 'products', id));
      setMessage('Product deleted.');
      await loadContent();
    } catch {
      setError('Could not delete product.');
    }
  };

  const seedDefaults = async () => {
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const db = getFirestore(app);

      for (const eventItem of defaultEvents) {
        await addDoc(collection(db, 'events'), {
          ...eventItem,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      for (const productItem of defaultProducts) {
        await addDoc(collection(db, 'products'), {
          ...productItem,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      setMessage('Seeded default events and products.');
      await loadContent();
    } catch {
      setError('Could not seed default content.');
    } finally {
      setSaving(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="app-shell section-spacing">
        <section className="panel rise mx-auto max-w-lg p-6 md:p-8">
          <span className="kicker">Admin Access</span>
          <h1
            className="architect-heading mt-5 text-4xl font-semibold text-[#121522]"
            style={{ fontFamily: 'var(--font-space), sans-serif' }}
          >
            Unlock Content Manager
          </h1>
          <p className="mt-3 text-sm text-muted">
            Enter the admin access code to manage events and shop products without editing code.
          </p>

          <div className="mt-5">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#5e6673]">
              Access Code
            </label>
            <input
              type="password"
              value={accessInput}
              onChange={(e) => setAccessInput(e.target.value)}
              className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7695] focus:ring-2 focus:ring-[#d6dfec]"
              placeholder="Enter admin code"
            />
          </div>

          <button type="button" onClick={handleUnlock} className="btn-primary mt-5 w-full justify-center">
            Unlock Admin
          </button>

          {error && (
            <p className="mt-4 rounded-xl border border-[#e5c4c4] bg-[#fff4f4] px-4 py-3 text-sm text-[#8f2f2f]">
              {error}
            </p>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="app-shell section-spacing">

      {/* ── Header ── */}
      <section className="panel rise p-6 md:p-8">
        <span className="kicker">No-Code Content Manager</span>
        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1
              className="architect-heading text-4xl font-semibold text-[#121522] md:text-5xl"
              style={{ fontFamily: 'var(--font-space), sans-serif' }}
            >
              IGHOST Admin Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted">
              Manage live events and shop merch. Changes appear instantly on the public site.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {!hasContent && (
              <button type="button" onClick={seedDefaults} className="btn-secondary" disabled={saving}>
                {saving ? 'Seeding...' : 'Seed Starter Content'}
              </button>
            )}
            <button
              type="button"
              onClick={() => { setActiveTab('events'); setEventEditId(null); setEventForm(emptyEventForm); }}
              className="btn-secondary"
            >
              + Add Event
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('products'); setProductEditId(null); setProductForm(emptyProductForm); }}
              className="btn-primary"
            >
              + Add Merch
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Live Events</p>
            <p className="mt-1 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>{events.length}</p>
          </div>
          <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Live Merch</p>
            <p className="mt-1 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>{products.length}</p>
          </div>
          <div className="rounded-xl border border-[#d9dee8] bg-white px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5f7695]">Total Seats</p>
            <p className="mt-1 text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>{events.reduce((s, e) => s + e.seatsLeft, 0)}</p>
          </div>
        </div>

        {(message || error) && (
          <div className="mt-5">
            {message && (
              <p className="rounded-xl border border-[#b9d8c7] bg-[#edf8f2] px-4 py-3 text-sm text-[#1f6946]">{message}</p>
            )}
            {error && (
              <p className="rounded-xl border border-[#e5c4c4] bg-[#fff4f4] px-4 py-3 text-sm text-[#8f2f2f]">{error}</p>
            )}
          </div>
        )}
      </section>

      {/* ── Add / Edit Form ── */}
      {(activeTab === 'events' || eventEditId || activeTab === 'products' || productEditId) && (
        <section className="mt-6 panel rise p-6 md:p-8">
          {activeTab === 'events' ? (
            <form className="grid gap-4" onSubmit={handleSaveEvent}>
              <h2 className="text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                {eventEditId ? '✏️ Editing Event' : '+ New Event'}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={eventForm.title}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Event title"
                  className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm"
                  required
                />
                <input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, date: e.target.value }))}
                  className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm"
                  required
                />
              </div>
              <input
                value={eventForm.location}
                onChange={(e) => setEventForm((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Location"
                className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm"
                required
              />
              <textarea
                value={eventForm.description}
                onChange={(e) => setEventForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Description"
                rows={3}
                className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm"
                required
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <input
                  value={eventForm.stream}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, stream: e.target.value }))}
                  placeholder="Stream (e.g. Youth Development)"
                  className="rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm"
                  required
                />
                <input
                  value={eventForm.format}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, format: e.target.value }))}
                  placeholder="Format (e.g. In Person)"
                  className="rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm"
                  required
                />
                <input
                  type="number"
                  min={0}
                  value={eventForm.seatsLeft}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, seatsLeft: Number(e.target.value) }))}
                  placeholder="Seats available"
                  className="rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm"
                  required
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : eventEditId ? 'Update Event' : 'Create Event'}
                </button>
                <button
                  type="button"
                  onClick={() => { setEventEditId(null); setEventForm(emptyEventForm); }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <form className="grid gap-4" onSubmit={handleSaveProduct}>
              <h2 className="text-2xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                {productEditId ? '✏️ Editing Merch' : '+ New Merch Item'}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={productForm.name}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Product name"
                  className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm"
                  required
                />
                <input
                  value={productForm.image}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="Image path e.g. /tshirt.jpg"
                  className="w-full rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm"
                  required
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="number"
                  min={1}
                  value={productForm.price}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
                  placeholder="Price (ZAR)"
                  className="rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm"
                  required
                />
                <input
                  value={productForm.sizes.join(', ')}
                  onChange={(e) =>
                    setProductForm((prev) => ({
                      ...prev,
                      sizes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    }))
                  }
                  placeholder="Sizes e.g. S, M, L, XL"
                  className="rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm"
                  required
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={productForm.category}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, category: e.target.value }))}
                  placeholder="Category e.g. IGHOST Signature"
                  className="rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm"
                  required
                />
                <input
                  value={productForm.edition}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, edition: e.target.value }))}
                  placeholder="Edition e.g. 2026 Capsule"
                  className="rounded-xl border border-[#d2d7e0] bg-white px-4 py-3 text-sm"
                  required
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : productEditId ? 'Update Merch' : 'Create Merch'}
                </button>
                <button
                  type="button"
                  onClick={() => { setProductEditId(null); setProductForm(emptyProductForm); }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </section>
      )}

      {/* ── Live Events ── */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Live on Website</p>
            <h2 className="mt-1 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Events ({events.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => { setActiveTab('events'); setEventEditId(null); setEventForm(emptyEventForm); }}
            className="btn-secondary text-sm"
          >
            + Add Event
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-muted">Loading events...</p>
        ) : events.length === 0 ? (
          <div className="panel rise p-6 text-sm text-muted">
            No events yet. Click <strong>+ Add Event</strong> above to create one.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {events.map((item) => (
              <article key={item.id} className="panel rise overflow-hidden">
                <div className="inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#2e4f7a,#caa86a)]" />
                <div className="p-5">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-[#edf2f9] px-2.5 py-0.5 text-[11px] font-semibold text-[#2e4f7a]">{item.stream}</span>
                    <span className="rounded-full bg-[#f4f6f9] px-2.5 py-0.5 text-[11px] font-semibold text-[#4d6580]">{item.format}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      item.seatsLeft < 10
                        ? 'bg-[#fff4f4] text-[#8b3535]'
                        : 'bg-[#fbf6ec] text-[#765b2f]'
                    }`}>
                      {item.seatsLeft} seats
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{item.date}</p>
                  <p className="mt-0.5 text-xs text-muted">{item.location}</p>
                  <p className="mt-3 line-clamp-2 text-sm text-muted">{item.description}</p>
                </div>
                <div className="flex gap-2 border-t border-[#e8ecf1] bg-[#f7f9fc] px-5 py-3">
                  <button
                    type="button"
                    className="flex-1 rounded-lg bg-[#2e4f7a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#243c5d]"
                    onClick={() => {
                      setActiveTab('events');
                      setEventEditId(item.id);
                      setEventForm({
                        title: item.title, date: item.date, location: item.location,
                        description: item.description, stream: item.stream,
                        format: item.format, seatsLeft: item.seatsLeft,
                      });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Edit Event
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-[#e3caca] bg-white px-3 py-2 text-xs font-semibold text-[#8b3535] hover:bg-[#fff4f4]"
                    onClick={() => handleDeleteEvent(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ── Live Merch ── */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Live on Website</p>
            <h2 className="mt-1 text-3xl font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
              Shop Merch ({products.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => { setActiveTab('products'); setProductEditId(null); setProductForm(emptyProductForm); }}
            className="btn-primary text-sm"
          >
            + Add Merch
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-muted">Loading merch...</p>
        ) : products.length === 0 ? (
          <div className="panel rise p-6 text-sm text-muted">
            No merch yet. Click <strong>+ Add Merch</strong> above to create one.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((item) => (
              <article key={item.id} className="panel rise overflow-hidden">
                <div className="inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#caa86a,#2e4f7a)]" />
                <div className="p-5">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-[#fbf6ec] px-2.5 py-0.5 text-[11px] font-semibold text-[#765b2f]">{item.edition}</span>
                    <span className="rounded-full bg-[#f4f6f9] px-2.5 py-0.5 text-[11px] font-semibold text-[#4d6580]">{item.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#121522]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>
                    {item.name}
                  </h3>
                  <p className="mt-1 text-2xl font-semibold text-[#2e4f7a]" style={{ fontFamily: 'var(--font-space), sans-serif' }}>R{item.price}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.sizes.map((s) => (
                      <span key={s} className="rounded-full border border-[#d8dde6] bg-white px-2.5 py-0.5 text-xs font-medium text-[#344156]">{s}</span>
                    ))}
                  </div>
                  <p className="mt-2 truncate text-xs text-muted">{item.image}</p>
                </div>
                <div className="flex gap-2 border-t border-[#e8ecf1] bg-[#f7f9fc] px-5 py-3">
                  <button
                    type="button"
                    className="flex-1 rounded-lg bg-[#2e4f7a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#243c5d]"
                    onClick={() => {
                      setActiveTab('products');
                      setProductEditId(item.id);
                      setProductForm({
                        image: item.image, name: item.name, price: item.price,
                        sizes: item.sizes, category: item.category, edition: item.edition,
                      });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Edit Merch
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-[#e3caca] bg-white px-3 py-2 text-xs font-semibold text-[#8b3535] hover:bg-[#fff4f4]"
                    onClick={() => handleDeleteProduct(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
