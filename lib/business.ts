// Single source of truth for FruitZen NAP + schema. Mirrors config/brand.yaml.
export const SITE = "https://fruitzen.in";

export const BUSINESS = {
  name: "FruitZen",
  description:
    "FruitZen is a fresh-juice and wellness bar in Kukatpally, Hyderabad. Fresh juices, cold-pressed juices (no added sugar), smoothies, shakes, cold coffees, mojitos, waffles and momos, made to order from fruit sourced every morning. Open daily 9 am–11 pm.",
  phone: "+91-91117-36777",
  whatsapp: "https://wa.me/919111736777",
  menu: `${SITE}/menu`,
  priceRange: "₹50–₹329",
  address: {
    streetAddress: "Shop No 1, H.No 4-42-950, near HP Petrol Pump, Ramarao Nagar Colony, Paparayadu Nagar, Kukatpally",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500072",
    addressCountry: "IN",
  },
  // TODO(owner): copy the exact pin from Google Maps (right-click the pin → coordinates)
  geo: null as null | { latitude: number; longitude: number },
  sameAs: [
    "https://www.instagram.com/fruitzen.in/",
    // TODO(owner): add Google Business Profile share link, Swiggy URL, Zomato URL
  ],
};

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["FoodEstablishment", "LocalBusiness"],
    "@id": `${SITE}/#business`,
    name: BUSINESS.name,
    url: SITE,
    logo: `${SITE}/fruitzen-logo.webp`,
    image: `${SITE}/og-image.jpg`,
    description: BUSINESS.description,
    telephone: BUSINESS.phone,
    priceRange: BUSINESS.priceRange,
    servesCuisine: ["Juices", "Smoothies", "Shakes", "Waffles", "Momos"],
    hasMenu: BUSINESS.menu,
    acceptsReservations: false,
    address: { "@type": "PostalAddress", ...BUSINESS.address },
    ...(BUSINESS.geo ? { geo: { "@type": "GeoCoordinates", ...BUSINESS.geo } } : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "23:00",
      },
    ],
    amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true }],
    areaServed: ["Kukatpally", "KPHB Colony", "JNTU", "Hyderabad"],
    sameAs: BUSINESS.sameAs,
  };
}
