"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";
import api from "@/utils/api";
import type { Gender, UserInfo, UserType } from "@/utils/types";

type PetInfo = {
    petId: number;
    name: string;
    imageUrl: string;
    status: string;
    age: string;
    gender: Gender;
    submissionDate: string;
    foundationName: string;
};
export default function page() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        province: "",
        bio: "",
        occupation: "",
        profileImage: "https://placehold.co/50x50?text=profile",
        joinDate: "",
        pets: [] as PetInfo[],
        adoptionRequests: [] as PetInfo[],
        donations: [],
        activities: [
            {
                id: 1,
                type: "Adoption",
                date: "2024-12-05",
                description: "Adopted Fluffy from Soi Dog Foundation",
            },
            {
                id: 2,
                type: "Donation",
                date: "2025-01-20",
                description: "Donated pet supplies to School Foundation",
            },
            {
                id: 3,
                type: "Volunteer",
                date: "2025-02-28",
                description: "Volunteered at pet care event",
            },
        ],
    });
    const { data: session, status } = useSession();
    useEffect(() => {
        fetchUserAdoptionRequests();
        console.log("Session data:", session);
    }, [session]);


    const fetchUserAdoptionRequests = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/adoption-request", {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, 
            });

            if (response.data.success) {
                if (!Array.isArray(response.data.data)) {
                    console.error("Expected array for adoption requests but got:", typeof response.data.data);
                    setError("Received unexpected data format from server");
                    return;
                }
                // Mapping function
                const adoptionRequests: PetInfo[] = response.data.data.map((request: any) => ({
                    petId: request.petId || 0, // Use 0 as fallback instead of random string
                    name: request.name || "Unknown Pet",
                    imageUrl: request.imageUrl || "https://placehold.co/50x50?text=pet",
                    status: request.status || "Unknown",
                    age: request.age || "Unknown",
                    gender: (request.gender === "female" ? "Female" : request.gender === "male" ? "Male" : "Unknown") as Gender,
                    submissionDate: request.submissionDate || new Date().toISOString(), // Fallback to current date
                    foundationName: request.foundationName || "Unknown Foundation",
                }));


                setUserData((prev) => ({
                    ...prev,
                    pets: adoptionRequests.filter((req) => req.status === "Approved" || req.status === "Completed"),
                    adoptionRequests: adoptionRequests,
                }));
            } else {
                setError(`Failed to load adoption requests: ${response.data.message || 'Unknown error'}`);
            }
        } catch (err: any) {
            console.error("Error fetching adoption requests:", err);
            setError(
                err.response?.data?.message ||
                err.message ||
                "An error occurred while loading your adoption requests"
            );
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div>
            <p>Session data:</p>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <p>Adoption requests:</p>
            <pre>{JSON.stringify(userData.adoptionRequests, null, 2)}</pre>
        </div>
    )
}
