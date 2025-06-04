'use client';
import { useEffect, useState, useRef } from 'react';
import CampaignCard from "@/components/common/CampaignCard";
import FoundationCard from "@/components/common/FoundationCard";
import Image from "next/image";
import api, { Campaign } from "@/utils/api";

export default function Foundation() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<NodeJS.Timeout | null>(null);

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
      {/* Section 1 */}
      <div className="flex flex-col justify-center items-center py-20 bg-primary-softpink gap-10">
        <h1 className="text-5xl font-bold text-[#F15173]">Campaign & Foundation</h1>
        <img src="/images/foundation/img1.png" className="w-[50%]" alt="foundation" />
      </div>

      {/* Section 2 */}
      <div className="w-full flex flex-row justify-center my-10">
        <img
          src="/images/foundation/textdonate.png"
          alt="text_donate"
          className="w-[30%]"
        />
      </div>

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
                    donationAmount={campaign.currentAmount.toString()}
                    donationGoal={campaign.goalAmount.toString()}
                    campaignImage="/images/landing/camp2.png"
                    rightSideImage="/images/landing/new5.png"
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
              <span className="text-rose-400">find your</span>
              <span className="text-amber-500"> Foundation</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
            <FoundationCard
              id={1}
              logo="/images/landing/soid.png"
              name="Soi Dog Foundation"
              description="มูลนิธิเพื่อสุนัขในซอย กรุงเทพ"
              phoneNumber="0812345678"
              images={[
                "/images/foundation/s1.png",
                "/images/foundation/s2.png",
                "/images/foundation/s3.png",
                "/images/foundation/s4.png"
              ]}
              socialLinks={{
                facebook: "https://facebook.com/soidogfoundation",
                instagram: "https://instagram.com/soidogfoundation",
                website: "https://www.soidog.org"
              }}
              className="mb-8"
            />

            <FoundationCard
              id={2}
              logo="/images/foundation/school-foundation.png"
              name="Animal Foundation"
              description="มูลนิธิช่วยเหลือสัตว์ กรุงเทพ"
              phoneNumber="0987654321"
              images={[
                "/images/foundation/s5.png",
                "/images/foundation/s6.png",
                "/images/foundation/s7.png",
                "/images/foundation/s8.png"
              ]}
              socialLinks={{
                facebook: "https://facebook.com/schoolfoundation",
                instagram: "https://instagram.com/schoolfoundation",
                website: "https://www.animalfoundation.org"
              }}
            />
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