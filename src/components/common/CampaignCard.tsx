import Image from "next/image";

interface CampaignCardProps {
  title: string;
  description: string;
  donationLabel: string;
  donationAmount: string;
  donationGoal: string;
  campaignImage: string;
  rightSideImage: string;
  className?: string;
}

const CampaignCard = ({
  title,
  description,
  donationLabel,
  donationAmount,
  donationGoal,
  campaignImage,
  rightSideImage,
  className = "",
}: CampaignCardProps) => {
  return (
    <div className={`container mx-auto my-4 ${className}`}>
      <div className="bg-primary-cream p-4 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border-2 border-yellow-700 p-4 rounded-xl flex flex-col gap-3 justify-center items-center px-6 md:px-10">
          <h2 className="text-xl sm:text-2xl font-bold text-yellow-700">{title}</h2>
          <div className="text-sm sm:text-base text-yellow-700">
            {description}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-yellow-700">{donationLabel}</h3>
          <div className="text-2xl sm:text-3xl font-bold text-yellow-700">
            {donationAmount} / {donationGoal}
          </div>
          <div className="relative w-1/2 aspect-square">
            <Image 
              src={campaignImage} 
              alt="campaign image" 
              fill 
              className="object-contain"
            />
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 flex items-center justify-center">
          <div className="relative w-full md:w-3/4 aspect-square">
            <Image 
              src={rightSideImage} 
              alt="campaign side image" 
              fill 
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
