// import { cart } from "@/data/cart";
import { useCartContext } from "@/context/cartContext";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";

export function TotalDetails() {
    const { cart } = useCartContext();

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const total = cart.reduce((sum, product) => {
            return sum + product.cost * product.quantity;
        }, 0);

        setTotalPrice(total);
    }, [cart]);

    return (
        <div className="grid gap-2">
            <CostDetails title="Subtotal:" value={totalPrice.toFixed(2)} />
            <CostDetails
                title="Shipping"
                value={(totalPrice * 0.13).toFixed(2)}
            />
            <CostDetails
                title="Estimated Tax:"
                value={(totalPrice * 0.13).toFixed(2)}
            />
            <Separator />
            <CostDetails
                title="Total:"
                className="font-bold"
                value={(totalPrice + totalPrice * 0.13).toFixed(2)}
            />
        </div>
    );
}

interface CostDetailsProps {
    title: string;
    value: string;
    className?: string;
}

function CostDetails({ title, value, className = "" }: CostDetailsProps) {
    return (
        <div className="grid gap-2 grid-cols-[1fr_0.3fr]">
            <h1 className={`text-sm ${className}`}>{title}</h1>
            <span className="text-right">${value}</span>
        </div>
    );
}
