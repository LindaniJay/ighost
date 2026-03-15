export type EventItem = {
  title: string;
  date: string;
  location: string;
  description: string;
  stream: string;
  format: string;
  seatsLeft: number;
};

export type ProductItem = {
  image: string;
  name: string;
  price: number;
  sizes: string[];
  category: string;
  edition: string;
};

export const defaultEvents: EventItem[] = [
  {
    title: 'IGHOST Summer Camp',
    date: '2026-12-10',
    location: 'Durban Beach Resort',
    description:
      'A week-long camp for young artists and leaders. Workshops, performances, and practical leadership labs.',
    stream: 'Youth Development',
    format: 'In Person',
    seatsLeft: 38,
  },
  {
    title: 'Women Empowerment Awards',
    date: '2026-08-09',
    location: 'Johannesburg Civic Theatre',
    description:
      'Celebrating women in arts and leadership through awards, keynote sessions, and strategic networking.',
    stream: 'Women Empowerment',
    format: 'Hybrid',
    seatsLeft: 72,
  },
  {
    title: 'Drug Awareness Retreat',
    date: '2026-06-15',
    location: 'Drakensberg Retreat Center',
    description:
      'A wellness retreat focused on awareness, mental health, and sustainable personal growth for communities.',
    stream: 'Social Wellness',
    format: 'In Person',
    seatsLeft: 24,
  },
];

export const defaultProducts: ProductItem[] = [
  {
    image: '/tshirt-black.jpg',
    name: 'Black Ghost T-shirt',
    price: 250,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'IGHOST Signature',
    edition: '2026 Capsule',
  },
  {
    image: '/hoodie-purple.jpg',
    name: 'Signature Indigo Hoodie',
    price: 450,
    sizes: ['M', 'L', 'XL'],
    category: 'IGHOST Signature',
    edition: '2026 Capsule',
  },
  {
    image: '/cap-neon.jpg',
    name: 'Studio Heritage Cap',
    price: 120,
    sizes: ['One Size'],
    category: 'IGHOST Accessories',
    edition: '2026 Capsule',
  },
];
