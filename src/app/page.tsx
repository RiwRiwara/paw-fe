import Image from "next/image";
import Link from "next/link";
import CampaignCard from "@/components/common/CampaignCard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1 */}
      <div className="bg-primary-50 flex flex-col items-center justify-center relative h-[900px] bg-[url('/img/mountains.jpg')] bg-cover bg-center">
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
      <div className="bg-white flex flex-col items-center px-4 sm:px-6 lg:px-8 container mx-auto">
        {/* Header */}
        <div className="relative w-3/4 sm:w-2/3 lg:w-1/2 aspect-[4/1]">
          <Image
            src="/images/landing/newstext.png"
            alt="news_text"
            fill
            className="object-contain"
            priority
          />
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

      {/* Section 4: Contact Us */}
      <div className="flex flex-row justify-center">
        <img src="/images/landing/bot.png" alt="news_6" />
      </div>

    </div>
  );
}