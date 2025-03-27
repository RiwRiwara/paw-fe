import { Session as DefaultSession, User as DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

// Extend the default User type
interface User extends DefaultUser {
    token?: string; // Add the custom token property
}

// Extend the default Session type
interface Session extends DefaultSession {
    accessToken?: string; // Add the custom accessToken property
}

// Extend the default JWT type
interface JWT extends DefaultJWT {
    accessToken?: string; // Add the custom accessToken property to the token
}

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string;
    }

    interface User {
        token?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
    }
}