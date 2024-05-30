import {z} from "zod";
import {sightingSchema} from "./schema/formSchema.ts";

export type User ={
    _id: string;
    name: string;
    email: string;
}

export type Sighting={
    _id: string;
    name: string;
    shortName: string;
    airlineCode: string;
    createdDate: string;
    active : boolean;
    deleted : boolean;
    createdUser : User;
    modifiedUser: User;
}

export type sightingFormData = z.infer<typeof sightingSchema>



export type SightingRequest={
    name: string;
    shortName: string;
    airlineCode: string;
    createdDate: string;
    createdUser : User;
}