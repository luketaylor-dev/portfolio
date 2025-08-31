"use client";
import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { InteractiveButton } from "@/components/ui";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">
                Something went wrong
              </h2>
              <p className="text-neutral-400">
                We encountered an unexpected error. Please try refreshing the
                page.
              </p>
            </div>

            <InteractiveButton
              onClick={() => window.location.reload()}
              variant="primary"
              size="md"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Page
            </InteractiveButton>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">
            Oops! Something went wrong
          </h2>
          <p className="text-neutral-400">
            {error?.message ||
              "We encountered an unexpected error. Please try again."}
          </p>
        </div>

        <div className="space-y-3">
          {resetError && (
            <InteractiveButton onClick={resetError} variant="primary" size="md">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </InteractiveButton>
          )}

          <InteractiveButton
            onClick={() => (window.location.href = "/")}
            variant="secondary"
            size="md"
            className="w-full"
          >
            Go Home
          </InteractiveButton>
        </div>
      </div>
    </div>
  );
}
