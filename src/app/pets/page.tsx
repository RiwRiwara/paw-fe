"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";

const PetsPage: React.FC = () => {
    const [pets, setPets] = useState<any[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await api.pet.getPets();
                if (response.data.success) {
                    setPets(response.data.data);
                } else {
                    setError(response.data.message || "Failed to fetch pets");
                }
            } catch (err: any) {
                setError(err.response?.data?.message || "An error occurred");
            }
        };

        fetchPets();
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Pets Available for Adoption</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pets.map((pet) => (
                    <div key={pet.petId} className="border p-4 rounded-lg">
                        <img src={pet.imageUrl} alt={pet.name} className="w-full h-48 object-cover rounded-md mb-2" />
                        <h2 className="text-xl font-semibold">{pet.name}</h2>
                        <p>Age: {pet.age}</p>
                        <p>Gender: {pet.gender}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetsPage;