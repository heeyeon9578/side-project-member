// src/app/queries/userQueries.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from '@/lib/api/users';
import type { User, CreateUserInput, UpdateUserInput } from '@/lib/type/user';

/** 모든 사용자 조회 */
export const useUsers = () => {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: getUsers,
    });
};

/** 특정 사용자 조회 */
export const useUser = (id: number) => {
    return useQuery<User>({
        queryKey: ['user', id],
        queryFn: () => getUser(id),
        enabled: !!id,
    });
};

/** 사용자 생성 */
export const useCreateUser = (options?: { onSuccess?: (data: any, variables: any, context: any) => void }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateUserInput) => createUser(data),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['users'] }); // 모든 사용자 목록 조회 캐시 무효화
            options?.onSuccess?.(data, variables, context);
        },
    });
};

/** 사용자 수정 */
export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateUserInput }) =>
            updateUser(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};

/** 사용자 삭제 */
export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};