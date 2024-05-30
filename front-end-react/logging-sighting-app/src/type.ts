import {z} from "zod";
import {sightingSchema, userSchema} from "./schema/formSchema.ts";

export type User ={
    id: string;
    name: string;
    email: string;
}
export type UserReq ={
    name: string;
    email: string;
}

export type Sighting={
    _id: string;
    name: string;
    shortName: string;
    airlineCode: string;
    location:string;
    createdDate: string;
    active : boolean;
    deleted : boolean;
    createdUser : User;
    modifiedUser: User;
}

export type SightingRequest={
    name: string;
    shortName: string;
    airlineCode: string;
    location:string;
    createdDate: Date;
    createdUser : User;
}

export type userFormData = z.infer<typeof userSchema>

export type sightingFormData = z.infer<typeof sightingSchema>