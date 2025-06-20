import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';


const NavbarApp: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    
    const handleLogout = () => {
        // Clear cookies
        Cookies.remove('login');
        
        // Clear localStorage items
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('loginResponse');
        
        // Redirect to login page
        router.push('/login');
    };

    return (
        <nav className="h-[80px] w-full flex items-center justify-between bg-white px-4 py-2">

            <div>
                <Image src="/images/logo.png" alt="logo" width={130} height={60} />
            </div>

            <div className="flex flex-row items-center gap-6 md:gap-16">
                {[
                    { href: "/", label: "Home" },
                    { href: "/foundation", label: "Foundation" },
                    { href: "/adopt", label: "Adopt" },
                ].map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`font-semibold text-gray-600 duration-300 ease-in-out ${pathname === href
                            ? "text-orange-500 font-bold underline"
                            : "hover:text-orange-400 hover:underline"
                            }`}
                    >
                        {label}
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <Link
                    href="/profile"
                    className="bg-orange-400 text-white font-bold py-2 px-4 duration-300 ease-in-out rounded-full"
                >
                    Profile
                </Link>
                <button
                    onClick={handleLogout}
                    className="text-orange-400"
                >
                    Sign Out
                </button>
            </div>

        </nav>
    );
};

export default NavbarApp;