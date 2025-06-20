"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/utils/api";
import { FaHeart, FaRegHeart, FaSearch, FaExclamationTriangle } from "react-icons/fa";
import Image from "next/image";

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

interface PetMetadata {
  petId: number;
  name: string;
  age: string;
  gender: string;
  imageUrl: string;
  rank?: number;
  totalScore?: number;
}

export default function Adopt() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [pets, setPets] = useState<Pet[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [suggestedPets, setSuggestedPets] = useState<PetMetadata[]>([]);
  const [personalityError, setPersonalityError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch suggested pets based on personality questions
  const fetchSuggestedPets = async () => {
    try {
      setPersonalityError(null);
      const suggestResponse = await api.pet.getPetSuggest();

      if (suggestResponse.data.success) {
        setSuggestedPets(suggestResponse.data.data);
      } else {
        if (suggestResponse.data.message === "please complete personality question first") {
          setPersonalityError("please complete personality question first");
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      if (errorMessage.includes("please complete personality question first")) {
        setPersonalityError("please complete personality question first");
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Fetch categories
        const categoriesResponse = await api.pet.getCategories();
        if (categoriesResponse.data.success) {
          setCategories(categoriesResponse.data.data);
        } else {
          console.error("Failed to load categories:", categoriesResponse.data.message);
        }

        const petsResponse = await api.pet.getPetsByCategory();
        if (petsResponse.data.success) {
          const petsWithLikeStatus = petsResponse.data.data.map((pet: Pet) => ({
            ...pet,
            isLiked: false
          }));
          setPets(petsWithLikeStatus);
          setFilteredPets(petsWithLikeStatus);
        } else {
          console.error("Failed to load pets:", petsResponse.data.message);
        }

        await fetchSuggestedPets();
      } catch (error: any) {
        console.error("Error fetching data:", error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
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
      } else if (categoryName === "แมว") {
        petsResponse = await api.pet.getPetsByCategory(undefined, "แมว");
      } else if (categoryName === "มูลนิธิสัตว์พิการ") {
        petsResponse = await api.pet.getPetsByCategory();
      } else {
        petsResponse = await api.pet.getPetsByCategory();
      }

      if (petsResponse.data.success) {
        const petsWithLikeStatus = petsResponse.data.data.map((newPet) => {
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


  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen bg-orange-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
          <p className="ml-4 text-xl text-gray-700">Loading pets...</p>
        </div>
      ) : (
        <div className=" min-h-screen py-10 px-4 sm:px-6 lg:px-8">
          {/* Suggested Pets Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Pets We Think You'll Love!
            </h2>
            {personalityError ? (
              <div className="bg-amber-50 border border-amber-400 text-amber-800 p-4 rounded-lg my-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-2">
                  <FaExclamationTriangle className="text-amber-500" />
                  <h3 className="font-medium">Personality Quiz Required</h3>
                </div>
                <p className="mb-3">
                  To get personalized pet suggestions, please complete our personality quiz.
                </p>
                <Link
                  href="/personality_test"
                  className="inline-block bg-primary-500 text-primary-400 px-4 py-2 rounded-full shadow-md hover:bg-primary-600 transition border border-primary-400 font-semibold hover:text-white hover:bg-orange-400"
                >
                  Take Personality Quiz
                </Link>
              </div>
            ) : suggestedPets.length > 0 ? (
              <div className="flex flex-row flex-wrap gap-8 justify-center">
                {suggestedPets.map(({ petId, name, age, gender, imageUrl }) => (
                  <div
                    key={petId}
                    className="flex flex-col items-center text-center w-full max-w-xs sm:max-w-sm shadow-lg rounded-2xl bg-white transition transform hover:scale-105 pb-4 border-2 border-amber-500"
                  >
                    <div className="w-full h-48 sm:h-56 md:h-64 p-3">
                      <img
                        src={imageUrl || "https://placehold.co/400x300?text=Pet+Image"}
                        alt={name}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full rounded-xl border-2 border-yellow-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Pet+Image";
                        }}
                      />
                    </div>
                    <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs mb-2 font-semibold">
                      Recommended Match
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700">{name}</h3>
                    <div className="flex flex-row gap-2 mt-2 text-sm text-gray-500">
                      <div>{age}</div>
                      <div>{gender}</div>
                    </div>
                    <Link
                      href={`/pet/?petId=${petId}`}
                      className="mt-4 bg-primary-500 text-primary-400 px-4 py-2 rounded-full shadow-md hover:bg-primary-600 transition border border-primary-400 hover:text-white hover:bg-orange-400 font-medium"
                    >
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-400 text-blue-800 p-4 rounded-lg my-6 max-w-2xl mx-auto text-center">
                <h3 className="font-medium">No specific suggestions right now.</h3>
                <p>Complete your personality quiz or check out all available pets below!</p>
                <Link
                  href="/personality_test"
                  className="inline-block mt-3 bg-primary-500 text-primary-400 px-4 py-2 rounded-full shadow-md hover:bg-primary-600 transition border border-primary-400 font-semibold hover:text-white hover:bg-orange-400"
                >
                  Take Personality Quiz
                </Link>
              </div>
            )}
          </div>

          {/* All Pets Section */}
          <div className="container mx-auto">
            <div className="flex flex-row justify-center items-center mb-6">
              <Image src="/images/giveapet.png" alt="giveapet" width={350} height={80} />
            </div>

            {/* Search bar */}
            <div className="flex justify-center items-center w-full max-w-md mx-auto mt-4 mb-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search by name, breed, etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-full border-2 border-yellow-500 focus:outline-none focus:border-orange-400 shadow-sm"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaSearch size={20} />
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(category.name);
                  }}
                  className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-colors duration-200 ease-in-out
                    ${selectedCategory === category.name
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-orange-100 hover:text-orange-600 border border-gray-300"
                    }`}
                >
                  {category.name}
                </a>
              ))}
            </div>

            {/* Filtered Pets Grid */}
            {filteredPets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {filteredPets.map(({ petId, name, age, gender, imageUrl, isLiked }) => (
                  <div
                    key={petId}
                    className="flex flex-col items-center text-center w-full shadow-lg rounded-2xl bg-white transition transform hover:scale-105 pb-6 border-2 border-yellow-600 overflow-hidden"
                  >
                    <div className="w-full h-48 sm:h-56 md:h-64 relative">
                      <img
                        src={imageUrl || "https://placehold.co/400x300?text=No+Image"}
                        alt={name}
                        className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=No+Image";
                        }}
                      />
                      <button
                        onClick={() => toggleLike(petId)}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform z-10"
                      >
                        {isLiked ? (
                          <FaHeart className="text-red-500 text-xl" />
                        ) : (
                          <FaRegHeart className="text-gray-500 text-xl hover:text-red-500" />
                        )}
                      </button>
                    </div>
                    <div className="p-4 flex flex-col items-center flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800 mt-3 mb-1">{name}</h3>
                      <div className="flex flex-row gap-2 text-sm text-gray-500 mb-3">
                        <div>{age}</div>
                        <div>&bull;</div>
                        <div>{gender}</div>
                      </div>
                      <Link
                        href={`/pet/?petId=${petId}`}
                        className="mt-auto bg-primary-500 text-primary-400 px-5 py-2.5 rounded-full shadow-md hover:bg-primary-600 transition border border-primary-400 font-bold hover:text-white hover:bg-orange-500 text-sm"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-xl text-gray-600">No pets found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}