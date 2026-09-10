/**
 * Single source of truth for everything that appears in more than one place:
 * nav, contact details, hours, the catch, the oysters, the team.
 * Change it here, it changes everywhere.
 */

export const site = {
  name: 'Furness Fish Market',
  tagline: 'Borough Market, London - since 1998',
  description:
    'A Morecambe Bay fishing family holding the finest fish counter in Borough Market. Day-boat fish, an oyster bar and a paella mar y montaña, twelve hours from the water.',
  instagram: {
    market: { handle: 'FurnessFishMarket', url: 'https://www.instagram.com/furnessfishmarket/' },
    oysterBar: { handle: 'FurnessOysterBar', url: 'https://www.instagram.com/furnessoysterbar/' },
  },
} as const;

export const contact = {
  addressLines: ['Furness Fish Market', '8 Southwark Street', 'Borough Market', 'London', 'SE1 1TL'],
  postcode: 'SE1 1TL',
  email: 'furnessfishmarket@gmail.com',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Furness+Fish+Market+8+Southwark+Street+Borough+Market+London+SE1+1TL',

  /**
   * Web3Forms access key, which is what makes the enquiry form actually send.
   * Get one free (no account, no submission limit) at https://web3forms.com -
   * enter furnessfishmarket@gmail.com and the key is emailed straight back.
   * Paste it here and the form goes live; leave it blank and the Visit page
   * shows the email address instead of a form that would silently fail.
   */
  formAccessKey: '',
} as const;

export type OpeningRow = { day: string; time: string; closed?: boolean };

export const hours: readonly OpeningRow[] = [
  { day: 'Monday', time: 'Closed', closed: true },
  { day: 'Tuesday', time: '8am - 5pm' },
  { day: 'Wednesday', time: '8am - 5pm' },
  { day: 'Thursday', time: '8am - 5pm' },
  { day: 'Friday', time: '8am - 5pm' },
  { day: 'Saturday', time: '8am - 5pm' },
  { day: 'Sunday', time: '8am - 4pm' },
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
    body: 'Nothing on our ice has sat in a warehouse. Fish leaves the day boat and reaches Southwark Street inside twelve hours, which is why it smells of nothing at all but clean, cold sea.',
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
  { name: 'Turbot', origin: 'Brighton coast day boat', note: 'White, buttery, firm. The king of flat fish and worth every penny. Roast it on the bone.' },
  { name: 'Dover Sole', origin: 'Cornish coast day boat', note: 'Mild and sweet with a small, tight flake. Butter, lemon, a hot pan, nothing else.' },
  { name: 'Monkfish', origin: 'Shetland inshore', note: 'Firm, meaty, delicately flavoured. Holds its nerve in a stew and roasts like a joint of meat.' },
  { name: 'Halibut', origin: 'Shetland inshore', note: 'Dense white flesh with a proper steak-like texture. Pan-fry hard, finish in butter.' },
  { name: 'John Dory', origin: 'Cornish coast day boat', note: 'An ugly fish with a beautiful fillet: dense, white and packed with flavour.' },
  { name: 'Brill', origin: 'Brighton coast day boat', note: 'A quieter cousin to the turbot. Sweet, firm and forgiving under a grill.' },
  { name: 'Cod & Cod Cheeks', origin: 'Inshore Shetland', note: 'The cheeks are the fishmonger’s secret: boneless little medallions, sauteed, crumbed or curried.' },
  { name: 'Hake', origin: 'Cornish day boat & Shetland', note: 'Succulent, a shade sweeter than cod. The Spanish know exactly what they are doing with it.' },
  { name: 'Red Mullet', origin: 'Cornish & Brittany day boats', note: 'Vibrant pink, rich, and with a real taste of shellfish. Pairs beautifully with garlic and ginger.' },
  { name: 'Grey Mullet', origin: 'Brighton coast day boat', note: 'Textured and earthy with a strong character. Pan-fry or roast whole.' },
  { name: 'Lemon Sole', origin: 'Cornish coast day boat', note: 'Mild, sweet and quick. On the plate inside ten minutes.' },
  { name: 'Mackerel', origin: 'Cornish day boat & Shetland', note: 'Oily, glossy and strong-flavoured. Made for coals and a squeeze of something sharp.' },
  { name: 'Gilthead Sea Bream', origin: 'Aquafrais', note: 'Firm sweet white flesh, subtler than bass. Salt-baked whole is a showstopper.' },
  { name: 'Yellowfin Tuna', origin: 'Sri Lanka, AAA grade, line-caught', note: 'Leaner and lighter than bluefin. Sear it thirty seconds a side and no more.' },
  { name: 'Bluefin Tuna', origin: 'Spain, sashimi grade', note: 'Line-caught and flawless. Slice it thin, eat it raw, thank us later.' },
  { name: 'Squid & Cuttlefish', origin: 'Cornish, Brittany & Sussex day boats', note: 'Whole off the boat, and cleaned to order at the counter if you would rather not do it at home.' },
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
  { name: 'Langoustines', origin: 'Scottish inshore', note: 'Sweet, delicate and best barely cooked. Grill them with garlic butter.' },
  { name: 'XL Madagascan Tiger Prawns', origin: 'Madagascar', note: 'Enormous, and worth the theatre. Butterfly them and grill over high heat.' },
  { name: 'Lobster Tails', origin: 'North Atlantic', note: 'Split, buttered and put under a fierce grill. Ten minutes, start to finish.' },
  { name: 'Atlantic King Crab', origin: 'Raw, North Atlantic', note: 'Legs the length of your forearm. Steam, crack, melt butter, no conversation.' },
  { name: 'Caviar', origin: 'Selected houses', note: 'Ask at the oyster bar and Darius, Fred or Jack will talk you through the tins.' },
];

