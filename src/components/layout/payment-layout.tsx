import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import DeliveryForm from "../payments/delivery";
import ShippingForm from "../payments/shipping";
import { useFormStore } from "@/core/form";
import PaymentForm from "../payments/payment";

// The payment component is used to change the tabs shown for payment

// type TabNames = "Delivery" | "Shipping" | "Payment";

const tabArray = ["Delivery", "Shipping", "Payment"];
type TabNames = (typeof tabArray)[number];

export default function PaymentLayout() {
    const [currentTab, setCurrentTab] = useState<TabNames>("Shipping");
    const [index, setIndex] = useState(1);

    // const handleCurrentTab = (tab: string) => {
    //     setCurrentTab(tab as TabNames);
    //     setIndex(tabArray.findIndex((value) => value === tab));
    // };

    const nextTab = () => {
        setIndex(index + 1);
        setCurrentTab(tabArray[index + 1]);
    };

    const prevTab = () => {
        setIndex(index - 1);
        setCurrentTab(tabArray[index - 1]);
    };

    /*

        For each tab of the form, it would be disabled until the previous section is done. Once the form is completed, then it will allow customer to check out

    */

    const shipping = useFormStore((state) => state.shipping);
    const payment = useFormStore((state) => state.payment);

    console.log(payment);

    return (
        <div className="grid gap-2">
            <Tabs
                value={currentTab}
                // onValueChange={handleCurrentTab}
                className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value={"Delivery"}>Delivery</TabsTrigger>
                    <TabsTrigger
                        value={"Shipping"}
                        disabled={!shipping.service}>
                        Shipping
                    </TabsTrigger>
                    <TabsTrigger value={"Payment"} disabled={!payment.name}>
                        Payment
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="Delivery">
                    <DeliveryForm nextTab={nextTab} />
                </TabsContent>
                <TabsContent value="Shipping">
                    <ShippingForm prevTab={prevTab} nextTab={nextTab} />
                </TabsContent>
                <TabsContent value="Payment">
                    <PaymentForm prevTab={prevTab} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

/*

<div className={"flex gap-2"}>
                {currentTab !== "Delivery" && (
                    <Button className="flex-auto" onClick={prevTab}>
                        {" "}
                        Previous{" "}
                    </Button>
                )}
                {currentTab !== "Payment" && (
                    <Button className="flex-auto" onClick={nextTab}>
                        {" "}
                        Next{" "}
                    </Button>
                )}
                {currentTab === "Payment" && (
                    <Button className="flex-auto"> Pay now </Button>
                )}
            </div>

*/
