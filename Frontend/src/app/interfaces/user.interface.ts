
export interface User {
    id: number;
    img: string;
    name: string;
    email: string;
    address: string;
    age: number;
    studies: string;
    languages: string;
    linkedin: string;
    hobbies: string;
    status: string;
    role: string;
}

export interface NewUser extends User {
    error?: any;
}

export interface Session {
    user: User;
    token: string;
    error?: any;
}

