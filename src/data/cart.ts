import type { CartDetailsType } from "@/types/types";

export const cart: CartDetailsType[] = [
    {
        name: "Basic Bedding Package",
        description: "gray",
        cost: 99.95,
        image: "src/data/product-photos/basic-bedding-package.jpeg",
        quantity: 1,
    },
    {
        name: "Standard Bedding Package",
        description: "blue",
        cost: 149.95,
        image: "src/data/product-photos/full-bedding-package.jpeg",
        quantity: 2,
    },
];
