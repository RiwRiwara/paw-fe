import Image from "next/image";
import Link from "next/link";

interface FoundationCardProps {
  id?: number; // Add foundation ID for linking
  logo: string;
  name: string;
  description: string;
  phoneNumber: string;
  images: string[];
  socialLinks: {
    facebook?: string;
    instagram?: string;
    website?: string;
  };
  className?: string;
  onClick?: () => void; // Optional click handler
}

const FoundationCard = ({
  id = 1, // Default ID if not provided
  logo,
  name,
  description,
  phoneNumber,
  images,
  socialLinks,
  className = "",
  onClick,
}: FoundationCardProps) => {
  // Handle navigation to foundation detail page
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`overflow-hidden p-6 ${className}`}>

      {/* Foundation Details */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="block">
          <div className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={handleCardClick}>
          <div className="flex flex-col md:flex-row gap-4  ">
            {/* Logo and Foundation Info */}
            <div className="flex items-start gap-4 bg-[#FFF8E9] p-4 rounded-3xl border  border-rose-700">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={logo}
                  alt={`${name} logo`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-rose-700">{name}</h3>
                <p className="text-sm text-rose-700">
                  <span className="font-bold">ที่อยู่ : </span>
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4">

            <h4 className="font-bold text-rose-700 mb-2">เกี่ยวกับมูลนิธิ</h4>
            <p className="text-sm text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus enim vitae purus ultricies varius. Suspendisse dictum vitae quam quis eget. Eros vitae at suspendisse ultrices arcu. Viverra dolor leo amet vel non. Amet nullam dui in elementum mi.
            </p>

            {/* Contact Info */}
            <div className="mt-4">
              <button className="bg-rose-300 text-white px-4 py-1 rounded-full font-medium hover:bg-rose-400 transition-colors">
                ช่องทางการบริจาค
              </button>
              <div className="bg-[#FFE9E9] rounded-3xl px-4 w-fit py-2">

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-rose-700 font-bold">เบอร์โทร :</span>
                  <span className="text-gray-600">{phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-rose-700 font-bold">ติดต่อทาง :</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {socialLinks.facebook && (
                  <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                    <div className="bg-rose-100 p-2 rounded-full flex flex-row gap-2">
                      <Image
                        src="/images/foundation/facebook.png"
                        alt="Facebook"
                        width={20}
                        height={20}
                      />
                      <div className="text-gray-600 text-xs font-semibold">SOI DOG FOUNDATION</div>
                    </div>
                  </Link>
                )}
                {socialLinks.instagram && (
                  <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <div className="bg-rose-100 p-2 rounded-full flex flex-row gap-2">
                      <Image
                        src="/images/foundation/instagram.png"
                        alt="Instagram"
                        width={20}
                        height={20}
                      />
                      <div className="text-gray-600 text-x   font-semibold">SOI DOG FOUNDATION</div>
                    </div>
                  </Link>
                )}
              </div>

            </div>

          </div>

          </div>
        </div>

        {/* Foundation Images */}
        <div className="block">
          <div className="grid grid-cols-2 gap-2 cursor-pointer">
            {images.slice(0, 4).map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
                <Image
                  src={image}
                  alt={`${name} image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundationCard;
