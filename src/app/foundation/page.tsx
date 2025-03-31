import CampaignCard from "@/components/common/CampaignCard";
import FoundationCard from "@/components/common/FoundationCard";
import Image from "next/image";
import Link from "next/link";

export default function Foundation() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1 */}
      <div className="flex flex-col justify-center items-center py-20 bg-primary-softpink gap-10">
        <h1 className="text-4xl font-bold">Campaign & Foundation</h1>
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

      <CampaignCard
        title="Campaign"
        description="Lorem ipsum dolor sit amet consectetur. Pellentesque tristique nunc fermentum nisi le Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque rerum adipisci nulla!"
        donationLabel="Donate"
        donationAmount="4,500"
        donationGoal="6,500"
        campaignImage="/images/landing/camp2.png"
        rightSideImage="/images/landing/new5.png"
        isNew={true}
        foundationName="Soi Dog Foundation"
        foundationSubtitle="ระดมทุนเพื่อสุนัขพิการ"
      />

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
              logo="/images/landing/soid.png"
              name="Lorem ipsum dolor sit amet"
              description="Lorem ipsum dolor sit amet consectetur. Tempor ornare pretium ac donec"
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
              name="Lorem ipsum dolor sit amet"
              description="Lorem ipsum dolor sit amet consectetur. Tempor ornare pretium ac donec"
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
  );
}
