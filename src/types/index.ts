export type CategoryId = 'seaweed' | 'salads' | 'seafood';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  image: string;
  categoryId: CategoryId;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
