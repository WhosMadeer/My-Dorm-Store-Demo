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
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function ProductTable({ dorm }: { dorm: string }) {
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

    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="h-fit overflow-scroll grid gap-8 px-2 py-4">
                {cart.map((product, index) => {
                    return (
                        <div
                            className="grid gap-2 shadow p-2"
                            key={product.name}>
                            <ProductDetails {...product} />

                            <div className="flex justify-between items-center w-full">
                                {product.name === "Basic Bedding Package" &&
                                    dorm !== "parkside" &&
                                    dorm !== "" && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <CircleAlert className="w-4 h-4 text-orange-500" />
                                                </TooltipTrigger>
                                                <TooltipContent
                                                    className="flex flex-col gap-1 max-w-xs"
                                                    side="right">
                                                    <h1 className="text-center w-full font-bold">
                                                        Recommended Instead
                                                    </h1>
                                                    <ProductDetails
                                                        {...products[1]}
                                                    />
                                                    <Button
                                                        variant={"secondary"}
                                                        onClick={() => {
                                                            const newCart = [
                                                                ...cart,
                                                            ];
                                                            newCart[index] = {
                                                                ...products[1],
                                                                quantity:
                                                                    product.quantity,
                                                            };
                                                            setCart(newCart);
                                                        }}>
                                                        Add to Cart
                                                    </Button>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                {product.name === "Organization Essentials" &&
                                    dorm === "chestnut" && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <CircleAlert className="w-4 h-4 text-orange-500" />
                                                </TooltipTrigger>
                                                <TooltipContent
                                                    className="flex flex-col gap-1 max-w-xs"
                                                    side="right">
                                                    <h1 className="text-center w-full font-bold">
                                                        Recommended Instead
                                                    </h1>
                                                    <ProductDetails
                                                        {...products[1]}
                                                    />
                                                    <Button
                                                        variant={"secondary"}
                                                        onClick={() => {
                                                            const newCart = [
                                                                ...cart,
                                                            ];
                                                            newCart[index] = {
                                                                ...products[1],
                                                                quantity:
                                                                    product.quantity,
                                                            };
                                                            setCart(newCart);
                                                        }}>
                                                        Add to Cart
                                                    </Button>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                <div
                                    className={cn(
                                        "flex gap-2 items-center justify-center mx-auto",
                                        (product.name ===
                                            "Basic Bedding Package" &&
                                            dorm !== "parkside") ||
                                            (product.name ===
                                                "Organization Essentials" &&
                                                dorm === "chestnut")
                                            ? "-left-2.5 relative"
                                            : ""
                                    )}>
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
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
    return (
        <Table className="h-fit overflow-scroll">
            <TableHeader>
                <TableRow>
                    <TableHead colSpan={2} className="">
                        Product
                    </TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cart.map((product, index) => {
                    return (
                        <TableRow key={product.name}>
                            <TableCell>
                                <div className="flex gap-2 items-center w-24">
                                    <img
                                        src={product.image}
                                        className="h-16 w-16 rounded object-fill"
                                    />
                                    {product.name === "Basic Bedding Package" &&
                                        dorm !== "parkside" &&
                                        dorm !== "" && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <CircleAlert className="w-4 h-4 text-orange-500" />
                                                    </TooltipTrigger>
                                                    <TooltipContent
                                                        className="flex flex-col gap-1"
                                                        side="right">
                                                        <h1 className="text-center w-full font-bold">
                                                            Recommended Instead
                                                        </h1>
                                                        <ProductDetails
                                                            {...products[1]}
                                                        />
                                                        <Button
                                                            variant={
                                                                "secondary"
                                                            }
                                                            onClick={() => {
                                                                const newCart =
                                                                    [...cart];

                                                                newCart[index] =
                                                                    {
                                                                        ...products[1],
                                                                        quantity:
                                                                            product.quantity,
                                                                    };

                                                                setCart(
                                                                    newCart
                                                                );
                                                            }}>
                                                            Add to Cart
                                                        </Button>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    {product.name ===
                                        "Organization Essentials" &&
                                        dorm === "chestnut" && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <CircleAlert className="w-4 h-4 text-orange-500" />
                                                    </TooltipTrigger>
                                                    <TooltipContent
                                                        className="flex flex-col gap-1"
                                                        side="right">
                                                        <h1 className="text-center w-full font-bold">
                                                            Recommended Instead
                                                        </h1>
                                                        <ProductDetails
                                                            {...products[9]}
                                                        />
                                                        <Button
                                                            variant={
                                                                "secondary"
                                                            }
                                                            onClick={() => {
                                                                const newCart =
                                                                    [...cart];

                                                                newCart[index] =
                                                                    {
                                                                        ...products[9],
                                                                        quantity:
                                                                            product.quantity,
                                                                    };

                                                                setCart(
                                                                    newCart
                                                                );
                                                            }}>
                                                            Add to Cart
                                                        </Button>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
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
                            <TableCell className="grid w-full h-full place-items-center">
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
