import Image from "next/image";
import Link from "next/link";

interface FoundationCardProps {
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
}

const FoundationCard = ({
  logo,
  name,
  description,
  phoneNumber,
  images,
  socialLinks,
  className = "",
}: FoundationCardProps) => {
  return (
    <div className={` overflow-hidden p-6 ${className}`}>

      {/* Foundation Details */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className="bg-white rounded-3xl shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4  p-4">
            {/* Logo and Foundation Info */}
            <div className="flex items-start gap-4">
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

          <h4 className="font-bold text-rose-700 mb-2">เกี่ยวกับมูลนิธิ</h4>
          <p className="text-sm text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus enim vitae purus ultricies varius. Suspendisse dictum vitae quam quis eget. Eros vitae at suspendisse ultrices arcu. Viverra dolor leo amet vel non. Amet nullam dui in elementum mi.
          </p>

          {/* Contact Info */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-rose-700 font-bold">เบอร์โทร :</span>
              <span className="text-gray-600">{phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-rose-700 font-bold">ติดต่อทาง :</span>
              <div className="flex gap-2">
                {socialLinks.facebook && (
                  <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                    <div className="bg-rose-100 p-2 rounded-full">
                      <Image
                        src="/images/foundation/facebook.png"
                        alt="Facebook"
                        width={20}
                        height={20}
                      />
                    </div>
                  </Link>
                )}
                {socialLinks.instagram && (
                  <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <div className="bg-rose-100 p-2 rounded-full">
                      <Image
                        src="/images/foundation/instagram.png"
                        alt="Instagram"
                        width={20}
                        height={20}
                      />
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* Donation Button */}
            <div className="mt-4">
              <button className="bg-rose-300 text-white px-6 py-2 rounded-full font-medium hover:bg-rose-400 transition-colors">
                ช่องทางการบริจาค
              </button>
            </div>
          </div>
        </div>

        {/* Foundation Images */}
        <div className="grid grid-cols-2 gap-2">
          {images.slice(0, 4).map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
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
  );
};

export default FoundationCard;
