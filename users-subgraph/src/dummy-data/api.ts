import { users } from './data.json';

export type User = {
    id: string,
    name: string,
    role: string,
}

export type UsersApi = {
    getUsers: (limit?: number) => User[],
    getUserById: (id: string) => User | null
}

const getUsers = (limit: number = 5) => users.slice(0, Math.min(users.length, limit));
const getUserById = (id: string) => users.find((user) => user.id === id);

export const usersApi = {
    getUsers,
    getUserById
}
