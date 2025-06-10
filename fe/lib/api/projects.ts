import axiosInstance from '@/lib/api/axiosInstance';
import { CreateProjectRequest, Project, UpdateProjectRequest } from '@/lib/type/projectType'; // 필요 시 타입 선언 따로

const API_BASE = '/projects'; // NestJS API 경로

/**
 * 모든 프로젝트 조회
 * @returns 프로젝트 목록
 */
export const fetchProjects = async (): Promise<Project[]> => {
    const res = await axiosInstance.get(API_BASE);

    console.log(res.data);
    return res.data;
};

/**
 * 특정 프로젝트 조회
 * @param id 프로젝트 ID
 * @returns 프로젝트 상세
 */
export const fetchProject = async (id: number): Promise<Project> => {
    const res = await axiosInstance.get(`${API_BASE}/${id}`);
    return res.data;
};

/**
 * 프로젝트 생성
 * @param data 프로젝트 데이터
 * @returns 생성된 프로젝트
 */
export const createProject = async (data: CreateProjectRequest) => {
    const res = await axiosInstance.post(API_BASE, data);
    console.log(res.data);
    return res.data;
};

/**
 * 프로젝트 수정
 * @param id 프로젝트 ID
 * @param data 수정할 프로젝트 데이터
 * @returns 수정된 프로젝트
 */
export const updateProject = async (id: number, data: UpdateProjectRequest) => {
    const res = await axiosInstance.put(`${API_BASE}/${id}`, data);
    return res.data;
};

/**
 * 프로젝트 삭제
 * @param id 프로젝트 ID
 * @returns 삭제된 프로젝트
 */
export const deleteProject = async (id: number) => {
    const res = await axiosInstance.delete(`${API_BASE}/${id}`);
    return res.data;
};