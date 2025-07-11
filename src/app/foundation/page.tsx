'use client';
import { useEffect, useState, useRef } from 'react';
import CampaignCard from "@/components/common/CampaignCard";
import FoundationCard from "@/components/common/FoundationCard";
import Image from "next/image";
import api from "@/utils/api";
import { Campaign } from '@/utils/types';
import { FoundationInfo } from '@/utils/api';




export default function Foundation() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<NodeJS.Timeout | null>(null);
  const [foundations, setFoundations] = useState<FoundationInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await api.campaign.getList();
      if (response.data.success) {
        setCampaigns(response.data.data);
      }
    };
    fetchCampaigns();
  }, []);

  // Fetch foundations
  useEffect(() => {
    // const fetchFoundations = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await api.foundation.getList();
    //     if (response.data.success && response.data.data) {
    //       setFoundations(response.data.data);
    //     } else {
    //       setError(response.data.message || 'Failed to fetch foundations');
    //     }
    //   } catch (err) {
    //     setError('An error occurred while fetching foundations.');
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchFoundations();
  }, []);

  // Autoplay logic
  useEffect(() => {
    if (campaigns.length > 1) {
      carouselRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % campaigns.length);
      }, 3000); // 3 seconds per slide
    }
    return () => {
      if (carouselRef.current) clearInterval(carouselRef.current);
    };
  }, [campaigns]);

  // Handle navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (carouselRef.current) clearInterval(carouselRef.current); // Pause autoplay on manual navigation
    carouselRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campaigns.length);
    }, 3000);
  };

  const goToNext = () => goToSlide((currentSlide + 1) % campaigns.length);
  const goToPrev = () => goToSlide((currentSlide - 1 + campaigns.length) % campaigns.length);

  return (
    <div className="flex flex-col min-h-screen">



      {/* Campaigns Section with Custom Carousel */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {campaigns.map((campaign, index) => (
                <div key={index} className="min-w-full px-2">
                  <CampaignCard
                    title={campaign.campaignName}
                    description={campaign.description}
                    donationLabel="Donate"
                    donationGoal={campaign.goalAmount}
                    campaignImage={`/images/foundation/s${(index % 4) + 1}.png`}
                    rightSideImage={`/images/foundation/s${((index + 1) % 4) + 1}.png`}
                    isNew={index === 0}
                    foundationName={campaign.foundationName}
                    foundationSubtitle={campaign.description}
                    foundationLogo={campaign.foundationLogo}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {campaigns.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hidden md:block"
              >
                &larr;
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hidden md:block"
              >
                &rarr;
              </button>
            </>
          )}

          {/* Navigation Dots */}
          {campaigns.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {campaigns.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-rose-500' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Find Your Foundation */}
      <div className="py-16 px-4 bg-rose-100 rounded-t-[80px] mt-12">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="relative">
              <Image
                src="/images/foundation/paw-icon.png"
                alt="Paw icon"
                width={50}
                height={50}
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-rose-400">Find your</span>
              <span className="text-amber-500"> Foundation</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto" >
            {/* Foundation Cards */}
            <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
              <FoundationCard
                logo="/images/landing/soid.png"
                name="มูลนิธิเพื่อหมาในซอย"
                description="มูลนิธิเพื่อหมาในซอย กรุงเทพ ประเทศไทย มีวัตถุประสงค์เพื่อช่วยเหลือและดูแลสัตว์เลี้ยงที่อยู่ในซอย"
                phoneNumber="0000000000"
                images={[
                  "/images/foundation/s1.png",
                  "/images/foundation/s2.png",
                  "/images/foundation/s3.png",
                  "/images/foundation/s4.png"
                ]}
                socialLinks={{
                  facebook: "https://facebook.com/soidogfoundation",
                  instagram: "https://instagram.com/soidogfoundation"
                }}
                className="mb-8"
              />

              <FoundationCard
                logo="/images/foundation/school-foundation.png"
                name="มูลนิธิสัตว์เลี้ยง"
                description="มูลนิธิสัตว์เลี้ยง กรุงเทพ ประเทศไทย มีวัตถุประสงค์เพื่อช่วยเหลือและดูแลสัตว์เลี้ยงที่อยู่ในซอย"
                phoneNumber="0000000000"
                images={[
                  "/images/foundation/s5.png",
                  "/images/foundation/s6.png",
                  "/images/foundation/s7.png",
                  "/images/foundation/s8.png"
                ]}
                socialLinks={{
                  facebook: "https://facebook.com/schoolfoundation",
                  instagram: "https://instagram.com/schoolfoundation"
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS for Carousel */}
      <style jsx>{`
        .carousel-container {
          position: relative;
          overflow: hidden;
        }
        .carousel-slide {
          display: flex;
          transition: transform 0.5s ease-in-out;
        }
        .carousel-slide > div {
          flex: 0 0 100%;
        }
        @media (max-width: 768px) {
          .carousel-arrow {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}