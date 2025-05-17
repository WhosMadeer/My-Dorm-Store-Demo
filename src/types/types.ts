import type { ReactNode } from "react";

export interface ProductsType {
    name: string;
    cost: number; // the number should be a float
    description?: string;
    size?: string;
    image?: string; // filename to product
}

export interface CartDetailsType extends ProductsType {
    quantity: number;
    // totalCost: number;
}

export interface LayoutProps {
    children: ReactNode;
}
