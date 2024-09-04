export interface userCredentials {
    email: string;
    password: string;
}

export interface authResponse {
    token: string;
    expiration: Date;
}

export interface User {
    id: string;
    email: string;
}