"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppLayout from "@/components/layouts/AppLayout";
import NavbarGuest from "@/components/common/NavbarGuest";
import BottomBar from "@/components/common/BottomBar";
import Cookies from 'js-cookie';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    // Get initial auth state from useAuth hook
    const { isAuthenticated: initialAuth, loading: initialLoading } = useAuth();
    
    // Create local state to track auth changes in real-time
    const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
    const [loading, setLoading] = useState(initialLoading);

    // Effect to check authentication status in real-time
    useEffect(() => {
        // Function to check auth status
        const checkAuthStatus = () => {
            const token = Cookies.get('login') || localStorage.getItem('token');
            const hasUser = localStorage.getItem('user') !== null;
            setIsAuthenticated(!!token && hasUser);
            setLoading(false);
        };
        
        // Run immediately
        checkAuthStatus();
        
        // Setup interval to check periodically
        const interval = setInterval(checkAuthStatus, 1000); // Check every 5 seconds
        
        // Setup storage event listener for real-time updates
        const handleStorageChange = () => {
            checkAuthStatus();
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        // Cleanup
        return () => {
            clearInterval(interval);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    
    // Update when initial values change
    useEffect(() => {
        setIsAuthenticated(initialAuth);
        setLoading(initialLoading);
    }, [initialAuth, initialLoading]);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a proper loading spinner
    }

    if (isAuthenticated) {
        return <AppLayout>{children}</AppLayout>;
    }

    // Guest layout (default)
    return (
        <div>
            <header className="container mx-auto">
                <NavbarGuest />
            </header>
            {children}
            <footer>
                <BottomBar />
            </footer>
        </div>
    );
};

export default AuthLayout;