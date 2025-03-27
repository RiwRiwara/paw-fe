"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return null; // Redirecting, so nothing to render
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold">Welcome to your Dashboard!</h1>
            <p>This page is only accessible to authenticated users.</p>
        </div>
    );
};

export default DashboardPage;