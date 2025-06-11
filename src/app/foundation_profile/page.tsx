'use client';
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import api from "@/utils/api";

// Foundation components
import PetOverview from '@/components/foundation/PetOverview';
import PetSection from '@/components/foundation/PetSection';
import AdoptionRequestsModal from '@/components/foundation/AdoptionRequestsModal';
import AddPetModal from '@/components/foundation/AddPetModal';

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
  type: 'สุนัข' | 'แมว';
  age: string;
  image: string;
  isAdopted: boolean;
}

interface AdoptionRequest {
  id: number;
  userId: number;
  petId: number;
  petName: string;
  petType: 'สุนัข' | 'แมว';
  petAge: string;
  userName: string;
  userImage: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function FoundationDetail() {
  const params = useParams();
  const router = useRouter();
  const [foundation, setFoundation] = useState<Foundation | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFoundationDetail = async () => {
      setLoading(true);
      try {

        // Mock data for demonstration
        const mockFoundation: Foundation = {
          id: parseInt(params.id as string),
          name: "Soi Dog Foundation",
          description: "มูลนิธิเพื่อสุนัขในซอย กรุงเทพ",
          logo: "/images/landing/soid.png",
          phoneNumber: "0812345678",
          images: [
            "/images/foundation/s1.png",
            "/images/foundation/s2.png",
            "/images/foundation/s3.png",
            "/images/foundation/s4.png",
            "/images/foundation/s5.png",
            "/images/foundation/s6.png"
          ],
          socialLinks: {
            facebook: "https://facebook.com/soidogfoundation",
            instagram: "https://instagram.com/soidogfoundation",
            website: "https://www.soidog.org"
          },
          address: "123 Phuket, Thailand",
          about: "Soi Dog Foundation was established in 2003 in Phuket, Thailand, to help the street dogs and cats who had no one else to care for them. Over 100,000 dogs and cats have been sterilized since our founding, and many thousands more have been rescued from abuse, starvation, or injury.",
          donationInfo: "You can donate to support our cause through bank transfer, credit card, or PayPal."
        };

        // Mock pets data
        const mockPets: Pet[] = [
          {
            id: 1,
            name: "จิ๋วหลิว",
            type: "แมว",
            age: "2 เดือน",
            image: "/images/foundation/s1.png",
            isAdopted: false
          },
          {
            id: 2,
            name: "น้าโยก",
            type: "แมว",
            age: "1 ปี",
            image: "/images/foundation/s2.png",
            isAdopted: false
          },
          {
            id: 3,
            name: "มาการ์เย่",
            type: "สุนัข",
            age: "2 ปี",
            image: "/images/foundation/s3.png",
            isAdopted: false
          },
          {
            id: 4,
            name: "โบ๊ท",
            type: "สุนัข",
            age: "1 ปี",
            image: "/images/foundation/s4.png",
            isAdopted: false
          },
          {
            id: 5,
            name: "มิตโต้",
            type: "แมว",
            age: "2 เดือน",
            image: "/images/foundation/s5.png",
            isAdopted: true
          },
          {
            id: 6,
            name: "มี้เจน",
            type: "แมว",
            age: "1 ปี",
            image: "/images/foundation/s6.png",
            isAdopted: true
          },
          {
            id: 7,
            name: "ไทย",
            type: "สุนัข",
            age: "2 ปี",
            image: "/images/foundation/s1.png",
            isAdopted: true
          },
          {
            id: 8,
            name: "มีมี่",
            type: "สุนัข",
            age: "4 เดือน",
            image: "/images/foundation/s4.png",
            isAdopted: true
          }
        ];

        // Mock adoption requests data
        const mockAdoptionRequests: AdoptionRequest[] = [
          {
            id: 1,
            userId: 101,
            petId: 3,
            petName: "มาการ์เย่",
            petType: "สุนัข",
            petAge: "9 เดือน",
            userName: "วินเกอร์ สองแผ่นดิน",
            userImage: "/images/foundation/s2.png",
            date: "2025-05-01",
            status: "pending"
          },
          {
            id: 2,
            userId: 102,
            petId: 1,
            petName: "จิ๋วหลิว",
            petType: "แมว",
            petAge: "11 เดือน",
            userName: "เจอ สถิตย์",
            userImage: "/images/foundation/s3.png",
            date: "2025-05-03",
            status: "pending"
          },
          {
            id: 3,
            userId: 103,
            petId: 4,
            petName: "น้าโยก",
            petType: "แมว",
            petAge: "11 เดือน",
            userName: "เจอ สถิตย์",
            userImage: "/images/foundation/s5.png",
            date: "2025-05-05",
            status: "pending"
          },
          {
            id: 4,
            userId: 104,
            petId: 2,
            petName: "น้าโยก",
            petType: "แมว",
            petAge: "11 เดือน",
            userName: "เจอ สถิตย์",
            userImage: "/images/foundation/s6.png",
            date: "2025-05-07",
            status: "pending"
          }
        ];

        // Simulate API call delay
        setTimeout(() => {
          setFoundation(mockFoundation);
          setPets(mockPets);
          setAdoptionRequests(mockAdoptionRequests);
          setLoading(false);
        }, 500);

      } catch (error) {
        console.error('Error fetching foundation details:', error);
        setError('Failed to load foundation details');
        setLoading(false);
      }
    };

    if (params.id) {
      fetchFoundationDetail();
    }
  }, [params.id]);

  const handleAddPet = (petData: any) => {
    // In a real app, this would send the data to your API
    console.log('New pet data:', petData);
    
    // For now, let's simulate adding a pet by adding it to the state
    const newPet: Pet = {
      id: Math.max(...pets.map(p => p.id)) + 1, // Generate a new ID
      name: petData.name,
      type: petData.type,
      age: petData.age,
      image: petData.image ? URL.createObjectURL(petData.image) : '/images/foundation/s1.png',
      isAdopted: false,
    };
    
    setPets([...pets, newPet]);
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
