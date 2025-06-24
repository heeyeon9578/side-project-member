import axiosInstance from '@/lib/api/axiosInstance';
import type { User, CreateUserInput, UpdateUserInput } from "@/lib/type/user";

const API_BASE = '/users';
// 전체 사용자 조회
export const getUsers = async (): Promise<User[]> => {
    const res = await axiosInstance.get(API_BASE);
    return res.data;
};

// 단일 사용자 조회     
export const getUser = async (id: number): Promise<User> => {
    const res = await axiosInstance.get(`${API_BASE}/${id}`);
    return res.data;
};

// 사용자 생성
export const createUser = async (data: CreateUserInput): Promise<User> => {
    console.log("🔍 [createUser] data →", data);
    const res = await axiosInstance.post(API_BASE, data);
    console.log("🔍 [createUser] res →", res);
    return res.data;
};

// 사용자 수정
export const updateUser = async (id: number, data: UpdateUserInput): Promise<User> => {
    const res = await axiosInstance.put(`${API_BASE}/${id}`, data);
    return res.data;
};

// 사용자 삭제
export const deleteUser = async (id: number): Promise<void> => {
    await axiosInstance.delete(`${API_BASE}/${id}`);
};