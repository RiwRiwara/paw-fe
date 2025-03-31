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

      {/* Section 3:  */}
      <div className=" container mx-auto my-4 ">
        <div className="bg-primary-cream p-4 rounded-md grid grid-cols-3 ">
          <div className="border-2 border-yellow-700 p-4 rounded-xl flex flex-col gap-2 justify-center items-center px-10">
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-700">Campaign</h2>
            <div className="text-sm sm:text-base text-yellow-700">
              Lorem ipsum dolor sit amet consectetur. Pellentesque tristique nunc fermentum nisi le Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque rerum adipisci nulla! Dolore neque qui quia hic, minus debitis natus nesciunt nulla ex provident consequuntur velit unde, aliquid ipsum magni!
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-700">Donation</h3>
            <div className="text-3xl font-bold text-yellow-700">
              4,500 / 6,500
            </div>
          </div>
          <div className="col-span-2">
            <img src="/images/landing/new5.png" className="w-[50%]" alt="news_5" />
          </div>
        </div>
      </div>
    </div>
  );
}
