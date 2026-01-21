import { z } from 'zod';

export const personalDetailsSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

export const grievanceDetailsSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    category: z.enum(["service", "product", "support", "other"]),
});

export const formSchema = personalDetailsSchema.merge(grievanceDetailsSchema);

export type PersonalDetails = z.infer<typeof personalDetailsSchema>;
export type GrievanceDetails = z.infer<typeof grievanceDetailsSchema>;
export type FormData = z.infer<typeof formSchema>;
