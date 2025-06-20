'use client';
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import api from '@/utils/api';
// Use native fetch with cookies instead of custom api
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://giveapaw.ivelse.com/api/v1';

// Foundation components
import PetOverview from '@/components/foundation/PetOverview';
import PetSection from '@/components/foundation/PetSection';
import AdoptionRequestsModal from '@/components/foundation/AdoptionRequestsModal';
import AddPetModal from '@/components/foundation/AddPetModal';
import Cookies from 'js-cookie';

interface Foundation {
  id: number;
  name: string;
  description: string;
  logo: string;
  phoneNumber: string;
  images: string[];
  socialLinks: {
    facebook?: string;
    instagram?: string;
    website?: string;
  };
  address?: string;
  about?: string;
  donationInfo?: string;
}

interface Pet {
  id: number;
  name: string;
  type: 'หมา' | 'แมว';
  age: string;
  image: string;
  isAdopted: boolean;
}

interface AdoptionRequest {
  id: number;
  userId: number;
  petId: number;
  petName: string;
  petType: 'หมา' | 'แมว';
  petAge: string;
  userName: string;
  userImage: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function FoundationDetail() {
  const params = 1;
  const [foundation, setFoundation] = useState<Foundation | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = Cookies.get('login') || localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Parallel requests using native fetch; cookies will be sent with `credentials: "include"`
        const [foundationRes, adoptedRes, availableRes, adoptReqRes] = await Promise.all([
          fetch(`${API_BASE_URL}/user/foundation/info`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include'
          }),
          fetch(`${API_BASE_URL}/user/foundation/pet/adopted/status`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include'
          }),
          fetch(`${API_BASE_URL}/user/foundation/pet/available/status`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include'
          }),
          fetch(`${API_BASE_URL}/user/foundation/adopted-request/list`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include'
          }),
        ]);

        if (!foundationRes.ok) throw new Error('Failed to fetch foundation info');
        if (!adoptedRes.ok) throw new Error('Failed to fetch adopted pets');
        if (!availableRes.ok) throw new Error('Failed to fetch available pets');
        if (!adoptReqRes.ok) throw new Error('Failed to fetch adoption requests');

        const foundationJson = await foundationRes.json();
        const adoptedJson = await adoptedRes.json();
        const availableJson = await availableRes.json();
        const adoptReqJson = await adoptReqRes.json();

        console.log("adoptedJson", adoptedJson);
        console.log("availableJson", availableJson);
        console.log("foundationJson", foundationJson);
        console.log("adoptReqJson", adoptReqJson);

        // Map foundation
        const f = foundationJson.data;
        const foundationData: Foundation = {
          id: 0,
          name: f.foundationName,
          description: f.bio || '',
          logo: f.imageUrl || '/images/placeholder.png',
          phoneNumber: '',
          images: f.imageUrl ? [f.imageUrl] : [],
          socialLinks: {},
          address: f.address,
        };
        setFoundation(foundationData);

        // Map pets
        const mapPet = (p: any, adopted: boolean): Pet => ({
          id: p.petId,
          name: p.name,
          type: (p.specie || 'หมา') as 'หมา' | 'แมว',
          age: p.age,
          image: p.imageUrl,
          isAdopted: adopted,
        });

        const petsData: Pet[] = [
          ...adoptedJson.data.map((p: any) => mapPet(p, true)),
          ...availableJson.data.map((p: any) => mapPet(p, false)),
        ];
        setPets(petsData);

        // Map adoption requests
        const adoptionData: AdoptionRequest[] = adoptReqJson.data.map((item: any, idx: number) => ({
          id: idx,
          userId: item.userInfo.userId,
          petId: item.petInfo.petId,
          petName: item.petInfo.name,
          petType: (item.petInfo.specie || 'หมา') as 'หมา' | 'แมว',
          petAge: item.petInfo.age,
          userName: `${item.userInfo.firstname} ${item.userInfo.lastname}`.trim(),
          userImage: item.userInfo.imageUrl || '/images/placeholder.png',
          date: '',
          status: 'pending',
        }));
        setAdoptionRequests(adoptionData);
      } catch (err: any) {
        console.error(err);
        setError('Failed to load foundation details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddPet = async (petData: any) => {

    try {
      // 1. Upload image if provided
      // let imageId: number | undefined;
      // if (petData.image) {
      //   const uploadRes = await api.upload.image(petData.image);
      //   if (uploadRes.data.success) {
      //     imageId = ((uploadRes.data.data as any).imageId || ((uploadRes.data.data as any).id || 0));
      //   }
      // }
      const imageId = 1;

      // 2. Construct request body for creating pet
      const body = {
        active: 1,
        age: parseInt(petData.age) || 0,
        allergic: petData.allergic || '',
        foodAllergy: petData.foodAllergy || '',
        gender: petData.gender,
        imageId: imageId as number,
        name: petData.name,
        other: petData.other || '',
        petFriendly: petData.petFriendly,
        spaceRequired: petData.spaceRequired,
        specialCareNeed: petData.specialCareNeed,
        sterilization: petData.sterilization,
        vaccination: petData.vaccination || '',
        weight: parseFloat(petData.weight) || 0,
      } as any;

      const createRes = await api.pet.createPet(body);
      if (createRes.data.success) {
        // Refresh pet list
        const petsRes = await api.foundation.getFoundationPets();
        if (petsRes.data.success) {
          const petsData: Pet[] = petsRes.data.data.map((p: any) => ({
            id: p.petId,
            name: p.name,
            type: p.species || 'หมา',
            age: p.age,
            image: p.imageUrl,
            isAdopted: p.status === 'Adopted',
          }));
          setPets(petsData);
        }
      }
    } catch (err) {
      console.error('Error adding new pet:', err);
    }
    setShowAddPetModal(false);
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-300 border-t-rose-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading foundation details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-red-500 text-xl">{error}</p>
        <Link href="/foundation" className="inline-block mt-4 bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded">
          Back to Foundations
        </Link>
      </div>
    );
  }

  if (!foundation) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-600 text-xl">Foundation not found</p>
        <Link href="/foundation" className="inline-block mt-4 bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded">
          Back to Foundations
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-screen">
      {/* Back button */}
      <Link href="/foundation" className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-700 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Foundations
      </Link>

      <div className='flex flex-row justify-center'>
        <img src="/images/giveapet.png" alt="giveapet" width={500} height={50} />
      </div>
      {/* Foundation Header */}
      <div className="bg-white overflow-hidden mb-8">
        <div className="p-6 ">
          <div className="flex items-center gap-10">
            <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-rose-300">
              <Image
                src={foundation.logo}
                alt={`${foundation.name} logo`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-rose-700">{foundation.name}</h1>
              <p className="text-lg text-rose-600">{foundation.description}</p>

            </div>
          </div>
        </div>

        {/* Foundation Content */}
        <div className="">
          {/* Left column: About */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-rose-600 mb-4">เกี่ยวกับมูลนิธิ</h2>
            <p className="text-rose-600 mb-6 bg-[#FFEBEB] p-4 rounded-2xl">{foundation.about}</p>

          </div>


        </div>
      </div>

      {/* Overview pet in foundation */}
      <PetOverview
        pets={pets}
        onAddPet={() => setShowAddPetModal(true)}
      />

      {/* สัตว์ที่ยังอยู่ในมูลนิธิ */}
      <PetSection
        title="สัตว์ที่ยังอยู่ในมูลนิธิ"
        showAdopted={false}
        pets={pets}
      />

      {/*  สัตว์ที่ถูกรับเลี้ยงแล้ว*/}
      <PetSection
        title="สัตว์ที่ถูกรับเลี้ยงแล้ว"
        showAdopted={true}
        pets={pets}
      />


      {/* การรับเลี้ยง */}
      <div className='flex justify-end mt-4 mb-10'>
        <button
          onClick={() => setShowAdoptionModal(true)}
          className="bg-rose-400 hover:bg-rose-500 text-white py-1 px-4 rounded-full text-xl transition-colors"
        >
          การรับเลี้ยง
        </button>
      </div>

      {/* Adoption Requests Modal */}
      <AdoptionRequestsModal
        isOpen={showAdoptionModal}
        onClose={() => setShowAdoptionModal(false)}
        adoptionRequests={adoptionRequests}
      />

      {/* Add Pet Modal */}
      <AddPetModal
        isOpen={showAddPetModal}
        onClose={() => setShowAddPetModal(false)}
        onSubmit={handleAddPet}
      />

    </div>
  );
}
