"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import type { UserInfo } from "@/utils/types";
import Cookies from 'js-cookie';

export default function Profile() {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  type Gender = "Female" | "Male";

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


  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
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
    activities: [],
  });

  useEffect(() => {
    // If user is foundation, redirect to foundation profile
    if (!loading && isAuthenticated && user?.userType === "foundation") {
      router.push("/foundation_profile");
      return;
    }

    // Redirect to login if not authenticated
    if (!loading && !isAuthenticated) {
      router.push("/login?callbackUrl=" + encodeURIComponent(window.location.href));
      return;
    }

    // Get token from cookies or localStorage
    const token = Cookies.get('login') || localStorage.getItem('token');

    if (isAuthenticated && token) {
      fetchUserData();
      fetchUserAdoptionRequests();
    } else if (isAuthenticated && !token) {
      setError("Token is missing. Please log out and log in again.");
    }
  }, [isAuthenticated, loading, router, user]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);

      // Get token from cookies or localStorage
      const token = Cookies.get('login') || localStorage.getItem('token');
      if (!token) {
        setError("Authentication token is missing. Please log in again.");
        return;
      }

      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include",
      });


      if (response.ok) {
        const userInfo: any = await response.json();
        console.log("Response user info:", userInfo.data);
        
        setUserData((prev) => ({
          ...prev,
          firstname: userInfo.data.firstname || "",
          lastname: userInfo.data.lastname || "",
          phone: userInfo.data.phoneNumber || "",
          province: userInfo.data.province || "",
          bio: userInfo.data.bio || "",
          occupation: userInfo.data.occupation || "",
          profileImage: userInfo.data.imageUrl || "https://placehold.co/50x50?text=profile",
          joinDate: "Member since 2023",
        }));
      } else {
        setError(`Failed to load profile`);
      }
    } catch (err: any) {
      console.error("Error fetching user profile:", err);
      setError("An error occurred while loading your profile");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserAdoptionRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get token from cookies or localStorage
      const token = Cookies.get('login') || localStorage.getItem('token');
      if (!token) {
        setError("Authentication token is missing. Please log in again.");
        return;
      }

      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/adoption-request", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include",
      });


      if (response.ok) {
        const data = await response.json();
        console.log("Response adoption requests:", data);
        if (!Array.isArray(data.data)) {
          console.error("Expected array for adoption requests but got:", typeof data.data);
          setError("Received unexpected data format from server");
          return;
        }
        // Mapping function
        const adoptionRequests: PetInfo[] = data.data.map((request: any) => ({
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
        setError(`Failed to load adoption requests`);
      }
    } catch (err: any) {
      console.error("Error fetching adoption requests:", err);
      setError(
        err.message ||
        "An error occurred while loading your adoption requests"
      );
    } finally {
      setIsLoading(false);
    }
  };




  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "ยื่นคำขอรับเลี้ยง":
        return "bg-yellow-100 text-yellow-800";
      case "อนุมัติ":
        return "bg-green-100 text-green-800";
      case "ไม่อนุมัติ":
        return "bg-red-100 text-red-800";
      case "เสร็จสิ้น":
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
                <img
                  src={userData.profileImage}
                  alt={userData.firstname + " " + userData.lastname}
                  className="object-cover w-full h-full"
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{userData.firstname + " " + userData.lastname}</h1>
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
                  <p className="text-gray-600">{userData.email}</p>
                </div>
                {user?.userType && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-500">Role</p>
                    <p className="text-gray-600">{user.userType}</p>
                  </div>
                )}
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
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">My Adoption Requests</h2>
              {userData.adoptionRequests && userData.adoptionRequests.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userData.adoptionRequests.map((request) => (
                        <tr key={`request-${request.petId}`} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-4 py-3 text-sm text-gray-800">
                            {request.submissionDate || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center">
                              <div className="h-8 w-8 flex-shrink-0 mr-3 overflow-hidden rounded-full">
                                <img
                                  src={request.imageUrl}
                                  alt={request.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span className="font-medium text-gray-800">{request.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-nowrap">
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