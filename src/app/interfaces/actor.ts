export interface ActorCreation {
    name: string;
    birthDate: Date;
    photo: File;
    biography: string;
}

export interface ActorView {
    name: string;
    birthDate: Date;
    photo: string;
    biography: string;
}

export interface ActorList {
    id: number;
    name: string;
    birthDate: Date;
    photo: string;
    biography: string;
}

export interface ActorMovie {
   id: number;
   name: string;
   character: string;
   photo: string; 
}