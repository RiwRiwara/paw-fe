import { useState } from 'react';
import Image from 'next/image';

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (petData: PetFormData) => void;
}

interface PetFormData {
  name: string;
  type: 'สุนัข' | 'แมว';
  age: string;
  description: string;
  image: File | null;
}

const AddPetModal = ({ isOpen, onClose, onSubmit }: AddPetModalProps) => {
  const [petFormData, setPetFormData] = useState<PetFormData>({
    name: '',
    type: 'สุนัข',
    age: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      
      // Create an image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(petFormData);
    // Reset form after submission
    setPetFormData({
      name: '',
      type: 'สุนัข',
      age: '',
      description: '',
      image: null,
    });
    setImagePreview(null);
    onClose();
  };

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
            <h2 className="text-2xl font-bold text-rose-600">เพิ่มข้อมูลสัตว์</h2>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-rose-700 mb-2">ชื่อ:</label>
              <input
                type="text"
                name="name"
                value={petFormData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                required
              />
            </div>

            <div>
              <label className="block text-rose-700 mb-2">ประเภท:</label>
              <select
                name="type"
                value={petFormData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                required
              >
                <option value="สุนัข">สุนัข</option>
                <option value="แมว">แมว</option>
              </select>
            </div>

            <div>
              <label className="block text-rose-700 mb-2">อายุ:</label>
              <input
                type="text"
                name="age"
                value={petFormData.age}
                onChange={handleInputChange}
                placeholder="เช่น 2 เดือน, 1 ปี"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                required
              />
            </div>

            <div>
              <label className="block text-rose-700 mb-2">คำอธิบาย:</label>
              <textarea
                name="description"
                value={petFormData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 h-32"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-rose-700 mb-2">รูปภาพ:</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200"
                  required
                />
                {imagePreview && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full transition-colors"
              >
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPetModal;
