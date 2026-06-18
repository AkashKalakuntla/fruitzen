// Menu, team, and feature content for FruitZen.

import type { PhotoKey } from "@/lib/images";

export type MenuCategory = {
  slug: string;
  name: string;
  blurb: string;
  emoji: string;
  // Tailwind gradient classes used as a colour wash behind / under the photo.
  gradient: string;
  // Verified product photo (see lib/images.ts).
  photo: PhotoKey;
  // Anchor (menu group slug) to jump to on the /menu page.
  target: string;
};

// Visual highlight cards (photos) on the home page → link to the /menu page.
export const menu: MenuCategory[] = [
  { slug: "fresh-juices", name: "Fresh Juices", blurb: "Pressed from fruit sourced fresh every morning.", emoji: "🍊", gradient: "from-citrus to-lemon", photo: "orangeJuice", target: "fresh-juices" },
  { slug: "smoothies", name: "Smoothies", blurb: "Thick, wholesome blends with banana, oats & more.", emoji: "🥤", gradient: "from-leaf-400 to-leaf-600", photo: "greenJuice", target: "smoothies" },
  { slug: "shakes", name: "Shakes", blurb: "Classic & premium milkshakes and thick shakes.", emoji: "🍫", gradient: "from-grape to-berry", photo: "shake", target: "classic-shakes" },
  { slug: "mojitos", name: "Mojitos & Iced Teas", blurb: "Refreshing fruit mojitos and chilled iced teas.", emoji: "🍹", gradient: "from-berry to-citrus", photo: "mocktail", target: "mojitos" },
  { slug: "waffles", name: "Waffles", blurb: "Freshly pressed waffles with premium toppings.", emoji: "🧇", gradient: "from-lemon to-citrus-dark", photo: "waffle", target: "waffles" },
  { slug: "snacks", name: "Momos & Snacks", blurb: "Momos, fries, nuggets and quick bites.", emoji: "🥟", gradient: "from-citrus-dark to-berry", photo: "fries", target: "momos" },
];

// Full itemised menu with prices (from the FruitZen menu cards).
export type MenuItem = { name: string; price: string; desc?: string };
export type MenuGroup = { slug: string; name: string; emoji: string; subtitle?: string; items: MenuItem[] };

