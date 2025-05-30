
import { z } from "zod";

export const DomainInputSchema = z.object({
    name: z.string().min(1, "Name is required"),
    domain: z.string(),
    location: z.string().min(1, "Location is required"),
    category: z.string().min(3, "Category is required"),
    currency: z.string().min(1, "Currency is required"),
    email: z.string().email("Invalid email address")
});

export interface DomainResponseModel {
    status: number
    succcess: boolean
    message: string
    data: DomainDataModel
}

export interface DomainDataModel {
    message: string;
    taken: boolean;
}

export interface ProductApiModel {
    status: number
    succcess: boolean
    message: string
    data: ProductDataModel[]
  }
  
  export interface ProductDataModel {
    _id: string
    name: string
    description: string
    category: Category
    images: Image[]
    video: Video
    status: boolean
    price: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface Category {
    _id: string
    name: string
  }
  
  export interface Image {
    public_id: string
    secure_url: string
    optimizeUrl: string
  }
  
  export interface Video {
    public_id: string
    secure_url: string
  }
  