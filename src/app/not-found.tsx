"use client";

import { Home, ArrowLeft } from "lucide-react";
import { Text } from "@/components/atoms";
import { InteractiveButton } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg space-y-6">
        <div className="text-8xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          404
        </div>
        <Text variant="heading2" as="h1">
          Page not found
        </Text>
        <Text variant="paragraph" as="p" color="muted" className="text-lg">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </Text>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <InteractiveButton href="/" variant="primary" size="lg">
            <Home className="w-5 h-5" />
            Back to home
          </InteractiveButton>
          <InteractiveButton
            variant="secondary"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            Go back
          </InteractiveButton>
        </div>
      </div>
    </div>
  );
}
