import { fetchApi } from "pages/api/fetchAPI"

export const actionLogin = async (payload: any) => {
    const response = await fetchApi({
        url: '/api/customer/login',
        method: 'post',
        body: payload,
        headers: {}
    })

    if (response.statusCode !== 200) {
        return response?.message || 'ERORR';
    }
    const token = response?.data?.token || null;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(response?.data?.user));

    return response
}

export const actionGetDetailCart = async (payload: any) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('token')

    let detail = { data: {}, statusCode: 0 }

    if (typeof token === 'string') {
        detail = await fetchApi({ url: `/api/order/get-detail-cart?customer_id=${user.id}`, method: 'get', body: {}, headers: { token: token } });
    }

    if (detail.statusCode !== 200) {
        alert('Please log in to shopping')
    }

    return detail?.data
}

export const actionAddToCart = async (payload: any) => {
    const user = await JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('token')

    if (typeof token === 'string') {
        await fetchApi({ url: '/api/order/add-to-cart', method: 'post', body: payload, headers: { token: token } })

        await fetchApi({ url: `/api/order/get-detail-cart?customer_id=${user.id}`, method: 'get', body: {}, headers: { token: token } })
    }

    return true
}

export const actionRemoveFromCart = async (payload: any) => {
    const user = await JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('token')

    let data = {
        statusCode: 0,
        data: {}
    }
    if (typeof token === 'string') {
        data = await fetchApi({ url: '/api/order/remove-from-cart', method: 'post', body: payload, headers: { token: token } })
    }

    return data.data
}

export const formatMoney = (num: any) => {
    if (!num || num === "") return "0"
    return Number(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}