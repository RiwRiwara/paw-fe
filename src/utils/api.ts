import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

// Base configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

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

            console.debug("API Request:", {
                url: config.url,
                hasToken: !!token,
                tokenLength: token ? token.length : 0,
                tokenPreview: token ? `${token.substring(0, 5)}...` : null,
                isValidJwt: token ? /^eyJ/.test(token) : false, // Basic JWT format check
            });

            if (token) {
                document.cookie = `login=${token}; path=/`;
                config.headers.Authorization = `Bearer ${token}`;
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

// Enum types based on Swagger x-enum-varnames
type Gender = "Female" | "Male";
type AdoptStatus = "Available" | "PendingApplication" | "InReview" | "ApprovedAdoption" | "RejectedAdoption" | "Adopted";
type AccommodationType = "SingleFamilyHomes" | "TownHouse" | "ShopHouses" | "ApartmentAndCondo";
type UserType = "General" | "Foundation" | "Admin";
type Species = "หมา" | "แมว";

// Payload types
interface LoginBody {
    email: string;
    password: string;
}

interface RegisterBody {
    birthday?: string;
    email: string;
    firstname: string;
    lastname?: string;
    password: string;
    phoneNumber?: string;
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
    active: number;
    age: number;
    allergic: string;
    foodAllergy: string;
    gender: Gender;
    imageId: number;
    name: string;
    other?: string;
    petFriendly: number;
    spaceRequired: number;
    specialCareNeed: number;
    sterilization: boolean;
    vaccination: string;
    weight: number;
}

interface AdoptRequestBody {
    petId: number;
}

interface UpdateUserBody {
    accommodateType?: AccommodationType;
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
    phoneNumber?: string;
    bio?: string;
    imageId?: number;
    userType: UserType;
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
    accommodateType?: AccommodationType;
}

interface UserMetadata {
    userId: number;
    firstname: string;
    lastname: string;
    imageUrl?: string;
    userType: UserType;
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
    imageId: number;
    imageUrl: string;
}

export interface Pet {
    petId: number;
    name: string;
    age: string;
    gender: Gender;
    imageUrl: string;
    weight: number;
    allergic: string;
    foodAllergy: string;
    vaccination: string;
    sterilization: boolean;
    status: AdoptStatus;
    foundationName: string;
    foundationAddress: string;
    active: number;
    spaceRequired: number;
    petFriendly: number;
    specialCareNeed: number;
    other?: string;
    species?: Species;
    breed?: string;
}

interface PetMetadata {
    petId: number;
    name: string;
    age: string;
    gender: Gender;
    imageUrl: string;
    rank: number;
    ratingActive: number;
    ratingPetFriendly: number;
    ratingSpaceRequired: number;
    ratingSpecialCareNeed: number;
    totalScore: number;
}

interface AdoptionRequest {
    petId: number;
    userId: number;
    status: AdoptStatus;
    submissionDate: string;
    rejectReason?: string;
    pet?: Pet;
    user?: UserMetadata;
}

interface News {
    newsId: number;
    title: string;
    content: string;
    imageUrl?: string;
    publishDate: string;
}

export interface Campaign {
    campaignId: number;
    campaignName: string;
    description: string;
    goalAmount: number;
    raisedAmount: number;
    startDate: string;
    endDate: string;
    foundationId: number;
    foundationName: string;
    foundationLogo: string;
    campaignImage: string;
}

// API methods
const api = {
    auth: {
        registerGeneral: (body: RegisterBody) => apiClient.post<InfoResponse<User>>("/auth/register/general", body),
        registerFoundation: (body: RegisterFoundationBody) => apiClient.post<InfoResponse<User>>("/auth/register/foundation", body),
        registerAdmin: (body: RegisterAdminBody) => apiClient.post<InfoResponse<User>>("/auth/register/admin", body),
        login: (body: LoginBody) => apiClient.post<InfoResponse<{ userMetadata: UserMetadata; token: string }>>("/auth/login", body),
        logout: () => apiClient.post<InfoResponse<string>>("/auth/logout"),
        forgetPassword: (body: ForgetPasswordBody) => apiClient.post<InfoResponse<string>>("/auth/forget-password", body),
    },
    pet: {
        getCategories: () => apiClient.get<InfoResponse<Category[]>>("/categories"),
        createPet: (body: AddPetBody) => apiClient.post<InfoResponse<UserMetadata[]>>("/pet", body),
        getPetsByCategory: (foundationId?: number, species?: Species) =>
            apiClient.get<InfoResponse<Pet[]>>("/pet/list", { params: { foundationId, species } }),
        getPetProfile: (petId: number) => apiClient.get<InfoResponse<Pet>>(`/pet/${petId}/info`),
        getPetAdoptionRequests: (petId: number) => apiClient.get<InfoResponse<UserMetadata[]>>(`/pet/${petId}/adoption-request`),
        getPetSuggest: () => apiClient.get<InfoResponse<PetMetadata[]>>("/pet/suggest"),
    },
    news: {
        getList: () => apiClient.get<InfoResponse<News[]>>("/news"),
    },
    campaign: {
        getList: () => apiClient.get<InfoResponse<Campaign[]>>("/campaign/list"),
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
        updateInfo: (body: UpdateUserBody) => apiClient.post<InfoResponse<string>>("/user", body),
        getInfo: () => apiClient.get<InfoResponse<UserInfo>>("/user/info"),
        getMetadata: () => apiClient.get<InfoResponse<UserMetadata>>("/user/metadata"),
        requestAdoption: (body: AdoptRequestBody) => apiClient.post<InfoResponse<string>>("/user/adopt", body),
        getAdoptionRequests: () => apiClient.get<InfoResponse<AdoptionRequest[]>>("/user/adoption-request"),
        getFoundationInfo: () => apiClient.get<InfoResponse<FoundationInfo>>("/user/foundation/info"),
        getFoundationPets: () => apiClient.get<InfoResponse<Pet[]>>("/user/foundation/pets"),
    },
};

export default api;