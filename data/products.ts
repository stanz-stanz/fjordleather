import type { Product } from './types';

export const products: Product[] = [
  {
    id: '01',
    slug: 'nordfjord-tote',
    name: 'Nordfjord Tote',
    category: 'bags',
    price: 680,
    currency: 'EUR',
    shortDescription: 'Cut from a single Badalassi Carlo hide. No patchwork, no seams at the base — just leather, thread, and time.',
    featured: true,
    isNew: false,
    description: `The Nordfjord Tote is an exercise in material honesty. The body is cut from a single, uninterrupted hide sourced from Badalassi Carlo in Pescia — one of the last Italian tanneries still operating pit vats for vegetable tannage. No patchwork. No seams at the base. The hide does what it is asked of it, or it doesn't make the cut.

Every edge is hand-bevelled, then burnished progressively through three grits of bone and beeswax until the cross-section closes into a hard, smooth ridge. Sixteen stitches per inch, saddle-stitched by hand with 0.8mm waxed linen thread in a tone matched to the hide. The stitching pulls slightly tighter at the corners — a deliberate choice that distributes load across the stitch line rather than concentrating stress at the holes.

The handles are formed from doubled leather, bonded with contact cement and burnished into a single thickness before stitching. They will soften over the first months of carry, conforming gradually to the grip that holds them. This is not a flaw. This is the point.`,
    material: 'Full-grain vegetable-tanned pull-up leather, Badalassi Carlo Pueblo, natural tan',
    construction: 'Hand saddle-stitched with 0.8mm waxed linen thread, sixteen stitches per inch. Edges hand-bevelled and burnished with bone and beeswax. Solid brass D-rings, rivets, and feet.',
    dimensions: { height: '38', width: '34', depth: '14', unit: 'cm' },
    patina: 'Pueblo leather is a pull-up hide: it lightens at stress points on first flex and deepens with oil and handling over time. Within six months of daily use, the surface develops a complex two-tone patina that no two bags share.',
    images: [
      { src: '/images/products/nordfjord-tote-1.svg', alt: 'Nordfjord Tote in natural tan Badalassi Carlo Pueblo leather, front view', priority: true },
      { src: '/images/products/nordfjord-tote-2.svg', alt: 'Nordfjord Tote handle detail showing burnished edges and saddle stitching', priority: false },
      { src: '/images/products/nordfjord-tote-3.svg', alt: 'Nordfjord Tote base showing solid brass feet and single-piece construction', priority: false },
    ],
  },
  {
    id: '02',
    slug: 'stillhet-messenger',
    name: 'Stillhet Messenger',
    category: 'bags',
    price: 520,
    currency: 'EUR',
    shortDescription: 'A structured messenger for the long commute. Conceria Walpier leather that scratches beautifully and heals with touch.',
    featured: false,
    isNew: false,
    description: `The Stillhet Messenger was designed for daily carry over many years, not seasons. The body is structured — it holds its form empty as well as full — using a 3mm Conceria Walpier Buttero insert between the outer shell and the interior lining. Buttero is a dense, close-fibre vegetable tan from the Walpier tannery in Pontassieve; it does not stretch, it does not sag, and it improves visibly with use.

The shoulder strap is adjustable via a solid brass slider with no moving parts that can fail. The strap leather is the same thickness as the bag body — 3mm — skived at the ends only where it meets the brass hardware. The front pocket closes with a solid brass turn-clasp, not a snap or a zip. The clasp can be operated with one hand, through a winter glove.

A single interior organisation pocket in natural canvas sits flat against the rear wall. The zip on the main compartment is YKK brass throughout — slider, teeth, and pull. This is not a budget component. It is chosen because it will outlast the bag if the bag is treated well.`,
    material: 'Full-grain vegetable-tanned leather, Conceria Walpier Buttero, dark espresso',
    construction: 'Machine-stitched body seams reinforced at stress points. Hand-finished edges with three-coat edge paint. Solid brass hardware throughout. YKK brass zip on main compartment.',
    dimensions: { height: '29', width: '37', depth: '9', unit: 'cm' },
    patina: 'Buttero leather develops a burnished, slightly waxy patina. The dark espresso colour lightens at wear points — the flap edge, the strap anchor points — creating a natural highlight that deepens the apparent texture of the hide.',
    images: [
      { src: '/images/products/stillhet-messenger-1.svg', alt: 'Stillhet Messenger in dark espresso Conceria Walpier Buttero leather', priority: true },
      { src: '/images/products/stillhet-messenger-2.svg', alt: 'Stillhet Messenger strap and brass slider detail', priority: false },
      { src: '/images/products/stillhet-messenger-3.svg', alt: 'Stillhet Messenger front pocket with brass turn-clasp', priority: false },
    ],
  },
  {
    id: '03',
    slug: 'oslo-weekend-duffle',
    name: 'Oslo Weekend Duffle',
    category: 'travel-duffles',
    price: 980,
    currency: 'EUR',
    shortDescription: 'Two nights. Self-standing when packed. Badalassi Carlo leather at 3.5mm, brass throughout.',
    featured: true,
    isNew: false,
    description: `The Oslo Weekend Duffle is built for the two-night trip that turns into three. The body is cut from 3.5mm Badalassi Carlo Minerva Box — a firm, densely-fibresd vegetable tan that holds its structure under load without stiffening in cold weather. It is one of the few Italian leathers that performs as well in a Scandinavian winter as it does in a Tuscan summer.

Four solid brass feet are set into the base with Chicago screws and backed with a 4mm saddle leather reinforcement pad on the interior. The bag stands on these feet when set down, keeping the base leather clear of surfaces. The main zip is YKK brass, running the full length of the top opening, with a pull large enough to grip barehanded. The two end pockets close with solid brass snaps — heavy-gauge, the same hardware used in equestrian saddlery.

The handles are hand-stitched from doubled 3.5mm leather with twelve stitches per inch. A removable canvas shoulder strap with brass swivel hooks is included, adjustable from 90 to 130cm. The lining is a heavy natural linen, unbleached, sewn to a card insert that keeps the bag's rectangular form when empty.`,
    material: 'Full-grain vegetable-tanned leather, Badalassi Carlo Minerva Box, natural',
    construction: 'Hand saddle-stitched handles and strap attachment points. Machine-stitched body seams. YKK brass zip. Solid brass snaps, feet, D-rings, and swivel hooks. Natural linen lining with card insert.',
    dimensions: { height: '30', width: '50', depth: '24', unit: 'cm' },
    patina: 'Minerva Box develops a burnished, waxy patina from handling. The natural colour darkens at contact points — handles, base, and the area beneath the zip — to a warm honey-tan within the first year of regular use.',
    images: [
      { src: '/images/products/oslo-weekend-duffle-1.svg', alt: 'Oslo Weekend Duffle in natural Badalassi Carlo Minerva Box leather', priority: true },
      { src: '/images/products/oslo-weekend-duffle-2.svg', alt: 'Oslo Weekend Duffle showing brass feet and base reinforcement', priority: false },
      { src: '/images/products/oslo-weekend-duffle-3.svg', alt: 'Oslo Weekend Duffle end pocket with solid brass snap hardware', priority: false },
    ],
  },
  {
    id: '04',
    slug: 'arktis-long-duffle',
    name: 'Arktis Long Duffle',
    category: 'travel-duffles',
    price: 1380,
    currency: 'EUR',
    shortDescription: 'Five nights. Structured base. YKK brass zip throughout. Made for the journey that requires no apology.',
    featured: false,
    isNew: false,
    description: `The Arktis Long Duffle is the largest piece we make. It is built for the kind of trip that requires no apology for its duration — five nights, a week, the open-ended return. The body is cut from 3.5mm Conceria Walpier Vachetta Naturale, a pale, close-grained vegetable tan that ages dramatically and without guidance. It will become the colour you make it.

The base is reinforced with 5mm saddle leather on the interior, held in place with copper rivets. The base panel does not flex under load. Six solid brass feet are set at the corners and the centre of the long edges — the bag distributes its weight evenly when set down. Two zip end pockets, one structured internal pocket in natural canvas, and a flat slip pocket against the rear interior wall. The main zip is YKK brass, 80cm long.

The grab handles at each end are formed from a single piece of 4mm leather folded and stitched through. The central top handle is the same — no hardware, no swivel; the handle is attached directly to the body by a leather strap that passes through a slot in the bag panel and is secured on the interior with a Chicago screw and a backing plate. This is the strongest attachment method available without welding.`,
    material: 'Full-grain vegetable-tanned leather, Conceria Walpier Vachetta Naturale, natural',
    construction: 'Hand saddle-stitched handles and all attachment points. Machine-stitched body seams with double-needle lockstitch. YKK brass zip. Solid brass snaps, feet, and D-rings. Natural canvas lining. 5mm saddle leather base reinforcement.',
    dimensions: { height: '34', width: '64', depth: '28', unit: 'cm' },
    patina: 'Vachetta Naturale is undyed and untreated — a blank canvas. It darkens rapidly on first exposure to light and handling, then stabilises into an even, rich tan over the following months. Oils and water will leave marks that fade or deepen depending on the source.',
    images: [
      { src: '/images/products/arktis-long-duffle-1.svg', alt: 'Arktis Long Duffle in natural Conceria Walpier Vachetta Naturale leather', priority: true },
      { src: '/images/products/arktis-long-duffle-2.svg', alt: 'Arktis Long Duffle top handle detail showing single-piece construction', priority: false },
      { src: '/images/products/arktis-long-duffle-3.svg', alt: 'Arktis Long Duffle open showing canvas lining and internal organisation', priority: false },
    ],
  },
  {
    id: '05',
    slug: 'fjell-bifold',
    name: 'Fjell Bifold',
    category: 'wallets',
    price: 210,
    currency: 'EUR',
    shortDescription: 'Three card slots per side. No exterior branding. Badalassi Carlo Minerva Box in dark bark.',
    featured: true,
    isNew: false,
    description: `The Fjell Bifold is the wallet we return to when we need to remember why we do this. Three card slots per side, cut to fit the standard card dimension — not stretched from a generic template. A full-width bill compartment that lies flat when empty. No exterior branding, no logo, no embossing. The only mark on the outside is the stitching.

The leather is Badalassi Carlo Minerva Box in dark bark — a firm, structured hide that does not stretch or distort with card load. The edges are hand-bevelled with a French edge tool, then burnished through three progressions of grit and wax before a final application of natural beeswax. The edge is smooth enough to draw a fingernail along without catching.

All stitching is waxed linen, twelve stitches per inch, run through with a hand awl at consistent spacing. The thread is pulled to the same tension throughout — this is harder to achieve than it sounds, and it is the thing most visible when it is wrong. The interior card slots are reinforced at the mouth with a second layer of 0.5mm leather, skived to invisibility at the edge.`,
    material: 'Full-grain vegetable-tanned leather, Badalassi Carlo Minerva Box, dark bark',
    construction: 'Hand saddle-stitched with waxed linen thread, twelve stitches per inch. Edges hand-bevelled with French edge tool and burnished with beeswax. Card slot mouths reinforced with skived second layer.',
    dimensions: { height: '9.5', width: '11', unit: 'cm' },
    patina: 'Minerva Box in dark bark develops a deep, burnished patina at contact points — the card slot mouths, the exterior face, and the fold line. The colour warms over time, developing a mahogany depth from the original bark tone.',
    images: [
      { src: '/images/products/fjell-bifold-1.svg', alt: 'Fjell Bifold wallet in dark bark Badalassi Carlo Minerva Box leather', priority: true },
      { src: '/images/products/fjell-bifold-2.svg', alt: 'Fjell Bifold open showing three card slots per side', priority: false },
      { src: '/images/products/fjell-bifold-3.svg', alt: 'Fjell Bifold edge detail showing burnished beeswax finish', priority: false },
    ],
  },
  {
    id: '06',
    slug: 'bark-card-sleeve',
    name: 'Bark Card Sleeve',
    category: 'wallets',
    price: 185,
    currency: 'EUR',
    shortDescription: 'Four cards. Conceria Walpier bark tan. Tight at first — loosens exactly as it should.',
    featured: false,
    isNew: true,
    description: `The Bark Card Sleeve carries four cards maximum. The fit is intentionally close at first — it loosens exactly as it should over the first weeks of use, conforming to the specific cards you carry and nothing else. Remove a card permanently, and the slot will gradually retighten. The leather has memory.

The hide is Conceria Walpier Dollaro — a bark-tanned calf with a fine, tight grain and almost no surface treatment. It is one of the most honest leathers in European production: what you see is the hide itself, not a finish over an imperfect surface. Bark tannage takes six months minimum; most commercial wallets use chrome-tanned leather processed in six hours. The difference is evident in the hand within a year of use.

The sleeve is cut from a single piece, folded at the base and edge-stitched on three sides with waxed linen. There is no lining. The interior is the flesh side of the same hide, naturally textured and slightly tacky — it holds cards without requiring a tight tolerance at the opening.`,
    material: 'Full-grain bark-tanned calf leather, Conceria Walpier Dollaro, natural dark',
    construction: 'Single-piece construction, folded and edge-stitched with waxed linen thread on three sides. No lining. Edges hand-burnished.',
    dimensions: { height: '9.2', width: '6.8', unit: 'cm' },
    patina: 'Bark-tanned leather develops the slowest, most even patina of any tanning method. Expect the dark natural to deepen into an almost black tone at contact points — the face, the opening edge — over two to three years of daily carry.',
    images: [
      { src: '/images/products/bark-card-sleeve-1.svg', alt: 'Bark Card Sleeve in natural dark Conceria Walpier Dollaro leather', priority: true },
      { src: '/images/products/bark-card-sleeve-2.svg', alt: 'Bark Card Sleeve showing card slots and single-piece construction', priority: false },
    ],
  },
  {
    id: '07',
    slug: 'krone-coin-pouch',
    name: 'Krone Coin Pouch',
    category: 'coin-pouches',
    price: 110,
    currency: 'EUR',
    shortDescription: 'A half-moon pouch in Badalassi Carlo Pueblo. Solid brass snap. Interior left raw.',
    featured: false,
    isNew: false,
    description: `The Krone Coin Pouch is a half-moon pouch closed by a single solid brass snap — the same weight of snap used in equestrian saddlery, not the lightweight stamped variety used in fashion accessories. The snap requires deliberate pressure to open and close; it will not open in a pocket.

The leather is Badalassi Carlo Pueblo in cognac — a pull-up hide with a distinctive roughed surface that reveals lighter tones when flexed and returns to a rich amber depth at rest. The cognac colour is one of the original Pueblo shades: warm, complex, and entirely natural in origin. No synthetic pigments.

The interior is left raw — the flesh side of the hide, slightly textured, honest about what it is. There is no lining, no zip pocket, no organisation. It holds coins and small objects. It does this without apology for its simplicity.`,
    material: 'Full-grain pull-up leather, Badalassi Carlo Pueblo, cognac',
    construction: 'Hand saddle-stitched with waxed linen thread. Solid brass snap. Interior left as raw flesh side. Edges burnished.',
    dimensions: { height: '9', width: '12.5', unit: 'cm' },
    patina: 'Pueblo pull-up leather develops a two-tone patina — the raised grain lightens with flex, the recessed areas deepen with oil. The cognac colour will warm towards a dark amber over time.',
    images: [
      { src: '/images/products/krone-coin-pouch-1.svg', alt: 'Krone Coin Pouch in cognac Badalassi Carlo Pueblo leather with brass snap', priority: true },
      { src: '/images/products/krone-coin-pouch-2.svg', alt: 'Krone Coin Pouch open showing raw interior and coin capacity', priority: false },
    ],
  },
  {
    id: '08',
    slug: 'lyng-coin-pouch',
    name: 'Lyng Coin Pouch',
    category: 'coin-pouches',
    price: 125,
    currency: 'EUR',
    shortDescription: 'A gusseted coin pouch with YKK brass zip. Conceria Walpier Vachetta in natural, unlined.',
    featured: false,
    isNew: false,
    description: `The Lyng Coin Pouch was designed as a companion piece to the Fjell Bifold — same leather, same thread, same edge finish. It carries more than coins: it is sized for earphones, a folded receipt, a short pencil. The gusset expands to 3cm when full without distorting the silhouette.

The leather is Conceria Walpier Vachetta Naturale — undyed, untreated, a pale cream at origin that will become whatever colour the hands that hold it make it. The zip is YKK brass, 14cm, with a pull shaped for fingertip operation. The zip tape is natural cotton.

Every edge is hand-burnished. The stitching on the gusset is the most demanding part of this piece — the seam runs through four layers of leather at the corner junction, and each stitch is pulled by hand to consistent tension. This is not possible to automate. It takes as long as it takes.`,
    material: 'Full-grain vegetable-tanned leather, Conceria Walpier Vachetta Naturale, natural cream',
    construction: 'Hand saddle-stitched gusset and body seams. YKK brass zip with cotton tape. Edges hand-burnished. Unlined.',
    dimensions: { height: '8', width: '14', depth: '3', unit: 'cm' },
    patina: 'Vachetta Naturale is entirely undyed. It will develop a warm tan from handling within the first weeks, then deepen gradually. No two pieces age identically — the patina is a record of the specific hands that carry it.',
    images: [
      { src: '/images/products/lyng-coin-pouch-1.svg', alt: 'Lyng Coin Pouch in natural cream Conceria Walpier Vachetta leather', priority: true },
      { src: '/images/products/lyng-coin-pouch-2.svg', alt: 'Lyng Coin Pouch open showing YKK brass zip and gusseted interior', priority: false },
    ],
  },
  {
    id: '09',
    slug: 'stein-key-fob',
    name: 'Stein Key Fob',
    category: 'accessories',
    price: 75,
    currency: 'EUR',
    shortDescription: 'Made from the finest offcuts in the workshop. Solid brass ring. Each one unrepeatable.',
    featured: false,
    isNew: true,
    description: `The Stein Key Fob is made from the most beautiful offcuts produced in the workshop — the cuts that fall away from the edges of larger pieces and carry the best part of the hide's character. Each one is different. The grain pattern, the surface texture, the precise dimensions within the template: all vary. No two are identical.

The leather is cut to a consistent length and width, then punched at the loop end and folded around a solid brass ring — 25mm, 3mm wire gauge, the weight of a proper split ring without the awkwardness. The brass is unsealed. It will develop a natural patina alongside the leather, oxidising slowly from bright yellow to a warm antique tone.

The edges are burnished, not painted. The loop end is stitched through once with waxed linen to prevent the fold from opening over time. This is a small thing made with the same care as a large one. It will last longer than the keys it carries.`,
    material: 'Full-grain leather, workshop offcut selection, solid brass ring 25mm',
    construction: 'Single-piece construction, punched and folded. Loop end stitched with waxed linen. Edges hand-burnished. Solid brass ring, unsealed.',
    dimensions: { height: '10', width: '2.5', unit: 'cm' },
    patina: 'Each key fob is cut from a different offcut and will age according to its source leather. The brass ring oxidises naturally over months of pocket carry, developing a warm antique tone without polishing.',
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
    shortDescription: 'Badalassi Carlo Minerva Box bridle leather, hand-stitched. Fits 20mm and 22mm lugs.',
    featured: false,
    isNew: false,
    description: `The Vann Watch Strap is made from Badalassi Carlo Minerva Box — a bridle leather in the traditional sense: dense, pre-waxed during tannage, structured enough to hold its shape at the buckle without a keeper while remaining supple enough to conform to the wrist within a few weeks of wear.

The strap is cut to a tapered profile: 20mm at the lug end, 18mm at the buckle. A 22mm version is available, tapering to 20mm. The taper is cut by hand with a skiver along a marked line — not with a die, which leaves a ragged edge at the corners. The edges are then hand-burnished without paint. The flesh side is left slightly textured for grip against the wrist.

The buckle is solid brass, polished, with a single pin of the same material. It is not plated. It will tarnish with wear and can be re-polished to bright if desired, or left to develop the warm, uneven tone of natural brass oxide. Five adjustment holes, punched at 12mm spacing. The strap is stitched with waxed linen, twelve stitches per inch, in a thread matched to the hide colour.`,
    material: 'Full-grain bridle leather, Badalassi Carlo Minerva Box; solid brass buckle',
    construction: 'Hand-cut taper, skived lug ends. Hand saddle-stitched with waxed linen thread, twelve stitches per inch. Edges hand-burnished. Five punched adjustment holes at 12mm spacing.',
    dimensions: { height: '12', width: '2', unit: 'cm' },
    patina: 'Minerva Box bridle leather develops a deep, burnished sheen with wrist contact. The wax content in the leather surfaces gradually as the hide is worn, creating a self-polishing effect over months of daily use.',
    images: [
      { src: '/images/products/vann-watch-strap-1.svg', alt: 'Vann Watch Strap in Badalassi Carlo Minerva Box leather with brass buckle', priority: true },
      { src: '/images/products/vann-watch-strap-2.svg', alt: 'Vann Watch Strap showing tapered profile and hand-burnished edges', priority: false },
      { src: '/images/products/vann-watch-strap-3.svg', alt: 'Vann Watch Strap fitted on a wristwatch, showing natural drape', priority: false },
    ],
  },
];
