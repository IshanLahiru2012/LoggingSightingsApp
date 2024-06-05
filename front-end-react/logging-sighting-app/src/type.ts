export type User ={
    id?: number;
    name: string;
    email: string;
}
export type UserReq ={
    name: string;
    email: string;
}

export type Sighting={
    id?: number;
    name: string;
    shortName: string;
    airlineCode: string;
    location:string;
    createdDate: Date;
    active : boolean;
    deleted : boolean;
    createdUser ?: User;
    modifiedUser?: User;
    imageUrl : string;
}

export type SightingRequest={
    name: string;
    shortName: string;
    airlineCode: string;
    location:string;
    createdDate?: Date;
    createdUser : User;
}

