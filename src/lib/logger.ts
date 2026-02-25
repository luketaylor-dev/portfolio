/**
 * Centralised logger utility. Use instead of console.* for consistency.
 * - logger.debug() / logger.log() → gated by DEBUG env (dev-only)
 * - logger.error() → always logs (for diagnostics, error boundaries, API failures)
 * - logger.warn() → gated by DEBUG (same as log)
 */

const isDebugEnabled = (): boolean => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_DEBUG === "true";
  }
  return process.env.DEBUG === "true";
};

export const logger = {
  debug: (...args: unknown[]) => {
    if (isDebugEnabled()) {
      console.log(...args);
    }
  },
  log: (...args: unknown[]) => {
    if (isDebugEnabled()) {
      console.log(...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (isDebugEnabled()) {
      console.warn(...args);
    }
  },
  error: (...args: unknown[]) => {
    console.error(...args);
  },
};
