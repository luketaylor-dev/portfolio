import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({
  items,
  className = "",
}: BreadcrumbsProps) {
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-2 text-sm text-neutral-400 ${className}`}
      >
        <Link
          href="/"
          className="flex items-center hover:text-primary-300 transition-colors"
          aria-label="Home"
        >
          <Home className="w-4 h-4" />
        </Link>

        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-neutral-500" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-primary-300 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="text-neutral-300 font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.dibza.co.uk",
              },
              ...items.map((it, idx) => ({
                "@type": "ListItem",
                position: idx + 2,
                name: it.label,
                item: it.href ? `https://www.dibza.co.uk${it.href}` : undefined,
              })),
            ],
          }),
        }}
        suppressHydrationWarning={true}
      />
    </>
  );
}
