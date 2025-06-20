interface Pet {
  id: number;
  name: string;
  type: 'หมา' | 'แมว';
  age: string;
  image: string;
  isAdopted: boolean;
}

interface PetOverviewProps {
  pets: Pet[];
  onAddPet: () => void;
}

const PetOverview = ({ pets, onAddPet }: PetOverviewProps) => {
  const petsInFoundation = pets.filter(pet => !pet.isAdopted);
  const adoptedPets = pets.filter(pet => pet.isAdopted);

  const dogsInFoundation = petsInFoundation.filter(pet => pet.type === 'หมา').length;
  const catsInFoundation = petsInFoundation.filter(pet => pet.type === 'แมว').length;
  
  const adoptedDogs = adoptedPets.filter(pet => pet.type === 'หมา').length;
  const adoptedCats = adoptedPets.filter(pet => pet.type === 'แมว').length;

  return (
    <section className="mb-10">
      <div className="bg-[#FFF9F9] rounded-3xl p-6 border border-rose-200">
        <h2 className="text-xl font-bold text-rose-700 mb-4">ภาพรวมสัตว์ในมูลนิธิ</h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-xl p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-[#A96420] text-lg font-medium bg-[#FFE4CA] px-2 py-1 text-center rounded-full">สัตว์ที่อยู่ในมูลนิธิ</h3>
                <div className="flex gap-5 mt-2">
                  <div className="flex flex-col gap-2 bg-[#FFF6E3] px-4 py-2 rounded-xl ">
                    <p className="text-amber-600 font-bold text-xl">หมา</p>
                    <p className="text-amber-600 font-bold text-xl">{dogsInFoundation} รายการ</p>
                  </div>
                  <div className="flex flex-col gap-2 bg-[#FFF6E3] px-4 py-2 rounded-xl ">
                    <p className="text-amber-600 font-bold text-xl">แมว</p>
                    <p className="text-amber-600 font-bold text-xl">{catsInFoundation} รายการ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-rose-600 font-medium bg-[#FFD2D6] px-2 py-1 text-center rounded-full">สัตว์ที่ถูกรับเลี้ยงแล้ว</h3>
                <div className="flex gap-5 mt-2">
                  <div className="flex flex-col gap-2 bg-[#FFD2D6] px-4 py-2 rounded-xl ">
                    <p className="text-[#A53E55] font-bold text-xl">หมา</p>
                    <p className="text-[#A53E55] font-bold text-xl">{adoptedDogs} รายการ</p>
                  </div>
                  <div className="flex flex-col gap-2 bg-[#FFD2D6] px-4 py-2 rounded-xl ">
                    <p className="text-[#A53E55] font-bold text-xl">แมว</p>
                    <p className="text-[#A53E55] font-bold text-xl">{adoptedCats} รายการ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button 
            onClick={onAddPet}
            className="flex items-center gap-2 bg-rose-400 hover:bg-rose-500 text-white px-5 py-2 rounded-full transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>เพิ่มข้อมูลสัตว์</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PetOverview;
