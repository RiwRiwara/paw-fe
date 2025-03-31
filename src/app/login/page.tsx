"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import api from "@/utils/api";

/**
 * The LoginPage component provides a user interface for users to log in.
 * It includes input fields for email and password, and a button to submit the form.
 * Upon submission, it attempts to authenticate the user using a credentials provider.
 * If authentication fails, it displays an error message. If successful, it redirects the user to the dashboard.
 */
const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
  
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
  
      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/home");
      }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary-cream relative overflow-hidden">
            {/* Logo Section */}
            <div className="flex items-center mb-5">
                <Image src="/images/head2.png" alt="header" width={280} height={200} />

            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
                <div className="flex items-center mb-4 border-2 border-primary-pink rounded-md p-2">
                    <span className="mr-2 text-xl">📧</span>
                    <input
                        type="email"
                        placeholder="mail"
                        className="flex-1 outline-none text-gray-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex items-center mb-4 border-2 border-primary-pink rounded-md p-2">
                    <span className="mr-2 text-xl">🔒</span>
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-1 outline-none text-gray-500"
                    />
                </div>
                <button className="bg-[#8B2E2E] text-white py-2 rounded-md w-full font-bold text-lg mb-4">
                    LOGIN
                </button>
                <div className="flex justify-between">
                    <a href="/forget-password" className="text-primary-pink text-sm">
                        forget password
                    </a>
                    <a href="/register" className="text-primary-pink text-sm">
                        create account
                    </a>
                </div>
            </form>

            {/* Paw Prints Decoration */}
            <div className="absolute text-5xl top-[20%] left-[10%] rotate-[-30deg] opacity-50 text-primary-softpink">
                <Image src="/images/paw.png" alt="paw_1" width={300} height={300} />

            </div>
            <div className="absolute text-5xl bottom-[20%] right-[10%] rotate-[30deg] opacity-50 text-primary-softpink">
                <Image src="/images/paw.png" alt="paw_1" width={300} height={300} />

            </div>

        </div>
    );
};

export default LoginPage;