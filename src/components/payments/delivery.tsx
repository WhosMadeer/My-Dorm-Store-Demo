import { useForm } from "react-hook-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

import { useDropdownStore } from "@/lib/store/dropdown";
import {
    deliveryFormSchema,
    type DeliveryFormSchemaType,
} from "@/schema/delivery-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import CountryDropdown from "../dropdown/countries";
import StateDropdown from "../dropdown/states";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFormStore } from "@/core/form";

// delivery form for checkout

interface DeliveryFormProps {
    nextTab: () => void;
}

export default function DeliveryForm({ nextTab }: DeliveryFormProps) {
    const { countryValue, stateValue } = useDropdownStore();

    const delivery = useFormStore((state) => state.delivery);
    const addDelivery = useFormStore((state) => state.addDelivery);

    const form = useForm<DeliveryFormSchemaType>({
        resolver: zodResolver(deliveryFormSchema),
        defaultValues: delivery,
    });

    useEffect(() => {
        form.setValue("address.country", countryValue);
        form.clearErrors("address.country");
    }, [countryValue]);

    useEffect(() => {
        form.setValue("address.state", stateValue);
        form.clearErrors("address.state");
    }, [stateValue]);

    const onSubmit = (data: DeliveryFormSchemaType) => {
        console.log(data);
        addDelivery(data);
        nextTab();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Delivery Details</CardTitle>
                        <CardDescription>
                            Make changes to your account here. Click save when
                            you're done.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-4">
                            <div className="grid gap-2 grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address.street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Residence Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}
                            <FormField
                                control={form.control}
                                name="address.city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid gap-2 2xl:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="address.country"
                                    render={() => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <CountryDropdown />
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="address.state"
                                    render={() => {
                                        return (
                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <StateDropdown />
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="address.postalCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Postal Code</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className={"flex gap-4"}>
                    <Button className="flex-auto"> Next </Button>
                </div>
            </form>
        </Form>
    );
}
