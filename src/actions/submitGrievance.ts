'use server';

import { formSchema } from '../lib/schemas';
import { z } from 'zod';

export async function submitGrievance(data: any) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        const validatedData = formSchema.parse(data);

        // Simulate DB save
        console.log("Saving grievance:", validatedData);

        return { success: true, message: "Grievance submitted successfully!", id: Math.random().toString(36).substr(2, 9) };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, errors: error.flatten().fieldErrors };
        }
        return { success: false, message: "Something went wrong." };
    }
}
