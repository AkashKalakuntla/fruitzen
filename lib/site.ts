// Central source of truth for FruitZen brand content.

export const site = {
  name: "FruitZen",
  tagline: "Fresh. Healthy. You.",
  description:
    "FruitZen is a fresh juice & healthy beverage brand in Kukatpally, Hyderabad — cold-pressed juices, shakes, mocktails, waffles & healthy snacks made fresh daily.",
  url: "https://fruitzen.in",
  // Store photos served from /public/photos.
  photos: {
    storeInterior: "/photos/store-interior.webp",
  },
  contact: {
    phone: "9111736777",
    phoneHref: "tel:+919111736777",
    whatsappHref: "https://wa.me/919111736777",
    instagram: "@fruitzen.in",
    instagramHref: "https://www.instagram.com/fruitzen.in/",
    website: "fruitzen.in",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=FruitZen+Paparayadu+Nagar+Kukatpally+Hyderabad",
    address: {
      line1: "Paparayadu Nagar",
      line2: "Kukatpally",
      city: "Hyderabad",
      state: "Telangana",
    },
  },
} as const;

export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#why", label: "Why FruitZen" },
  { href: "/menu", label: "Menu" },
  { href: "/#wellness", label: "Wellness" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
] as const;
