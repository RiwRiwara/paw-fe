import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// Base URL for your backend API (from config.yaml)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api"; 

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    const { success, data, message } = response.data;

                    if (success && data) {
                        return {
                            id: data, // JWT token as the user ID
                            email: credentials.email,
                            token: data, // Custom token field
                        };
                    } else {
                        throw new Error(message || "Login failed");
                    }
                } catch (error: any) {
                    console.error("Authentication error:", error.message);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?.token) {
                token.accessToken = user.token; // Assign the token to accessToken
            }
            return token;
        },
        async session({ session, token }) {
            if (token.accessToken) {
                session.accessToken = token.accessToken; // Assign accessToken to session
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };