"use client";

import { Handshake, PartyPopper, CalendarDays, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

const wa = (msg: string) =>
  `${site.contact.whatsappHref}?text=${encodeURIComponent(msg)}`;

const uses = [
  {
    icon: Handshake,
    title: "Franchise",
    body: "Open a FruitZen outlet in your city.",
  },
  {
    icon: PartyPopper,
    title: "Party & bulk orders",
    body: "Juices, shakes & snacks for any crowd.",
  },
  {
    icon: CalendarDays,
    title: "Events & catering",
    body: "Live counters for corporate & private events.",
  },
];

export function Partner() {
  return (
    <section id="partner" className="relative scroll-mt-28 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-leaf-700 via-leaf-800 to-leaf-950 p-8 text-white shadow-2xl sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-leaf-500/25 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-200 ring-1 ring-white/15">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> Partner with us
              </span>
              <h2 className="mt-5 max-w-2xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                Franchise, bulk orders &amp;{" "}
                <span className="font-serif font-medium text-orange-400">events.</span>
              </h2>
              <p className="mt-4 max-w-xl text-white/75 text-balance">
                Opening a FruitZen outlet, hosting a party or corporate event, or
                need fresh juices in bulk? Tell us what you have in mind — we&apos;ll
                take it from there.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {uses.map((u) => (
                  <div key={u.title} className="glass-dark rounded-2xl p-5">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-leaf-500/20 text-leaf-200">
                      <u.icon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 font-bold text-white">{u.title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/60">{u.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={wa(
                    "Hi FruitZen! I'd like to enquire about franchise / bulk & party orders / events.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-orange-500 px-8 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl"
                >
                  <MessageCircle className="h-5 w-5" />
                  Enquire on WhatsApp
                </a>
                <a
                  href={site.contact.phoneHref}
                  className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border-2 border-white/25 px-8 text-base font-semibold text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/10"
                >
                  <Phone className="h-5 w-5" />
                  Call {site.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
