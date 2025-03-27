"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

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
  Other: string | null;
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
        const response = await fetch(`http://localhost:8080/api/pet/${petId}/info`);
        const data = await response.json();

        if (data.success) {
          setPet(data.data);
        } else {
          setError("Pet not found.");
        }
      } catch (err) {
        setError("Failed to fetch pet data.");
      } finally {
        setLoading(false);
      }
    }

    fetchPetData();
  }, [petId]);

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!pet) return null;

  return (
    <div className="flex flex-col gap-4 min-h-screen mt-2 relative">
      <div className="flex flex-row justify-center items-center">
        <Image src="/images/giveapet.png" alt="giveapet" width={450} height={100} />
      </div>
      <div className="flex flex-row justify-center items-center">
        <img src={"https://dummyimage.com/168x100.png/dddddd/000000"} alt={pet.name} className="w-[25%] rounded-md" />
      </div>

      <h1 className="text-center text-3xl font-medium text-orange-800 mt-10 mb-4">
        {pet.name}
      </h1>

      <div className="flex flex-row justify-center items-center gap-2 text-xl">
        <div className="text-gray-500 font-medium">{pet.age}</div>
        <div className="text-blue-400 font-medium">{pet.gender === "male" ? "♂️" : "♀️"}</div>
      </div>

      <div className="flex flex-row justify-center gap-16 mt-4 container mx-auto mb-4">
        <div className="flex flex-col gap-2 p-2 w-[400px]">
          <div className="bg-orange-400 text-white text-lg font-medium rounded-full px-4 py-1 w-fit">
            ลักษณะนิสัย
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-lg font-medium text-orange-800">ติดคน :</div>
            <img src={`/images/ratingstar-${pet.sociable}.png`} alt="rating" className="w-[50%]" />
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-lg font-medium text-orange-800">ความขี้เล่น :</div>
            <img src={`/images/ratingstar-${pet.playful}.png`} alt="rating" className="w-[50%]" />
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-lg font-medium text-orange-800">ความดุ :</div>
            <img src={`/images/ratingstar-${pet.aggressiveness}.png`} alt="rating" className="w-[50%]" />
          </div>
        </div>

        <div className="flex flex-col gap-2 p-2 w-[400px] rounded-xl bg-pink-100 px-6">
          <p className="bg-pink-500 text-white text-lg font-medium rounded-full px-4 py-1 w-fit">สุขภาพ</p>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-lg font-medium text-pink-600">น้ำหนัก :</div>
            <div className="text-lg font-medium text-pink-400">{pet.weight} kg</div>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-lg font-medium text-pink-600">ทำหมัน :</div>
            <div className="text-lg font-medium text-pink-400">{pet.sterilization ? "ทำหมันแล้ว" : "ยังไม่ได้ทำหมัน"}</div>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-lg font-medium text-pink-600">ฉีดวัคซีน :</div>
            <div className="text-lg font-medium text-pink-400">{pet.vaccination}</div>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-lg font-medium text-pink-600">แพ้อาหาร :</div>
            <div className="text-lg font-medium text-pink-400">{pet.foodAllergy || "ไม่มี"}</div>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-lg font-medium text-pink-600">แพ้ยา :</div>
            <div className="text-lg font-medium text-pink-400">{pet.allergic || "ไม่มี"}</div>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-lg font-medium text-pink-600">อื่น ๆ :</div>
            <div className="text-lg font-medium text-pink-400">{pet.Other || "ไม่มี"}</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-10 py-2 flex flex-row justify-center bg-white rounded-full w-fit border border-gray-400 shadow-md">
        {pet.status}
      </div>

      <div className="flex flex-col gap-2 p-2 w-[700px] container mx-auto">
        <div className="bg-primary-200 text-primary-400 text-lg font-medium rounded-full px-4 py-1 w-fit">ติดต่อ</div>
        <div className="px-10 flex flex-col gap-2">
          <div className="flex flex-row gap-4 w-full">
            <div className="text-base font-medium text-pink-600 text-nowrap">มูลนิธิ :</div>
            <div className="text-base font-medium text-pink-400">{pet.foundationName}</div>
          </div>
          <div className="flex flex-row gap-4 w-full">
            <div className="text-base font-medium text-pink-600 text-nowrap">ที่ตั้ง :</div>
            <div className="text-base font-medium text-pink-400 text-wrap">{pet.foundationAddress}</div>
          </div>
        </div>
      </div>

      <a href="/pet_get" className="container mx-auto px-10 py-2 flex flex-row justify-center bg-[#A53E55] rounded-xl w-fit border text-white border-gray-400 shadow-md my-10 text-xl font-semibold">
        สนใจรับเลี้ยง
      </a>
    </div>
  );
}