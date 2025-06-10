import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchProjects,
    fetchProject,
    createProject,
    updateProject,
    deleteProject,
} from '@/lib/api/projects';
import type { Project } from '@/lib/type/projectType';

/**
 * 모든 프로젝트 조회
 * @returns 프로젝트 목록
 */
export const useProjects = () => {
    return useQuery<Project[]>({
        queryKey: ['projects'],
        queryFn: fetchProjects,
    });
};

/**
 * 특정 프로젝트 조회
 * @param id 프로젝트 ID
 * @returns 프로젝트 상세
 */
export const useProject = (id: number) => {
    return useQuery<Project>({
        queryKey: ['project', id],
        queryFn: () => fetchProject(id),
        enabled: !!id, // id 있을 때만 fetch
    });
};

/**
 * 프로젝트 생성
 * @returns 생성된 프로젝트
 */
export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};

/**
 * 프로젝트 수정
 * @returns 수정된 프로젝트
 */
export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Project> }) =>
            updateProject(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['project', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};

/**
 * 프로젝트 삭제
 * @returns 삭제된 프로젝트
 */
export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteProject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};