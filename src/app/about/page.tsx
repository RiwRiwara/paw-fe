'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-screen">
      {/* Header */}
      <div className='flex flex-row justify-center mb-8'>
        <img src="/images/giveapet.png" alt="giveapet" width={500} height={50} />
      </div>

      {/* Mission Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-rose-600 mb-4">พันธกิจของเรา</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/2">
            <p className="text-gray-700 mb-4">
              GaPaw เป็นแพลตฟอร์มที่เชื่อมโยงระหว่างมูลนิธิช่วยเหลือสัตว์และผู้ที่ต้องการรับเลี้ยงสัตว์ เราสร้างขึ้นด้วยความตั้งใจที่จะช่วยให้สัตว์จรจัดมีบ้านที่อบอุ่น และช่วยให้ผู้ที่ต้องการรับเลี้ยงสามารถพบกับเพื่อนตัวน้อยที่เหมาะสมกับไลฟ์สไตล์ของพวกเขา
            </p>
            <p className="text-gray-700">
              ทุกๆ วัน มีสัตว์เลี้ยงจำนวนมากที่ถูกทอดทิ้ง และมูลนิธิหลายแห่งกำลังดูแลพวกเขาอย่างเต็มความสามารถ GaPaw มีเป้าหมายในการสร้างระบบนิเวศที่ยั่งยืนในการช่วยเหลือสัตว์เหล่านี้ผ่านการรับเลี้ยงและการสนับสนุนมูลนิธิ
            </p>
          </div>
          <div className="md:w-1/2 rounded-2xl overflow-hidden h-64 relative">
            <img 
              src="/images/foundation/s1.png" 
              alt="Our Mission"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Our Impact Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-rose-600 mb-4">ผลกระทบของเรา</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#FFEBEB] p-4 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-rose-700 mb-2">สัตว์ที่ได้รับการช่วยเหลือ</h3>
            <p className="text-4xl font-bold text-rose-600">5,000+</p>
          </div>
          <div className="bg-[#FFEBEB] p-4 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-rose-700 mb-2">มูลนิธิที่ร่วมงาน</h3>
            <p className="text-4xl font-bold text-rose-600">50+</p>
          </div>
          <div className="bg-[#FFEBEB] p-4 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-rose-700 mb-2">เงินบริจาคที่ระดมได้</h3>
            <p className="text-4xl font-bold text-rose-600">฿2,500,000+</p>
          </div>
        </div>
        <p className="text-gray-700">
          ตั้งแต่ก่อตั้ง GaPaw ในปี 2023 เราได้ช่วยให้สัตว์จรจัดมากกว่า 5,000 ตัวได้พบบ้านใหม่ที่อบอุ่น เราทำงานร่วมกับมูลนิธิกว่า 50 แห่งทั่วประเทศไทย และระดมทุนได้มากกว่า 2.5 ล้านบาทเพื่อสนับสนุนการดูแลสัตว์จรจัด
        </p>
      </div>

      {/* Join Us Section */}
      <div className="bg-[#FFEBEB] rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-rose-600 mb-4">ร่วมเป็นส่วนหนึ่งกับเรา</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/2">
            <p className="text-gray-700 mb-4">
              มีหลายวิธีที่คุณสามารถช่วยเหลือพันธกิจของเราได้ ไม่ว่าจะเป็นการรับเลี้ยงสัตว์ การบริจาค หรือการอาสาสมัครกับมูลนิธิในเครือข่ายของเรา
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link 
                href="/foundation" 
                className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-6 rounded-full font-bold transition-colors"
              >
                ดูมูลนิธิที่ร่วมงาน
              </Link>
              <Link 
                href="/pet" 
                className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-full font-bold transition-colors"
              >
                สัตว์ที่รอการรับเลี้ยง
              </Link>
              <Link 
                href="/campaign" 
                className="bg-rose-400 hover:bg-rose-500 text-white py-2 px-6 rounded-full font-bold transition-colors"
              >
                แคมเปญและข่าวสาร
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 rounded-2xl overflow-hidden h-64 relative">
            <img 
              src="/images/foundation/s4.png" 
              alt="Join Us"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-rose-600 mb-4">ติดต่อเรา</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 mb-4">
              หากคุณมีคำถามหรือข้อเสนอแนะใดๆ สามารถติดต่อเราได้ผ่านช่องทางต่อไปนี้
            </p>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">อีเมล:</span> contact@gapaw.th</p>
              <p><span className="font-semibold">โทรศัพท์:</span> 02-123-4567</p>
              <p><span className="font-semibold">ที่อยู่:</span> 123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</p>
            </div>
            <div className="flex gap-4 mt-4">
              <Link href="https://facebook.com/gapaw" className="text-blue-600 hover:text-blue-800">
                <img src="/images/foundation/facebook.png" alt="Facebook" className="w-8 h-8" />
              </Link>
              <Link href="https://instagram.com/gapaw" className="text-pink-600 hover:text-pink-800">
                <img src="/images/foundation/instagram.png" alt="Instagram" className="w-8 h-8" />
              </Link>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden h-64 relative">
            <img 
              src="/images/foundation/s3.png" 
              alt="Contact Us"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
