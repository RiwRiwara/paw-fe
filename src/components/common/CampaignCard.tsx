import Image from "next/image";

interface CampaignCardProps {
  title: string;
  description: string;
  donationLabel: string;
  donationAmount: string;
  donationGoal: string;
  campaignImage: string;
  rightSideImage: string;
  isNew?: boolean;
  foundationName?: string;
  foundationSubtitle?: string;
  className?: string;
  foundationLogo?: string;
}

const CampaignCard = ({
  title,
  description,
  donationLabel,
  donationAmount,
  donationGoal,
  campaignImage,
  rightSideImage,
  isNew = true,
  foundationName = "Soi Dog Foundation",
  foundationSubtitle = "ระดมทุนเพื่อสุนัขพิการ",
  className = "",
  foundationLogo = "/images/landing/soid.png",
}: CampaignCardProps) => {
  return (
    <div className={`container mx-auto my-8 ${className}`}>

      <div className="relative bg-primary-cream rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">

        {/* Left side */}
        <div className="p-8 relative">
          {/* Bone decoration */}
          <div className="absolute top-4 right-4">
            <Image
              src="/images/landing/bone.png"
              alt="bone decoration"
              width={40}
              height={30}
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-800 mb-4">{title}</h2>

          <div className="text-sm sm:text-base text-yellow-700 mb-6">
            {description}
          </div>

          <h3 className="text-xl font-bold text-yellow-800 mb-2">{donationLabel}</h3>

          <div className="inline-block bg-white py-3 px-6 rounded-full shadow-md mb-6">
            <span className="text-2xl font-bold text-yellow-800">{donationAmount}</span>
            <span className="text-lg text-yellow-600"> / {donationGoal}</span>
          </div>

          {/* Paw decoration */}
          <div className="absolute bottom-24 left-6">
            <Image
              src="/images/landing/paw-small.png"
              alt="paw decoration"
              width={30}
              height={30}
            />
          </div>

          {/* Campaign image */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-yellow-600">
            <Image
              src={campaignImage}
              alt="campaign image"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="relative">
          {/* Main image */}
          <div className="relative w-full h-full">
            <Image
              src={rightSideImage}
              alt="campaign side image"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Foundation logo */}
          <div className="absolute top-4 right-4">
            <Image
              src="/images/landing/soid.png"
              alt="foundation logo"
              width={60}
              height={60}
            />
          </div>

          {/* Foundation name overlay */}
          <div className="absolute bottom-8 left-0 right-0 text-center text-white">
            <h3 className="text-2xl font-bold mb-1">{foundationSubtitle}</h3>
            <p className="text-xl">{foundationName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
