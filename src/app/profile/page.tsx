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
                  href="/profile/pets" 
                  className="text-orange-400 hover:text-orange-500 text-sm font-medium"
                >
                  View All
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
                    <div>
                      <h3 className="font-medium text-gray-800">{pet.name}</h3>
                      <p className="text-sm text-gray-500">{pet.breed} • {pet.age}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation History */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Donation History</h2>
                <Link 
                  href="/profile/donations" 
                  className="text-orange-400 hover:text-orange-500 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 text-sm border-b">
                      <th className="pb-2 font-medium">Date</th>
                      <th className="pb-2 font-medium">Amount</th>
                      <th className="pb-2 font-medium">Foundation</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.donations.map(donation => (
                      <tr key={donation.id} className="border-b border-gray-100">
                        <td className="py-3 text-gray-800">{donation.date}</td>
                        <td className="py-3 text-gray-800">{donation.amount}</td>
                        <td className="py-3 text-gray-800">{donation.foundation}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            {donation.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Recent Activities</h2>
                <Link 
                  href="/profile/activities" 
                  className="text-orange-400 hover:text-orange-500 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {userData.activities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      {activity.type === "Adoption" && (
                        <svg className="w-5 h-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                        </svg>
                      )}
                      {activity.type === "Donation" && (
                        <svg className="w-5 h-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                          <line x1="1" y1="10" x2="23" y2="10"></line>
                        </svg>
                      )}
                      {activity.type === "Volunteer" && (
                        <svg className="w-5 h-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-800">{activity.type}</h3>
                        <span className="text-xs text-gray-500">{activity.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{activity.description}</p>
                    </div>
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
