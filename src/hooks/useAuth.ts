import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Define user type for our application
type UserInfo = {
  id: string;
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
 * Provides authentication status, user info, and token from cookies
 */
export const useAuth = (): AuthStatus => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    isAuthenticated: false,
    isGuest: true,
    user: null,
    loading: true,
    accessToken: null,
    sessionStatus: "loading",
  });


  useEffect(() => {
    // Get token from cookies or localStorage
    let token = Cookies.get('login');
    if (!token) {
      // If not in cookies, try localStorage
      const localToken = localStorage.getItem('token');
      if (localToken) {
        token = localToken;
      }
    }
    console.log("token", token);
    
    // Get user data from localStorage if available
    let user: UserInfo | null = null;
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        user = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }

    const isAuthenticated = !!token && !!user;
    
    setAuthStatus({
      isAuthenticated,
      isGuest: !isAuthenticated,
      user,
      loading: false,
      accessToken: token || null,
      sessionStatus: isAuthenticated ? "authenticated" : "unauthenticated",
    });
  }, []);

  return authStatus;
};