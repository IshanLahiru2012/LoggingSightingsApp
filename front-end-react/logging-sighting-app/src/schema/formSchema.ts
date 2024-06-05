import {z} from "zod";

export const userSchema = z.object({
    id: z.number().positive().optional(),
    name: z.string(),
    email: z.string().email(),

})

export type userFormData = z.infer<typeof userSchema>

const fileOrStringSchema = z.union([
    z.instanceof(File, { message: 'Must be a file and image is required ' }),
    z.string().url({ message: 'Must be a valid URL' }),
]);

export const sightingSchema = z.object({
    id: z.number().positive().optional(),
    name: z.string().max(150, "name should be less than 150 characters"),
    shortName: z.string().max(5, "name should be less than 150 characters"),
    airlineCode: z.string().regex(/^[A-Z]{3}-\d{4}$/,"airlineCode should be in pattern 'XXX-1234' "),
    location: z.string().max(200, "location should be less than 200 characters"),
    createdDate: z.custom((value: Date) => {return value <= new Date();},{message: "Date and time must be before or equal to the current date and time"}),
    active: z.boolean(),
    deleted: z.boolean(),
    createdUser: z.number(),
    modifiedUser: z.number().optional(),
    imageFile : fileOrStringSchema,
})


export type sightingFormData = z.infer<typeof sightingSchema>

