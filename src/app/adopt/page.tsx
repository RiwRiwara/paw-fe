"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Define the type for Category
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
}

export default function Adopt() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    // Fetch categories data from the API
    async function fetchCategories() {
      try {
        const response = await fetch("http://localhost:8080/api/categories");
        const data = await response.json();

        if (data.success) {
          setCategories(data.data); // Assuming the response has a 'data' property
          setFilteredCategories(data.data); // Initially set all categories
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    // Fetch pets data from the API
    async function fetchPets() {
      try {
        const response = await fetch("http://localhost:8080/api/pet/list");
        const data = await response.json();

        if (data.success) {
          setPets(data.data); // Assuming the response has a 'data' property
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    }

    fetchCategories();
    fetchPets();
  }, []);

  // Handle filtering based on category name
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value;
    setSelectedCategory(filterValue);

    if (filterValue === "หมา") {
      setFilteredCategories(categories.filter((cat) => cat.name === "หมา"));
    } else if (filterValue === "แมว") {
      setFilteredCategories(categories.filter((cat) => cat.name === "แมว"));
    } else if (filterValue === "มูลนิธิสัตว์พิการ") {
      setFilteredCategories(categories.filter((cat) => cat.name === "มูลนิธิสัตว์พิการ"));
    } else {
      setFilteredCategories(categories); // Reset filter to show all
    }
  };

  return (
    <div className="flex flex-col">
      {/* Section 1 */}
      <div className="bg-primary-50 flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 relative h-[750px] bg-[url(/images/head.png)]">
      </div>

      {/* Section 2 */}
      <div className="flex flex-col gap-4 container mx-auto">
        <div className="flex flex-row justify-center items-center">
          <Image src="/images/giveapet.png" alt="giveapet" width={450} height={100} />
        </div>
        <div className="flex flex-row justify-center gap-4">
          {
            categories.map((category) => (
              <a 
                key={category.name} 
                href="#" 
                className={`text-gray-400 font-medium ${selectedCategory === category.name ? "text-orange-400" : ""}`}
              >
                {category.name}
              </a>
            ))
          }
        </div>
        <div className="flex flex-row flex-wrap gap-8 justify-center my-6 ">
          {pets.map(({ petId, name, age, gender, imageUrl }) => (
            <div
              key={petId}
              className="flex flex-col items-center text-center w-full max-w-sm border border-primary-400 shadow-lg rounded-xl bg-white transition transform hover:scale-105 pb-4"
            >
              <div className=" flex items-center justify-center overflow-hidden rounded-lg">
                <Image src={"https://dummyimage.com/168x100.png/dddddd/000000"} alt={name} width={400} height={300} className="object-cover" />
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
    </div>
  );
}
