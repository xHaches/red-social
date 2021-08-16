import { User } from './user.interface';



export interface State {
    user: User;
    token: string;
}


export type Action = 'setUser' | 'setToken';
