"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  // Mock user data
  const [userData, setUserData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+66 98 765 4321",
    address: "123 Pet Lover Street, Bangkok, Thailand",
    profileImage: "/images/profile/user-avatar.png",
    joinDate: "January 2023",
    pets: [
      {
        id: 1,
        name: "Fluffy",
        type: "Cat",
        breed: "Persian",
        age: "3 years",
        image: "/images/profile/cat1.png",
      },
      {
        id: 2,
        name: "Buddy",
        type: "Dog",
        breed: "Golden Retriever",
        age: "2 years",
        image: "/images/profile/dog1.png",
      },
    ],
    donations: [
      {
        id: 1,
        date: "2025-02-15",
        amount: "1,500 THB",
        foundation: "Soi Dog Foundation",
        status: "Completed",
      },
      {
        id: 2,
        date: "2025-03-10",
        amount: "2,000 THB",
        foundation: "School Foundation",
        status: "Completed",
      },
    ],
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-primary-softpink py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{userData.name}</h1>
              <p className="text-gray-600 mt-1">Member since {userData.joinDate}</p>

              <div className="mt-4 flex flex-col md:flex-row gap-4">
                <Link
                  href="/profile/edit"
                  className="bg-orange-400 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-500 transition-colors inline-flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit Profile
                </Link>
                <Link
                  href="/adopt"
                  className="bg-white text-orange-400 border border-orange-400 px-6 py-2 rounded-full font-medium hover:bg-orange-50 transition-colors inline-flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

      {/* Profile Content */}
      <div className="container mx-auto max-w-5xl py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-gray-800">{userData.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="text-gray-800">{userData.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="text-gray-800">{userData.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pets, Donations, Activities */}
          <div className="md:col-span-2">
            {/* My Pets */}
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
                {userData.pets.map(pet => (
                  <div key={pet.id} className="flex items-center gap-4 p-3 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={pet.image}
                        alt={pet.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{pet.name}</h3>
                      <p className="text-sm text-gray-500">{pet.breed} • {pet.age}</p>
                    </div>
                    <Link href={`/pet/edit?petId=${pet.id}`} className="text-orange-400 hover:text-orange-500 text-sm">
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
