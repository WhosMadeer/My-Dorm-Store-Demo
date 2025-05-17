import type { CartDetailsType, ProductsType } from "@/types/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";
import { useCartContext } from "@/context/cartContext";

export function ProductDetails(product: ProductsType) {
    return (
        <div className="flex gap-2 h-fit items-center">
            <img src={product.image} className="object-cover h-16 rounded" />
            <div className="grid gap-1">
                <span className="font-semibold">{product.name}</span>
                <span className="font-light">{product.description}</span>
            </div>
            <span className="ml-auto">${product.cost}</span>
        </div>
    );
}

export function ProductDetailsCard(product: ProductsType) {
    const { cart, setCart } = useCartContext();
    const addProduct = () => {
        const cartDetail: CartDetailsType = { quantity: 1, ...product };
        if (cart.find((item) => item.name === cartDetail.name)) {
            // if it exists, add one to quantity
            setCart(
                cart.map((item) =>
                    item.name === product.name
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, cartDetail]);
        }
    };
    return (
        <Card className="min-w-52">
            <CardContent>
                <img
                    src={product.image}
                    className="object-cover w-48 rounded"
                />
                <div className="grid gap-2 mt-2">
                    <span className="font-semibold">{product.name}</span>
                    <span className="font-light">{product.description}</span>
                </div>
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
                <span>${product.cost}</span>
                <Button
                    variant={"secondary"}
                    size={"icon"}
                    onClick={addProduct}>
                    <CirclePlus />
                </Button>
            </CardFooter>
        </Card>
    );
}
