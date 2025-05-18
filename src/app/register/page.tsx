"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

interface RegisterBody {
    birthday: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    phoneNumber: string;
}

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<RegisterBody>({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        phoneNumber: "",
        birthday: "", // This will be in "YYYY-MM-DD" format automatically since we're using type="date"
    });
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.auth.registerGeneral(formData);
            if (response.data.success) {
                router.push("/login"); // Redirect to login after successful registration
            } else {
                setError(response.data.message || "Registration failed");
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

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border-2 border-primary-pink rounded-md p-2 outline-none text-gray-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border-2 border-primary-pink rounded-md p-2 outline-none text-gray-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full border-2 border-primary-pink rounded-md p-2 outline-none text-gray-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full border-2 border-primary-pink rounded-md p-2 outline-none text-gray-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full border-2 border-primary-pink rounded-md p-2 outline-none text-gray-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        className="w-full border-2 border-primary-pink rounded-md p-2 outline-none text-gray-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#8B2E2E] text-white py-2 rounded-md w-full font-bold text-lg mb-4"
                >
                    REGISTER
                </button>
                <div className="text-center">
                    <a href="/login" className="text-primary-pink text-sm">
                        Already have an account? Login
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

export default RegisterPage;