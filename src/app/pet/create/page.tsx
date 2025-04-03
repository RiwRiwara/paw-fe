"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/api";

export default function CreatePet() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male" as "Male" | "Female" | "MainPage",
    weight: "",
    allergic: "",
    foodAllergy: "",
    vaccination: "",
    sterilization: false,
    aggressiveness: "0",
    playful: "0",
    sociable: "0",
    imageName: "",
    other: "",
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      alert("You need to be logged in to create a pet.");
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        weight: parseFloat(formData.weight),
        allergic: formData.allergic || "",
        foodAllergy: formData.foodAllergy || "",
        vaccination: formData.vaccination || "",
        sterilization: formData.sterilization,
        aggressiveness: parseInt(formData.aggressiveness),
        playful: parseInt(formData.playful),
        sociable: parseInt(formData.sociable),
        imageName: formData.imageName || "default.jpg", // Assuming a default if not provided
        other: formData.other || undefined,
      };

      const response = await api.pet.createPet(payload);
      if (response.data.success) {
        alert("Pet created successfully!");
        router.push("/profile"); // Redirect to profile after success
      } else {
        alert(`Failed to create pet: ${response.data.message}`);
      }
    } catch (error: any) {
      alert(`Error creating pet: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create New Pet</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto w-full space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age (years)</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value as "Male" | "Female" | "MainPage" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="MainPage">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Allergies</label>
          <input
            type="text"
            value={formData.allergic}
            onChange={(e) => setFormData({ ...formData, allergic: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Food Allergies</label>
          <input
            type="text"
            value={formData.foodAllergy}
            onChange={(e) => setFormData({ ...formData, foodAllergy: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vaccination</label>
          <input
            type="text"
            value={formData.vaccination}
            onChange={(e) => setFormData({ ...formData, vaccination: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.sterilization}
              onChange={(e) => setFormData({ ...formData, sterilization: e.target.checked })}
              className="rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Sterilized</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Aggressiveness (0-10)</label>
          <input
            type="number"
            min="0"
            max="10"
            value={formData.aggressiveness}
            onChange={(e) => setFormData({ ...formData, aggressiveness: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Playful (0-10)</label>
          <input
            type="number"
            min="0"
            max="10"
            value={formData.playful}
            onChange={(e) => setFormData({ ...formData, playful: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sociable (0-10)</label>
          <input
            type="number"
            min="0"
            max="10"
            value={formData.sociable}
            onChange={(e) => setFormData({ ...formData, sociable: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image Name</label>
          <input
            type="text"
            value={formData.imageName}
            onChange={(e) => setFormData({ ...formData, imageName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Other Notes</label>
          <textarea
            value={formData.other}
            onChange={(e) => setFormData({ ...formData, other: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-400 text-white py-2 rounded-full font-medium hover:bg-orange-500 transition-colors"
        >
          Create Pet
        </button>
      </form>
    </div>
  );
}