"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Cookies from 'js-cookie';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("usertest1@gmail.com");
    const [password, setPassword] = useState("12345678");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    rememberMe
                }),
                credentials: 'include'
            });

            const data = await response.json();
            console.log("data login", data);

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            
            // Save the entire response data to localStorage for debugging
            localStorage.setItem('loginResponse', JSON.stringify(data));
            
            // Handle nested data structure from API response
            if (data.success && data.code === 200 && data.data) {
                // Save token to both cookies and localStorage
                if (data.data.token) {
                    // Save to cookies
                    if (rememberMe) {
                        Cookies.set('login', data.data.token, { expires: 30 });
                    } else {
                        Cookies.set('login', data.data.token);
                    }
                    
                    // Save token to localStorage as well
                    localStorage.setItem('token', data.data.token);
                }
                
                // Save user metadata to localStorage
                if (data.data.userMetadata) {
                    localStorage.setItem('user', JSON.stringify(data.data.userMetadata));
                }
            }

            toast.success("Login successful");
            router.push("/");
        } catch (err: any) {
            console.error("Login error:", err);
            toast.error(err.message || "Invalid email or password");
            setError(err.message || "Invalid email or password");
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
                <div className="flex items-center mb-4 border-2 border-primary-pink rounded-md py-2 relative">
                    <span className="mr-2 text-xl">🔒</span>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-1 outline-none text-gray-500 "
                    />
                    <button
                        type="button"
                        className="absolute right-1 text-gray-500 bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}
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