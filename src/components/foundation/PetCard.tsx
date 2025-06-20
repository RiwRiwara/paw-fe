import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import EditPetModal from './EditPetModal';

interface PetCardProps {
  id: number;
  name: string;
  type: 'หมา' | 'แมว';
  age: string;
  image: string;
  isAdopted: boolean;
}

const PetCard = ({ id, name, type, age, image, ...rest }: PetCardProps) => {
  const [showEdit, setShowEdit] = useState(false);

  const initialData = {
    name,
    type,
    age,
    description: '',
    image,
    gender: 'Male',
    allergic: '',
    foodAllergy: '',
    vaccination: '',
    weight: '',
    sterilization: false,
    other: '',
    spaceRequired: 0,
    petFriendly: 0,
    specialCareNeed: 0,
  } as any;

  const handleEditSubmit = async (data: any) => {
    try {
      const token = Cookies.get('login') || localStorage.getItem('token');
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://giveapaw.ivelse.com/api/v1';

      // TODO: integrate image upload later, use existing 1 for now
      const imageId = 1;

      const payload = {
        active: 1,
        age: parseInt(data.age) || 0,
        allergic: data.allergic || '',
        breed: data.breed || 'string',
        foodAllergy: data.foodAllergy || '',
        gender: data.gender.toLowerCase(),
        imageId,
        name: data.name,
        other: data.other || '',
        petFriendly: data.petFriendly ?? 0,
        petId: id,
        spaceRequired: data.spaceRequired ?? 0,
        specialCareNeed: data.specialCareNeed ?? 0,
        specie: data.type || 'หมา',
        sterilization: !!data.sterilization,
        vaccination: data.vaccination || '',
        weight: parseFloat(data.weight) || 0,
      } as Record<string, any>;

      const res = await fetch(`${API_BASE_URL}/pet`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error('Update pet failed', await res.json());
        toast.error('อัปเดตข้อมูลสัตว์ไม่สำเร็จ');
      } else {
        toast.success('อัปเดตข้อมูลสัตว์สำเร็จ');
        setShowEdit(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('อัปเดตข้อมูลสัตว์ไม่สำเร็จ');
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <Image 
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-amber-600">{name}</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{type}</span>
          <span>{age}</span>
        </div>
        <Link href={`/pet?petId=${id}`} className="p-2 mt-3 w-full bg-rose-400 hover:bg-rose-500 text-white py-1 rounded-full text-sm transition-colors">
          read more
        </Link>
        <button onClick={() => setShowEdit(true)} className="p-2 mt-3 w-full bg-rose-400 hover:bg-rose-500 text-white py-1 rounded-full text-sm transition-colors"> 
          edit
        </button>
        {showEdit && (
          <EditPetModal
            isOpen={showEdit}
            onClose={() => setShowEdit(false)}
            onSubmit={handleEditSubmit}
            initialData={initialData}
          />
        )}
      </div>
    </div>
  );
};

export default PetCard;
