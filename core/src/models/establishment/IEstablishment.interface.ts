import { ICoupon } from "../coupon/ICoupon.interface";

export interface IBusiness {
  id: string;
  name: string;
  description: string;
  cnpj?: string;
  phone: string;
  email: string;
  address: IAddress;
  imageUrl?: string;
  category: string;
  coupons?: ICoupon[];
  createdAt: string;
}
export interface IAddress {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  postalCode: string;
  complement?: string;
}
export interface ICoordinates {
  latitude: number;
  longitude: number;
}
