import axios from "axios"

export const fetchApi = async (url, method = 'get', body, headers) => {
    let token = localStorage.getItem('token');

    try {
        let opts = {
            method,
            url: `${process.env.NEXT_PUBLIC_API_SERVER_URL.trim()}${url}`,
            timeout: 1 * 1000 * 60,// 1 phut
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': token,
            }
        }

        if (headers) {
            opts = {
                ...opts,
                headers: {
                    ...headers,
                    [headers.key]: headers.value,
                }
            }
        }
        if (method === 'get') {
            opts.params = body;
        } else {
            opts.data = body;
        }
        let fetchData = await axios(opts);
        if (fetchData.data.code !== 200) {
            return fetchData.data
        }
        return fetchData.data
    } catch (error) {
        console.log("Error fetchApi >>>> ", error);
        let { response } = error
        if (response) {
            return response.data
        }
        return error
    }
}