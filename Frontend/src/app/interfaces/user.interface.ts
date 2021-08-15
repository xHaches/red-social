
export interface User {
    id: number;
    img: string;
    name: string;
    email: string;
    age: number;
    studies: string;
    linkedin: string;
    hobbies: string;
    status: string;
    role: string;
}

export interface Session {
    user: User;
    token: string;
    error?: any;
}

