import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllResources } from "@/lib/resources";
import { SITE } from "@/lib/business";

export const metadata: Metadata = {
  title: { absolute: "Juice Bar Guides & FAQs in Kukatpally, Hyderabad | FruitZen" },
  description:
    "FruitZen guides and FAQs: cold pressed juice in Kukatpally, protein shakes near JNTU, waffles, prices and timings for our juice bar in Kukatpally, Hyderabad.",
  alternates: { canonical: `${SITE}/resources` },
};

export default function ResourcesHub() {
  const items = getAllResources();

  return (
    <div className="min-h-screen bg-cream pt-28 pb-24 sm:pt-32">
      <header className="mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/55 transition-colors hover:text-leaf-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-600">
          Guides &amp; FAQs
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tighter text-gradient sm:text-5xl">
          FruitZen guides &amp; FAQs
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ink/60 text-balance">
          Cold-pressed juice, protein shakes near JNTU, waffles, prices and
          timings — everything about FruitZen&apos;s juice bar in Kukatpally,
          Hyderabad.
        </p>
      </header>

      <main className="mx-auto mt-14 w-full max-w-3xl px-5 sm:px-8">
        {items.length === 0 ? (
          <p className="rounded-card bg-white/70 p-8 text-center text-ink/55 ring-1 ring-leaf-100">
            New guides are on the way. Meanwhile, see the{" "}
            <Link href="/menu" className="font-semibold text-leaf-700 hover:underline">
              full menu
            </Link>
            .
          </p>
        ) : (
          <ul className="space-y-4">
            {items.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/resources/${r.slug}`}
                  className="group block rounded-card bg-white/70 p-6 ring-1 ring-leaf-100 transition-shadow hover:shadow-lg hover:shadow-leaf-900/5"
                >
                  <h2 className="flex items-start justify-between gap-3 text-lg font-bold text-ink">
                    <span className="group-hover:text-leaf-700">{r.title}</span>
                    <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-leaf-400 transition-transform group-hover:translate-x-1" />
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-ink/60">
                    {r.meta_description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
