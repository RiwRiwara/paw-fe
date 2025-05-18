"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";
import api from "@/utils/api";
import type { UserInfo } from "@/utils/api";

export default function Profile() {
  const { isAuthenticated, loading, user } = useAuth();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  type PetInfo = {
    id: number;
    petName: string;
    petImage: string;
    status: string;
    date: string;
    foundationName: string;
  };

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    province: "",
    bio: "",
    occupation: "",
    profileImage: "/images/profile.jpg",
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

  useEffect(() => {
    console.log("Authentication status:", { isAuthenticated, loading, sessionStatus: status, user });

    if (!loading && !isAuthenticated) {
      router.push("/login?callbackUrl=" + encodeURIComponent(window.location.href));
      return;
    }

    if (isAuthenticated && session?.accessToken) {
      fetchUserData();
      fetchUserAdoptionRequests();
    } else if (isAuthenticated && !session?.accessToken) {
      setError("Session token is missing. Please log out and log in again.");
    }
  }, [isAuthenticated, loading, router, session, status, user]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);

      if (!session?.accessToken) {
        setError("Authentication token is missing. Please log in again.");
        return;
      }

      const response = await api.user.getInfo();
      console.log("User info response:", response.data);

      if (response.data.success) {
        const userInfo: UserInfo = response.data.data;
        setUserData((prev) => ({
          ...prev,
          name: `${userInfo.firstname || ""} ${userInfo.lastname || ""}`.trim(),
          email: session?.user?.email || "",
          phone: userInfo.phoneNumber || "",
          province: userInfo.province || "",
          bio: userInfo.bio || "",
          occupation: userInfo.occupation || "",
          profileImage: userInfo.imageUrl || "/images/profile/user-avatar.png",
          joinDate: "Member since 2023",
        }));
      } else {
        setError(`Failed to load profile: ${response.data.message}`);
      }
    } catch (err: any) {
      console.error("Error fetching user profile:", err);
      setError(err.response?.data?.message || "An error occurred while loading your profile");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserAdoptionRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.user.getAdoptionRequests();
      console.log("Adoption requests response:", response.data);

      if (response.data.success) {
        const adoptionRequests: PetInfo[] = response.data.data.map((request) => ({
          id: request.requestId,
          petName: request.pet?.name || "Unknown Pet",
          petImage: request.pet?.imageUrl || "/images/profile/pet-placeholder.png",
          status: formatStatus(request.status),
          date: formatDate(request.createdAt || ""),
          foundationName: request.pet?.foundationName || "Unknown Foundation",
        }));

        console.log("Processed adoption requests:", adoptionRequests);

        setUserData((prev) => ({  
          ...prev,
          pets: adoptionRequests.filter((req) => req.status === "Approved" || req.status === "Completed"),
          adoptionRequests: adoptionRequests,
        }));
      } else {
        setError(`Failed to load adoption requests: ${response.data.message}`);
      }
    } catch (err: any) {
      console.error("Error fetching adoption requests:", err);
      setError(err.response?.data?.message || "An error occurred while loading adoption requests");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const formatStatus = (status?: string) => {
    if (!status) return "Unknown";
    switch (status.toUpperCase()) {
      case "PENDING":
        return "Pending";
      case "APPROVED":
        return "Approved";
      case "REJECTED":
        return "Rejected";
      case "COMPLETED":
        return "Completed";
      default:
        return status;
    }
  };

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    fetchUserData();
    // fetchUserAdoptionRequests();
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-400"></div>
        <div className="ml-4 text-orange-400">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={handleRetry}
            className="bg-orange-400 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-500 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = "/api/auth/signout?callbackUrl=/login"}
            className="ml-4 bg-red-500 text-white px-6 py-2 rounded-full font-medium hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-primary-softpink py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={userData.profileImage}
                  alt={userData.name}
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-orange-400 rounded-full p-2 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{userData.name}</h1>
              <p className="text-gray-600 mt-1">Member since {userData.joinDate}</p>
              <div className="mt-4 flex flex-col md:flex-row gap-4">
                <Link
                  href="/profile/edit"
                  className="bg-orange-400 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-500 transition-colors inline-flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit Profile
                </Link>
                <Link
                  href="/adopt"
                  className="bg-white text-orange-400 border border-orange-400 px-6 py-2 rounded-full font-medium hover:bg-orange-50 transition-colors inline-flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12h6"></path>
                    <path d="M12 9v6"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  Adopt a Pet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-5xl py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-gray-800">{userData.email || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="text-gray-800">{userData.phone || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Province</h3>
                  <p className="text-gray-800">{userData.province || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">My Pets</h2>
                <Link
                  href="/pet/create"
                  className="text-orange-400 hover:text-orange-500 text-sm font-medium"
                >
                  Create New Pet
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userData.pets.map((pet) => (
                  <div key={pet.id} className="flex items-center gap-4 p-3 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={pet.petImage}
                        alt={pet.petName}
                        fill
                        sizes="(max-width: 64px) 100vw, 64px"
                        className="object-cover"
                        quality={90}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{pet.petName}</h3>
                      <p className="text-sm text-gray-600">{pet.foundationName} · {pet.date}</p>
                    </div>
                    <div className="ml-auto">
                      <button className="text-orange-400 hover:text-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">My Adoption Requests</h2>
              {userData.adoptionRequests && userData.adoptionRequests.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foundation</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200" key={userData.adoptionRequests.length}>
                      {userData.adoptionRequests.map((request) => (
                        <tr key={request.id}>
                          <td className="px-4 py-3 text-sm text-gray-800">{request.date}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center">
                              <div className="h-8 w-8 flex-shrink-0 mr-3">
                                <Image
                                  src={request.petImage}
                                  width={32}
                                  height={32}
                                  alt={request.petName}
                                  className="rounded-full"
                                />
                              </div>
                              <span className="font-medium text-gray-800">{request.petName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-800">{request.foundationName}</td>
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColorClass(
                                request.status
                              )}`}
                            >
                              {request.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">No adoption requests yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}