import type { CartDetailsType } from "@/types/types";
import { createContext, useContext, type ReactNode } from "react";

interface ShippingContextProps {
    shippingCost: number;
    setShippingCost: React.Dispatch<React.SetStateAction<number>>;
}

export const ShippingContext = createContext<ShippingContextProps>(
    {} as ShippingContextProps
);

// * ShippingContext hook
export const useShippingContext = () => {
    const cost = useContext(ShippingContext);

    if (cost === undefined) {
        throw new Error(
            "useShippingContext must be used to with a pageContext"
        );
    }

    return cost;
};

interface ShippingContextProviderProps {
    value: ShippingContextProps;
    children: ReactNode;
}

export const ShippingContextProvider = ({
    value,
    children,
}: ShippingContextProviderProps) => {
    return (
        <ShippingContext.Provider value={value}>
            {children}
        </ShippingContext.Provider>
    );
};
