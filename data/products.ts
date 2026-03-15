import type { Product } from './types';

export const products: Product[] = [
  {
    id: '01',
    slug: 'nordfjord-tote',
    name: 'Nordfjord Tote',
    category: 'bags',
    price: 680,
    currency: 'EUR',
    description: `The Nordfjord Tote is an exercise in material honesty. The body is cut from a single, uninterrupted hide sourced from Badalassi Carlo in Pescia — one of the last Italian tanneries still operating pit vats for vegetable tannage. No patchwork. No seams at the base. The hide does what it is asked of it, or it doesn't make the cut.

Every edge is hand-bevelled, then burnished progressively through three grits of bone and beeswax until the cross-section closes into a hard, smooth ridge. Sixteen stitches per inch, saddle-stitched by hand with 0.8mm waxed linen thread in a tone matched to the hide. The stitching pulls slightly tighter at the corners — a deliberate choice that distributes load across the stitch line rather than concentrating stress at the holes.

The handles are formed from doubled leather, bonded with contact cement and burnished into a single thickness before stitching. They will soften over the first months of carry, conforming gradually to the grip that holds them. This is not a flaw. This is the point.`,
    material: 'Full-grain vegetable-tanned pull-up leather, Badalassi Carlo Pueblo, natural tan',
    construction: 'Hand saddle-stitched with 0.8mm waxed linen thread, sixteen stitches per inch. Edges hand-bevelled and burnished with bone and beeswax. Solid brass D-rings, rivets, and feet.',
    dimensions: { height: '38', width: '34', depth: '14', unit: 'cm' },
    images: [
      { src: '/images/products/nordfjord-tote-1.svg', alt: 'Nordfjord Tote in natural tan Badalassi Carlo Pueblo leather, front view', priority: true },
      { src: '/images/products/nordfjord-tote-2.svg', alt: 'Nordfjord Tote handle detail showing burnished edges and saddle stitching', priority: false },
      { src: '/images/products/nordfjord-tote-3.svg', alt: 'Nordfjord Tote base showing solid brass feet and single-piece construction', priority: false },
    ],
    tannery: [{ name: 'Badalassi Carlo' }],
  },
  {
    id: '02',
    slug: 'stillhet-messenger',
    name: 'Stillhet Messenger',
    category: 'bags',
    price: 520,
    currency: 'EUR',
    description: `The Stillhet Messenger was designed for daily carry over many years, not seasons. The body is structured — it holds its form empty as well as full — using a 3mm Conceria Walpier Buttero insert between the outer shell and the interior lining. Buttero is a dense, close-fibre vegetable tan from the Walpier tannery in Pontassieve; it does not stretch, it does not sag, and it improves visibly with use.

The shoulder strap is adjustable via a solid brass slider with no moving parts that can fail. The strap leather is the same thickness as the bag body — 3mm — skived at the ends only where it meets the brass hardware. The front pocket closes with a solid brass turn-clasp, not a snap or a zip. The clasp can be operated with one hand, through a winter glove.

A single interior organisation pocket in natural canvas sits flat against the rear wall. The zip on the main compartment is YKK brass throughout — slider, teeth, and pull. This is not a budget component. It is chosen because it will outlast the bag if the bag is treated well.`,
    material: 'Full-grain vegetable-tanned leather, Conceria Walpier Buttero, dark espresso',
    construction: 'Machine-stitched body seams reinforced at stress points. Hand-finished edges with three-coat edge paint. Solid brass hardware throughout. YKK brass zip on main compartment.',
    dimensions: { height: '29', width: '37', depth: '9', unit: 'cm' },
    images: [
      { src: '/images/products/stillhet-messenger-1.svg', alt: 'Stillhet Messenger in dark espresso Conceria Walpier Buttero leather', priority: true },
      { src: '/images/products/stillhet-messenger-2.svg', alt: 'Stillhet Messenger strap and brass slider detail', priority: false },
      { src: '/images/products/stillhet-messenger-3.svg', alt: 'Stillhet Messenger front pocket with brass turn-clasp', priority: false },
    ],
    tannery: [{ name: 'WALPIER', url: 'http://www.conceriawalpier.com/' }],
  },
  {
    id: '11',
    slug: 'vaskebjornen-1',
    name: 'Vaskebjornen #1',
    category: 'wallets',
    price: 899,
    currency: 'DKK',
    description: `Handmade bi-fold wallet crafted from premium Italian leather by Puccini Attilio. The interior uses the leather's natural flesh side, hand-burnished for a silky, protective finish. Every edge is skived, hand-sanded, and burnished to a smooth, durable ridge. Hand-stitched with heavy-duty nylon thread from Crimson Hides, the wallet is built for daily use and designed to develop a rich patina over time. Compact, meticulously finished, and made to last — a timeless accessory where detail and material integrity lead.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-1-2.png', alt: 'Bifold wallet interior', priority: true },
      { src: '/images/products/vaskebjornen-1-1.png', alt: 'Bifold wallet exterior', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
  {
    id: '12',
    slug: 'vaskebjornen-2',
    name: 'Vaskebjornen #2',
    category: 'wallets',
    price: 899,
    currency: 'DKK',
    description: `Handmade bi-fold wallet combining a Conceria Walpier Buttero exterior with Puccini Maremma inner pockets for a rich, tactile contrast. The interior shows the leather's natural flesh side, hand-burnished to a smooth, protective finish. All edges are skived, hand-sanded, and burnished to a satiny, durable ridge. Hand-stitched with heavy-duty nylon thread from Crimson Hides, the wallet is built for everyday use and designed to develop a deep, characterful patina over time. Compact, meticulously finished, and made to last.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-2-1.png', alt: 'vaskebjornen-2-1', priority: true },
      { src: '/images/products/vaskebjornen-2-2.png', alt: 'vaskebjornen-2-2', priority: false }
    ],
    tannery: [{ name: 'WALPIER' , url: 'http://www.conceriawalpier.com/'}],
  },
  {
    id: '13',
    slug: 'vaskebjornen-3',
    name: 'Vaskebjornen #3',
    category: 'wallets',
    price: 899,
    currency: 'DKK',
    description: `Handmade bi-fold wallet pairing a Saffiano-printed calfskin exterior with bright Puccini Bisanzio inner pockets for a contemporary, textured look. A smooth sheepskin lining protects contents and adds a silky feel to the interior. Edges are precisely skived, hand-sanded, and burnished for a refined, hard-wearing finish. Hand-stitched using heavy-duty nylon thread from Crimson Hides, the construction prioritises strength and longevity while maintaining a sleeker, more modern aesthetic.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-3-1.png', alt: 'vaskebjornen-3-1', priority: true },
      { src: '/images/products/vaskebjornen-3-2.png', alt: 'vaskebjornen-3-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
  {
    id: '14',
    slug: 'vaskebjornen-4',
    name: 'Vaskebjornen #4',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `Handmade bi-fold wallet crafted from aniline box calf with Tempesti "Maine Liscio" pocketing, balancing supple hand-feel with refined structure. The interior features a smooth goatskin lining for durability and a luxurious touch. Each edge is skived, hand-sanded, and burnished to a lasting, satiny finish. Hand-stitched with heavy-duty nylon thread from Crimson Hides, the wallet is built to withstand daily use and age gracefully, becoming more personal with wear.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-4-1.png', alt: 'vaskebjornen-4-1', priority: true },
      { src: '/images/products/vaskebjornen-4-2.png', alt: 'vaskebjornen-4-2', priority: false }
    ],
    tannery: [{ name: 'Tempesti' , url: 'http://www.tempesti.com'}],
  },
  {
    id: '15',
    slug: 'vaskebjornen-5',
    name: 'Vaskebjornen #5',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `Handmade bi-fold wallet crafted from premium Italian leathers, this refined bi-fold pairs a Walpier "Buttero" exterior with Puccini "Palmelatto" interior pockets for a rich, tactile finish. A smooth goatskin lining protects contents while adding a luxurious, silky feel.

Every edge is skived, hand-sanded, and burnished to a satiny, durable finish. The wallet is hand-stitched with heavy-duty nylon thread from Crimson Hides for exceptional strength and lasting reliability. Thoughtfully finished and built to age beautifully, it’s a timeless accessory where material integrity and meticulous hand craftsmanship are front and center.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-5-1.png', alt: 'vaskebjornen-5-1', priority: true },
      { src: '/images/products/vaskebjornen-5-2.png', alt: 'vaskebjornen-5-2', priority: false }
    ],
    tannery: [{ name: 'WALPIER' , url: 'http://www.conceriawalpier.com/'}],
  },
  {
    id: '16',
    slug: 'vaskebjornen-6',
    name: 'Vaskebjornen #6',
    category: 'wallets',
    price: 899,
    currency: 'DKK',
    description: `Handmade bi-fold wallet in beautiful Il Ponte "Mozart" leather. The interior shows the leather's natural flesh side, hand-burnished to a smooth, protective finish. All edges are skived, hand-sanded, and painted. Hand-stitched with heavy-duty nylon thread from Crimson Hides, the wallet is built for everyday use and designed to develop a deep, unique patina over time. Compact, light, yet made to last.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-6-1.png', alt: 'vaskebjornen-6-1', priority: true },
      { src: '/images/products/vaskebjornen-6-2.png', alt: 'vaskebjornen-6-2', priority: false }
    ],
    tannery: [{ name: 'Il Ponte' , url: 'http://www.conceriailponte.it'}],
  },
  {
    id: '17',
    slug: 'vaskebjornen-7',
    name: 'Vaskebjornen #7',
    category: 'wallets',
    price: 899,
    currency: 'DKK',
    description: `Handmade bi-fold wallet in Puccini Attilio “Maremma” exterior with textured “Palmelatto” inner pockets. The interior is lined in silky sheepskin for a luxurious, protective feel. Edges skived, hand‑sanded, and burnished to a smooth, durable ridge; all seams are hand‑stitched with heavy‑duty nylon thread from Crimson Hides for exceptional strength. Thoughtfully proportioned and precisely finished, it’s built for daily use and designed to develop a rich, characterful patina over time. Compact, refined, and made to last.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-7-1.png', alt: 'vaskebjornen-7-1', priority: true },
      { src: '/images/products/vaskebjornen-7-2.png', alt: 'vaskebjornen-7-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
  {
    id: '18',
    slug: 'vaskebjornen-8',
    name: 'Vaskebjornen #8',
    category: 'wallets',
    price: 799,
    currency: 'DKK',
    description: `Handmade bi-fold wallet crafted from premium Italian leather by Puccini Attilio. The interior uses the leather's natural flesh side, hand-burnished for a silky, protective finish. Every edge is skived, hand-sanded, and burnished to a smooth, durable ridge. Hand-stitched with heavy-duty nylon thread from Crimson Hides, the wallet is built for daily use and designed to develop a rich patina over time. Compact, and ultra light — a timeless accessory where detail and material integrity lead.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-8-1.png', alt: 'vaskebjornen-8-1', priority: true },
      { src: '/images/products/vaskebjornen-8-2.png', alt: 'vaskebjornen-8-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
  {
    id: '19',
    slug: 'vaskebjornen-9',
    name: 'Vaskebjornen #9',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `Handmade bi-fold wallet pairing a Saffiano-printed calfskin exterior with vachetta inner pockets for a contemporary, textured look. A luxurious cognac nubuck lining gives the interior a unique touch. Edges are precisely skived, hand-sanded, and paited for a refined, hard-wearing finish. Hand-stitched using heavy-duty nylon thread from Crimson Hides, the construction prioritises strength and longevity.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-9-1.png', alt: 'vaskebjornen-9-1', priority: true },
      { src: '/images/products/vaskebjornen-9-2.png', alt: 'vaskebjornen-9-2', priority: false }
    ],
    tannery: [{ name: 'M.P.G. Industria Conciaria' , url: 'http://www.mpg.it'}],
  },
      {
    id: '20',
    slug: 'vaskebjornen-10',
    name: 'Vaskebjornen #10',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `Handmade bi-fold wallet in Puccini Attilio “Maremma” exterior with textured “Palmelatto” inner pockets. The interior is lined in black sheepskin for a luxurious, protective feel. Edges skived, hand‑sanded, and painted; all seams are hand‑stitched with heavy‑duty nylon thread from Crimson Hides for exceptional strength. Retains its refined surface while softening to a more comfortable hand with everyday use — subtle surface character rather than a traditional patina. One of our most beautiful products, this one is a maker's favorite.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-10-1.png', alt: 'vaskebjornen-10-1', priority: true },
      { src: '/images/products/vaskebjornen-10-2.png', alt: 'vaskebjornen-10-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
  {
    id: '21',
    slug: 'vaskebjornen-11',
    name: 'Vaskebjornen #11',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `Handmade bi-fold wallet in Puccini Attilio “Maremma” exterior. The interior is lined in black suede (velour) sheepskin for a luxurious, ultra soft feel. Edges skived, hand‑sanded, and burnished; all seams are hand‑stitched with heavy‑duty nylon thread from Crimson Hides for exceptional strength. Retains its refined surface while softening to a more comfortable hand with everyday use — subtle surface character rather than a traditional patina. A maker's favorite.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-11-1.png', alt: 'vaskebjornen-11-1', priority: true },
      { src: '/images/products/vaskebjornen-11-2.png', alt: 'vaskebjornen-11-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
];
