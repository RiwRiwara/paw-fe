'use client';
import Image from "next/image";
import { useEffect, useState } from 'react';
import CampaignCard from "@/components/common/CampaignCard";
import api from "@/utils/api";
import { Campaign } from '@/utils/types';


export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.campaign.getList();
        console.log(response.data);
        if (response.data.success) {
          setCampaigns(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Hero */}
      <div className="bg-primary-50 flex flex-col items-center justify-center relative min-h-[800px] md:h-[900px] bg-[url('/img/mountains.jpg')] bg-cover bg-center overflow-hidden">
        {/* Logo */}
        <div className="relative w-[50px] sm:w-[300px] lg:w-[330px] h-[450px] sm:h-[200px] lg:h-[500px] z-30">
          <Image
            src="/images/giveapaw2.png"
            alt="logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Paw Images */}
        <div className="absolute top-10 right-5 sm:right-10 lg:right-[100px] w-[60px] sm:w-[80px] lg:w-[100px] h-[60px] sm:h-[80px] lg:h-[100px]">
          <Image src="/images/paw.png" alt="paw_1" fill className="object-contain" />
        </div>
        <div className="absolute top-20 sm:top-24 lg:top-[150px] left-10 sm:left-20 lg:left-[250px] w-[80px] sm:w-[120px] lg:w-[150px] h-[80px] sm:h-[120px] lg:h-[150px]">
          <Image src="/images/paw.png" alt="paw_2" fill className="object-contain" />
        </div>
        <div className="hidden lg:block absolute top-[500px] right-[600px] w-[100px] h-[100px]">
          <Image src="/images/paw.png" alt="paw_4" fill className="object-contain" />
        </div>

        {/* Cat and Dog Images Container */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between pointer-events-none px-4 sm:px-8 lg:px-12">
          {/* Cat (Left) */}
          <div className="relative w-[200px] sm:w-[400px] lg:w-[700px] h-[350px] sm:h-[300px] lg:h-[500px]">
            <Image
              src="/images/sec1_cat.png"
              alt="sect_1_cat"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>

          {/* Dog (Right) */}
          <div className="relative w-[200px] sm:w-[400px] lg:w-[700px] h-[350px] sm:h-[300px] lg:h-[500px]">
            <Image
              src="/images/sec1_dog.png"
              alt="sect_1_dog"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </div>

      {/* Section 2: News */}
      <div className="bg-white flex flex-col items-center px-4 sm:px-6 lg:px-8 container mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative w-3/4 sm:w-2/3 lg:w-1/2 aspect-[4/1] mx-auto">
            <Image
              src="/images/landing/newstext.png"
              alt="news_text"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="w-24 h-1 bg-primary-pink mx-auto mt-4 mb-6"></div>
          <p className="text-primary-400 max-w-2xl mx-auto mb-8">Stay updated with the latest news and events about our animal rescue campaigns.</p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-4 gap-4 w-full">
          {/* News Card 1 */}
          <div className="bg-primary-softpink rounded-lg border p-4 border-red-600 row-span-2 flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-red">ข้อมูลต่าง ๆ</h2>
            <p className="text-sm sm:text-base text-primary-400">
              Lorem ipsum dolor sit amet consectetur. Pellentesque tristique nunc fermentum nisi leo.
            </p>
            <div className="relative w-full aspect-square">
              <Image
                src="/images/landing/new1.png"
                alt="news_1"
                fill
                className="object-cover rounded-md"
                priority
              />
            </div>
          </div>

          {/* News Card 2 */}
          <div className="bg-primary-softpink rounded-lg border p-4 border-red-600 row-span-2 flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-red">ข้อมูลต่าง ๆ</h2>
            <p className="text-sm sm:text-base text-primary-400">
              Lorem ipsum dolor sit amet consectetur. Pellentesque tristique nunc fermentum nisi leo.
            </p>
            <div className="relative w-full aspect-square">
              <Image
                src="/images/landing/new2.png"
                alt="news_2"
                fill
                className="object-cover rounded-md"
                priority
              />
            </div>
          </div>

          {/* News Card 3 */}
          <div className="col-span-2 bg-primary-softpink rounded-lg border p-4 border-red-600 row-span-2 flex flex-col gap-2 col-start-1 row-start-3">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-red">ข้อมูลต่าง ๆ</h2>
            <p className="text-sm sm:text-base text-primary-400">
              Lorem ipsum dolor sit amet consectetur. Pellentesque tristique nunc fermentum nisi leo.
            </p>
            <div className="relative w-full aspect-[2/1]">
              <Image
                src="/images/landing/new3.png"
                alt="news_3"
                fill
                className="object-cover rounded-md"
                priority
              />
            </div>
          </div>

          {/* News Card 4 (Donation Amount) */}
          <div className="col-span-2 bg-primary-softpink rounded-lg border p-4 border-red-600 row-span-4 flex flex-col gap-2 col-start-3 row-start-1">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-red">ยอดเงินปัจจุบัน</h2>
            <div className="px-4 py-2  text-4xl  font-bold text-primary-pink bg-white  p-6 rounded-3xl w-fit border border-red-600 my-6">
              20,000
            </div>
            <p className="text-sm sm:text-base text-primary-400">
              Lorem ipsum dolor sit amet consectetur. Pellentesque tristique nunc fermentum nisi leo.
            </p>
            <div className="relative w-full aspect-square">
              <Image
                src="/images/landing/new4.png"
                alt="news_4"
                fill
                className="object-cover rounded-md"
                priority
              />
            </div>
          </div>
        </div>
      </div>


      {/* Section 3: Campaign */}
      <div className="container mx-auto px-4 py-12 bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-red mb-2">Current Campaigns</h2>
          <div className="w-24 h-1 bg-primary-pink mx-auto mb-4"></div>
          <p className="text-primary-400 max-w-2xl mx-auto">Support our ongoing campaigns and help make a difference in the lives of animals in need.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.length > 0 ? campaigns.map((campaign, index) => (
            <div key={index} className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
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
          )) : (
            <div className="col-span-full text-center py-10">
              <div className="animate-pulse bg-primary-softpink rounded-lg p-8 max-w-md mx-auto">
                <p className="text-primary-red font-medium">Loading campaigns...</p>
              </div>
            </div>
          )}
        </div>

        {campaigns.length > 0 && (
          <div className="text-center mt-10">
            <button className="bg-primary-red hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              View All Campaigns
            </button>
          </div>
        )}
      </div>

      {/* Section 4: Contact Us */}
      <div className="bg-primary-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-red mb-4">Get In Touch</h2>
              <p className="text-primary-400 mb-6 max-w-md">Have questions about our adoption process or campaigns? Reach out to us and we'll be happy to help.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-primary-red hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Contact Us
                </button>
                <button className="border border-primary-red text-primary-red hover:bg-primary-softpink font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Donate Now
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/landing/bot.png"
                alt="Contact illustration"
                width={500}
                height={400}
                className="object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </div>



    </div>
  );
}