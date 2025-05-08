import Image from 'next/image';

interface PetCardProps {
  id: number;
  name: string;
  type: 'สุนัข' | 'แมว';
  age: string;
  image: string;
  isAdopted: boolean;
}

const PetCard = ({ id, name, type, age, image }: PetCardProps) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <Image 
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-amber-600">{name}</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{type}</span>
          <span>{age}</span>
        </div>
        <button className="mt-3 w-full bg-rose-400 hover:bg-rose-500 text-white py-1 rounded-full text-sm transition-colors">
          read more
        </button>
      </div>
    </div>
  );
};

export default PetCard;
