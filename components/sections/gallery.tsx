"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AtSign, Store, Blend, Camera } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { galleryItems } from "@/lib/content";
import { img } from "@/lib/images";
import { site } from "@/lib/site";

const ratios = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-square",
];

const placeholderIcons = { store: Store, blend: Blend } as const;

export function Gallery() {
  return (
    <section id="gallery" className="relative bg-cream-deep py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-leaf-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-leaf-700">
            Gallery
          </span>
          <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl text-balance">
            A taste of the <span className="text-gradient">experience</span>
          </h2>
        </Reveal>

        <div className="mt-14 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
          {galleryItems.map((tile, i) => {
            const Icon =
              tile.kind === "placeholder" ? placeholderIcons[tile.icon] : Camera;
            return (
              <motion.figure
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="group relative block break-inside-avoid overflow-hidden rounded-3xl bg-leaf-900 shadow-sm"
              >
                <div className={`relative ${ratios[i % ratios.length]}`}>
                  {tile.kind === "photo" || tile.kind === "local" ? (
                    <>
                      <Image
                        src={tile.kind === "photo" ? img(tile.photo, 700) : tile.src}
                        alt={tile.caption}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                    </>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-leaf-700 to-leaf-900 text-white/80">
                      <Icon className="h-9 w-9" />
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider">
                        Photo coming soon
                      </span>
                    </div>
                  )}
                  <figcaption className="absolute bottom-0 left-0 p-4 text-sm font-semibold text-white">
                    {tile.caption}
                  </figcaption>
                </div>
              </motion.figure>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <a
            href={site.contact.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-leaf-700 hover:text-leaf-900"
          >
            <AtSign className="h-4 w-4" /> Follow {site.contact.instagram}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
