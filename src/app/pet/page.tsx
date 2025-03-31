"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import api from "@/utils/api";

interface PetData {
  petId: number;
  name: string;
  age: string;
  gender: string;
  imageUrl: string;
  status: string;
  weight: number;
  sterilization: boolean;
  vaccination: string;
  foodAllergy: string | null;
  allergic: string | null;
  other: string | null;
  sociable: number;
  playful: number;
  aggressiveness: number;
  foundationName: string;
  foundationAddress: string;
}

export default function Pet() {
  const searchParams = useSearchParams();
  const petId = searchParams.get("petId");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pet, setPet] = useState<PetData | null>(null);

  useEffect(() => {
    async function fetchPetData() {
      if (!petId) {
        setError("Pet ID is missing in the URL.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.pet.getPetProfile(parseInt(petId));
        if (response.data.success) {
          setPet(response.data.data as PetData);
        } else {
          setError(response.data.message || "Pet not found.");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch pet data.");
      } finally {
        setLoading(false);
      }
    }

    fetchPetData();
  }, [petId]);

  if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500 text-xl">{error}</div>;
  if (!pet) return null;

  return (
    <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <Image src="/images/giveapet.png" alt="giveapet" width={350} height={80} className="w-full max-w-[350px]" />
        </div>

        {/* Pet Image */}
        <div className="flex justify-center mb-8">
          <img
            src={pet.imageUrl || "https://dummyimage.com/168x100.png/dddddd/000000"}
            alt={pet.name}
            className="w-full max-w-md h-auto rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Pet Name and Basic Info */}
        <div className="text-center mb-8 bg-white rounded-[30px] shadow-md p-6 w-fit mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-orange-800 mb-3">{pet.name}</h1>
          <div className="flex justify-center gap-4 text-lg sm:text-xl">
            <span className="text-gray-600">{pet.age}</span>
            <span className="text-blue-400">
              {pet.gender.toLowerCase() === "male" ? "♂️" : "♀️"}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Personality Section */}
          <div className=" p-6">
            <h2 className="bg-orange-400 text-white text-lg font-medium rounded-full px-4 py-1 inline-block mb-4">
              ลักษณะนิสัย
            </h2>
            <div className="space-y-4">
              {[
                { label: "ติดคน", value: pet.sociable },
                { label: "ความขี้เล่น", value: pet.playful },
                { label: "ความดุ", value: pet.aggressiveness },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-orange-800 font-medium">{item.label} :</span>
                  <img
                    src={`/images/ratingstar-${item.value}.png`}
                    alt="rating"
                    className="w-24 sm:w-32"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Health Section */}
          <div className="bg-white rounded-[30px] shadow-md p-6">
            <h2 className="bg-pink-500 text-white text-lg font-medium rounded-full px-4 py-1 inline-block mb-4">
              สุขภาพ
            </h2>
            <div className="space-y-3">
              {[
                { label: "น้ำหนัก", value: `${pet.weight} kg` },
                { label: "ทำหมัน", value: pet.sterilization ? "ทำหมันแล้ว" : "ยังไม่ได้ทำหมัน" },
                { label: "ฉีดวัคซีน", value: pet.vaccination },
                { label: "แพ้อาหาร", value: pet.foodAllergy || "ไม่มี" },
                { label: "แพ้ยา", value: pet.allergic || "ไม่มี" },
                { label: "อื่น ๆ", value: pet.other || "ไม่มี" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <div className="text-primary-red font-medium text-nowrap">{item.label} :</div>
                  <div className="text-pink-400 text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-center mb-8">
          <span className="bg-white px-6 py-2 text-3xl rounded-full border border-gray-300 shadow-sm text-gray-700">
            {pet.status}
          </span>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 mx-auto max-w-2xl">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="text-pink-600 font-medium whitespace-nowrap">มูลนิธิ :</span>
              <span className="text-pink-400">{pet.foundationName}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="text-pink-600 font-medium whitespace-nowrap">ที่ตั้ง :</span>
              <span className="text-pink-400">{pet.foundationAddress}</span>
            </div>
          </div>
        </div>

        {/* Adoption Button */}
        <div className="flex justify-center">
          <a
            href="/pet_get"
            className="bg-[#A53E55] text-white px-8 py-3 rounded-xl text-3xl font-semibold 
            hover:bg-[#8e3448] transition-colors duration-300 shadow-md"
          >
            สนใจรับเลี้ยง
          </a>
        </div>
      </div>
    </div>
  );
}