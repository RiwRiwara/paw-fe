import Image from 'next/image';
import { useState, ChangeEvent } from 'react';
import toast from 'react-hot-toast';

interface AddCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaignData: any) => void;
}

const AddCampaignModal = ({ isOpen, onClose, onSubmit }: AddCampaignModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState<string>('');
  const [noTargetAmount, setNoTargetAmount] = useState(false);
  const [campaignType, setCampaignType] = useState('');
  const [endDate, setEndDate] = useState('');
  const [noEndDate, setNoEndDate] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error('กรุณาระบุชื่อแคมเปญ');
      return;
    }

    if (!imagePreview) {
      toast.error('กรุณาอัปโหลดรูปภาพ');
      return;
    }

    if (!description.trim()) {
      toast.error('กรุณาระบุเนื้อหาข้อมูล');
      return;
    }

    if (!noTargetAmount && !targetAmount) {
      toast.error('กรุณาระบุยอดเป้าหมาย');
      return;
    }

    if (!campaignType) {
      toast.error('กรุณาเลือกประเภทแคมเปญ');
      return;
    }

    if (!noEndDate && !endDate) {
      toast.error('กรุณาระบุวันที่สิ้นสุดแคมเปญ');
      return;
    }

    const campaignData = {
      title,
      description,
      targetAmount: noTargetAmount ? null : parseInt(targetAmount),
      campaignType,
      endDate: noEndDate ? null : endDate,
      image: imagePreview, // In a real app, you'd upload the image and get a URL
    };

    onSubmit(campaignData);
    handleReset();
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setTargetAmount('');
    setNoTargetAmount(false);
    setCampaignType('');
    setEndDate('');
    setNoEndDate(false);
    setImagePreview(null);
    setImageFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center gap-2 justify-center w-full">

            <h2 className="text-2xl font-bold text-rose-600">สร้างแคมเปญและข่าวสารใหม่</h2>
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

        <div className="overflow-y-auto p-6 max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">รูปภาพแคมเปญ</label>
              <div className="mt-1 flex justify-center items-center border-2 border-gray-300 border-dashed rounded-2xl p-6 bg-gray-50">
                {imagePreview ? (
                  <div className="relative w-full h-48">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                    <button
                      onClick={() => {
                        setImagePreview(null);
                        setImageFile(null);
                      }}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 mt-2 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-rose-600 hover:text-rose-500 px-3 py-1"
                      >
                        <span>อัปโหลดรูปภาพ</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF ขนาดไม่เกิน 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Campaign/News Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">ชื่อแคมเปญและข่าวสาร</label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">เนื้อหาข้อมูล</label>
              <textarea
                id="description"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Target Amount */}
            <div>
              <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 mb-2">ยอดเป้าหมายแคมเปญ</label>
              <input
                type="number"
                id="targetAmount"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                disabled={noTargetAmount}
              />
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-rose-600 shadow-sm focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50"
                    checked={noTargetAmount}
                    onChange={(e) => {
                      setNoTargetAmount(e.target.checked);
                      if (e.target.checked) setTargetAmount('');
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-700">ไม่ระบุยอดเป้าหมายแคมเปญ</span>
                </label>
              </div>
            </div>

            {/* Campaign Type */}
            <div>
              <label htmlFor="campaignType" className="block text-sm font-medium text-gray-700 mb-2">ประเภทแคมเปญ</label>
              <select
                id="campaignType"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                value={campaignType}
                onChange={(e) => setCampaignType(e.target.value)}
              >
                <option value="">เลือกประเภท</option>
                <option value="medical">ยารักษาโรคและอุปกรณ์การแพทย์</option>
                <option value="surgery">การผ่าตัดรักษา</option>
                <option value="food">จัดซื้ออาหาร</option>
                <option value="utilities">ค่าน้ำและค่าไฟ</option>
                <option value="maintenance">ค่าบำรุง</option>
                <option value="equipment">ค่าอุปกรณ์สำหรับเลี้ยงดู</option>
                <option value="other">อื่น ๆ</option>
              </select>
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">วันเวลาที่สิ้นสุดแคมเปญ</label>
              <input
                type="date"
                id="endDate"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={noEndDate}
              />
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-rose-600 shadow-sm focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50"
                    checked={noEndDate}
                    onChange={(e) => {
                      setNoEndDate(e.target.checked);
                      if (e.target.checked) setEndDate('');
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-700">ไม่มีสิ้นสุดแคมเปญ</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handleReset}
                className="mr-2 px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCampaignModal;
