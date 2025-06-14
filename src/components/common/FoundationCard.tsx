"use client";
import Image from "next/image";
import Link from "next/link";

interface FoundationCardProps {
  id?: number;
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
  onClick?: () => void;
  isRight?: boolean; // New prop to control image placement
}

const FoundationCard = ({
  id = 1,
  logo,
  name,
  description,
  phoneNumber,
  images,
  socialLinks,
  className = "",
  onClick,
  isRight = true, // Default to true (images on right)
}: FoundationCardProps) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`overflow-hidden p-6 bg-gray-50 rounded-2xl ${className}`} key={id}>
      {/* Foundation Details and Images */}
      <div
        className={`mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 ${isRight ? "md:grid-flow-dense" : ""
          }`}
      >
        {/* Foundation Info */}
        <div className={`block ${isRight ? "" : "md:order-last"}`}>
          <div
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-rose-100"
            onClick={handleCardClick}
          >
            <div className="flex flex-col gap-4 p-6">
              {/* Logo and Foundation Info */}
              <div className="flex items-center gap-4 bg-[#FFF8E9] p-4 rounded-xl border border-rose-200">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={logo}
                    alt={`${name} logo`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rose-800">{name}</h3>
                  <p className="text-sm text-rose-600">
                    <span className="font-semibold">ที่อยู่: </span>
                    {description}
                  </p>
                </div>
              </div>

              {/* About Section */}
              <div>
                <h4 className="font-semibold text-rose-800 mb-2 text-lg">
                  เกี่ยวกับมูลนิธิ
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  cursus enim vitae purus ultricies varius. Suspendisse dictum
                  vitae quam quis eget. Eros vitae at suspendisse ultrices arcu.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <button className="bg-rose-500 text-white px-5 py-2 rounded-full font-medium hover:bg-rose-600 transition-colors w-full md:w-auto">
                  ช่องทางการบริจาค
                </button>
                <div className="bg-[#FFE9E9] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-rose-700 font-semibold">
                      เบอร์โทร:
                    </span>
                    <span className="text-gray-600">{phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-rose-700 font-semibold">
                      ติดต่อทาง:
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {socialLinks.facebook && (
                    <Link
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-rose-100 p-2 rounded-full flex items-center gap-2 hover:bg-rose-200 transition-colors">
                        <Image
                          src="/images/foundation/facebook.png"
                          alt="Facebook"
                          width={20}
                          height={20}
                        />
                        <span className="text-gray-600 text-sm font-medium">
                          SOI DOG FOUNDATION
                        </span>
                      </div>
                    </Link>
                  )}
                  {socialLinks.instagram && (
                    <Link
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-rose-100 p-2 rounded-full flex items-center gap-2 hover:bg-rose-200 transition-colors">
                        <Image
                          src="/images/foundation/instagram.png"
                          alt="Instagram"
                          width={20}
                          height={20}
                        />
                        <span className="text-gray-600 text-sm font-medium">
                          SOI DOG FOUNDATION
                        </span>
                      </div>
                    </Link>
                  )}
                  {socialLinks.website && (
                    <Link
                      href={socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-rose-100 p-2 rounded-full flex items-center gap-2 hover:bg-rose-200 transition-colors">
                        <Image
                          src="/images/foundation/website.png"
                          alt="Website"
                          width={20}
                          height={20}
                        />
                        <span className="text-gray-600 text-sm font-medium">
                          WEBSITE
                        </span>
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
          <div className="grid grid-cols-2 gap-3">
            {images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
              >
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