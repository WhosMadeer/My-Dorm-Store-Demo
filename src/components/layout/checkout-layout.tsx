import type { LayoutProps } from "@/types/types";

// The Checkout component is used to change the grid layout when it is mobile

export default function CheckoutLayout({ children }: LayoutProps) {
    return (
        <div className="grid px-32 md:grid-cols-[65%_35%] h-full w-full">
            {children}
        </div>
    );
}
