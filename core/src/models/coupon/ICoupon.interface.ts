import {  ICoordinates } from "../establishment/IEstablishment.interface";

export interface ICoupon {
  id: string;
  title: string;
  description: string;
  code: string; 
  expirationDate: string; 
  category: string;
  imageUrl?: string;
  used?: boolean;
  discount: string; 
  businessId: string;
  location: ICoordinates;
  createdAt: string;
}
export interface ICategory {
  id: string;
  name: string; 
  icon?: string;
}
export interface IReview {
  id: string;
  userId: string;
  couponId: string;
  rating: number; 
  comment?: string;
  createdAt: string;
}
