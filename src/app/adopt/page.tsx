"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import api from "@/utils/api";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";

interface Category {
  name: string;
  foundationId: number | null;
}

interface Pet {
  petId: number;
  name: string;
  age: string;
  gender: string;
  imageUrl: string;
  isLiked?: boolean;
}

export default function Adopt() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [pets, setPets] = useState<Pet[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const categoriesResponse = await api.pet.getCategories();
        if (categoriesResponse.data.success) {
          setCategories(categoriesResponse.data.data);
          setFilteredCategories(categoriesResponse.data.data);
        } else {
          console.error("Failed to load categories:", categoriesResponse.data.message);
        }

        // Fetch all pets initially using getPetsByCategory without filters
        const petsResponse = await api.pet.getPetsByCategory();
        if (petsResponse.data.success) {
          // Add isLiked property to each pet
          const petsWithLikeStatus = petsResponse.data.data.map((pet: Pet) => ({
            ...pet,
            isLiked: false
          }));
          setPets(petsWithLikeStatus);
          setFilteredPets(petsWithLikeStatus);
        } else {
          console.error("Failed to load pets:", petsResponse.data.message);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error.response?.data?.message || error.message);
      }
    }

    fetchData();
  }, []);

  const handleCategoryClick = async (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSearchQuery(""); // Reset search query when changing category

    try {
      let petsResponse;
      if (categoryName === "หมา") {
        petsResponse = await api.pet.getPetsByCategory(undefined, "หมา");
        setFilteredCategories(categories.filter((cat) => cat.name === "หมา"));
      } else if (categoryName === "แมว") {
        petsResponse = await api.pet.getPetsByCategory(undefined, "แมว");
        setFilteredCategories(categories.filter((cat) => cat.name === "แมว"));
      } else if (categoryName === "มูลนิธิสัตว์พิการ") {
        setFilteredCategories(categories.filter((cat) => cat.name === "มูลนิธิสัตว์พิการ"));
        petsResponse = await api.pet.getPetsByCategory(); // Using default fetch for foundation
      } else {
        setFilteredCategories(categories);
        petsResponse = await api.pet.getPetsByCategory();
      }

      if (petsResponse.data.success) {
        // Preserve like status when switching categories
        const petsWithLikeStatus = petsResponse.data.data.map((newPet: Pet) => {
          const existingPet = pets.find(p => p.petId === newPet.petId);
          return {
            ...newPet,
            isLiked: existingPet ? existingPet.isLiked : false
          };
        });
        setPets(petsWithLikeStatus);
        setFilteredPets(petsWithLikeStatus);
      } else {
        console.error("Failed to load filtered pets:", petsResponse.data.message);
      }
    } catch (error: any) {
      console.error("Error filtering pets:", error.response?.data?.message || error.message);
    }
  };

  // Handle liking/unliking a pet
  const toggleLike = (petId: number) => {
    const updatedPets = pets.map(pet => 
      pet.petId === petId ? { ...pet, isLiked: !pet.isLiked } : pet
    );
    setPets(updatedPets);
    setFilteredPets(updatedPets.filter(pet => 
      pet.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  };

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPets(pets);
    } else {
      const filtered = pets.filter(pet => 
        pet.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPets(filtered);
    }
  }, [searchQuery, pets]);

  const last_pets = pets.slice(0, 3);

  return (
    <div className="flex flex-col">
      <div className="bg-primary-50 flex flex-col items-center justify-center py-10 px-4 sm:px-6  lg:px-8 relative h-[750px] bg-[url(/images/head.png)]">
      </div>

      <div className="flex flex-col gap-4 container mx-auto">
        <div className="flex flex-row justify-center items-center">
          <Image src="/images/adopt/adoptext.png" alt="adopt" width={450} height={100} />
        </div>

        <div className="flex flex-row flex-wrap gap-8 justify-center my-6">
          {last_pets.map(({ petId, name, age, gender, imageUrl }) => (
            <div
              key={petId}
              className="flex flex-col items-center text-center w-full max-w-sm shadow-lg rounded-2xl bg-white transition transform hover:scale-105 pb-4"
            >
              <div className="flex items-center justify-center overflow-hidden rounded-lg m-4">
                <Image
                  src={imageUrl || "https://dummyimage.com/168x100.png/dddddd/000000"}
                  alt={name}
                  width={400}
                  height={250}
                  className="object-cover rounded-full border-2 border-yellow-700"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mt-3">{name}</h3>
              <div className="flex flex-row gap-2 mt-4">
                <div className="text-gray-500">{age}</div>
                <div className="text-gray-500">{gender}</div>
              </div>
              <a
                href={`/pet/?petId=${petId}`}
                className="mt-4 bg-primary-500 text-primary-400 px-4 py-2 rounded-full shadow-md hover:bg-primary-600 transition border border-primary-400"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 container mx-auto">
        <div className="flex flex-row justify-center items-center">
          <Image src="/images/giveapet.png" alt="giveapet" width={450} height={100} />
        </div>
        
        {/* Search bar */}
        <div className="flex justify-center items-center w-full max-w-md mx-auto mt-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="ค้นหา..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full border-2 border-yellow-500 focus:outline-none focus:border-orange-400"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-4">
          {categories.map((category) => (
            <a
              key={category.name}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(category.name);
              }}
              className={`text-gray-400 font-medium ${selectedCategory === category.name ? "text-orange-400" : ""}`}
            >
              {category.name}
            </a>
          ))}
        </div>
        <div className="flex flex-row flex-wrap gap-8 justify-center my-6">
          {filteredPets.map(({ petId, name, age, gender, imageUrl, isLiked }) => (
            <div
              key={petId}
              className="flex flex-col items-center text-center w-full max-w-sm border-2 border-yellow-700 shadow-lg rounded-3xl bg-white transition transform hover:scale-105 pb-4"
            >
              <div className="flex items-center justify-center overflow-hidden rounded-lg relative">
                <Image
                  src={imageUrl || "https://dummyimage.com/168x100.png/dddddd/000000"}
                  alt={name}
                  width={400}
                  height={300}
                  className="object-cover"
                />
                <button 
                  onClick={() => toggleLike(petId)} 
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  {isLiked ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-400 text-xl hover:text-red-500" />
                  )}
                </button>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mt-3">{name}</h3>
              <div className="flex flex-row gap-2 mt-4">
                <div className="text-gray-500">{age}</div>
                <div className="text-gray-500">{gender}</div>
              </div>
              <a
                href={`/pet/?petId=${petId}`}
                className="mt-4 bg-primary-500 text-primary-400 px-4 py-2 rounded-full shadow-md hover:bg-primary-600 transition border border-primary-400 font-bold hover:text-white hover:bg-orange-400"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}