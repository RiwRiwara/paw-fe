"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/utils/api";
import type { Pet } from "@/utils/api";
import Link from "next/link";
import { FaPaw, FaMapMarkerAlt, FaMars, FaVenus, FaHome, FaBriefcase, FaPhone, FaCheck, FaChevronLeft } from "react-icons/fa";

export default function PetAdoptionRequest() {
  const { isAuthenticated, loading, user } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();
  const petId = searchParams.get("petId");
  const [pet, setPet] = useState<Pet | null>(null);
  const [loadingPet, setLoadingPet] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Enhanced form with proper default values
  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    accommodateType: "",
    numOfPets: "",
    occupation: "",
    province: "",
    phoneNumber: "",
    additionalInfo: "", // Additional info for adoption request
  });
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user data to pre-fill the form
  useEffect(() => {
    async function fetchUserData() {
      if (isAuthenticated) {
        try {
          const response = await api.user.getInfo();
          if (response.data.success) {
            const userData = response.data.data;
            setFormData(prev => ({
              ...prev,
              firstname: userData.firstname || prev.firstname,
              lastname: userData.lastname || prev.lastname,
              phoneNumber: userData.phoneNumber || prev.phoneNumber,
              province: userData.province || prev.province,
              occupation: userData.occupation || prev.occupation,
            }));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    }
    
    fetchUserData();
  }, [isAuthenticated, user]);

  useEffect(() => {
    // Only redirect if authentication has finished loading and user is not authenticated
    if (!loading && !isAuthenticated) {
      setAuthError("คุณต้องเข้าสู่ระบบก่อนที่จะขอรับเลี้ยงสัตว์");
      // Wait a moment before redirecting to show the error
      setTimeout(() => {
        router.push("/login?callbackUrl=" + encodeURIComponent(window.location.href));
      }, 1500);
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    async function fetchPetData() {
      if (!petId) {
        alert("ไม่พบข้อมูลสัตว์เลี้ยง กรุณาเลือกสัตว์เลี้ยงที่ต้องการรับเลี้ยง");
        router.push("/");
        return;
      }

      try {
        setLoadingPet(true);
        const response = await api.pet.getPetProfile(parseInt(petId));
        if (response.data.success) {
          setPet(response.data.data);
        } else {
          alert("ไม่พบข้อมูลสัตว์เลี้ยง: " + response.data.message);
          router.push("/");
        }
      } catch (error: any) {
        alert(`เกิดข้อผิดพลาด: ${error.message}`);
        router.push("/");
      } finally {
        setLoadingPet(false);
      }
    }

    fetchPetData();
  }, [petId, router]);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!petId) {
      alert("ไม่พบข้อมูลสัตว์เลี้ยง กรุณาเลือกสัตว์เลี้ยงที่ต้องการรับเลี้ยง");
      return;
    }

    if (!isTermsAccepted) {
      alert("กรุณายอมรับข้อตกลงและเงื่อนไขก่อนดำเนินการต่อ");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // First update the user profile with the latest information
      // The backend expects all fields as pointers, so we need to convert our values
      const profilePayload: any = {};
      
      // Only include fields that have values
      if (formData.firstname) profilePayload.firstname = formData.firstname;
      if (formData.lastname) profilePayload.lastname = formData.lastname;
      if (formData.accommodateType) profilePayload.accommodateType = formData.accommodateType;
      if (formData.phoneNumber) profilePayload.phoneNumber = formData.phoneNumber;
      if (formData.province) profilePayload.province = formData.province;
      if (formData.occupation) profilePayload.occupation = formData.occupation;
      
      // Handle number conversion properly
      if (formData.numOfPets) {
        const numPets = parseInt(formData.numOfPets);
        if (!isNaN(numPets)) {
          profilePayload.numOfPets = numPets;
        }
      }

      try {
        // Submit user profile update
        console.log('Sending profile update:', profilePayload);
        await api.user.updateInfo(profilePayload);
        console.log('Profile update successful');
        
        // Then submit the adoption request
        const adoptionPayload = {
          petId: parseInt(petId),
          additionalInfo: formData.additionalInfo || undefined
        };

        console.log('Sending adoption request:', adoptionPayload);
        const adoptionResponse = await api.user.requestAdoption(adoptionPayload);
        
        if (adoptionResponse.data.success) {
          alert("ส่งคำขอรับเลี้ยงเรียบร้อยแล้ว ทางมูลนิธิจะติดต่อกลับมาเร็วๆ นี้");
          router.push("/profile");
        } else {
          alert(`ไม่สามารถส่งคำขอรับเลี้ยงได้: ${adoptionResponse.data.message}`);
        }
      } catch (updateError: any) {
        console.error('Error during update:', updateError);
        // If we fail during the update, continue with just the adoption request
        const adoptionPayload = {
          petId: parseInt(petId),
          additionalInfo: formData.additionalInfo || undefined
        };

        const adoptionResponse = await api.user.requestAdoption(adoptionPayload);
        
        if (adoptionResponse.data.success) {
          alert("ส่งคำขอรับเลี้ยงเรียบร้อยแล้ว ทางมูลนิธิจะติดต่อกลับมาเร็วๆ นี้");
          router.push("/profile");
        } else {
          alert(`ไม่สามารถส่งคำขอรับเลี้ยงได้: ${adoptionResponse.data.message}`);
        }
      }
    } catch (error: any) {
      console.error('Overall error:', error);
      alert(`เกิดข้อผิดพลาด: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-xl font-medium mb-4">{authError}</div>
          <div className="animate-pulse mb-6">
            <FaPaw className="text-primary-400 text-5xl mx-auto" />
          </div>
          <Link
            href="/login"
            className="px-6 py-2 bg-primary-400 text-white rounded-full inline-block hover:bg-primary-500 transition-colors"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    );
  }

  if (loading || loadingPet) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="mb-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-400 border-t-transparent"></div>
        </div>
        <div className="text-lg font-medium text-primary-500">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-xl font-medium mb-4">กรุณาเข้าสู่ระบบก่อนใช้งาน</div>
          <Link
            href="/login"
            className="px-6 py-2 bg-primary-400 text-white rounded-full inline-block hover:bg-primary-500 transition-colors"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    );
  }
  
  if (!pet) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-xl font-medium mb-4">ไม่พบข้อมูลสัตว์เลี้ยง</div>
          <Link
            href="/"
            className="px-6 py-2 bg-gray-400 text-white rounded-full inline-block hover:bg-gray-500 transition-colors"
          >
            กลับสู่หน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header with elegant styling */}
      <div className="bg-gradient-to-b from-primary-50 to-white py-8 mb-6">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="flex items-center gap-3">
            <FaPaw className="text-primary-400 text-2xl" />
            <h1 className="text-3xl font-bold text-primary-500">ขอรับเลี้ยงสัตว์</h1>
          </div>
        </div>
      </div>
      
      {/* Pet Card with enhanced styling */}
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <div className="md:flex">
            {/* Pet Image Section */}
            <div className="md:w-1/3 relative h-64 md:h-auto">
              <Image 
                src={pet.imageUrl} 
                alt={pet.name} 
                fill
                className="object-cover"
              />
            </div>
            
            {/* Pet Details Section */}
            <div className="p-6 md:w-2/3">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-500 mb-4">{pet.name}</h2>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-600">
                  {pet.status === 'PENDING' ? 'รอการอนุมัติ' : pet.status === 'APPROVED' ? 'อนุมัติแล้ว' : pet.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  {pet.gender === "female" ? 
                    <FaVenus className="text-pink-500" /> : 
                    <FaMars className="text-blue-500" />}
                  <span className="text-gray-700">
                    {pet.gender === "female" ? "เพศเมีย" : "เพศผู้"}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <FaPaw className="text-primary-400" />
                  <span className="text-gray-700">อายุ {pet.age}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-400" />
                  <span className="text-gray-700">{pet.foundationName}</span>
                </div>
                
                {pet.foundationAddress && (
                  <div className="flex items-center gap-2">
                    <FaHome className="text-gray-400" />
                    <span className="text-gray-700">{pet.foundationAddress}</span>
                  </div>
                )}
              </div>
              
              {/* Additional pet details if available */}
              {(pet.allergic || pet.foodAllergy || pet.vaccination) && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-gray-800 mb-2">ข้อมูลเพิ่มเติม</h3>
                  <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                    {pet.allergic && <p>การแพ้: {pet.allergic}</p>}
                    {pet.foodAllergy && <p>อาหารที่แพ้: {pet.foodAllergy}</p>}
                    {pet.vaccination && <p>การฉีดวัคซีน: {pet.vaccination}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary-500 flex items-center gap-2">
              <FaPaw className="text-primary-400" />
              <span>กรอกข้อมูลผู้ขอรับเลี้ยง</span>
            </h2>
            <Link href="/" className="flex items-center text-gray-500 hover:text-primary-500 transition-colors">
              <FaChevronLeft className="mr-1" /> กลับไปหน้าหลัก
            </Link>
          </div>

          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Left column */}
            <div className="space-y-5">
              {/* Name Fields */}
              <div className="space-y-3">
                <label className="text-lg font-medium text-gray-700 block">ชื่อ</label>
                <input
                  type="text"
                  placeholder="ชื่อ"
                  value={formData.firstname}
                  onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                  className="border border-gray-200 bg-gray-50 text-gray-800 rounded-lg w-full px-4 py-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-lg font-medium text-gray-700 block">นามสกุล</label>
                <input
                  type="text"
                  placeholder="นามสกุล"
                  value={formData.lastname}
                  onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                  className="border border-gray-200 bg-gray-50 text-gray-800 rounded-lg w-full px-4 py-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition"
                  required
                />
              </div>
              
              {/* Phone Number */}
              <div className="space-y-3">
                <label className="text-lg font-medium text-gray-700 flex items-center">
                  <FaPhone className="text-primary-400 mr-2" />
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="text"
                  placeholder="เบอร์โทรศัพท์"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="border border-gray-200 bg-gray-50 text-gray-800 rounded-lg w-full px-4 py-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition"
                  required
                />
              </div>
              
              {/* Province */}
              <div className="space-y-3">
                <label className="text-lg font-medium text-gray-700 flex items-center">
                  <FaMapMarkerAlt className="text-primary-400 mr-2" />
                  จังหวัด
                </label>
                <input
                  type="text"
                  placeholder="จังหวัด"
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="border border-gray-200 bg-gray-50 text-gray-800 rounded-lg w-full px-4 py-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition"
                />
              </div>
            </div>
            
            {/* Right column */}
            <div className="space-y-5">
              {/* Accommodation Type */}
              <div className="space-y-3">
                <label className="text-lg font-medium text-gray-700 flex items-center">
                  <FaHome className="text-primary-400 mr-2" />
                  ประเภทที่พักอาศัย
                </label>
                <select
                  value={formData.accommodateType}
                  onChange={(e) => setFormData({ ...formData, accommodateType: e.target.value })}
                  className="border border-gray-200 bg-gray-50 text-gray-800 rounded-lg w-full px-4 py-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition"
                  required
                >
                  <option value="">เลือกประเภทที่พักอาศัย</option>
                  <option value="SingleFamilyHomes">บ้านเดี่ยว</option>
                  <option value="TownHouse">ทาวน์เฮาส์</option>
                  <option value="ShopHouses">ตึกแถว/อาคารพาณิชย์</option>
                  <option value="ApartmentAndCondo">อพาร์ทเมนท์/คอนโด</option>
                </select>
              </div>
              
              {/* Number of Pets */}
              <div className="space-y-3">
                <label className="text-lg font-medium text-gray-700 flex items-center">
                  <FaPaw className="text-primary-400 mr-2" />
                  จำนวนสัตว์ที่เคยเลี้ยง
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.numOfPets}
                  onChange={(e) => setFormData({ ...formData, numOfPets: e.target.value })}
                  className="border border-gray-200 bg-gray-50 text-gray-800 rounded-lg w-full px-4 py-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition"
                />
              </div>
              
              {/* Occupation */}
              <div className="space-y-3">
                <label className="text-lg font-medium text-gray-700 flex items-center">
                  <FaBriefcase className="text-primary-400 mr-2" />
                  อาชีพ
                </label>
                <input
                  type="text"
                  placeholder="อาชีพ"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="border border-gray-200 bg-gray-50 text-gray-800 rounded-lg w-full px-4 py-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition"
                />
              </div>
            </div>
            
            {/* Full width fields */}
            <div className="md:col-span-2 space-y-3">
              <label className="text-lg font-medium text-gray-700">ข้อมูลเพิ่มเติม (ถ้ามี)</label>
              <textarea
                placeholder="เหตุผลที่อยากรับเลี้ยง หรือข้อมูลเพิ่มเติมที่ต้องการแจ้งให้มูลนิธิทราบ"
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="border border-gray-200 bg-gray-50 text-gray-800 rounded-lg w-full px-4 py-3 min-h-[120px] focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition"
              />
            </div>
            
            {/* Terms and Conditions */}
            <div className="md:col-span-2 mt-4 space-y-4">
              <div className="bg-primary-50 rounded-lg p-5 border border-primary-100">
                <h3 className="text-lg font-semibold text-primary-600 mb-3 flex items-center">
                  <FaCheck className="text-primary-500 mr-2" /> ข้อตกลงและเงื่อนไข
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  ข้าพเจ้ายอมรับว่าการส่งคำขอรับเลี้ยงนี้ เป็นเพียงการแสดงความจำนง และทางมูลนิธิมีสิทธิ์พิจารณาอนุมัติหรือปฏิเสธคำขอตามความเหมาะสม โดยข้าพเจ้าจะปฏิบัติตามกระบวนการและข้อกำหนดของมูลนิธิในการรับเลี้ยงสัตว์อย่างเคร่งครัด และตกลงที่จะดูแลสัตว์เลี้ยงอย่างดีที่สุดเต็มความสามารถ หากได้รับการอนุมัติ
                </p>
                <div className="flex items-center mt-4">
                  <input
                    id="accept-terms"
                    type="checkbox"
                    checked={isTermsAccepted}
                    onChange={(e) => setIsTermsAccepted(e.target.checked)}
                    className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-400"
                    required
                  />
                  <label htmlFor="accept-terms" className="ml-3 text-sm font-medium text-gray-700">
                    ฉันยอมรับเงื่อนไขการใช้บริการ
                  </label>
                </div>
              </div>
            </div>
            
            {/* Submit Buttons */}
            <div className="md:col-span-2 flex justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 text-gray-700 font-medium transition-colors"
              >
                <FaChevronLeft className="mr-2" /> ย้อนกลับ
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-red-700 px-8 py-3 flex items-center justify-center rounded-lg text-white font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งคำขอรับเลี้ยง'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}