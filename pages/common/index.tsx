export const formatMoney = (num: any) => {
    if (!num || num === "") return "0"
    return Number(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}