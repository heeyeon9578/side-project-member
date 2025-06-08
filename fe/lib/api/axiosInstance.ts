import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001', // 🟡 백엔드 포트 맞게
    withCredentials: true, // 쿠키 기반 인증 사용 시 필요
    headers: {
        'Content-Type': 'application/json',
    },
});
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken'); // 또는 cookies
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default axiosInstance;