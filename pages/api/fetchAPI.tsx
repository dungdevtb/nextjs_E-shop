import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface FetchApiProps {
    url: string;
    method?: 'get' | 'post' | 'put' | 'delete';
    body?: any;
    headers?: Record<string, string>;
}

let API_URL = process.env.NEXT_PUBLIC_API_SERVER_URL || '';

export const fetchApi = async ({ url, method = 'get', body, headers }: FetchApiProps): Promise<any> => {
    let token = localStorage?.getItem('token');

    try {
        let opts: AxiosRequestConfig = {
            method,
            url: `${API_URL.trim()}${url}`,
            timeout: 1 * 1000 * 60, // 1 phut
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': token || '', // Handle case when token is null
                ...headers,
            }
        };

        if (method === 'get') {
            opts.params = body;
        } else {
            opts.data = body;
        }

        let fetchData: AxiosResponse<any> = await axios(opts);

        if (fetchData.data.code !== 200) {
            return fetchData.data;
        }

        return fetchData.data;
    } catch (error) {
        console.log("Error fetchApi >>>> ", error);
        if (axios.isAxiosError(error)) {
            let { response } = error;
            if (response) {
                return response.data;
            }
        }
        return error;
    }
};
