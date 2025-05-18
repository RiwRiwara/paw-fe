import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

// Base configuration
const API_BASE_URL = "http://localhost:8080/api";

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const session = await getSession();
            const token = session?.accessToken;

            // Debug token details
            console.debug("API Request:", {
                url: config.url,
                hasToken: !!token,
                tokenLength: token ? token.length : 0,
                tokenPreview: token ? `${token.substring(0, 5)}...` : null,
                isValidJwt: token ? /^eyJ/.test(token) : false, // Basic JWT format check
            });

            if (token) {
                // The backend expects the token in a cookie named 'login', not in the Authorization header
                // We'll set it both ways to be safe
                
                // Set cookie for this request
                // Note: This will only work for same-origin requests
                document.cookie = `login=${token}; path=/`;
                
                // Also retain the Authorization header as fallback
                config.headers.Authorization = `Bearer ${token}`;
                
                // Set withCredentials to true to ensure cookies are sent with the request
                config.withCredentials = true;
                
                console.debug("Auth cookie and header set for request");
            } else {
                console.warn("No authentication token available for request to:", config.url);
            }
        } catch (error) {
            console.error("Error setting auth token:", error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("401 Unauthorized received for:", error.config.url);
            // Let the component handle 401 errors
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

// Generic response types
interface GenericError {
    code: string;
    error?: any;
    message: string;
}

interface InfoResponse<T> {
    code: number;
    data: T;
    message: string;
    success: boolean;
}

// Payload types
interface LoginBody {
    email: string;
    password: string;
}

interface RegisterBody {
    birthday: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    phoneNumber: string;
}

interface RegisterFoundationBody extends RegisterBody {
    foundationName: string;
    address: string;
    bio?: string;
}

interface RegisterAdminBody extends RegisterBody {
    adminKey: string;
}

interface ForgetPasswordBody {
    newPassword: string;
}

interface AddPetBody {
    age: number;
    aggressiveness: number;
    allergic: string;
    foodAllergy: string;
    gender: "MainPage" | "Female" | "Male";
    imageName: string;
    name: string;
    other?: string;
    playful: number;
    sociable: number;
    sterilization: boolean;
    vaccination: string;
    weight: number;
}

interface AdoptRequestBody {
    petId: number;
}

interface UpdateUserBody {
    accommodateType?: "SingleFamilyHomes" | "TownHouse" | "ShopHouses" | "ApartmentAndCondo";
    bio?: string;
    birthday?: string;
    firstname?: string;
    lastname?: string;
    numOfPets?: number;
    phoneNumber?: string;
    province?: string;
}

// Response data types
interface User {
    userId: number;
    email: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    bio?: string;
    photoUrl?: string;
    userType: "General" | "Foundation" | "Admin";
}

export interface UserInfo {
    userId: number;
    age?: number;
    bio?: string;
    firstname: string;
    lastname: string;
    imageUrl?: string;
    numOfPets?: number;
    occupation?: string;
    phoneNumber?: string;
    province?: string;
    accommodateType?: "SingleFamilyHomes" | "TownHouse" | "ShopHouses" | "ApartmentAndCondo";
}

interface UserMetadata {
    userId: number;
    firstname: string;
    lastname: string;
    imageUrl?: string;
}

interface Category {
    foundationId: number;
    name: string;
}

interface FoundationInfo {
    foundationName: string;
    address: string;
    bio: string;
    imageUrl: string;
}

interface UploadResponse {
    filename: string;
    imageUrl: string;
}

export interface Pet {
    petId: number;
    name: string;
    age: string;
    gender: string;
    imageUrl: string;
    weight: number;
    allergic: string;
    foodAllergy: string;
    vaccination: string;
    sterilization: boolean;
    status: string;
    foundationName: string;
    foundationAddress: string;
    active: number;
    spaceRequired: number;
    petFriendly: number;
    specialCareNeed: number;
    Other?: string | null;
    species?: string;
    breed?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface AdoptionRequest {
    requestId: number;
    petId: number;
    userId: number;
    status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
    createdAt: string;
    updatedAt: string;
    pet?: Pet;
    user?: UserMetadata;
}

interface News {
    newsId: number;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Campaign {
    campaignId: number;
    campaignName: string;
    description: string;
    goalAmount: number;
    currentAmount: number;
    startDate: string;
    endDate: string;
    status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
    foundationId: number;
    foundationName: string;
    foundationLogo: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

// API methods
const api = {
    auth: {
        registerGeneral: (body: RegisterBody) => apiClient.post<InfoResponse<User>>("/auth/register/general", body),
        registerFoundation: (body: RegisterFoundationBody) => apiClient.post<InfoResponse<User>>("/auth/register/foundation", body),
        registerAdmin: (body: RegisterAdminBody) => apiClient.post<InfoResponse<User>>("/auth/register/admin", body),
        login: (body: LoginBody) => apiClient.post<{ accessToken: string; user: User }>("/auth/login", body),
        logout: () => apiClient.post<InfoResponse<string>>("/auth/logout"),
        forgetPassword: (body: ForgetPasswordBody) => apiClient.post<InfoResponse<string>>("/auth/forget-password", body),
    },
    pet: {
        getCategories: () => apiClient.get<InfoResponse<Category[]>>("/categories"),
        createPet: (body: AddPetBody) => apiClient.post<InfoResponse<Pet>>("/pet", body),
        getPetsByCategory: (foundationId?: number, species?: string) =>
            apiClient.get<InfoResponse<Pet[]>>("/pet/list", { params: { foundationId, species } }),
        getPetProfile: (petId: number) => apiClient.get<InfoResponse<Pet>>(`/pet/${petId}/info`),
        getPetAdoptionRequests: (petId: number) => apiClient.get<InfoResponse<AdoptionRequest[]>>(`/pet/${petId}/adoption-request`),
    },
    news: {
        getList: () => apiClient.get<InfoResponse<News[]>>("/news"),
    },
    campaign: {
        getList: () => apiClient.get<InfoResponse<Campaign[]>>("/campaign"),
    },
    upload: {
        image: (file: File) => {
            const formData = new FormData();
            formData.append("file", file);
            return apiClient.post<InfoResponse<UploadResponse>>("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
    },
    user: {
        updateInfo: (body: UpdateUserBody) => apiClient.patch<InfoResponse<User>>("/user", body),
        getInfo: () => apiClient.get<InfoResponse<UserInfo>>("/user/info"),
        getMetadata: () => apiClient.get<InfoResponse<UserMetadata>>("/user/metadata"),
        requestAdoption: (body: AdoptRequestBody) => apiClient.post<InfoResponse<AdoptionRequest>>("/user/adopt", body),
        getAdoptionRequests: () => apiClient.get<InfoResponse<AdoptionRequest[]>>("/user/adoption-request"),
        getFoundationInfo: () => apiClient.get<InfoResponse<FoundationInfo>>("/user/foundation/info"),
        getFoundationPets: () => apiClient.get<InfoResponse<Pet[]>>("/user/foundation/pets"),
    },
};

export default api;