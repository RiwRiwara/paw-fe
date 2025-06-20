import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface PetFormData {
  name: string;
  type: 'หมา' | 'แมว';
  age: string;
  description: string;
  image: File | null | string; // string for existing url
  gender: 'Male' | 'Female';
  allergic: string;
  foodAllergy: string;
  vaccination: string;
  weight: number | '';
  sterilization: boolean;
  other: string;
  spaceRequired: number;
  petFriendly: number;
  specialCareNeed: number;
}

interface EditPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (petData: PetFormData) => void;
  initialData: PetFormData;
}

const EditPetModal = ({ isOpen, onClose, onSubmit, initialData }: EditPetModalProps) => {
  const [petFormData, setPetFormData] = useState<PetFormData>(initialData);
  const [imagePreview, setImagePreview] = useState<string | null>(typeof initialData.image === 'string' ? initialData.image : null);

  useEffect(() => {
    setPetFormData(initialData);
    if (typeof initialData.image === 'string') setImagePreview(initialData.image);
  }, [initialData]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPetFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPetFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onload = (evt) => setImagePreview(evt.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRatingChange = (category: 'spaceRequired' | 'petFriendly' | 'specialCareNeed', rating: number) => {
    setPetFormData(prev => ({
      ...prev,
      [category]: rating,
    }));
  };

  const renderStarRating = (category: 'spaceRequired' | 'petFriendly' | 'specialCareNeed', label: string) => {
    const currentRating = petFormData[category];
    return (
      <div className="flex items-center gap-2">
        <span className="text-gray-700 w-44">{label} :</span>
        <div className="flex">
          {[1,2,3,4,5].map(star => (
            <button key={star} type="button" onClick={() => handleRatingChange(category, star)} className="focus:outline-none">
              <svg className={`w-6 h-6 ${star<=currentRating?'text-amber-400':'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(petFormData);
      toast.success('อัปเดตข้อมูลสัตว์สำเร็จ');
      onClose();
    } catch(err){
      console.error(err);
      toast.error('อัปเดตข้อมูลสัตว์ไม่สำเร็จ');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-rose-600 mb-4">แก้ไขข้อมูลสัตว์</h2>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">✕</button>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* name, type, age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-rose-700 mb-2">ชื่อสัตว์:</label>
              <input name="name" value={petFormData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400" required />
            </div>
            <div>
              <label className="block text-rose-700 mb-2">ประเภท:</label>
              <select name="type" value={petFormData.type} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-rose-400">
                <option value="หมา">หมา</option>
                <option value="แมว">แมว</option>
              </select>
            </div>
            <div>
              <label className="block text-rose-700 mb-2">อายุ:</label>
              <input name="age" value={petFormData.age} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-rose-400" required />
            </div>
            <div>
              <label className="block text-rose-700 mb-2">เพศ:</label>
              <select name="gender" value={petFormData.gender} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-rose-400">
                <option value="Male">ตัวผู้</option>
                <option value="Female">ตัวเมีย</option>
              </select>
            </div>
          </div>
          {/* description */}
          <div>
            <label className="block text-rose-700 mb-2">คำอธิบาย:</label>
            <textarea name="description" value={petFormData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-rose-400 h-24" />
          </div>
          {/* allergies etc */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-rose-700 mb-2">โรคภูมิแพ้:</label>
              <input name="allergic" value={petFormData.allergic} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-rose-400" />
            </div>
            <div>
              <label className="block text-rose-700 mb-2">อาหารที่แพ้:</label>
              <input name="foodAllergy" value={petFormData.foodAllergy} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-rose-400" />
            </div>
          </div>
          {/* status ratings */}
          <div className="bg-[#FFF3F3] p-4 rounded-xl space-y-3">
            <p className="text-rose-700 font-medium mb-2">สถานะเบื้องต้น</p>
            {renderStarRating('spaceRequired','ต้องการพื้นที่กว้าง')}
            {renderStarRating('petFriendly','เป็นมิตรกับสัตว์อื่น')}
            {renderStarRating('specialCareNeed','ต้องการการดูแลพิเศษ')}
          </div>
          {/* image input */}
          <div>
            <label className="block text-rose-700 mb-2">รูปภาพ:</label>
            <div className="flex items-center space-x-4">
              <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200" />
              {imagePreview && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image src={imagePreview} alt="preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full">บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPetModal;