/**
 * The oyster board. Heavily Irish, because that is where the best of it is
 * coming from at the moment. Varieties rotate with the season.
 */
export const oysters: Catch[] = [
  {
    name: 'Louët-Feisser',
    origin: 'Carlingford Lough, Ireland',
    note: 'Grown in suspended baskets by the Louët-Feisser family, who have farmed Carlingford since 1974. Hand-selected into a perfect tear-drop, with a strong shell, a pearly white enamel and a deep Special meat content.',
  },
  {
    name: 'Louët-Feisser Alanna',
    origin: 'Carlingford Lough, exclusive to us',
    note: 'The newest oyster in the Carlingford range and a world exclusive to this counter. A cocktail-size shell named after the Irish endearment, and after the eldest Louët-Feisser daughter. Two perfect mouthfuls.',
  },
  {
    name: 'Connemara',
    origin: 'Ballinakill Bay, Galway',
    note: 'Oysters have been farmed on this bay since 1893. Atlantic current on one side, fresh run-off from the Connemara hills on the other, which is what makes them so rich and so unusually meaty.',
  },
  {
    name: 'Gallagher’s',
    origin: 'Tragheanna Bay, Donegal',
    note: 'From Edward Gallagher, a second-generation Donegal oyster farmer working some of the cleanest water in Europe. Crisp, bright and properly bracing.',
  },
  {
    name: 'Ostra Regal',
    origin: 'Ireland, by the Boutrais family',
    note: 'A French oyster dynasty growing in Irish water. Firm, generous and relentlessly consistent: the safe bet that somehow never gets boring.',
  },
  {
    name: 'Tia Maraa',
    origin: 'Ireland, finished in Marennes-Oléron',
    note: 'The all-Irish sister of the Gillardeau house. Raised in Atlantic water, then rested for two months in the French clay claires to soften the salt. Crisp, fleshy, with a light creamy finish.',
  },
  {
    name: 'Gillardeau',
    origin: 'Marennes-Oléron, France',
    note: 'Maison Gillardeau has been at this since 1898. Two years growing in Ireland or Normandy, then finished in the Marennes-Oléron claires. The benchmark everyone else gets measured against.',
  },
  {
    name: 'Devon XXL',
    origin: 'The Jurassic Coast',
    note: 'An enormous English rock oyster off the Jurassic Coast. Too big for one polite mouthful, which is rather the appeal. Order it if you want to feel something.',
  },
  {
    name: 'Sea Urchins',
    origin: 'Iceland & Orkney',
    note: 'Not an oyster, but opened at the same counter. Cold northern water gives a dense, sweet roe with a long mineral finish. We cut them in front of you and hand you a spoon.',
  },
];

export const team = [
  { name: 'Max', role: 'Stall manager', note: 'Runs the floor and knows what is worth buying before you have asked.' },
  { name: 'Peter', role: 'Fishmonger', note: 'Will talk you through Loch Duart salmon for as long as you will listen.' },
  { name: 'Harry', role: 'Fishmonger', note: 'Cares about the fish as much as he cares about his own appearance. Our in-house celebrity.' },
  { name: 'Darius', role: 'Oysters, caviar & socials', note: 'Shucks at speed, and the reason your feed is full of us.' },
  { name: 'Fred', role: 'Oyster bar', note: 'Behind the Oyster Boat most days. The muscles of the operation.' },
  { name: 'Jack', role: 'Oysters & caviar', note: 'Patient with beginners, dangerous with a tin of Oscietra.' },
  { name: 'Chef Ryan', role: 'Hot counter', note: 'Commands the paella pans and everything else that comes off the heat.' },
] as const;
