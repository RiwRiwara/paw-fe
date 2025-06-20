export interface GenericError {
    code: string;
    error?: any;
    message: string;
}

export interface InfoResponse<T> {
    code: number;
    data: T;
    message: string;
    success: boolean;
}

export type Gender = "Female" | "Male";
export type AdoptStatus = "Available" | "PendingApplication" | "InReview" | "ApprovedAdoption" | "RejectedAdoption" | "Adopted";
export type AccommodationType = "SingleFamilyHomes" | "TownHouse" | "ShopHouses" | "ApartmentAndCondo";
export type UserType = "General" | "Foundation" | "Admin";
export type Species = "หมา" | "แมว";

export interface LoginBody {
    email: string;
    password: string;
}

export interface RegisterBody {
    birthday?: string;
    email: string;
    firstname: string;
    lastname?: string;
    password: string;
    phoneNumber?: string;
}

export interface RegisterFoundationBody extends RegisterBody {
    foundationName: string;
    address: string;
    bio?: string;
}

export interface RegisterAdminBody extends RegisterBody {
    adminKey: string;
}

export interface ForgetPasswordBody {
    newPassword: string;
}

export interface AddPetBody {
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
    breed?: string; // Added from swagger
    species?: Species; // Added from swagger
}

export interface AdoptRequestBody {
    petId: number;
}

export interface UpdateUserBody {
    accommodateType?: AccommodationType;
    bio?: string;
    birthday?: string;
    firstname?: string;
    lastname?: string;
    numOfPets?: number;
    phoneNumber?: string;
    province?: string;
    imageId?: number; // Added from swagger
    occupation?: string; // Added from swagger
}

export interface User {
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
    birthday?: string;
    accommodateType?: AccommodationType;
}

export interface UserMetadata {
    userId: number;
    firstname: string;
    lastname: string;
    imageUrl?: string;
    userType: UserType;
}

export interface Category {
    id: number; // Renamed from foundationId
    name: string;
}

export interface FoundationInfo {
    foundationId: number;
    foundationName: string;
    address: string;
    bio: string | null;
    logo: string | null; // Was imageUrl, updated to match API field name
    imageList: string[] | null;
    facebook: string | null;
    instagram: string | null;
    donateChannel: {
        bankName: string | null;
        bankAccount: string | null;
        accountName: string | null;
    } | null;
}

export interface UploadResponse {
    filename: string;
    imageId?: number; // original field name
    id?: number; // new field name from backend
    imageUrl?: string;
    url?: string;
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

export interface PetMetadata {
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

export interface AdoptionRequest {
    petId: number;
    userId: number;
    status: AdoptStatus;
    submissionDate: string;
    rejectReason?: string;
    pet?: Pet;
    user?: UserMetadata;
}

export interface News {
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
