import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface AdoptionRequestItemProps {
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

const AdoptionRequestItem = ({ 
  userId, 
  petName, 
  petType, 
  petAge, 
  userName, 
  userImage 
}: AdoptionRequestItemProps) => {
  const router = useRouter();
  
  return (
    <div className="bg-[#FFF9F9] rounded-xl p-4 border border-rose-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={userImage}
            alt={userName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-lg text-rose-700">{userName}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{petType}</span>
            <span>{petName}</span>
            <span>{petAge}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => router.push(`/profile?id=${userId}`)}
          className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-1 rounded-full text-sm transition-colors"
        >
          ตรวจสอบ
        </button>
      </div>
    </div>
  );
};

export default AdoptionRequestItem;
