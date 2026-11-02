import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { marked } from "marked";
import JsonLd from "@/components/JsonLd";
import { getAllResources, getResource } from "@/lib/resources";
import { SITE, BUSINESS } from "@/lib/business";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllResources().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const r = getResource((await params).slug);
  if (!r) return {};
  const url = `${SITE}${r.canonical_url}`;
  return {
    title: { absolute: r.meta_title },
    description: r.meta_description,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: { "max-snippet": -1, "max-image-preview": "large" },
    },
    openGraph: {
      title: r.meta_title,
      description: r.meta_description,
      url,
      type: "article",
      images: [`${SITE}/og-image.jpg`],
    },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const r = getResource((await params).slug);
  if (!r) notFound();
  const url = `${SITE}${r.canonical_url}`;

  // Turn "## Heading {#anchor}" into real <h2 id="anchor"> before parsing.
  const html = marked.parse(
    r.body.replace(
      /^(#{2,3}) (.+?) \{#([a-z0-9-]+)\}$/gm,
      (_m, h, t, id) => `<h${h.length} id="${id}">${t}</h${h.length}>`,
    ),
  ) as string;

  // Service (landing pages) or Article (blog/faq). LocalBusiness is emitted once
  // in the root layout for every page; here we only reference it by @id so the
  // page does not carry a duplicate LocalBusiness node.
  const main =
    r.schema_type === "Service"
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: r.title,
          description: r.meta_description,
          url,
          provider: { "@id": `${SITE}/#business` },
          areaServed: "Kukatpally, Hyderabad",
          datePublished: r.created,
          dateModified: r.updated,
        }
      : {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: r.title,
          description: r.meta_description,
          url,
          author: { "@type": "Organization", name: BUSINESS.name },
          publisher: { "@id": `${SITE}/#business` },
          datePublished: r.created,
          dateModified: r.updated,
        };

  const faq = r.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: r.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Guides & FAQs", item: `${SITE}/resources` },
      { "@type": "ListItem", position: 3, name: r.title, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-cream pt-28 pb-24 sm:pt-32">
      <JsonLd data={[main, ...(faq ? [faq] : []), crumbs]} />

      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        {/* Visible breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-ink/50">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="transition-colors hover:text-leaf-700">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-ink/30">/</li>
            <li>
              <Link href="/resources" className="transition-colors hover:text-leaf-700">
                Guides &amp; FAQs
              </Link>
            </li>
          </ol>
        </nav>

        <article className="prose prose-lg mt-6 max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:text-ink prose-p:text-ink/75 prose-li:text-ink/75 prose-strong:text-ink prose-a:font-medium prose-a:text-leaf-700 prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-th:text-ink prose-td:text-ink/75">
          <h1 className="text-gradient">{r.title}</h1>
          <p className="!mt-2 text-sm !text-ink/45">Updated {r.updated}</p>

          <div dangerouslySetInnerHTML={{ __html: html }} />

          {r.faqs?.length ? (
            <section aria-labelledby="faq" className="mt-12">
              <h2 id="faq">Frequently asked questions</h2>
              <div className="not-prose mt-5 space-y-3">
                {r.faqs.map((f) => (
                  <details
                    key={f.question}
                    open
                    className="rounded-2xl bg-white/70 p-5 ring-1 ring-leaf-100"
                  >
                    <summary className="cursor-pointer font-semibold text-ink">
                      {f.question}
                    </summary>
                    <p className="mt-2 leading-7 text-ink/70">{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}
        </article>

        <div className="mt-12">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/55 transition-colors hover:text-leaf-700"
          >
            <ArrowLeft className="h-4 w-4" /> All guides &amp; FAQs
          </Link>
        </div>
      </div>
    </div>
  );
}
