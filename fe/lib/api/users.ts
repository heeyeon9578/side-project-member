import axios from "axios";
import type { User, CreateUserInput, UpdateUserInput } from "@/lib/type/user";

// 전체 사용자 조회
export const getUsers = async (): Promise<User[]> => {
    const res = await axios.get("/api/users");
    return res.data;
};

// 단일 사용자 조회
export const getUser = async (id: number): Promise<User> => {
    const res = await axios.get(`/api/users/${id}`);
    return res.data;
};

// 사용자 생성
export const createUser = async (data: CreateUserInput): Promise<User> => {
    const res = await axios.post("/api/users", data);
    return res.data;
};

// 사용자 수정
export const updateUser = async (id: number, data: UpdateUserInput): Promise<User> => {
    const res = await axios.put(`/api/users/${id}`, data);
    return res.data;
};

// 사용자 삭제
export const deleteUser = async (id: number): Promise<void> => {
    await axios.delete(`/api/users/${id}`);
};