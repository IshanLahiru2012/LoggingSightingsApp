import {z} from "zod";

export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    email: z.string().email(),

})

export const sightingSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(150, "name should be less than 150 characters"),
    shortName: z.string().max(5, "name should be less than 150 characters"),
    airlineCode: z.string().regex(/^[A-Z]{3}-\d{4}$/,"airlineCode should be in pattern 'XXX-1234' "),
    createdDate: z.date().max(new Date(),{message: "Date and time must be before or equal to the current date and time"}),
    active: z.boolean(),
    deleted: z.boolean(),
    createdUser: userSchema,
    modifiedUser: userSchema,
})