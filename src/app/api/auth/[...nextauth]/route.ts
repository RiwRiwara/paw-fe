import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";

// Define types to improve type safety
type BackendResponse = {
  success: boolean;
  data: any;
  message?: string;
  code?: number;
};

// Define custom User type for NextAuth
interface ExtendedUser {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  userType?: string;
  token?: string;
  image?: string;
}

// Override NextAuth User type
declare module "next-auth" {
  interface User extends ExtendedUser {}
}

// Extend the built-in session type
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    userDetails?: {
      firstname?: string;
      lastname?: string;
      userType?: string;
    };
  }
}

// Base URL for your backend API
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

                    const responseData = response.data as BackendResponse;
                    console.log("Login response:", responseData);

                    if (responseData.success && responseData.data) {
                        // Handle the new response format
                        let token: string;
                        let userDetails: Record<string, any> = {};

                        // New format: { userMetadata, token }
                        if (responseData.data.userMetadata && responseData.data.token) {
                            token = responseData.data.token;
                            userDetails = responseData.data.userMetadata as Record<string, any>;
                            console.log("New login format detected, userMetadata:", userDetails);
                        }
                        // Fallback for old format or any other structures
                        else if (typeof responseData.data === 'string') {
                            token = responseData.data;
                        } else {
                            token = responseData.data.accessToken || responseData.data.token || responseData.data;
                            
                            if (responseData.data.user) {
                                userDetails = responseData.data.user as Record<string, any>;
                            }
                        }
                          
                        return {
                            id: userDetails?.userId?.toString() || credentials.email, // Use userId if available
                            email: credentials.email,
                            name: userDetails?.firstname ? `${String(userDetails.firstname)} ${String(userDetails.lastname || '')}` : undefined,
                            image: userDetails?.imageUrl as string | undefined,
                            token: token, // This will be used in the JWT callback
                            firstname: userDetails?.firstname,
                            lastname: userDetails?.lastname,
                            userType: userDetails?.userType,
                            userId: userDetails?.userId,
                            // Add any other properties you need
                        };
                    } else {
                        throw new Error(responseData.message || "Login failed");
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
        async jwt({ token, user, trigger, session }) {
            // Initial sign in
            if (user) {
                token.accessToken = user.token;
                token.userDetails = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    userType: user.userType,
                };
            }
            
            // Handle session update
            if (trigger === "update" && session) {
                if (session.accessToken) {
                    token.accessToken = session.accessToken;
                }
                if (session.user) {
                    token.userDetails = {
                        ...token.userDetails,
                        ...(session.user as any),
                    };
                }
            }
            
            return token;
        },
        async session({ session, token }) {
            if (token.accessToken) {
                session.accessToken = token.accessToken;
            }
            
            // Enrich the user object in the session
            if (token.userDetails) {
                session.user = {
                    ...session.user,
                    ...token.userDetails,
                };
            }
            
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };