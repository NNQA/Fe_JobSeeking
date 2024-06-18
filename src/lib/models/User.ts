
export interface User {
    id: number
    name?: string;
    email: string;
    authorities: Array<Authorities>;
}

export interface Authorities {
    authority: String;
}

export enum ERole{ 
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_SUPPLIER = "ROLE_SUPPLIER",
}