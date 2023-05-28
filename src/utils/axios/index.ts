import axios, { AxiosRequestConfig } from 'axios';

const UNKNOWN_ERROR = '未知错误，请重试';

const service = axios.create({
    baseURL: '/api',
    timeout: 6000,
});

service.interceptors.request.use(
    config => {
        // 添加各种规则，比如加token等操作写这里
        return config;
    },
    error => {
        Promise.reject(error);
    },
);

service.interceptors.response.use(
    response => {
        const res = response.data;

        if (res.code !== 200) {
            console.log(2232);

            // throw other
            throw new Error(res.message);
        } else {
            return res;
        }
    },
    error => {
        // 处理 422 或者 500 的错误异常提示
        const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;

        console.log(errMsg);
        throw new Error(errMsg);
    },
);

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
    const res = await service.request(config);
    return res.data;
};
