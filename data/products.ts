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
    tannery: [{ name: 'Conceria Walpier', url: 'http://www.conceriawalpier.com/' }],
  },
  {
    id: '03',
    slug: 'oslo-weekend-duffle',
    name: 'Oslo Weekend Duffle',
    category: 'travel-duffles',
    price: 980,
    currency: 'EUR',
    description: `The Oslo Weekend Duffle is built for the two-night trip that turns into three. The body is cut from 3.5mm Badalassi Carlo Minerva Box — a firm, densely-fibresd vegetable tan that holds its structure under load without stiffening in cold weather. It is one of the few Italian leathers that performs as well in a Scandinavian winter as it does in a Tuscan summer.

Four solid brass feet are set into the base with Chicago screws and backed with a 4mm saddle leather reinforcement pad on the interior. The bag stands on these feet when set down, keeping the base leather clear of surfaces. The main zip is YKK brass, running the full length of the top opening, with a pull large enough to grip barehanded. The two end pockets close with solid brass snaps — heavy-gauge, the same hardware used in equestrian saddlery.

The handles are hand-stitched from doubled 3.5mm leather with twelve stitches per inch. A removable canvas shoulder strap with brass swivel hooks is included, adjustable from 90 to 130cm. The lining is a heavy natural linen, unbleached, sewn to a card insert that keeps the bag's rectangular form when empty.`,
    material: 'Full-grain vegetable-tanned leather, Badalassi Carlo Minerva Box, natural',
    construction: 'Hand saddle-stitched handles and strap attachment points. Machine-stitched body seams. YKK brass zip. Solid brass snaps, feet, D-rings, and swivel hooks. Natural linen lining with card insert.',
    dimensions: { height: '30', width: '50', depth: '24', unit: 'cm' },
    images: [
      { src: '/images/products/oslo-weekend-duffle-1.svg', alt: 'Oslo Weekend Duffle in natural Badalassi Carlo Minerva Box leather', priority: true },
      { src: '/images/products/oslo-weekend-duffle-2.svg', alt: 'Oslo Weekend Duffle showing brass feet and base reinforcement', priority: false },
      { src: '/images/products/oslo-weekend-duffle-3.svg', alt: 'Oslo Weekend Duffle end pocket with solid brass snap hardware', priority: false },
    ],
    tannery: [{ name: 'Badalassi Carlo' }],
  },
  {
    id: '04',
    slug: 'arktis-long-duffle',
    name: 'Arktis Long Duffle',
    category: 'travel-duffles',
    price: 1380,
    currency: 'EUR',
    description: `The Arktis Long Duffle is the largest piece we make. It is built for the kind of trip that requires no apology for its duration — five nights, a week, the open-ended return. The body is cut from 3.5mm Conceria Walpier Vachetta Naturale, a pale, close-grained vegetable tan that ages dramatically and without guidance. It will become the colour you make it.

The base is reinforced with 5mm saddle leather on the interior, held in place with copper rivets. The base panel does not flex under load. Six solid brass feet are set at the corners and the centre of the long edges — the bag distributes its weight evenly when set down. Two zip end pockets, one structured internal pocket in natural canvas, and a flat slip pocket against the rear interior wall. The main zip is YKK brass, 80cm long.

The grab handles at each end are formed from a single piece of 4mm leather folded and stitched through. The central top handle is the same — no hardware, no swivel; the handle is attached directly to the body by a leather strap that passes through a slot in the bag panel and is secured on the interior with a Chicago screw and a backing plate. This is the strongest attachment method available without welding.`,
    material: 'Full-grain vegetable-tanned leather, Conceria Walpier Vachetta Naturale, natural',
    construction: 'Hand saddle-stitched handles and all attachment points. Machine-stitched body seams with double-needle lockstitch. YKK brass zip. Solid brass snaps, feet, and D-rings. Natural canvas lining. 5mm saddle leather base reinforcement.',
    dimensions: { height: '34', width: '64', depth: '28', unit: 'cm' },
    images: [
      { src: '/images/products/arktis-long-duffle-1.svg', alt: 'Arktis Long Duffle in natural Conceria Walpier Vachetta Naturale leather', priority: true },
      { src: '/images/products/arktis-long-duffle-2.svg', alt: 'Arktis Long Duffle top handle detail showing single-piece construction', priority: false },
      { src: '/images/products/arktis-long-duffle-3.svg', alt: 'Arktis Long Duffle open showing canvas lining and internal organisation', priority: false },
    ],
    tannery: [{ name: 'Conceria Walpier', url: 'http://www.conceriawalpier.com/' }],
  },
      {
    id: '07',
    slug: 'krone-coin-pouch',
    name: 'Krone Coin Pouch',
    category: 'coin-pouches',
    price: 110,
    currency: 'EUR',
    description: `The Krone Coin Pouch is a half-moon pouch closed by a single solid brass snap — the same weight of snap used in equestrian saddlery, not the lightweight stamped variety used in fashion accessories. The snap requires deliberate pressure to open and close; it will not open in a pocket.

The leather is Badalassi Carlo Pueblo in cognac — a pull-up hide with a distinctive roughed surface that reveals lighter tones when flexed and returns to a rich amber depth at rest. The cognac colour is one of the original Pueblo shades: warm, complex, and entirely natural in origin. No synthetic pigments.

The interior is left raw — the flesh side of the hide, slightly textured, honest about what it is. There is no lining, no zip pocket, no organisation. It holds coins and small objects. It does this without apology for its simplicity.`,
    material: 'Full-grain pull-up leather, Badalassi Carlo Pueblo, cognac',
    construction: 'Hand saddle-stitched with waxed linen thread. Solid brass snap. Interior left as raw flesh side. Edges burnished.',
    dimensions: { height: '9', width: '12.5', unit: 'cm' },
    images: [
      { src: '/images/products/krone-coin-pouch-1.svg', alt: 'Krone Coin Pouch in cognac Badalassi Carlo Pueblo leather with brass snap', priority: true },
      { src: '/images/products/krone-coin-pouch-2.svg', alt: 'Krone Coin Pouch open showing raw interior and coin capacity', priority: false },
    ],
    tannery: [{ name: 'Badalassi Carlo' }],
  },
  {
    id: '08',
    slug: 'lyng-coin-pouch',
    name: 'Lyng Coin Pouch',
    category: 'coin-pouches',
    price: 125,
    currency: 'EUR',
    description: `The Lyng Coin Pouch was designed as a companion piece to the Fjell Bifold — same leather, same thread, same edge finish. It carries more than coins: it is sized for earphones, a folded receipt, a short pencil. The gusset expands to 3cm when full without distorting the silhouette.

The leather is Conceria Walpier Vachetta Naturale — undyed, untreated, a pale cream at origin that will become whatever colour the hands that hold it make it. The zip is YKK brass, 14cm, with a pull shaped for fingertip operation. The zip tape is natural cotton.

Every edge is hand-burnished. The stitching on the gusset is the most demanding part of this piece — the seam runs through four layers of leather at the corner junction, and each stitch is pulled by hand to consistent tension. This is not possible to automate. It takes as long as it takes.`,
    material: 'Full-grain vegetable-tanned leather, Conceria Walpier Vachetta Naturale, natural cream',
    construction: 'Hand saddle-stitched gusset and body seams. YKK brass zip with cotton tape. Edges hand-burnished. Unlined.',
    dimensions: { height: '8', width: '14', depth: '3', unit: 'cm' },
    images: [
      { src: '/images/products/lyng-coin-pouch-1.svg', alt: 'Lyng Coin Pouch in natural cream Conceria Walpier Vachetta leather', priority: true },
      { src: '/images/products/lyng-coin-pouch-2.svg', alt: 'Lyng Coin Pouch open showing YKK brass zip and gusseted interior', priority: false },
    ],
    tannery: [{ name: 'Conceria Walpier', url: 'http://www.conceriawalpier.com/' }],
  },
  {
    id: '09',
    slug: 'stein-key-fob',
    name: 'Stein Key Fob',
    category: 'accessories',
    price: 75,
    currency: 'EUR',
    description: `The Stein Key Fob is made from the most beautiful offcuts produced in the workshop — the cuts that fall away from the edges of larger pieces and carry the best part of the hide's character. Each one is different. The grain pattern, the surface texture, the precise dimensions within the template: all vary. No two are identical.

The leather is cut to a consistent length and width, then punched at the loop end and folded around a solid brass ring — 25mm, 3mm wire gauge, the weight of a proper split ring without the awkwardness. The brass is unsealed. It will develop a natural patina alongside the leather, oxidising slowly from bright yellow to a warm antique tone.

The edges are burnished, not painted. The loop end is stitched through once with waxed linen to prevent the fold from opening over time. This is a small thing made with the same care as a large one. It will last longer than the keys it carries.`,
    material: 'Full-grain leather, workshop offcut selection, solid brass ring 25mm',
    construction: 'Single-piece construction, punched and folded. Loop end stitched with waxed linen. Edges hand-burnished. Solid brass ring, unsealed.',
    dimensions: { height: '10', width: '2.5', unit: 'cm' },
    images: [
      { src: '/images/products/stein-key-fob-1.svg', alt: 'Stein Key Fob in natural leather with solid brass ring, front view', priority: true },
      { src: '/images/products/stein-key-fob-2.svg', alt: 'Stein Key Fob showing burnished edges and loop construction detail', priority: false },
    ],
  },
  {
    id: '10',
    slug: 'vann-watch-strap',
    name: 'Vann Watch Strap',
    category: 'accessories',
    price: 185,
    currency: 'EUR',
    description: `The Vann Watch Strap is made from Badalassi Carlo Minerva Box — a bridle leather in the traditional sense: dense, pre-waxed during tannage, structured enough to hold its shape at the buckle without a keeper while remaining supple enough to conform to the wrist within a few weeks of wear.

The strap is cut to a tapered profile: 20mm at the lug end, 18mm at the buckle. A 22mm version is available, tapering to 20mm. The taper is cut by hand with a skiver along a marked line — not with a die, which leaves a ragged edge at the corners. The edges are then hand-burnished without paint. The flesh side is left slightly textured for grip against the wrist.

The buckle is solid brass, polished, with a single pin of the same material. It is not plated. It will tarnish with wear and can be re-polished to bright if desired, or left to develop the warm, uneven tone of natural brass oxide. Five adjustment holes, punched at 12mm spacing. The strap is stitched with waxed linen, twelve stitches per inch, in a thread matched to the hide colour.`,
    material: 'Full-grain bridle leather, Badalassi Carlo Minerva Box; solid brass buckle',
    construction: 'Hand-cut taper, skived lug ends. Hand saddle-stitched with waxed linen thread, twelve stitches per inch. Edges hand-burnished. Five punched adjustment holes at 12mm spacing.',
    dimensions: { height: '12', width: '2', unit: 'cm' },
    images: [
      { src: '/images/products/vann-watch-strap-1.svg', alt: 'Vann Watch Strap in Badalassi Carlo Minerva Box leather with brass buckle', priority: true },
      { src: '/images/products/vann-watch-strap-2.svg', alt: 'Vann Watch Strap showing tapered profile and hand-burnished edges', priority: false },
      { src: '/images/products/vann-watch-strap-3.svg', alt: 'Vann Watch Strap fitted on a wristwatch, showing natural drape', priority: false },
    ],
    tannery: [{ name: 'Badalassi Carlo' }],
  },
  {
    id: '11',
    slug: 'vaskebjornen-1',
    name: 'Vaskebjornen-1',
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
    name: 'Vaskebjornen-2',
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
    name: 'Vaskebjornen-3',
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
    name: 'Vaskebjornen-4',
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
    name: 'Vaskebjornen-5',
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
];
