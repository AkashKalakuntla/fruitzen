"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * FruitZen logo (official wordmark image).
 * `variant="light"` renders it white for dark backgrounds (e.g. footer).
 */
export function Logo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/fruitzen-logo.webp"
        alt="FruitZen"
        width={1600}
        height={264}
        priority
        className={`h-9 w-auto transition-transform hover:scale-105 ${
          variant === "light" ? "brightness-0 invert" : ""
        }`}
      />
    </Link>
  );
}