export const menuGroups: MenuGroup[] = [
  {
    slug: "fresh-juices",
    name: "Fresh Juices",
    emoji: "🍊",
    subtitle: "350 ml",
    items: [
      { name: "Banana", price: "₹50" },
      { name: "Watermelon", price: "₹50" },
      { name: "Musk Melon", price: "₹50" },
      { name: "Papaya", price: "₹60" },
      { name: "Pineapple", price: "₹60" },
      { name: "Black Grape", price: "₹60" },
      { name: "Carrot", price: "₹60" },
      { name: "Beetroot", price: "₹60" },
      { name: "Carrot Beetroot", price: "₹60" },
      { name: "Mosambi", price: "₹60" },
      { name: "Mango (Seasonal)", price: "₹60" },
      { name: "Apple", price: "₹80" },
      { name: "Orange", price: "₹80" },
      { name: "Strawberry (Seasonal)", price: "₹80" },
      { name: "ABC (Apple, Beetroot & Carrot)", price: "₹80" },
      { name: "Dragon Fruit", price: "₹90" },
      { name: "Kiwi", price: "₹100" },
      { name: "Avocado", price: "₹120" },
      { name: "Pomegranate", price: "₹120" },
    ],
  },
  {
    slug: "cold-pressed",
    name: "Cold-Pressed Juices",
    emoji: "🧃",
    subtitle: "100% natural · no added sugar",
    items: [
      { name: "Mosambi", price: "₹60" },
      { name: "Pineapple", price: "₹120" },
      { name: "Orange (Imported Malta)", price: "₹149" },
      { name: "Pomegranate", price: "₹150" },
    ],
  },
  {
    slug: "smoothies",
    name: "Smoothies",
    emoji: "🥤",
    subtitle: "350 ml",
    items: [
      { name: "Apple Banana", price: "₹109" },
      { name: "Banana Chocolate", price: "₹109" },
      { name: "Oats Banana", price: "₹109" },
      { name: "Dry Fruits Banana", price: "₹109" },
      { name: "Avocado Banana", price: "₹109" },
      { name: "Strawberry", price: "₹109" },
      { name: "Kiwi Strawberry", price: "₹109" },
      { name: "Peanut Butter Banana", price: "₹190" },
    ],
  },
  {
    slug: "fresh-fruit-bowls",
    name: "Fresh Fruit Bowls",
    emoji: "🥣",
    subtitle: "350 gms",
    items: [
      { name: "Watermelon Bowl", price: "₹70" },
      { name: "Muskmelon Bowl", price: "₹80" },
      { name: "Melony Mix Bowl", price: "₹80" },
      { name: "Papaya Bowl", price: "₹90" },
      { name: "Mixed Fruit Bowl", price: "₹100" },
      { name: "Mixed Fruit + Honey", price: "₹110" },
      { name: "Mixed Fruit + Honey & Nuts", price: "₹120" },
      { name: "FruitZen Special Bowl", price: "₹150" },
    ],
  },
  {
    slug: "classic-shakes",
    name: "Classic Shakes",
    emoji: "🥛",
    subtitle: "Milkshake / Thick",
    items: [
      { name: "Vanilla", price: "₹100 / 130" },
      { name: "Strawberry", price: "₹100 / 130" },
      { name: "Butterscotch", price: "₹100 / 130" },
      { name: "Litchi", price: "₹100 / 130" },
      { name: "Kiwi", price: "₹100 / 130" },
      { name: "Blueberry", price: "₹100 / 130" },
      { name: "Black Currant", price: "₹100 / 130" },
      { name: "Pineapple", price: "₹100 / 130" },
      { name: "Banana", price: "₹100 / 130" },
      { name: "Mango Pineapple", price: "₹100 / 130" },
      { name: "Mango (Seasonal)", price: "₹100 / 130" },
      { name: "American Nuts", price: "₹100 / 130" },
      { name: "FruitZen Special Dryfruit", price: "₹130 / 160" },
    ],
  },
  {
    slug: "premium-shakes",
    name: "Premium Shakes",
    emoji: "🍫",
    subtitle: "Milkshake / Thick",
    items: [
      { name: "Chocolate", price: "₹110 / 130" },
      { name: "Oreo", price: "₹110 / 130" },
      { name: "KitKat", price: "₹110 / 130" },
      { name: "Snickers", price: "₹110 / 150" },
      { name: "Belgian Dark Chocolate", price: "₹120 / 150" },
      { name: "Cookies & Cream", price: "₹120 / 150" },
      { name: "Brownie", price: "₹120 / 150" },
      { name: "Oreo Brownie", price: "₹120 / 150" },
      { name: "Oreo Banana", price: "₹120 / 150" },
      { name: "Nutella Brownie", price: "₹120 / 150" },
      { name: "White Chocolate", price: "₹120 / 150" },
      { name: "Ferrero Rocher", price: "₹120 / 180" },
      { name: "Nutella", price: "₹120 / 180" },
      { name: "Hazelnut", price: "₹120 / 180" },
    ],
  },
  {
    slug: "mojitos",
    name: "Mojitos",
    emoji: "🍹",
    subtitle: "350 ml · all ₹70",
    items: [
      { name: "Blue Curacao", price: "₹70" },
      { name: "Virgin", price: "₹70" },
      { name: "Green Mint", price: "₹70" },
      { name: "Watermelon", price: "₹70" },
      { name: "Strawberry", price: "₹70" },
      { name: "Blueberry", price: "₹70" },
      { name: "Black Currant", price: "₹70" },
      { name: "Pomegranate", price: "₹70" },
      { name: "Green Apple", price: "₹70" },
      { name: "Peach", price: "₹70" },
    ],
  },
  {
    slug: "iced-teas",
    name: "Iced Teas",
    emoji: "🧊",
    subtitle: "350 ml · all ₹60",
    items: [
      { name: "Classic Lemon & Mint", price: "₹60" },
      { name: "Watermelon", price: "₹60" },
      { name: "Green Apple", price: "₹60" },
      { name: "Masala Iced Tea", price: "₹60" },
      { name: "Peach", price: "₹60" },
      { name: "Blueberry", price: "₹60" },
      { name: "Mango", price: "₹60" },
      { name: "Strawberry", price: "₹60" },
    ],
  },
  {
    slug: "cold-coffees",
    name: "Cold Coffees",
    emoji: "☕",
    subtitle: "350 ml",
    items: [
      { name: "Classic Cold Coffee", price: "₹99" },
      { name: "Chocolate Cold Coffee", price: "₹109" },
      { name: "Creamy Coffee Float", price: "₹119" },
      { name: "Oreo Crunch Cold Coffee", price: "₹129" },
      { name: "Caramel Cream Cold Coffee", price: "₹129" },
    ],
  },
  {
    slug: "waffles",
    name: "Waffles",
    emoji: "🧇",
    items: [
      { name: "Classic Honey", price: "₹129" },
      { name: "Dark Chocolate", price: "₹149" },
      { name: "Oreo", price: "₹159" },
      { name: "KitKat", price: "₹159" },
      { name: "Nutella", price: "₹169" },
      { name: "Triple Chocolate", price: "₹179" },
      { name: "Lotus Biscoff", price: "₹199" },
      { name: "FruitZen Banana Honey", price: "₹159" },
      { name: "FruitZen Mixed Fruit", price: "₹189" },
    ],
  },
  {
    slug: "momos",
    name: "Momos",
    emoji: "🥟",
    subtitle: "Steamed / Fried",
    items: [
      { name: "Veg Momos", price: "₹99 / 119" },
      { name: "Paneer Momos", price: "₹119 / 139" },
      { name: "Mushroom Momos", price: "₹119 / 139" },
      { name: "Schezwan Momos", price: "₹119 / 139" },
      { name: "Corn Cheese Momos", price: "₹129 / 149" },
      { name: "Crispy Kurkure Momos (Fried)", price: "₹159" },
    ],
  },
  {
    slug: "fries-nuggets",
    name: "Fries & Nuggets",
    emoji: "🍟",
    items: [
      { name: "Salted Fries", price: "₹79" },
      { name: "Peri Peri Fries", price: "₹99" },
      { name: "Cheese Corn Nuggets (6 pcs)", price: "₹119" },
    ],
  },
  {
    slug: "maggi",
    name: "Maggi",
    emoji: "🍜",
    items: [
      { name: "Plain Maggi", price: "₹59" },
      { name: "Veg Maggi", price: "₹79" },
      { name: "Egg Maggi", price: "₹89" },
    ],
  },
  {
    slug: "combos",
    name: "Combos",
    emoji: "🍱",
    subtitle: "Good food, great value",
    items: [
      { name: "Student Combo ★", price: "₹129", desc: "Veg Maggi + Watermelon / Mosambi juice" },
      { name: "Fries & Juice Combo ★", price: "₹129", desc: "Salted Fries + any fresh juice (₹60–80)" },
      { name: "Veg Momo Meal ★", price: "₹159", desc: "Veg Momos + any fresh juice (₹60–80)" },
      { name: "Paneer Momo Meal", price: "₹179", desc: "Paneer Momos + any fresh juice (₹60–80)" },
      { name: "Energy Combo", price: "₹299", desc: "Peanut Butter Banana Smoothie + Nutella Waffle" },
      { name: "FruitZen Special Combo", price: "₹329", desc: "Mixed Fruit Waffle + any cold-pressed juice" },
    ],
  },
];

