"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** FruitZen logo — a leaf-and-droplet mark beside the wordmark. */
export function Logo({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Already home → smooth-scroll to top instead of a no-op navigation.
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      aria-label="FruitZen home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-leaf-500 to-leaf-700 shadow-md shadow-leaf-600/25 transition-transform group-hover:scale-105 group-hover:-rotate-3">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
          <path d="M5 19c0-8 6.5-13.5 14-13.5C19 13 13.5 19 5 19Z" fill="white" />
          <path
            d="M6 18C9.5 13.5 13.5 10.5 17.5 8.5"
            stroke="#16a34a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="16.5" cy="16.5" r="2.4" fill="#f97316" />
        </svg>
      </span>
      <span className="text-xl font-extrabold tracking-tight">
        <span className="text-leaf-700">Fruit</span>
        <span className="text-orange-500">Z</span>
        <span className="text-leaf-700">en</span>
      </span>
    </Link>
  );
}
