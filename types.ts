export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: 'Smart Home' | 'Mobile Accessories' | 'Smart Kitchen' | 'Lifestyle';
  image: string;
  rating: number;
  description: string;
  shortDescription?: string;
  features?: string[];
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  isActive: boolean;
  expiry: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  content?: string;
}

export type ViewState = 'HOME' | 'PRODUCT' | 'CART' | 'DASHBOARD';

export interface DashboardStats {
  totalSales: number;
  activeUsers: number;
  couponsUsed: number;
}