export type TeamMember = {
  name: string;
  role: string;
  responsibilities: string[];
  initials: string;
  gradient: string;
};

export const team: TeamMember[] = [
  {
    name: "Akash Kalakuntla",
    role: "Technology & Digital Strategy",
    responsibilities: ["Technology", "Website", "Analytics", "Digital Systems", "Growth"],
    initials: "AK",
    gradient: "from-leaf-500 to-leaf-700",
  },
  {
    name: "Dinesh",
    role: "Sales & Marketing",
    responsibilities: ["Brand Building", "Customer Acquisition", "Marketing", "Partnerships"],
    initials: "D",
    gradient: "from-citrus to-citrus-dark",
  },
  {
    name: "Shiva",
    role: "Operations",
    responsibilities: ["Daily Operations", "Inventory", "Quality Control", "Customer Experience"],
    initials: "S",
    gradient: "from-grape to-berry",
  },
  {
    name: "Krishna",
    role: "Business Partner",
    responsibilities: ["Business Operations", "Growth Initiatives", "Strategic Decisions"],
    initials: "K",
    gradient: "from-berry to-citrus",
  },
];

/** Icon keys map to lucide-react icons in the rendering component. */
export type IconKey =
  | "leaf"
  | "snowflake"
  | "dumbbell"
  | "sparkles"
  | "shield"
  | "zap"
  | "droplets"
  | "heart"
  | "flame";

export type WhyFeature = {
  icon: IconKey;
  title: string;
  body: string;
};

export const whyFeatures: WhyFeature[] = [
  {
    icon: "leaf",
    title: "Fresh Ingredients",
    body: "Fruit sourced fresh every morning and prepared to order — never pre-mixed, never sitting around.",
  },
  {
    icon: "snowflake",
    title: "Cold Press Technology",
    body: "Premium cold-press extraction retains maximum nutrients, colour and flavour in every bottle.",
  },
  {
    icon: "dumbbell",
    title: "Gym-Friendly Options",
    body: "Protein shakes, recovery drinks and clean fuel built for athletes and fitness-first lifestyles.",
  },
  {
    icon: "shield",
    title: "Premium Hygiene",
    body: "Clinical prep standards, sealed handling and spotless stations on every single order.",
  },
  {
    icon: "sparkles",
    title: "Consistent Quality",
    body: "The same great taste, every visit — a streamlined menu perfected around what you love.",
  },
];

