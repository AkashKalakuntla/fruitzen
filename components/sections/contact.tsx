import { Phone, AtSign, MapPin, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Contact() {
  const { contact } = site;

  const methods = [
    { icon: Phone, label: "Call", value: contact.phone, href: contact.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: "Message us", href: contact.whatsappHref, external: true },
    { icon: AtSign, label: "Instagram", value: contact.instagram, href: contact.instagramHref, external: true },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-leaf-700 via-leaf-800 to-leaf-950 p-1 shadow-2xl">
            <div className="grid gap-8 rounded-[2.4rem] p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

              <div className="relative text-white">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-leaf-200">
                  Come Visit
                </span>
                <h2 className="mt-4 text-4xl font-bold sm:text-5xl text-balance">
                  Visit FruitZen Today
                </h2>
                <p className="mt-4 flex items-start gap-2 text-white/75">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-leaf-300" />
                  <span>
                    {contact.address.line1}, {contact.address.line2},<br />
                    {contact.address.city}, {contact.address.state}
                  </span>
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {methods.map((m) => (
                    <a
                      key={m.label}
                      href={m.href}
                      {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="glass-dark group rounded-2xl p-4 transition-colors hover:bg-white/10"
                    >
                      <m.icon className="h-5 w-5 text-leaf-300" />
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                        {m.label}
                      </p>
                      <p className="text-sm font-semibold text-white">{m.value}</p>
                    </a>
                  ))}
                </div>

                <p className="mt-4 text-sm text-white/55">
                  Online at{" "}
                  <a href={`https://${contact.website}`} className="font-semibold text-leaf-300 hover:underline">
                    {contact.website}
                  </a>
                </p>

                <div className="mt-8">
                  <Button href={contact.mapsHref} variant="accent" size="lg">
                    Get directions
                  </Button>
                </div>
              </div>

              {/* Map */}
              <div className="relative h-72 overflow-hidden rounded-3xl ring-1 ring-white/15 lg:h-full lg:min-h-[24rem]">
                <iframe
                  title="FruitZen location"
                  src="https://www.google.com/maps?q=Paparayadu+Nagar+Kukatpally+Hyderabad&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 grayscale-[0.2]"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
