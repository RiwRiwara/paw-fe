import { useSession } from "next-auth/react";

interface AuthStatus {
  isAuthenticated: boolean;
  isGuest: boolean;
  user: any; // Replace 'any' with a proper type for your user object
  loading: boolean;
}

export const useAuth = (): AuthStatus => {
  const { data: session, status } = useSession();

  const isAuthenticated = !!session?.user;
  const isGuest = !isAuthenticated;
  const loading = status === "loading";

  return {
    isAuthenticated,
    isGuest,
    user: session?.user || null,
    loading,
  };
};