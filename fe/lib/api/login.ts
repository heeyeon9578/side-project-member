import axiosInstance from './axiosInstance';

/**
 * 로그인
 * @param email 이메일
 * @param password 비밀번호
 * @returns 로그인 성공 시 액세스 토큰
 */
export const login = async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/login', {
        email,
        password,
    });
    console.log('🔍 [login] response →', response);
    return response.data;
};