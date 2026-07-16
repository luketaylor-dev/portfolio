import { Metadata } from "next";
import { Text } from "@/components/atoms";
import { NotFoundActions } from "@/components/feedback";

export const metadata: Metadata = {
  title: "Page Not Found | Luke Taylor",
  description:
    "Sorry, the page you're looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg space-y-6">
        <div className="text-8xl font-bold text-primary-500">404</div>
        <Text variant="heading2" as="h1">
          Page not found
        </Text>
        <Text variant="paragraph" as="p" color="muted" className="text-lg">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </Text>
        <NotFoundActions />
      </div>
    </div>
  );
}
