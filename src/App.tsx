import { useState } from "react";
import CheckoutLayout from "./components/layout/checkout-layout";
import { Button } from "./components/ui/button";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import { products } from "./data/products";
import { ProductDetailsCard } from "./components/product-details";
import { ProductTable } from "./components/product-table";
import PaymentLayout from "./components/layout/payment-layout";
import { cart as cartData } from "./data/cart";
import { TotalDetails } from "./components/total-details";
import { CartContextProvider } from "./context/cartContext";
import type { CartDetailsType } from "./types/types";
import { RecommendedProducts } from "./components/recommended-products";
import { DiscountInput } from "./components/discount-input";
import { SelectDorm } from "./components/select-dorm";
import NavBar from "./components/layout/navbar";
import { dormSelectList } from "./data/residence";
import { ShippingContextProvider } from "./context/shippingContext";

export default function App() {
    const [cart, setCart] = useState<CartDetailsType[]>(cartData);
    const [dorm, setDorm] = useState("");
    const [shippingCost, setShippingCost] = useState(0);

    return (
        <CartContextProvider value={{ cart, setCart }}>
            <ShippingContextProvider value={{ shippingCost, setShippingCost }}>
                <div className="w-dvw h-dvh overflow-y-scroll">
                    <NavBar />
                    <CheckoutLayout>
                        <div className="p-4 lg:mt-12 lg:pr-8 flex flex-col gap-16">
                            <div className="w-fit flex gap-4 items-center">
                                <Button variant={"outline"} size={"icon"}>
                                    <ChevronLeft />
                                </Button>
                                <ShoppingCart />{" "}
                                <h1 className="text-4xl font-bold">
                                    Shopping Cart
                                </h1>
                            </div>
                            <ProductTable dorm={dorm} />
                            <div className="grid gap-8 lg:gap-8 md:grid-cols-2">
                                <div className="flex flex-col gap-4">
                                    <DiscountInput />
                                    <SelectDorm dorm={dorm} setDorm={setDorm} />
                                </div>
                                <div className="md:w-3/4 md:ml-auto">
                                    <TotalDetails />
                                </div>
                            </div>

                            <div className="w-full gap-4">
                                <h1 className="md:text-lg font-semibold">
                                    Recommended Product For{" "}
                                    {dormSelectList.find(
                                        (select) => select.key === dorm
                                    )?.label ?? "Your Residence"}
                                </h1>
                                <RecommendedProducts>
                                    {products
                                        .filter((product) => {
                                            if (dorm === "") {
                                                return true;
                                            }
                                            return (
                                                product.dorm === undefined ||
                                                product.dorm.find(
                                                    (value) => value === dorm
                                                )
                                            );
                                        })
                                        .map((product) => (
                                            <ProductDetailsCard
                                                {...product}
                                                key={product.name}
                                            />
                                        ))}
                                </RecommendedProducts>
                            </div>
                        </div>
                        <div className="p-4 lg:pl-8 lg:mt-24 w-full">
                            <PaymentLayout />
                        </div>
                    </CheckoutLayout>
                </div>
            </ShippingContextProvider>
        </CartContextProvider>
    );
}
