"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

export default function Pet() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "", // Changed from name
    lastname: "",  // Changed from surname
    accommodateType: "", // Changed from accommodation
    age: "",
    numOfPets: "", // Changed from numPets
    occupation: "",
    province: "",
    phoneNumber: "", // Changed from phone
  });
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      alert("You need to be logged in to access this page.");
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isTermsAccepted) {
      alert("Please accept the terms and conditions before submitting.");
      return;
    }

    try {
      // Map form data to match API expectations
      const payload = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        accommodateType: formData.accommodateType as "SingleFamilyHomes" | "TownHouse" | "ShopHouses" | "ApartmentAndCondo" | undefined,
        numOfPets: formData.numOfPets ? parseInt(formData.numOfPets) : undefined,
        occupation: formData.occupation || undefined,
        province: formData.province || undefined,
        phoneNumber: formData.phoneNumber || undefined,
        // Note: age isn't in UpdateUserBody, you might want to add birthday instead if needed
      };

      const response = await api.user.updateUserInfo(payload);
      if (response.data.success) {
        alert("Profile updated successfully!");
      } else {
        alert(`Failed to update profile: ${response.data.message}`);
      }
    } catch (error: any) {
      alert(`An error occurred: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 min-h-screen mt-2 relative">
      <div className="flex flex-row justify-center items-center">
        <Image src="/images/giveapet.png" alt="giveapet" width={450} height={100} />
      </div>

      <h1 className="text-center text-xl font-medium text-primary-400">ประวัติส่วนตัว</h1>

      <form
        className="flex flex-col gap-4 p-2 w-[500px] container mx-auto mb-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-primary-400">ชื่อ - นามสกุล</label>
            <input
              type="text"
              placeholder="ชื่อ"
              value={formData.firstname}
              onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
              className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2"
            />
            <input
              type="text"
              placeholder="นามสกุล"
              value={formData.lastname}
              onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
              className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-primary-400">ประเภทที่พักอาศัย</label>
            <input
              type="text"
              placeholder=""
              value={formData.accommodateType}
              onChange={(e) => setFormData({ ...formData, accommodateType: e.target.value })}
              className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2"
            />
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-primary-400">อายุ</label>
            <input
              type="number"
              placeholder="อายุ"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-primary-400">จำนวนสัตว์ที่เคยเลี้ยง</label>
            <input
              type="number"
              placeholder=""
              value={formData.numOfPets}
              onChange={(e) => setFormData({ ...formData, numOfPets: e.target.value })}
              className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2"
            />
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-primary-400">อาชีพ</label>
            <input
              type="text"
              placeholder="อาชีพ"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-primary-400">จังหวัด</label>
            <input
              type="text"
              placeholder=""
              value={formData.province}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2"
            />
          </div>
        </div>

        <div className="flex flex-row justify-start w-full">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-primary-400">เบอร์โทรศัพท์</label>
            <input
              type="text"
              placeholder="เบอร์โทรศัพท์"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="border-0 bg-gray-100 text-gray-500 rounded-lg w-full px-4 py-2"
            />
          </div>
        </div>

        <div className="mt-6 container mx-auto">
          <h2 className="text-start text-xl font-medium text-primary-400 mb-4">ข้อตกลงและเงื่อนไข</h2>
          <div className="rounded-md border border-primary-400 p-4 text-primary-300 text-md">
            <p className="text-center my-4 flex-wrap">
              Lorem ipsum dolor sit amet consectetur. Feugiat diam posuere justo pellentesque orci justo fringilla justo leo...
            </p>
          </div>
          <div className="flex items-center mt-4">
            <input
              id="checked-checkbox"
              type="checkbox"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded-sm"
            />
            <label className="ms-2 text-sm font-medium text-primary-300">ยอมรับเงื่อนไขการใช้บริการ</label>
          </div>
        </div>

        <button
          type="submit"
          className="container mx-auto px-10 py-2 flex flex-row justify-center bg-[#A53E55] rounded-xl w-fit border text-white border-gray-400 shadow-md my-10 text-xl font-semibold"
        >
          ส่งข้อมูล
        </button>
      </form>
    </div>
  );
}