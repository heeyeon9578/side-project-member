export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    created_at: string;
    updated_at: string;
}

export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    bio?: string;
}

export interface UpdateUserInput {
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
    bio?: string;
}

export interface RegisterUserInput {
    name: string;
    email: string;
    password: string;
}