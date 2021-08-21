import { User } from './user.interface';



export interface Friendship {
    accepted: boolean,
    id: number,
    id_friend: number,
    id_user: number
}

export interface FriendshipWithUser extends Friendship, User {
}