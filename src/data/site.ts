/**
 * Single source of truth for everything that appears in more than one place:
 * nav, contact details, opening hours, the counter, the team.
 * Change it here, it changes everywhere.
 */

export const site = {
  name: 'Furness Fish Market',
  tagline: 'Borough Market, London — since 1998',
  description:
    "A Morecambe Bay fishing family holding the finest fish counter in Borough Market. Day-boat fish, an oyster bar and the Bomba paella, twelve hours from the water.",
  instagram: {
    market: { handle: 'FurnessFishMarket', url: 'https://www.instagram.com/furnessfishmarket/' },
    oysterBar: { handle: 'FurnessOysterBar', url: 'https://www.instagram.com/furnessoysterbar/' },
  },
} as const;

export const contact = {
  addressLines: ['Furness Fish Market', '6 Southwark Street', 'Borough Market', 'London', 'SE1 1TL'],
  postcode: 'SE1 1TL',
  email: 'furnessfishmarket@gmail.com',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Furness+Fish+Market+6+Southwark+Street+Borough+Market+London+SE1+1TL',
} as const;

export type OpeningRow = { day: string; time: string; closed?: boolean };

export const hours: readonly OpeningRow[] = [
  { day: 'Monday', time: 'Closed', closed: true },
  { day: 'Tuesday', time: '8am — 5pm' },
  { day: 'Wednesday', time: '8am — 5pm' },
  { day: 'Thursday', time: '8am — 5pm' },
  { day: 'Friday', time: '8am — 5pm' },
  { day: 'Saturday', time: '8am — 5pm' },
  { day: 'Sunday', time: '8am — 4pm' },
];

export const nav = [
  { label: 'Our Story', href: '/our-story/' },
  { label: 'The Counter', href: '/the-counter/' },
  { label: 'Oyster Boat', href: '/oyster-bar/' },
  { label: 'The Paella', href: '/paella/' },
  { label: 'Visit Us', href: '/visit/' },
] as const;

/** The three commitments, in the family's own framing. */
export const pillars = [
  {
    figure: '12',
    unit: 'hours',
    title: 'Boat to board',
    body: 'Nothing on our ice has sat in a warehouse. Fish leaves the day boat and reaches Southwark Street inside twelve hours — which is why it smells of nothing at all but clean, cold sea.',
  },
  {
    figure: '1',
    unit: 'phone list',
    title: 'Caught by people we know',
    body: 'Our fishermen and women are not a supply chain, they are names we ring. Cornish and Brittany day boats, the Brighton inshore fleet, Shetland. Ask us about any fish on the ice and we will tell you the boat it came off.',
  },
  {
    figure: '4',
    unit: 'generations',
    title: 'A lighter wake',
    body: 'Recyclable materials wherever they exist, British produce wherever it makes sense, and the shortest possible road between the water and the counter. Small choices, made every single day since 1998.',
  },
] as const;

export type Catch = { name: string; origin: string; note: string };

/** Day-boat fish. Origins and tasting notes as the fishmongers describe them. */
export const dayBoat: Catch[] = [
  { name: 'Wild Sea Bass', origin: 'Cornish coast & Brittany day boats', note: 'Line-caught, cleaned and gutted. Roast it whole, or let us fillet it across the counter while you wait.' },
  { name: 'Turbot', origin: 'Brighton coast day boat', note: 'White, buttery, firm. The king of flat fish and worth every penny — roast on the bone.' },
  { name: 'Dover Sole', origin: 'Cornish coast day boat', note: 'Mild and sweet with a small, tight flake. Butter, lemon, a hot pan, nothing else.' },
  { name: 'Monkfish', origin: 'Shetland inshore', note: 'Firm, meaty, delicately flavoured. Holds its nerve in a stew and roasts like a joint of meat.' },
  { name: 'Halibut', origin: 'Shetland inshore', note: 'Dense white flesh with a proper steak-like texture. Pan-fry hard, finish in butter.' },
  { name: 'John Dory', origin: 'Cornish coast day boat', note: 'An ugly fish with a beautiful fillet — dense, white and packed with flavour.' },
  { name: 'Brill', origin: 'Brighton coast day boat', note: 'Turbot’s quieter cousin. Sweet, firm and forgiving under a grill.' },
  { name: 'Cod & Cod Cheeks', origin: 'Inshore Shetland', note: 'The cheeks are the fishmonger’s secret: boneless little medallions, sautéed, crumbed or curried.' },
  { name: 'Hake', origin: 'Cornish day boat & Shetland', note: 'Succulent, a shade sweeter than cod. The Spanish know exactly what they are doing with it.' },
  { name: 'Red Mullet', origin: 'Cornish & Brittany day boats', note: 'Vibrant pink, rich, and with a real taste of shellfish. Pairs beautifully with garlic and ginger.' },
  { name: 'Grey Mullet', origin: 'Brighton coast day boat', note: 'Textured and earthy with a strong character. Pan-fry or roast whole.' },
  { name: 'Lemon Sole', origin: 'Cornish coast day boat', note: 'Mild, sweet and quick. On the plate inside ten minutes.' },
  { name: 'Mackerel', origin: 'Cornish day boat & Shetland', note: 'Oily, glossy and strong-flavoured. Made for coals and a squeeze of something sharp.' },
  { name: 'Gilthead Sea Bream', origin: 'Aquafrais', note: 'Firm sweet white flesh, subtler than bass. Salt-baked whole is a showstopper.' },
  { name: 'Yellowfin Tuna', origin: 'Sri Lanka — AAA grade, line-caught', note: 'Leaner and lighter than bluefin. Sear it thirty seconds a side and no more.' },
  { name: 'Bluefin Tuna', origin: 'Spain — sashimi grade', note: 'Line-caught and flawless. Slice it thin, eat it raw, thank us later.' },
  { name: 'Squid & Cuttlefish', origin: 'Cornish, Brittany & Sussex day boats', note: 'Prepped and ready. Flash-fry or chargrill, then citrus and sea salt immediately.' },
  { name: 'Octopus', origin: 'Spain & the Mediterranean', note: 'Pure white, dense and delicate. Cooked low and slow it turns to silk.' },
  { name: 'Salmon', origin: 'Shetland inshore & Loch Duart', note: 'Full-flavoured with deep coral flesh. Loch Duart’s low stocking densities give it a wild-like firmness.' },
  { name: 'Swordfish', origin: 'Sri Lanka', note: 'Meaty, mild and built for the barbecue.' },
  { name: 'Red Snapper', origin: 'Day boat', note: 'Moist, delicate, mild and sweet. Barbecue it whole with the skin scored.' },
];

