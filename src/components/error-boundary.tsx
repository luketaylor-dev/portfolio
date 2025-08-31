"use client";
import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

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

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
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

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-medium text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Page
            </button>
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
            <button
              onClick={resetError}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-medium text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}

          <button
            onClick={() => (window.location.href = "/")}
            className="block w-full px-6 py-3 border-2 border-purple-500/50 rounded-xl font-medium text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
