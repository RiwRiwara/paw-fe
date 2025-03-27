import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1 */}
      <div className="bg-primary-50 flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 relative h-[700px] bg-[url(/img/mountains.jpg)]">
        <Image src="/images/giveapaw2.png" alt="logo" width={280} height={200} />
        <p className="text-xl w-[400px] text-center text-primary-300">Lorem ipsum dolor sit amet consectetur. Urna nunc morbi erat viverra congue convallis. Sed odio commodo tortor elit velit. Vehicula purus fringilla enim faucibus. Suscipit vel dis maecenas et senectus proin cum cras.</p>
        <Link href="/login" className="bg-white  text-orange-400 font-bold py-2 px-4 duration-300 ease-in-out rounded-full shadow-sm mt-4">
          Read More
        </Link>

        {/* Paw */}
        <div className="absolute top-[50px] right-[100px] flex items-center justify-center">
          <Image src="/images/paw.png" alt="paw_1" width={100} height={100} />
        </div>
        <div className="absolute top-[150px] left-[250px] flex items-center justify-center">
          <Image src="/images/paw.png" alt="paw_2" width={150} height={150} />
        </div>
        <div className="absolute top-[300px] left-[600px] flex items-center justify-center">
          <Image src="/images/paw.png" alt="paw_3" width={100} height={100} />
        </div>
        <div className="absolute top-[500px] right-[600px] flex items-center justify-center">
          <Image src="/images/paw.png" alt="paw_4" width={100} height={100} />
        </div>

        {/* Cat and Dog */}
        <div className="absolute bottom-0 left-[100px] flex items-center justify-center">
          <Image src="/images/sec1_cat.png" alt="sect_1_cat" width={520} height={240} />
        </div>
        <div className="absolute bottom-0 right-0 flex items-center justify-center">
          <Image src="/images/sec1_dog.png" alt="sect_1_dog" width={520} height={240} />
        </div>

      </div>

    </div>
  );
}
