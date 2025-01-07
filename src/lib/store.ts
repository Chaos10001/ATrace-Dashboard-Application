import { create } from "zustand";

export interface Package {
  name: string;
  weight: number;
  weightUnit: string;
  quantity: number;
  quantityUnit: string;
}

export interface Product {
  id: string;
  title: string;
  status: "Pending" | "Delivered" | "Cancelled";
  description: string;
  recipient: string;
  recipientPhone: string;
  origin: string;
  destination: string;
  eta: number;
  packages: Package[];
}

interface Store {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useStore = create<Store>((set) => ({
  products: [],
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));
