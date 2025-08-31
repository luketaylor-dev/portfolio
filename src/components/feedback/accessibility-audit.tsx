"use client";

import { useEffect, useState } from "react";
import { axe } from "@axe-core/react";

interface AccessibilityIssue {
  id: string;
  impact: "minor" | "moderate" | "serious" | "critical";
  description: string;
  help: string;
  helpUrl: string;
  tags: string[];
  nodes: Array<{
    html: string;
    target: string[];
    failureSummary: string;
  }>;
}

interface AccessibilityAuditProps {
  children: React.ReactNode;
  onIssuesFound?: (issues: AccessibilityIssue[]) => void;
  showIssues?: boolean;
}

export function AccessibilityAudit({
  children,
  onIssuesFound,
  showIssues = false,
}: AccessibilityAuditProps) {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const runAudit = async () => {
        setIsAuditing(true);
        try {
          const results = await axe();
          setIssues(results.violations);
          onIssuesFound?.(results.violations);
        } catch (error) {
          console.error("Accessibility audit failed:", error);
        } finally {
          setIsAuditing(false);
        }
      };

      // Run audit after component mounts
      const timer = setTimeout(runAudit, 1000);
      return () => clearTimeout(timer);
    }
  }, [onIssuesFound]);

  if (!showIssues || issues.length === 0) {
    return <>{children}</>;
  }

  return (
    <div>
      {children}
      <div className="fixed bottom-4 right-4 z-50 max-w-md bg-red-900/95 backdrop-blur-sm border border-red-500/50 rounded-lg p-4 text-white">
        <h3 className="font-semibold text-red-200 mb-2">
          Accessibility Issues Found ({issues.length})
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {issues.map((issue, index) => (
            <div key={index} className="text-sm">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    issue.impact === "critical"
                      ? "bg-red-600 text-white"
                      : issue.impact === "serious"
                      ? "bg-orange-600 text-white"
                      : issue.impact === "moderate"
                      ? "bg-yellow-600 text-black"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {issue.impact}
                </span>
                <span className="font-medium">{issue.id}</span>
              </div>
              <p className="text-red-100 mb-1">{issue.description}</p>
              <p className="text-red-200 text-xs">{issue.help}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AccessibilityStatus() {
  const [status, setStatus] = useState<{
    issues: number;
    isAuditing: boolean;
  }>({ issues: 0, isAuditing: true });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkAccessibility = async () => {
        try {
          const results = await axe();
          setStatus({ issues: results.violations.length, isAuditing: false });
        } catch (error) {
          console.error("Accessibility check failed:", error);
          setStatus({ issues: 0, isAuditing: false });
        }
      };

      const timer = setTimeout(checkAccessibility, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (status.isAuditing) {
    return (
      <div className="fixed bottom-4 left-4 z-50 bg-blue-900/95 backdrop-blur-sm border border-blue-500/50 rounded-lg p-3 text-white text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
          Checking accessibility...
        </div>
      </div>
    );
  }

  if (status.issues === 0) {
    return (
      <div className="fixed bottom-4 left-4 z-50 bg-green-900/95 backdrop-blur-sm border border-green-500/50 rounded-lg p-3 text-white text-sm">
        <div className="flex items-center gap-2">
          <span className="text-green-300">✓</span>
          No accessibility issues found
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-red-900/95 backdrop-blur-sm border border-red-500/50 rounded-lg p-3 text-white text-sm">
      <div className="flex items-center gap-2">
        <span className="text-red-300">⚠</span>
        {status.issues} accessibility issue{status.issues !== 1 ? "s" : ""}{" "}
        found
      </div>
    </div>
  );
}
