export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  description: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}