export const smoked: Catch[] = [
  { name: 'Loch Duart Smoked Salmon', origin: 'Scotland', note: 'A heritage-breed salmon, cold-smoked. Our single best-selling thing at Christmas, by a mile.' },
  { name: 'Famous Manx Kippers', origin: 'Isle of Man', note: 'Oak-smoked the old way. Grill them, butter them, and forgive us for the smell in the house.' },
  { name: 'Arbroath Smokies', origin: 'Arbroath, Scotland', note: 'Hot-smoked haddock, still warm in the paper. Eat standing up, straight from the tail.' },
  { name: 'Natural Smoked Haddock', origin: 'Shetland', note: 'Undyed, mild and sweet. The only correct foundation for a kedgeree.' },
  { name: 'Smoked Eel', origin: 'Dutch', note: 'Meaty, rich and faintly sweet like shellfish. Vac-packed fillets, ready to eat.' },
  { name: 'Brown Shrimps', origin: 'Morecambe Bay', note: 'Where this family started. Potted in spiced butter to a recipe that has not changed in three generations.' },
];

export const shellfish: Catch[] = [
  { name: 'Hand-dived Scallops', origin: 'Shetland', note: 'Diver-caught, never dredged. In the shell or shucked to order.' },
  { name: 'Hand-gathered Mussels', origin: 'Shetland', note: 'Plump, clean and sweet. A kilo, some wine and ten minutes is dinner.' },
  { name: 'Dorset Clams', origin: 'Dorset', note: 'Small, sweet and briny. Vongole, and nothing but vongole.' },
  { name: 'Whitby Crab', origin: 'Whitby, Yorkshire', note: 'Hand-picked white and brown meat, dressed to order.' },
  { name: 'Langoustines', origin: 'Scottish inshore', note: 'Sweet, delicate and best barely cooked. Grill with garlic butter.' },
  { name: 'Wild Tiger Prawns', origin: 'Madagascar — XL grade', note: 'Enormous, and worth the theatre. Butterfly and grill over high heat.' },
  { name: 'Atlantic King Crab', origin: 'Raw, North Atlantic', note: 'Legs the length of your forearm. Steam, crack, melt butter, no conversation.' },
  { name: 'Caviar', origin: 'Selected houses', note: 'Ask at the oyster bar — Darius, Fred or Jack will talk you through the tins.' },
];

/** Varieties that rotate across the oyster bar's board. */
export const oysters = [
  { name: 'Belon Natives', origin: 'Brittany', note: 'Flat, metallic and unapologetic. The oyster that divides a table.' },
  { name: 'Tarbouriech Spéciale', origin: 'Étang de Thau', note: 'Tide-machine grown, deeply cupped, sweet with a long saline finish. The showpiece.' },
  { name: 'Spéciales Fines de Claire', origin: 'Marennes-Oléron', note: 'Finished in clay claires. Plump, nutty and green-tinged.' },
  { name: 'Ostra Regal', origin: 'Ireland & France', note: 'Firm, generous and consistently brilliant. The safe bet that is never boring.' },
  { name: 'Boudeuse', origin: 'Normandy', note: 'Tiny, dense and intensely concentrated. Two mouthfuls of pure Atlantic.' },
  { name: 'Sentinelles', origin: 'Normandy', note: 'Crisp, clean and bracingly briny. Where we start most people.' },
] as const;

export const team = [
  { name: 'Max', role: 'Stall manager', note: 'Runs the floor and knows what is worth buying before you have asked.' },
  { name: 'Jessel', role: 'Fishmonger', note: 'Filleting so clean it looks unfair.' },
  { name: 'Peter', role: 'Fishmonger', note: 'Will talk you through Whitby salmon for as long as you will listen.' },
  { name: 'Harry', role: 'Fishmonger', note: 'The one to ask what is best on the ice this morning.' },
  { name: 'Dean', role: 'Fishmonger', note: 'Boning, butterflying, pin-boning — the unglamorous craft, done properly.' },
  { name: 'Darius', role: 'Oysters, caviar & socials', note: 'Shucks at speed, and the reason your feed is full of us.' },
  { name: 'Fred', role: 'Oyster bar', note: 'Behind the Oyster Boat most days, glass in one hand, knife in the other.' },
  { name: 'Jack', role: 'Oysters & caviar', note: 'Patient with beginners, dangerous with a tin of Oscietra.' },
  { name: 'Chef Ryan', role: 'Hot counter', note: 'Commands the paella pans and the salt-and-pepper squid.' },
] as const;
