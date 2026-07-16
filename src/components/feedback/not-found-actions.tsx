"use client";

import { Home, ArrowLeft } from "lucide-react";
import { InteractiveButton } from "@/components/ui";

export default function NotFoundActions() {
  return (
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
  );
}
