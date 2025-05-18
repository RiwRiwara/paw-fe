import { useSession } from "next-auth/react";

import type { User as NextAuthUser } from "next-auth";

// Define proper user type that's compatible with NextAuth's User
type UserInfo = {
  id: string;  // Required to match NextAuth User
  email?: string | null;
  name?: string | null;
  image?: string | null;
  firstname?: string;
  lastname?: string;
  userType?: string;
}

interface AuthStatus {
  isAuthenticated: boolean;
  isGuest: boolean;
  user: UserInfo | null;
  loading: boolean;
  accessToken?: string | null;
  sessionStatus: "loading" | "authenticated" | "unauthenticated";
}

/**
 * Custom hook for authentication state management
 * Provides authentication status, user info, and token
 */
export const useAuth = (): AuthStatus => {
  const { data: session, status } = useSession();

  const isAuthenticated = !!session?.user && !!session?.accessToken;
  const isGuest = !isAuthenticated;
  const loading = status === "loading";
  const accessToken = session?.accessToken || null;

  return {
    isAuthenticated,
    isGuest,
    user: session?.user || null,
    loading,
    accessToken,
    sessionStatus: status,
  };
};