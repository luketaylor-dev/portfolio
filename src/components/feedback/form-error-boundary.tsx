"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { InteractiveButton } from "@/components/ui";

interface FormErrorBoundaryProps {
  children: ReactNode;
  onReset?: () => void;
}

interface FormErrorBoundaryState {
  hasError: boolean;
  error?: Error | undefined;
}

export class FormErrorBoundary extends Component<
  FormErrorBoundaryProps,
  FormErrorBoundaryState
> {
  constructor(props: FormErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): FormErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Form error caught by boundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-xl">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Form Error</h3>
              <p className="text-neutral-400 text-sm">
                There was an issue with the form. Please try again.
              </p>
            </div>

            <InteractiveButton
              onClick={this.handleReset}
              variant="primary"
              size="sm"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </InteractiveButton>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
