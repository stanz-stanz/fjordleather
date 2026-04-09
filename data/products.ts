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
    tannery: [{ name: 'Walpier', url: 'http://www.conceriawalpier.com/' }],
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
    construction: 'Hand cut, hand stitched',
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
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-2-1.png', alt: 'vaskebjornen-2-1', priority: true },
      { src: '/images/products/vaskebjornen-2-2.png', alt: 'vaskebjornen-2-2', priority: false }
    ],
    tannery: [{ name: 'Walpier' , url: 'http://www.conceriawalpier.com/'}],
  },
    {
    id: '13',
    slug: 'vaskebjornen-3',
    name: 'Vaskebjornen #3',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `Handmade bi-fold wallet pairing a Saffiano-printed calfskin exterior with bright Puccini Bisanzio inner pockets for a contemporary, textured look. A smooth sheepskin lining protects contents and adds a silky feel to the interior. Edges are precisely skived, hand-sanded, and burnished for a refined, hard-wearing finish. Hand-stitched using heavy-duty nylon thread from Crimson Hides, the construction prioritises strength and longevity while maintaining a sleeker, more modern aesthetic.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
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
    construction: 'Hand cut, hand stitched',
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
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-5-1.png', alt: 'vaskebjornen-5-1', priority: true },
      { src: '/images/products/vaskebjornen-5-2.png', alt: 'vaskebjornen-5-2', priority: false }
    ],
    tannery: [{ name: 'Walpier' , url: 'http://www.conceriawalpier.com/'}],
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
    construction: 'Hand cut, hand stitched',
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
    price: 999,
    currency: 'DKK',
    description: `Handmade bi-fold wallet in Puccini Attilio “Maremma” exterior with textured “Palmelatto” inner pockets. The interior is lined in silky sheepskin for a luxurious, protective feel. Edges skived, hand‑sanded, and burnished to a smooth, durable ridge; all seams are hand‑stitched with heavy‑duty nylon thread from Crimson Hides for exceptional strength. Thoughtfully proportioned and precisely finished, it’s built for daily use and designed to develop a rich, characterful patina over time. Compact, refined, and made to last.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
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
    price: 899,
    currency: 'DKK',
    description: `Handmade bi-fold wallet crafted from premium Italian leather by Puccini Attilio. The interior uses the leather's natural flesh side, hand-burnished for a silky, protective finish. Every edge is skived, hand-sanded, and burnished to a smooth, durable ridge. Hand-stitched with heavy-duty nylon thread from Crimson Hides, the wallet is built for daily use and designed to develop a rich patina over time. Compact, and ultra light — a timeless accessory where detail and material integrity lead.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
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
    description: `Handmade bi-fold wallet pairing a Saffiano-printed calfskin exterior with vachetta inner pockets for a contemporary, textured look. A luxurious cognac nubuck lining gives the interior a unique touch. Edges are precisely skived, hand-sanded, and painted for a refined, hard-wearing finish. Hand-stitched using heavy-duty nylon thread from Crimson Hides, the construction prioritises strength and longevity.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
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
    construction: 'Hand cut, hand stitched',
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
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-11-1.png', alt: 'vaskebjornen-11-1', priority: true },
      { src: '/images/products/vaskebjornen-11-2.png', alt: 'vaskebjornen-11-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
  {
    id: '22',
    slug: 'vaskebjornen-12',
    name: 'Vaskebjornen #12',
    category: 'wallets',
    price: 1199,
    currency: 'DKK',
    description: `Handmade bi-fold wallet crafted from premium Italian leathers, this refined bi-fold pairs a Walpier "Buttero" exterior with a crocodile-embossed calfskin inlay for a unique look. A smooth goatskin lining adds a luxurious, silky feel.
Every edge is skived, hand-sanded, and burnished to a satiny, durable finish. The wallet is hand-stitched with heavy-duty nylon thread from Crimson Hides for exceptional strength and lasting reliability. Thoughtfully finished and built to age beautifully, it’s a timeless accessory where material integrity and meticulous hand craftsmanship are front and center.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-12-1.png', alt: 'vaskebjornen-12-1', priority: true },
      { src: '/images/products/vaskebjornen-12-2.png', alt: 'vaskebjornen-12-2', priority: false }
    ],
    tannery: [{ name: 'Walpier' , url: 'http://www.conceriawalpier.com/'}],
  },
  {
    id: '23',
    slug: 'vaskebjornen-13',
    name: 'Vaskebjornen #13',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `Handmade bi-fold wallet crafted from premium Italian leathers, this refined bi-fold pairs a Walpier "Buttero" exterior with Puccini "Palmelatto" interior pockets for a rich, tactile finish. A smooth goatskin lining protects contents while adding a luxurious, silky feel.

Every edge is skived, hand-sanded, and burnished to a satiny, durable finish. The wallet is hand-stitched with heavy-duty nylon thread from Crimson Hides for exceptional strength and lasting reliability. Thoughtfully finished and built to age beautifully, it’s a timeless accessory where material integrity and meticulous hand craftsmanship are front and center.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-13-1.png', alt: 'vaskebjornen-13-1', priority: true },
      { src: '/images/products/vaskebjornen-13-2.png', alt: 'vaskebjornen-13-2', priority: false }
    ],
    tannery: [{ name: 'Walpier' , url: 'http://www.conceriawalpier.com/'}],
  },
  {
    id: '24',
    slug: 'vaskebjornen-14',
    name: 'Vaskebjornen #14',
    category: 'wallets',
    price: 1399,
    currency: 'DKK',
    description: `A bi-fold wallet that opens like a small cabinet of wonders. Navy blue Tegu lizard skin on the outside — rare, tactile, impossible to ignore. Inside, Walpier Buttero leather lines the pockets with quiet elegance, while Kangaroo hide — one of the most resilient skins in the world — forms the backbone of the interior. Every edge skived, hand-sanded, and sealed with three coats of Giardini paint. Every stitch placed by hand, with heavy-duty thread from Crimson Hides. This is not a wallet you replace. It's one you keep for decades and pass on, a jewel in the Fjordleather catalog.

Note: Every exotic skin used at Fjordleather is traceable, responsibly sourced, and acquired exclusively through vendors operating within EU regulations.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-14-1.png', alt: 'vaskebjornen-14-1', priority: true },
      { src: '/images/products/vaskebjornen-14-2.png', alt: 'vaskebjornen-14-2', priority: false }
    ],
    tannery: [{ name: 'Walpier' , url: 'http://www.conceriawalpier.com/'}],
  },
  {
    id: '25',
    slug: 'vaskebjornen-15',
    name: 'Vaskebjornen #15',
    category: 'wallets',
    price: 899,
    currency: 'DKK',
    description: `A bi-fold wallet stripped to its essentials. The exterior wears Puccini Attilio's Bisanzio leather in a warm copper tone — rich, alive, unmistakably Italian. Turn it over and the inside reveals the hide's natural flesh side: soft, unfinished, honest. Every edge skived and hand-sanded. Every stitch placed by hand with Crimson Hides thread. Compact enough to forget it's there. Built well enough that you never will.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-15-1.png', alt: 'vaskebjornen-15-1', priority: true },
      { src: '/images/products/vaskebjornen-15-2.png', alt: 'vaskebjornen-15-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
    {
    id: '26',
    slug: 'vaskebjornen-16',
    name: 'Vaskebjornen #16',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `Badalassi Pueblo leather in sun-warmed amber — the kind of hide that only gets better with age. Inside, petrol-blue Pueblo pockets flank an ivory goatskin centre: structured where it needs to be, silk-smooth where your fingers land. Every edge skived, sanded, and painted by hand. Every stitch laid with Crimson Hides thread in a matching steel blue. Open it once and you'll understand why it took time to make.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-16-1.png', alt: 'vaskebjornen-16-1', priority: true },
      { src: '/images/products/vaskebjornen-16-2.png', alt: 'vaskebjornen-16-2', priority: false }
    ],
    tannery: [{ name: 'Badalassi Carlo' }],
  },
        {
    id: '27',
    slug: 'vaskebjornen-17',
    name: 'Vaskebjornen #17',
    category: 'wallets',
    price: 1399,
    currency: 'DKK',
    description: `Closed, it says nothing. A near-perfect square of shark skin, dark as the water it came from, with a single cream stitch line running its perimeter. Open it, and the contrast arrives without warning — pale Italian vachetta, more shark skin pockets, and a black velour sheepskin lining that finishes the piece like a full stop. Hand saddle-stitched with Crimson Hides thread. The best things rarely reveal themselves all at once.


Note: Every exotic skin used at Fjordleather is traceable, responsibly sourced, and acquired exclusively through vendors operating within EU regulations.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-17-1.png', alt: 'vaskebjornen-17-1', priority: true },
      { src: '/images/products/vaskebjornen-17-2.png', alt: 'vaskebjornen-17-2', priority: false }
    ],
  },
  {
    id: '28',
    slug: 'vaskebjornen-18',
    name: 'Vaskebjornen #18',
    category: 'wallets',
    price: 1399,
    currency: 'DKK',
    description: `The exterior is almost confrontational — that shark skin catches the light in a way that feels alive, almost geological. No stitch visible, no apology, just texture. Then you open it and the Tempesti "Maine liscio" orange hits you like a door swinging open into sunlight. Orange pockets flanking a velour sheepskin centre panel in pitch-black. Black thread throughout, invisible against the shell, deliberate against the orange.  Stitched through with black Crimson Hides thread that disappears into the darkness and reappears as a sharp line against the colour. The kind of interior you show people on purpose. This is a wallet for someone who knows exactly who they are.


Note: Every exotic skin used at Fjordleather is traceable, responsibly sourced, and acquired exclusively through vendors operating within EU regulations.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-18-1.png', alt: 'vaskebjornen-18-1', priority: true },
      { src: '/images/products/vaskebjornen-18-2.png', alt: 'vaskebjornen-18-2', priority: false }
    ],
    tannery: [{ name: 'Tempesti' , url: 'http://www.tempesti.com'}],
  },
  {
    id: '29',
    slug: 'vaskebjornen-19',
    name: 'Vaskebjornen #19',
    category: 'wallets',
    price: 1399,
    currency: 'DKK',
    description: `Bi-fold to show-off: Tegu lizard skin in warm copper-blush — each scale catching the light differently, the pattern running in clean vertical lines across the face. It is precise in the way that only nature and a skilled hand together can be. Inside, pale sheepskin lines every surface, soft against the fingers, with a single cognac panel at the centre grounding the composition. Hand-stitched in matching waxed Crimson Hides nylon copper thread. Quietly unique.

Note: Every exotic skin used at Fjordleather is traceable, responsibly sourced, and acquired exclusively through vendors operating within EU regulations.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-19-1.png', alt: 'vaskebjornen-19-1', priority: true },
      { src: '/images/products/vaskebjornen-19-2.png', alt: 'vaskebjornen-19-2', priority: false }
    ],
  },
    {
    id: '30',
    slug: 'vaskebjornen-20',
    name: 'Vaskebjornen #20',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `This is what it looks like when someone gets it exactly right: the exterior is all confidence — that Walpier "Buttero" blue is deep and smooth, almost naval, with the brown Crimson Hides thread running along the edge creating a tension that shouldn't work as well as it does. Then inside, the warmth floods in: cognac sheepskin lining, rich brown Puccini "Marema" pockets, that same thread now at home against everything around it. Cold outside, warm within. A wallet that rewards the people who actually open it.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-20-1.png', alt: 'vaskebjornen-20-1', priority: true },
      { src: '/images/products/vaskebjornen-20-2.png', alt: 'vaskebjornen-20-2', priority: false }
    ],
    tannery: [{ name: 'Walpier' , url: 'http://www.conceriawalpier.com/'}],
  },
  {
    id: '31',
    slug: 'vaskebjornen-40',
    name: 'Vaskebjornen #40',
    category: 'wallets',
    price: 899,
    currency: 'DKK',
    description: `This one has a painter's palette.
The exterior is all stillness — Puccini "Maremma" blue, smooth and deep, with the teal Crimson Hides thread tracing the edge so closely in tone it almost vanishes into the leather. Understated to the point of elegance. 
Inside, caramel Puccini "Koala" leather pockets against the blue flesh lining, a muted sage centre panel between them. Warm against cool. The thread the only element that moves between both worlds, unchanged. Hand-stitched, hand-finished, built without shortcuts.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-40-1.png', alt: 'vaskebjornen-40-1', priority: true },
      { src: '/images/products/vaskebjornen-40-2.png', alt: 'vaskebjornen-40-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
  {
    id: '32',
    slug: 'vaskebjornen-41',
    name: 'Vaskebjornen #41',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `Ancient and contemporary at once. The shell is Puccini "Bisanzio" in metallic copper — a leather that doesn't reflect light so much as hold it, shifting tone with every movement, every angle. It is the kind of surface that makes people reach out and touch. Inside, Maremma and Koala (both Puccini leathers as well) in warm amber and cognac, ivory goatskin lining throughout, copper Crimson Hides thread hand-stitched from edge to edge. An exterior this remarkable deserved an interior to match. It got one.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-41-1.png', alt: 'vaskebjornen-41-1', priority: true },
      { src: '/images/products/vaskebjornen-41-2.png', alt: 'vaskebjornen-41-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
  {
    id: '33',
    slug: 'vaskebjornen-42',
    name: 'Vaskebjornen #42',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `Puccini "Maremma", inside and out. The exterior in deep chestnut — composed, unhurried, a leather that has nothing to prove. Inside, the same hide in three tones: amber, chocolate, natural tan. A study in what a single tannery can do when given room to breathe. Orange Crimson Hides thread throughout, hand-stitched, edge to edge. No exotic skins. No flourishes. Every tone drawn from the same family. Every element of the same mind. Just Maremma, at its best.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-42-1.png', alt: 'vaskebjornen-42-1', priority: true },
      { src: '/images/products/vaskebjornen-42-2.png', alt: 'vaskebjornen-42-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
  {
    id: '34',
    slug: 'vaskebjornen-43',
    name: 'Vaskebjornen #43',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `Puccini "Bisanzio" on the outside — that unmistakable metallic copper, mottled and alive, different in every light. Inside, the mood shifts: cool taupe calfskin lines the shell, ivory goatskin lining runs beneath the fingers, and Bisanzio returns at the centre pocket, a warm pulse between two cool tones. Copper Crimson Hides thread throughout, hand-stitched. Two temperatures, one object, no compromises. The kind of wallet that looks better every time you look at it.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-43-1.png', alt: 'vaskebjornen-43-1', priority: true },
      { src: '/images/products/vaskebjornen-43-2.png', alt: 'vaskebjornen-43-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
    {
    id: '35',
    slug: 'vaskebjornen-44',
    name: 'Vaskebjornen #44',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `Horse leather is not a common choice. It is a deliberate one. Avancorpo — the front of the horse hide, tanned by Rocado of Italy — brings a grain so tight and resilient it feels almost architectural. Here in natural honey tan, glazed to a quiet sheen, it forms both the exterior shell and the soul of the interior. Caramel pockets, natural tan center panel, ivory goatskin lining. Dark brown Crimson Hides thread throughout, hand-stitched. A wallet that will outlast most things you own — and look better for every year it does.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', depth: '1.5', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-44-1.png', alt: 'vaskebjornen-44-1', priority: true },
      { src: '/images/products/vaskebjornen-44-2.png', alt: 'vaskebjornen-44-2', priority: false }
    ],
    tannery: [{ name: 'Rocado' }],
  },
  {
    id: '36',
    slug: 'vaskebjornen-45',
    name: 'Vaskebjornen #45',
    category: 'wallets',
    price: 899,
    currency: 'DKK',
    description: `One leather, two faces. The exterior is Puccini Attilio's "Mozart" — warm cognac, vegetable-tanned, the kind of surface that responds to use rather than resisting it. Inside, the same hide reversed: natural flesh side burnished smooth, running alongside the finished grain in each card slot, shifting from golden to tan as you move across. Edges skived, sanded, painted. Stitched by hand with Crimson Hides thread. Simple construction, good material, nothing wasted.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', depth: '1', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-45-1.png', alt: 'vaskebjornen-45-1', priority: true },
      { src: '/images/products/vaskebjornen-45-2.png', alt: 'vaskebjornen-45-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
    {
    id: '37',
    slug: 'vaskebjornen-46',
    name: 'Vaskebjornen #46',
    category: 'wallets',
    price: 1399,
    currency: 'DKK',
    description: `The exterior is authentic cobra — black broad-scaled, with a texture that has no equivalent in cowhide or anywhere else. Open it and the mood shifts entirely: Puccini Attilio "Maremma" pockets in warm brown, cognac nubuck lining, and brown Crimson Hides thread stitching it all together. Two completely different materials that make sense only because someone decided they should. Every edge finished by hand, painted in dark brown.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', depth: '2', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-46-1.png', alt: 'vaskebjornen-46-1', priority: true },
      { src: '/images/products/vaskebjornen-46-2.png', alt: 'vaskebjornen-46-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
    {
    id: '38',
    slug: 'vaskebjornen-47',
    name: 'Vaskebjornen #47',
    category: 'wallets',
    price: 1099,
    currency: 'DKK',
    description: `Maremma leather ages the way good things age — it doesn't fade, it resolves. The exterior here is Puccini Attilio's, in a cognac that will be darker and richer six months from now. Inside, ivory goatskin lines the pockets, cool and smooth against the warmer shell. Brown Crimson Hides thread, hand-stitched. Every edge finished by hand. Built around two leathers that know how to share a space.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', depth: '1', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-47-1.png', alt: 'vaskebjornen-47-1', priority: true },
      { src: '/images/products/vaskebjornen-47-2.png', alt: 'vaskebjornen-47-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
  {
    id: '39',
    slug: 'vaskebjornen-48',
    name: 'Vaskebjornen #48',
    category: 'wallets',
    price: 1499,
    currency: 'DKK',
    description: `Puccini Attilio "Maremma" in deep charcoal, split down the centre by an inlay of authentic shark skin — two textures side by side, one smooth, one raw. The shark skin returns inside across the card pockets, set against an ultra-soft goatskin lining. Cream Crimson Hides thread runs the full perimeter, the only bright line on an otherwise dark object. Edges skived, sanded, finished by hand. A wallet that does one thing well: make you look twice.


Note: Every exotic skin used at Fjordleather is traceable, responsibly sourced, and acquired exclusively through vendors operating within EU regulations.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand sitched',
    dimensions: { height: '10.5', width: '8.5', depth: '2', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-48-1.png', alt: 'vaskebjornen-48-1', priority: true },
      { src: '/images/products/vaskebjornen-48-2.png', alt: 'vaskebjornen-48-2', priority: false }
    ],
    tannery: [{ name: 'Puccini Attilio' , url: 'http://www.conceriapuccini.com'}],
  },
    {
    id: '40',
    slug: 'vaskebjornen-49',
    name: 'Vaskebjornen #49',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `Four Tuscan tanneries in one wallet. The exterior is Badalassi Carlo's "Ecbatana Lux" — a leather with a surface that looks like it's already lived a life, scratched and cross-hatched in a way no machine could replicate. Inside, the card pockets alternate between Tempesti Minerva Liscio in burnt orange, Il Ponte Mozart in light brown, and Puccini Koala in a deeper shade. Orange Crimson Hides thread throughout. Every hide vegetable-tanned, every stitch placed by hand. A consortium sampler that happens to fit in your back pocket.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', depth: '1', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-49-1.png', alt: 'vaskebjornen-49-1', priority: true },
      { src: '/images/products/vaskebjornen-49-2.png', alt: 'vaskebjornen-49-2', priority: false }
    ],
    tannery: [{ name: 'Badalassi Carlo' }],
  },
  {
    id: '41',
    slug: 'vaskebjornen-50',
    name: 'Vaskebjornen #50',
    category: 'wallets',
    price: 999,
    currency: 'DKK',
    description: `Red on the outside, and not the kind that fades into the background. Walpier's Epi-printed leather carries those fine vertical grooves that give the surface a rhythm you can feel under your thumb. Open it and everything calms down — Rocado Avantcorpo in natural, pale as raw canvas, with the red returning only at the centre pocket. Cream Crimson Hides thread throughout. A wallet with a strong opinion and the craftsmanship to back it up.`,
    material: 'Full-grain Italian leather',
    construction: 'Hand cut, hand stitched',
    dimensions: { height: '10.5', width: '8.5', depth: '1', unit: 'cm' },
    images: [
      { src: '/images/products/vaskebjornen-50-1.png', alt: 'vaskebjornen-50-1', priority: true },
      { src: '/images/products/vaskebjornen-50-2.png', alt: 'vaskebjornen-50-2', priority: false }
    ],
    tannery: [{ name: 'Walpier', url: 'http://www.conceriawalpier.com/' }, { name: 'Rocado' }],
  },
];
