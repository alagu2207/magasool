/**
 * Base URL of the Magasool mail backend (server/).
 * Override at build/run time with EXPO_PUBLIC_API_URL (e.g. your deployed API).
 */
export const API_URL =
  (process.env.EXPO_PUBLIC_API_URL as string | undefined) ?? 'http://localhost:3001';
