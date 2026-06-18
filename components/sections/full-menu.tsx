"use client";

import { motion } from "framer-motion";
import { MessageCircle, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { menuGroups } from "@/lib/content";
import { site } from "@/lib/site";

export function FullMenu() {
  return (
    <>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        {menuGroups.map((group) => (
          <motion.div
            key={group.slug}
            id={group.slug}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="scroll-mt-28 break-inside-avoid rounded-card border border-leaf-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-baseline justify-between gap-2 border-b border-leaf-100 pb-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
                <span className="text-xl">{group.emoji}</span>
                {group.name}
              </h2>
              {group.subtitle ? (
                <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-leaf-600">
                  {group.subtitle}
                </span>
              ) : null}
            </div>
            <ul className="mt-3 space-y-2.5">
              {group.items.map((it) => (
                <li key={it.name} className="flex items-baseline justify-between gap-3">
                  <span className="text-sm text-ink/80">
                    {it.name}
                    {it.desc ? (
                      <span className="mt-0.5 block text-xs leading-snug text-ink/45">
                        {it.desc}
                      </span>
                    ) : null}
                  </span>
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-leaf-700">
                    {it.price}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <Button href={site.contact.whatsappHref} variant="accent" size="lg">
          <MessageCircle className="h-4 w-4" /> Order on WhatsApp
        </Button>
        <Button href={site.contact.mapsHref} variant="outline" size="lg">
          <MapPin className="h-4 w-4" /> Get Directions
        </Button>
      </Reveal>
    </>
  );
}
