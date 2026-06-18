import { Phone, AtSign, MapPin } from "lucide-react";
import { Logo } from "@/components/logo";
import { navLinks, site } from "@/lib/site";

export function Footer() {
  const { contact } = site;
  return (
    <footer className="relative overflow-hidden bg-leaf-950 text-white/80">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-leaf-600/20 blur-3xl" />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo className="[&_span]:text-white" />
            <p className="max-w-xs text-sm leading-6 text-white/60">
              {site.description}
            </p>
            <p className="text-sm font-semibold text-leaf-300">{site.tagline}</p>
          </div>

          <nav className="flex flex-col gap-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Explore
            </h3>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-leaf-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Connect
            </h3>
            <a href={contact.phoneHref} className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-leaf-300">
              <Phone className="h-4 w-4" /> {contact.phone}
            </a>
            <a href={contact.instagramHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-leaf-300">
              <AtSign className="h-4 w-4" /> {contact.instagram}
            </a>
            <a href={contact.mapsHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-leaf-300">
              <MapPin className="h-4 w-4" /> {contact.address.line2}, {contact.address.city}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© 2026 FruitZen · Kukatpally, Hyderabad</p>
          <p>Fresh. Healthy. You.</p>
        </div>
      </div>
    </footer>
  );
}
