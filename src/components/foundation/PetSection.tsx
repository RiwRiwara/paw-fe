import PetCard from './PetCard';

interface Pet {
  id: number;
  name: string;
  type: 'หมา' | 'แมว';
  age: string;
  image: string;
  isAdopted: boolean;
}

interface PetSectionProps {
  title: string;
  showAdopted: boolean;
  pets: Pet[];
}

const PetSection = ({ title, showAdopted, pets }: PetSectionProps) => {
  const filteredPets = pets.filter(pet => pet.isAdopted === showAdopted);

  return (
    <section className="mb-10">
      <div className="bg-[#FFF9F9] rounded-3xl p-6">
        <h2 className="text-xl font-bold text-amber-600 mb-4">{title}</h2>
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-rose-400 text-white rounded-lg px-3 py-1">ทั้งหมด</div>
          <select className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm">
            <option value="">ทั้งหมด</option>
            <option value="dog">หมา</option>
            <option value="cat">แมว</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPets.map(pet => (
            <PetCard key={pet.id} {...pet} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetSection;
