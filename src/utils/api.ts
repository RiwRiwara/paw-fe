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
        const session = await getSession();
        const token = session?.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
            window.location.href = "/login";
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

interface UserInfo {
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

interface NewsListResponse {
    newsId: number;
    title: string;
    content: string;
}

interface GetPetsResponse {
    petId: number;
    name: string;
    age: string;
    gender: "MainPage" | "Female" | "Male";
    imageUrl: string;
}

interface GetPetResponse {
    petId: number;
    name: string;
    age: string;
    gender: "MainPage" | "Female" | "Male";
    imageUrl: string;
    weight: number;
    allergic: string;
    foodAllergy: string;
    vaccination: string;
    sterilization: boolean;
    status: "Available" | "PendingApplication" | "InReview" | "ApprovedAdoption" | "RejectedAdoption" | "Adopted";
    foundationName: string;
    foundationAddress: string;
    aggressiveness: number;
    playful: number;
    sociable: number;
    other?: string;
}

interface GetUserAdoptReqResponse {
    petId: number;
    name: string;
    age: string;
    gender: "MainPage" | "Female" | "Male";
    imageUrl: string;
    status: "Available" | "PendingApplication" | "InReview" | "ApprovedAdoption" | "RejectedAdoption" | "Adopted";
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

interface CampaignResponse {
    campaignName: string;
    description: string;
    foundationId: number;
    foundationLogo: string;
    foundationName: string;
    goalAmount: number;
    raisedAmount: number;
}

// API methods
const api = {
    auth: {
        register: (body: RegisterBody) => apiClient.post<InfoResponse<User>>("/auth/register", body),
        login: (body: LoginBody) => apiClient.post<InfoResponse<string>>("/auth/login", body),
        logout: () => apiClient.post<InfoResponse<string>>("/auth/logout"),
        forgetPassword: (body: ForgetPasswordBody) => apiClient.post<InfoResponse<string>>("/auth/forget-password", body),
    },
    pet: {
        getCategories: () => apiClient.get<InfoResponse<Category[]>>("/categories"),
        createPet: (body: AddPetBody) => apiClient.post<InfoResponse<UserMetadata[]>>("/pet", body),
        getPetsByCategory: (foundationId?: number, species?: "หมา" | "แมว") =>
            apiClient.get<InfoResponse<GetPetsResponse[]>>("/pet/list", { params: { foundationId, species } }),
        getPetProfile: (petId: number) => apiClient.get<InfoResponse<GetPetResponse>>(`/pet/${petId}/info`),
        getPetAdoptReq: (petId: number) => apiClient.get<InfoResponse<UserMetadata[]>>(`/pet/${petId}/adoption-request`),
    },
    user: {
        getNews: () => apiClient.get<InfoResponse<NewsListResponse[]>>("/news"),
        getCampaign: () => apiClient.get<InfoResponse<CampaignResponse[]>>("/campaign"),
        uploadImage: (file: File) => {
            const formData = new FormData();
            formData.append("file", file);
            return apiClient.post<InfoResponse<UploadResponse>>("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
        updateUserInfo: (body: UpdateUserBody) => apiClient.patch<InfoResponse<string>>("/user", body),
        requestAdopt: (body: AdoptRequestBody) => apiClient.post<InfoResponse<string>>("/user/adopt", body),
        getUserAdoptionRequest: () => apiClient.get<InfoResponse<GetUserAdoptReqResponse[]>>("/user/adoption-request"),
        getFoundationInfo: () => apiClient.get<InfoResponse<FoundationInfo>>("/user/foundation/info"),
        getFoundationPets: () => apiClient.get<InfoResponse<GetPetsResponse[]>>("/user/foundation/pets"),
        getUserInfo: () => apiClient.get<InfoResponse<UserInfo>>("/user/info"),
        getUserMetadata: () => apiClient.get<InfoResponse<UserMetadata>>("/user/metadata"),
    },
};

export default api;