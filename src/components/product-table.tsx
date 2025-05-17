import { products } from "@/data/products";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
// import { cart } from "@/data/cart";
import { Button } from "./ui/button";
import { CircleAlert, Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { useCartContext } from "@/context/cartContext";
import type { CartDetailsType } from "@/types/types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ProductDetails, ProductDetailsCard } from "./product-details";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

export function ProductTable() {
    // const cart = useCartStore((state) => state.cart);
    // const removeProduct = useCartStore((state) => state.removeProduct);

    const { cart, setCart } = useCartContext();

    const reduceQuantity = (product: CartDetailsType) => {
        setCart(
            cart.map((item) =>
                item === product
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const increaseQuantity = (product: CartDetailsType) => {
        setCart(
            cart.map((item) =>
                item === product
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleRemove = (product: CartDetailsType) => {
        setCart(cart.filter((item) => item !== product));
    };

    return (
        <Table className="h-fit">
            <TableHeader>
                <TableRow>
                    <TableHead colSpan={2}>Product</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cart.map((product) => {
                    return (
                        <TableRow key={product.name}>
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <img
                                        src={product.image}
                                        className="object-cover h-16 rounded"
                                    />
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <CircleAlert className="w-4 h-4" />
                                            </TooltipTrigger>
                                            <TooltipContent
                                                className="flex flex-col gap-1"
                                                side="right">
                                                <h1 className="text-center w-full font-bold">
                                                    Recommended Instead
                                                </h1>
                                                <ProductDetails {...cart[1]} />
                                                <Button variant={"secondary"}>
                                                    Add to Cart
                                                </Button>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="grid gap-1">
                                    <span className="font-semibold">
                                        {product.name}
                                    </span>
                                    <span className="font-light">
                                        {product.description}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="">
                                    ${product.cost.toFixed(2)}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <Button
                                        variant={"outline"}
                                        size={"icon"}
                                        onClick={() => {
                                            reduceQuantity(product);
                                        }}
                                        disabled={product.quantity === 1}>
                                        <Minus />
                                    </Button>
                                    <span className="w-4 text-center">
                                        {product.quantity}
                                    </span>
                                    <Button
                                        variant={"outline"}
                                        size={"icon"}
                                        onClick={() => {
                                            increaseQuantity(product);
                                        }}>
                                        <Plus />
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="">
                                    $
                                    {(product.cost * product.quantity).toFixed(
                                        2
                                    )}
                                </span>
                            </TableCell>
                            <TableCell>
                                <X
                                    className="w-4 h-4"
                                    onClick={() => {
                                        handleRemove(product);
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
