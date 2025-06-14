'use client';
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import toast from 'react-hot-toast';
import AddCampaignModal from '@/components/campaign/AddCampaignModal';

interface Campaign {
  id: number;
  title: string;
  type: 'campaign' | 'news';
  image: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
  description: string;
}

export default function CampaignPage() {
  const [searchTopic, setSearchTopic] = useState<'all' | 'campaign' | 'news'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);
  
  // Mock campaign data
  const mockCampaigns: Campaign[] = [
    {
      id: 1,
      title: "รับบริจาคอาหารสุนัข",
      type: "campaign",
      image: "/images/foundation/s1.png",
      startDate: "2025-05-01",
      endDate: "2025-07-01",
      status: "active",
      description: "ร่วมบริจาคอาหารสุนัขเพื่อช่วยเหลือสุนัขจรจัดในมูลนิธิของเรา"
    },
    {
      id: 2,
      title: "รับบริจาคอาหารแมว",
      type: "campaign",
      image: "/images/foundation/s2.png",
      startDate: "2025-05-15",
      endDate: "2025-07-15",
      status: "active",
      description: "ร่วมบริจาคอาหารแมวเพื่อช่วยเหลือแมวจรจัดในมูลนิธิของเรา"
    },
    {
      id: 3,
      title: "ข่าวสารการรับเลี้ยงสัตว์",
      type: "news",
      image: "/images/foundation/s3.png",
      startDate: "2025-06-01",
      endDate: "2025-06-30",
      status: "active",
      description: "ข่าวสารเกี่ยวกับการรับเลี้ยงสัตว์ประจำเดือนมิถุนายน"
    },
    {
      id: 4,
      title: "กิจกรรมฉีดวัคซีนฟรี",
      type: "campaign",
      image: "/images/foundation/s4.png",
      startDate: "2025-04-01",
      endDate: "2025-04-30",
      status: "completed",
      description: "กิจกรรมฉีดวัคซีนฟรีให้กับสัตว์เลี้ยง"
    },
    {
      id: 5,
      title: "ข่าวสารการดูแลสัตว์เลี้ยงในฤดูร้อน",
      type: "news",
      image: "/images/foundation/s5.png",
      startDate: "2025-03-01",
      endDate: "2025-03-31",
      status: "completed",
      description: "ข่าวสารเกี่ยวกับการดูแลสัตว์เลี้ยงในฤดูร้อน"
    },
    {
      id: 6,
      title: "โครงการทำหมันสัตว์จรจัด",
      type: "campaign",
      image: "/images/foundation/s6.png",
      startDate: "2025-02-01",
      endDate: "2025-02-28",
      status: "completed",
      description: "โครงการทำหมันสัตว์จรจัดเพื่อควบคุมประชากรสัตว์จรจัด"
    }
  ];

  const activeCampaigns = mockCampaigns.filter(campaign => campaign.status === 'active');
  const completedCampaigns = mockCampaigns.filter(campaign => campaign.status === 'completed');

  const handleAddCampaign = (campaignData: any) => {
    // In a real app, you would send this data to your backend
    console.log('New campaign data:', campaignData);
    toast.success('แคมเปญถูกสร้างเรียบร้อย');
    setShowAddCampaignModal(false);
  };

  // Filter campaigns based on search criteria
  const filteredCampaigns = mockCampaigns.filter(campaign => {
    // Filter by topic if not 'all'
    const topicMatch = searchTopic === 'all' ? true : campaign.type === searchTopic;
    
    // Filter by search query if present
    const queryMatch = searchQuery === '' ? true : 
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return topicMatch && queryMatch;
  });

  // Campaign/News Card Component
  const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      <div className="relative h-48 w-full">
        <Image 
          src={campaign.image} 
          alt={campaign.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            campaign.type === 'campaign' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
          }`}>
            {campaign.type === 'campaign' ? 'แคมเปญ' : 'ข่าวสาร'}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            campaign.status === 'active' ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {campaign.status === 'active' ? 'กำลังดำเนินการ' : 'สิ้นสุดแล้ว'}
          </span>
        </div>
        <h3 className="text-xl font-bold text-rose-700 mb-2">{campaign.title}</h3>
        <p className="text-rose-600 mb-4">{campaign.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>เริ่ม: {new Date(campaign.startDate).toLocaleDateString('th-TH')}</span>
          <span>สิ้นสุด: {new Date(campaign.endDate).toLocaleDateString('th-TH')}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-screen">
      {/* Header */}
      <div className='flex flex-row justify-center mb-8'>
        <img src="/images/giveapet.png" alt="giveapet" width={500} height={50} />
      </div>

      {/* Section 1: Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-rose-600 mb-4">ค้นหาแคมเปญและข่าวสาร</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/4">
            <input
              type="text"
              placeholder="ค้นหาแคมเปญและข่าวสาร..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/4">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value as 'all' | 'campaign' | 'news')}
            >
              <option value="all">ทั้งหมด</option>
              <option value="campaign">แคมเปญ</option>
              <option value="news">ข่าวสาร</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 2: Campaign Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-rose-600 mb-4">ภาพรวมแคมเปญและข่าวสาร</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#FFEBEB] p-4 rounded-2xl">
            <h3 className="text-xl font-bold text-rose-700 mb-2">แคมเปญที่กำลังดำเนินการอยู่</h3>
            <p className="text-3xl font-bold text-rose-600">{activeCampaigns.length}</p>
          </div>
          <div className="bg-[#FFEBEB] p-4 rounded-2xl">
            <h3 className="text-xl font-bold text-rose-700 mb-2">แคมเปญสิ้นสุดแล้ว</h3>
            <p className="text-3xl font-bold text-rose-600">{completedCampaigns.length}</p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button 
            onClick={() => setShowAddCampaignModal(true)}
            className="bg-rose-400 hover:bg-rose-500 text-white py-2 px-6 rounded-full font-bold transition-colors"
          >
            สร้างแคมเปญและข่าวสารใหม่
          </button>
        </div>
      </div>

      {/* Section 3: Active Campaigns */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-rose-600">ที่กำลังดำเนินการอยู่</h2>
          <Link href="/campaign/active" className="text-rose-500 hover:text-rose-700">
            ดูทั้งหมด
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCampaigns.slice(0, 3).map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
        {activeCampaigns.length === 0 && (
          <p className="text-center text-gray-500 py-6">ไม่พบแคมเปญที่กำลังดำเนินการอยู่</p>
        )}
      </div>

      {/* Section 4: Completed Campaigns */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-rose-600">สิ้นสุดแล้ว</h2>
          <Link href="/campaign/completed" className="text-rose-500 hover:text-rose-700">
            ดูทั้งหมด
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedCampaigns.slice(0, 3).map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
        {completedCampaigns.length === 0 && (
          <p className="text-center text-gray-500 py-6">ไม่พบแคมเปญที่สิ้นสุดแล้ว</p>
        )}
      </div>

      {/* Display filtered results if search is active */}
      {(searchQuery || searchTopic !== 'all') && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-rose-600 mb-4">ผลการค้นหา</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
          {filteredCampaigns.length === 0 && (
            <p className="text-center text-gray-500 py-6">ไม่พบผลการค้นหา</p>
          )}
        </div>
      )}

      {/* Add Campaign Modal */}
      <AddCampaignModal
        isOpen={showAddCampaignModal}
        onClose={() => setShowAddCampaignModal(false)}
        onSubmit={handleAddCampaign}
      />
    </div>
  );
}
