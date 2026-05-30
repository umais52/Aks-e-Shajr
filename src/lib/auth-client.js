/**
 * src/lib/auth-client.js — Frontend Authentication SDK
 *
 * This file configures the Better Auth browser client that talks to our
 * Express API server. All auth operations (login, register, password reset, etc.)
 * go through this client.
 *
 * Usage in any React component:
 *   import { signIn, signUp, signOut, forgetPassword, resetPassword } from '../../../lib/auth-client';
 *
 *   // Sign in
 *   const { data, error } = await signIn.email({ email, password });
 *
 *   // Sign up
 *   const { data, error } = await signUp.email({ email, password, name: 'John' });
 *
 *   // Request password reset email
 *   const { data, error } = await requestPasswordReset({ email, redirectTo: '/auth/set-password' });
 *
 *   // Apply new password (on /auth/set-password page, after reading ?token= from URL)
 *   const { data, error } = await resetPassword({ newPassword: '...', token: '...' });
 *
 *   // Sign out
 *   await signOut();
 *
 *   // React hook — returns { data: session | null, isPending, error }
 *   const { data: session } = useSession();
 */

import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient({
  // Better Auth client requires a full absolute URL.
  // It automatically appends /api/auth to this base, so requests go to:
  //   http://localhost:5174/api/auth/sign-in/email  (Vite port)
  //   → Vite proxy forwards /api/* → http://localhost:3001/api/auth/...
  //
  // window.location.origin works on any port Vite picks (5173, 5174, etc.)
  baseURL: window.location.origin,
});

// ── Named exports ─────────────────────────────────────────────────────────────
// Destructure for clean per-component imports instead of importing authClient everywhere.
export const {
  signIn,           // signIn.email({ email, password })
  signUp,           // signUp.email({ email, password, name })
  signOut,          // signOut()
  useSession,       // React hook → { data: { user, session } | null, isPending }
  requestPasswordReset, // requestPasswordReset({ email, redirectTo })  → triggers reset email
  resetPassword,    // resetPassword({ newPassword, token })  → applies new password
} = authClient;
