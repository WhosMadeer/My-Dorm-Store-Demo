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

export default function App() {
    const [cart, setCart] = useState<CartDetailsType[]>(cartData);
    const [dorm, setDorm] = useState("");

    return (
        <CartContextProvider value={{ cart, setCart }}>
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
                                Shopping Cart.
                            </h1>
                        </div>
                        <ProductTable />
                        <div className="grid lg:gap-8 grid-cols-2">
                            <div className="flex flex-col gap-4">
                                <DiscountInput />
                                <SelectDorm />
                            </div>
                            <div className="w-3/4 ml-auto">
                                <TotalDetails />
                            </div>
                        </div>

                        <div className="w-full gap-4">
                            <h1 className="md:text-lg font-semibold">
                                Recommended Product For Your Residence
                            </h1>
                            <RecommendedProducts>
                                <ProductDetailsCard {...products[0]} />
                                <ProductDetailsCard {...products[1]} />
                                <ProductDetailsCard {...products[2]} />
                                <ProductDetailsCard {...products[3]} />
                                <ProductDetailsCard {...products[4]} />
                                <ProductDetailsCard {...products[5]} />
                                {/* <ProductDetailsCard {...products[1]} />
                                <ProductDetailsCard {...products[0]} />
                                <ProductDetailsCard {...products[1]} />
                                <ProductDetailsCard {...products[0]} /> */}
                            </RecommendedProducts>
                        </div>
                    </div>
                    <div className="p-4 lg:pl-8 lg:mt-24 w-full">
                        <PaymentLayout />
                    </div>
                </CheckoutLayout>
            </div>
        </CartContextProvider>
    );
}