export type WellnessMetric = {
  icon: IconKey;
  label: string;
  value: number;
  suffix: string;
  blurb: string;
};

export const wellness: WellnessMetric[] = [
  { icon: "zap", label: "Pre Workout Energy", value: 100, suffix: "%", blurb: "Clean, natural energy to power your session." },
  { icon: "droplets", label: "Hydration", value: 6, suffix: "+", blurb: "Hydrating fruit blends to keep you going." },
  { icon: "heart", label: "Recovery Drinks", value: 20, suffix: "g", blurb: "Protein-rich shakes for faster recovery." },
  { icon: "leaf", label: "Cold Press Nutrition", value: 0, suffix: "g", blurb: "Zero refined sugar — real fruit only." },
];

export type TimelineStep = {
  tag: string;
  title: string;
  body: string;
  photo: PhotoKey;
};

export const timeline: TimelineStep[] = [
  {
    tag: "Sourcing",
    title: "Hand-picked daily",
    body: "We source fresh fruit every morning and choose it for peak ripeness — nothing sits around.",
    photo: "mangoPile",
  },
  {
    tag: "Cold Press",
    title: "Pressed for nutrients",
    body: "Premium cold-press extraction locks in maximum nutrients, colour and natural flavour.",
    photo: "greenJuice",
  },
  {
    tag: "Crafted",
    title: "Made when you order",
    body: "Every juice, shake and mocktail is prepared fresh the moment you order it.",
    photo: "mocktail",
  },
  {
    tag: "Experience",
    title: "Clean & consistent",
    body: "Spotless preparation and the same great taste, on every single visit.",
    photo: "orangeJuice",
  },
];

export type Feature = {
  emoji: string;
  title: string;
  body: string;
};

export const features: Feature[] = [
  {
    emoji: "🍓",
    title: "Fresh Ingredients",
    body: "Fresh fruits sourced daily — nothing sits around, everything is made to order.",
  },
  {
    emoji: "❄️",
    title: "Cold Press Technology",
    body: "Premium cold-pressed juices designed to retain freshness and nutrients.",
  },
  {
    emoji: "✨",
    title: "Simplified Menu",
    body: "Instead of hundreds of items, we focus on the products customers genuinely love.",
  },
  {
    emoji: "💪",
    title: "Gym-Friendly Options",
    body: "Recovery drinks, banana shakes and refreshers built for fitness-focused customers.",
  },
  {
    emoji: "🧼",
    title: "Quality First",
    body: "Hygiene, consistency and fresh preparation on every single order.",
  },
  {
    emoji: "🤝",
    title: "Community Space",
    body: "A welcoming place to relax, recharge and enjoy fresh products.",
  },
];

// Core brand promises.
export const promises = ["Real Fruits", "No Added Sugar", "No Preservatives"] as const;

// Fitness offerings for the wellness section.
export const fitnessOfferings = [
  { emoji: "🥤", name: "Protein Shakes", note: "Build and repair after training." },
  { emoji: "🏋️", name: "High Protein Options", note: "Hit your macros, deliciously." },
  { emoji: "⚡", name: "Energy Boosters", note: "Clean fuel before you train." },
  { emoji: "🔄", name: "Post-Workout Recovery", note: "Replenish and bounce back." },
] as const;

// Gallery — mix of verified photos and clearly-labelled placeholders.
// Swap a placeholder for a real photo: add the image to lib/images.ts and
// change `{ kind: "placeholder", ... }` to `{ kind: "photo", photo: "<key>" }`.
export type GalleryItem = { caption: string } & (
  | { kind: "photo"; photo: PhotoKey }
  | { kind: "local"; src: string }
  | { kind: "placeholder"; icon: "store" | "blend" }
);

export const galleryItems: GalleryItem[] = [
  { kind: "local", src: "/photos/store-interior.webp", caption: "Our Store" },
  { kind: "photo", photo: "cafe", caption: "Store Interior" },
  { kind: "placeholder", icon: "blend", caption: "Cold Press Equipment" },
  { kind: "photo", photo: "waffle", caption: "Waffles" },
  { kind: "photo", photo: "orangeJuice", caption: "Juices" },
  { kind: "photo", photo: "mocktail", caption: "Mocktails" },
  { kind: "photo", photo: "greenJuice", caption: "Cold-Pressed Greens" },
  { kind: "photo", photo: "fries", caption: "Quick Bites" },
];
