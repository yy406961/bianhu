import Cookies from 'js-cookie'

// cookies有限期、单位天
const time = 7
const _setCookies = (key: any, value: any) => {
    Cookies.set(key, value, { expires: time, path: '' })
}

export const setCookies = (obj: any) => {
    if (typeof obj === 'object')
        Object.keys(obj).forEach(item => _setCookies(item, obj[item]))
}

export const getCookies = (key: any) => {
    return Cookies.get(key)
}

export const deleteCookies = (obj: any) => {
    if (typeof obj === 'object')
        Object.keys(obj).forEach(item => Cookies.remove(item, { path: '' }))
}
