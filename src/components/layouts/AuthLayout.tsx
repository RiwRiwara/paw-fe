"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import AppLayout from "@/components/layouts/AppLayout";
import NavbarGuest from "@/components/common/NavbarGuest";
import BottomBar from "@/components/common/BottomBar";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

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