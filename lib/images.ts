// Verified Unsplash photo IDs (each visually checked for FruitZen).
// To swap in real shop photos later: replace the `id` with a local
// path in /public and adjust the `img()` helper / <Image src> accordingly.

export const photoIds = {
  hero: "1622597467836-f3285f2131b8", // row of colourful juice jars (dark)
  orangeJuice: "1600271886742-f049cd451bba", // tall orange juice (dark)
  greenJuice: "1610970881699-44a5587cabec", // green veg smoothie
  shake: "1572490122747-3968b75cc699", // oreo chocolate milkshake
  mocktail: "1536935338788-846bb9981813", // berry mocktail, crushed ice (dark)
  waffle: "1562376552-0d160a2f238d", // waffles on plate (dark)
  fries: "1630384060421-cb20d0e0649d", // fries basket (dark)
  mangoPile: "1601493700631-2b16ec4b4716", // pile of mangoes
  mangoJuice: "1546173159-315724a31696", // mango cooler (yellow)
  grapeJuice: "1474722883778-792e7990302f", // grape juice in glass (dark)
  icedTea: "1556679343-c7306c1976bc", // iced lime drink (dark)
  cafe: "1521017432531-fbd92d768814", // cosy cafe interior
} as const;

export type PhotoKey = keyof typeof photoIds;

/** Build a sized, optimised Unsplash URL for a known photo key. */
export function img(key: PhotoKey, width = 800): string {
  return `https://images.unsplash.com/photo-${photoIds[key]}?w=${width}&q=75&auto=format&fit=crop`;
}
