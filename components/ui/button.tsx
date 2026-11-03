import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "juice-btn shine relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-leaf-500 text-white shadow-lg shadow-leaf-500/30 hover:bg-leaf-600 hover:shadow-xl hover:shadow-leaf-500/40 [--juice:var(--color-leaf-800)]",
        accent:
          "bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 [--juice:var(--color-orange-700)]",
        outline:
          "border-2 border-leaf-500/40 text-leaf-700 hover:border-leaf-500 [--juice:var(--color-leaf-100)]",
        glass: "glass text-ink hover:bg-white/80 [--juice:var(--color-leaf-100)]",
        ghost: "text-ink/70 hover:bg-leaf-50 hover:text-ink [--juice:var(--color-leaf-100)]",
      },
      size: {
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href: string;
} & VariantProps<typeof buttonVariants> &
  Omit<ComponentProps<typeof Link>, "href">;

/** True for in-page anchors, phone/mail, and external links. */
function isPlainAnchor(href: string) {
  return /^(#|tel:|mailto:|https?:)/.test(href);
}

/**
 * Brand CTA. Renders a native <a> for hash/tel/external links (so in-page
 * anchor scrolling works reliably) and a Next.js <Link> for app routes.
 */
export function Button({
  children,
  className,
  variant,
  size,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  const label = (
    <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
  );

  if (isPlainAnchor(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {label}
    </Link>
  );
}

export { buttonVariants };
