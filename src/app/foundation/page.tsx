'use client';
import { useEffect, useState } from 'react';
import CampaignCard from "@/components/common/CampaignCard";
import FoundationCard from "@/components/common/FoundationCard";
import Image from "next/image";
import api, { Campaign } from "@/utils/api";
import Slider from 'react-slick';


export default function Foundation() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {

      const response = await api.campaign.getList();
      if (response.data.success) {
        setCampaigns(response.data.data);
      }
    };

    fetchCampaigns();
  }, []);

  // Carousel settings
  const carouselSettings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop the carousel
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Show one campaign at a time
    slidesToScroll: 1, // Scroll one campaign at a time
    autoplay: true, // Auto-play the carousel
    autoplaySpeed: 3000, // 3 seconds per slide
    arrows: true, // Show next/prev arrows
    responsive: [
      {
        breakpoint: 768, // Adjust for smaller screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows on mobile for simplicity
        },
      },
    ],
  };

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

      {/* Campaigns Section with Carousel */}
      <div className="container mx-auto px-4 py-8">
        <Slider {...carouselSettings}>
          {campaigns.map((campaign, index) => (
            <div key={index} className="px-2">
              <CampaignCard
                title={campaign.campaignName}
                description={campaign.description}
                donationLabel="Donate"
                donationAmount={campaign.raisedAmount.toString()}
                donationGoal={campaign.goalAmount.toString()}
                campaignImage="/images/landing/camp2.png" // Replace with dynamic image if available
                rightSideImage="/images/landing/new5.png" // Replace with dynamic image if available
                isNew={index === 0} // Mark first campaign as new
                foundationName={campaign.foundationName}
                foundationSubtitle={campaign.description}
                foundationLogo={campaign.foundationLogo}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Section 3: Find Your Foundation */}
      <div className="py-16 px-4 bg-rose-100 rounded-t-[80px] mt-12">
        <div className="container mx-auto">
          {/* Section Header */}
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

          {/* Foundation Cards */}
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
    </div>
  );
}