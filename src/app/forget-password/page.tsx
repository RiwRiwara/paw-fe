"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

const ForgetPasswordPage: React.FC = () => {
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await api.forgetPassword({ newPassword });
            if (response.data.success) {
                setSuccess("Password reset successful! Redirecting to login...");
                setTimeout(() => router.push("/login"), 2000);
            } else {
                setError(response.data.message || "Password reset failed");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary-cream relative overflow-hidden">
            {/* Logo Section */}
            <div className="flex items-center mb-5">
                <span className="text-4xl font-bold text-primary-pink">
                    Give a <span className="text-primary-pink">PAW</span>
                </span>
                <span className="text-5xl ml-3">🐾</span>
            </div>

            {/* Forget Password Form */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <div className="flex items-center mb-4 border-2 border-primary-pink rounded-md p-2">
                    <span className="mr-2 text-xl">🔒</span>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="flex-1 outline-none text-gray-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#8B2E2E] text-white py-2 rounded-md w-full font-bold text-lg mb-4"
                >
                    RESET PASSWORD
                </button>
                <div className="text-center">
                    <a href="/login" className="text-primary-pink text-sm">
                        Back to Login
                    </a>
                </div>
            </form>

            {/* Paw Prints Decoration */}
            <div className="absolute text-5xl top-[20%] left-[10%] rotate-[-30deg] opacity-50 text-primary-softpink">
                🐾
            </div>
            <div className="absolute text-5xl bottom-[20%] right-[10%] rotate-[30deg] opacity-50 text-primary-softpink">
                🐾
            </div>
            <div className="absolute text-5xl bottom-[30%] left-[15%] rotate-[15deg] opacity-50 text-primary-softpink">
                🐾
            </div>
        </div>
    );
};

export default ForgetPasswordPage;