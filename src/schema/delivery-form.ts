import { z } from "zod";

const addressSchema = z.object({
    postalCode: z.string().min(1, "Postal Code is required").toUpperCase(),
    country: z.string().min(1, "Country Code is required").toUpperCase(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required").toUpperCase(),
    street: z.string().min(1, "Street is required"),
    residential: z.boolean().optional(),
});

export const deliveryFormSchema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    address: addressSchema,
    phoneNumber: z.string(),
    moveInDate: z.string().optional(),
});

export type DeliveryFormSchemaType = z.infer<typeof deliveryFormSchema>;
