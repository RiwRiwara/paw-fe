import Image from 'next/image';
import AdoptionRequestItem from './AdoptionRequestItem';

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

interface AdoptionRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  adoptionRequests: AdoptionRequest[];
}

const AdoptionRequestsModal = ({ isOpen, onClose, adoptionRequests }: AdoptionRequestsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center gap-2 justify-center w-full">
            <div className="bg-rose-100 p-2 rounded-full">
              <Image
                src="/images/paw.png"
                alt="Paw"
                width={24}
                height={24}
              />
            </div>
            <h2 className="text-2xl font-bold text-rose-600">การรับเลี้ยง</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-6 max-h-[calc(80vh-80px)]">
          {adoptionRequests.length === 0 ? (
            <p className="text-center text-gray-500 py-8">ไม่มีคำขอรับเลี้ยงในขณะนี้</p>
          ) : (
            <div className="flex flex-col gap-4">
              {adoptionRequests.map((request) => (
                <AdoptionRequestItem
                  key={request.id}
                  {...request}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdoptionRequestsModal;
