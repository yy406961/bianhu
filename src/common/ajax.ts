import { Message } from 'element-ui'
import $log from '@/common/log'
import axios from 'axios'
import qs from 'qs'
// import store from '@/store'

const SUCCESS = 200
const ERROR = 300
const OVERTIME = 202
const CancelToken = axios.CancelToken
const source = CancelToken.source()

// rap的话 不带cookies证书
// const isRap = () => {
//     let flag = true
//     if (process.env.VUE_APP_MOCK_URL.indexOf('mockjsdata') > -1) flag = false
//     return flag
// }

const service = axios.create({
    baseURL: process.env.VUE_APP_MOCK_URL,
    timeout: 180000
    // withCredentials: isRap()
})

const sendMessage = (msg: any, type: any) => {
    Message({
        message: msg,
        type,
        duration: 2000
    })
}

// 记录和显示错误
const errorLog = (err: any) => {
    // 打印到控制台
    if (process.env.NODE_ENV === 'development') {
        $log.danger('>>>>>> Error >>>>>>')
        console.log(err)
    }

    sendMessage(err.message, 'error')
}
// 创建一个错误
const errorCreat = (msg: any) => {
    const err = new Error(msg)
    errorLog(err)
    throw err
}

// 响应拦截器
service.interceptors.response.use(
    response => {
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        const status = response.status
        // 根据 code 进行判断
        if (status === undefined) {
            return dataAxios
        }
        switch (status) {
            // 成功
            case SUCCESS:
                return dataAxios
            // 超时
            case OVERTIME:
                // 清空 重新登录
                //window.$VUEStore.dispatch('login/disposeExitLoginService')
                break
            default:
                // 不是正确的 code
                errorCreat(`${dataAxios.message}: ${response.config.url}`)
                break
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误'
                    break
                case 401:
                    error.message = '未授权，请登录'
                    break
                case 403:
                    error.message = '拒绝访问'
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`
                    break
                case 408:
                    error.message = '请求超时'
                    break
                case 500:
                    error.message = '服务器内部错误'
                    break
                case 501:
                    error.message = '服务未实现'
                    break
                case 502:
                    error.message = '网关错误'
                    break
                case 503:
                    error.message = '服务不可用'
                    break
                case 504:
                    error.message = '网关超时'
                    break
                case 505:
                    error.message = 'HTTP版本不受支持'
                    break
                default:
                    break
            }
        }
        errorLog(error)
        return Promise.reject(error)
    }
)

/**
 * 通用request封装
 * @param method
 * @param url
 * @param data
 * @param config
 * @returns {Promise}
 */
const request = (method: any, url: any, data: any, config = {}) => {
    const options: any = Object.assign({}, config, {
        url,
        method,
        data
    })
    options.cancelToken = source.token
    options.headers = options.headers || {}
    return new Promise((resolve, reject) => {
        service
            .request(options)
            .then((res: any) => {
                //  查询类成功
                if (res.status === SUCCESS) {
                    sendMessage(res.message, 'success')
                    resolve(res)
                    // 保存、删除、修改成功
                } else if (res.status === ERROR) {
                    sendMessage(res.message, 'error')
                    reject(res)
                }
                resolve(res)
            })
            .catch(res => {
                if (axios.isCancel(res)) {
                    $log.danger('error', '请求中断')
                }
                reject(res)
            })
    })
}

const ajax = {
    get(url: any, config: any = {}) {
        return request('get', url, null, config)
    },
    delete(url: any, data: any, config: any) {
        return request('delete', url, data, config)
    },
    head(url: any, config: any) {
        return request('head', url, null, config)
    },
    post(url: any, data: any, config: any = {}) {
        if (!config.headers) {
            config.headers = {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        return request('post', url, qs.stringify(data), config)
    },
    put(url: any, data: any, config: any = {}) {
        config.headers = {
            'Content-Type': 'application/json; charset=UTF-8'
        }
        return request('put', url, data, config)
    },
    patch(url: any, data: any, config: any) {
        return request('path', url, qs.stringify(data), config)
    },
    setCommonHeader(key: any, value: any) {
        service.defaults.headers.common[key] = value
    }
}

export default ajax
