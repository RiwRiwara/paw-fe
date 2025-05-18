"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/api";
import { FaCamera, FaArrowLeft, FaExclamationCircle } from "react-icons/fa";

// Define the upload response interface
interface UploadResponse {
  filename: string;
  fileId: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  url: string;
}

export default function EditProfile() {
  const router = useRouter();
  const { data: session } = useSession();
  const { isAuthenticated, loading, user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  // Form state with fields matching the API
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    phoneNumber: "",
    province: "",
    occupation: "",
    accommodateType: "",
    numOfPets: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // Fetch user data on component mount
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push("/login?callbackUrl=" + encodeURIComponent(window.location.href));
      return;
    }
    
    if (isAuthenticated && session?.accessToken) {
      fetchUserData();
    }
  }, [isAuthenticated, loading, session, router]);
  
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.user.getInfo();
      
      if (response.data.success) {
        const userInfo = response.data.data;
        
        setFormData({
          firstname: userInfo.firstname || "",
          lastname: userInfo.lastname || "",
          bio: userInfo.bio || "",
          phoneNumber: userInfo.phoneNumber || "",
          province: userInfo.province || "",
          occupation: userInfo.occupation || "",
          accommodateType: userInfo.accommodateType || "",
          numOfPets: userInfo.numOfPets?.toString() || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        
        // Set profile image if available
        if (userInfo.imageUrl) {
          setProfileImagePreview(userInfo.imageUrl);
        }
      } else {
        setError("Failed to load user data");
      }
    } catch (err: any) {
      console.error("Error fetching user data:", err);
      setError(err.response?.data?.message || "An error occurred while loading your profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input click
  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle profile image change
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // First, upload profile image if a new one is selected
      let uploadedImageUrl = "";
      
      if (profileImageFile) {
        const uploadResponse = await api.upload.image(profileImageFile);
        
        if (uploadResponse.data.success) {
          // First cast to unknown to avoid type conflicts, then to our interface
          const uploadData = uploadResponse.data.data as unknown as { url: string };
          uploadedImageUrl = uploadData.url;
        } else {
          throw new Error("Failed to upload profile image");
        }
      }
      
      // Prepare update payload
      const updatePayload: any = {};
      
      // Only include fields with values
      if (formData.firstname) updatePayload.firstname = formData.firstname;
      if (formData.lastname) updatePayload.lastname = formData.lastname;
      if (formData.bio) updatePayload.bio = formData.bio;
      if (formData.phoneNumber) updatePayload.phoneNumber = formData.phoneNumber;
      if (formData.province) updatePayload.province = formData.province;
      if (formData.occupation) updatePayload.occupation = formData.occupation;
      if (formData.accommodateType) updatePayload.accommodateType = formData.accommodateType;
      
      // Handle number conversion properly
      if (formData.numOfPets) {
        const numPets = parseInt(formData.numOfPets);
        if (!isNaN(numPets)) {
          updatePayload.numOfPets = numPets;
        }
      }
      
      // Add image URL if uploaded
      if (uploadedImageUrl) {
        updatePayload.imageUrl = uploadedImageUrl;
      }
      
      // Submit update to API
      const updateResponse = await api.user.updateInfo(updatePayload);
      
      if (updateResponse.data.success) {
        // Show success message and redirect
        alert("Profile updated successfully!");
        router.push("/profile");
      } else {
        throw new Error(updateResponse.data.message || "Failed to update profile");
      }
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(err.message || "An error occurred while updating your profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-primary-softpink py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/profile" className="text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="container mx-auto max-w-3xl py-8 px-4">
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Error Banner */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-800">
                <FaExclamationCircle className="text-red-500 mr-2" />
                <span>{error}</span>
              </div>
            )}
            
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
                <div 
                  className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer"
                  onClick={handleProfileImageClick}
                >
                  <Image
                    src={profileImagePreview || "/images/profile.jpg"}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div 
                  className="absolute bottom-0 right-0 bg-orange-400 rounded-full p-2 shadow-md cursor-pointer"
                  onClick={handleProfileImageClick}
                >
                  <FaCamera className="text-white" size={16} />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Click to change profile picture</p>
            </div>

            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                    Province
                  </label>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                    Occupation
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="numOfPets" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Pets
                  </label>
                  <input
                    type="number"
                    id="numOfPets"
                    name="numOfPets"
                    min="0"
                    value={formData.numOfPets}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="accommodateType" className="block text-sm font-medium text-gray-700 mb-1">
                    Accommodation Type
                  </label>
                  <select
                    id="accommodateType"
                    name="accommodateType"
                    value={formData.accommodateType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-colors"
                  >
                    <option value="">Select accommodation type</option>
                    <option value="SingleFamilyHomes">Single Family Home</option>
                    <option value="TownHouse">Town House</option>
                    <option value="ShopHouses">Shop House</option>
                    <option value="ApartmentAndCondo">Apartment/Condo</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Change Password</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-colors"
                  />
                </div>
                
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    name="emailNotifications"
                    className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-300"
                    defaultChecked
                  />
                  <label htmlFor="emailNotifications" className="ml-2 text-gray-700">
                    Email notifications for new campaigns and events
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="smsNotifications"
                    name="smsNotifications"
                    className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-300"
                    defaultChecked
                  />
                  <label htmlFor="smsNotifications" className="ml-2 text-gray-700">
                    SMS notifications for donation confirmations
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="marketingEmails"
                    name="marketingEmails"
                    className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-300"
                  />
                  <label htmlFor="marketingEmails" className="ml-2 text-gray-700">
                    Marketing emails about new features and promotions
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-orange-400 text-white rounded-full font-medium hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
