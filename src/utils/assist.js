import dayjs from 'dayjs'
/**
 * [oneOf 判断参数是否是其中之一]
 * @param  {[type]} value     [description]
 * @param  {[type]} validList [description]
 * @return {[type]}           [description]
 */
export function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true
        }
    }
    return false
}
/**
 * [oneOf 如果参数是数字，返回数字+px；
 * 如果参数是字符串&&包含%，返回参数本身；
 * 否则（undefined|null）返回100%参数
 * ]
 * @param  {[type]} val     [description]
 */
export function sizePercentFix(val) {
    let size
    if (typeof val === 'number') {
        size = val + 'px'
    } else if (typeof val === 'string' && val.substr(val.length - 1) === '%') {
        size = val
    } else {
        size = '100%'
    }
    return size
}
/**
 * [getIntervalDate 获取距离系统n天的日期]
 * @param  {n}  num            [需要往前推的天数，负数表示往后推]
 */
export const getIntervalDate = (n = 0) => {
    let ms = dayjs()
        .subtract(n, 'day')
        .format()
    return ms
}
/**
 * [forbiddenDate 选择日期范围]
 * @param  {Date} time                       [选择的日期]
 * @param  {Date}  lastDate=new  Date()      [可选的最后日期]
 * @param  {Number} [duration=180]          [间隔时间 默认6个月 ]
 * @return {Boolean}  [true:xxxx, false:xxxxxx]
 */
export const forbiddenDate = (
    time,
    lastDate = dayjs().format(),
    duration = 180
) => {
    let cDate = lastDate
    let cTime = dayjs(time).format()
    let pDate = dayjs(lastDate)
        .subtract(duration, 'day')
        .format()
    return !(dayjs(cTime).isAfter(pDate) && dayjs(cTime).isBefore(cDate))
}
/**
 * 列表前端分页
 * @param {Array<Object>} data 需要分页的完整数据
 * @param {number} curPageNum 当前页页码
 * @param {number} pageSize 每显示的条数
 * @return {Array<Object>} 分页后当前页需要显示的数据
 */
export const setTablePage = (data, curPageNum, pageSize) => {
    let n = curPageNum * pageSize
    let list = []
    for (let m = n - pageSize; m < n; m++) {
        if (data && data[m]) {
            list.push(data[m])
        }
    }
    return list
}
/**
 * 列表前端分页页码
 * @param {Array<Object>} data 需要分页的完整数据
 * @param {number} pageSize 每显示的条数
 * @return {Array} 分页后页数
 */
export const setPageNum = (data, pageSize) => {
    let arr = []
    let length = Math.ceil(data.length / pageSize)
    for (let i = 0; i < length; i++) {
        arr.push(i + 1)
    }
    return arr
}
/**
 * null的数据转化为其他内容
 * @param {data} data 需要判断的数据
 * @param {result} 目标内容
 */
export const isReplaceNull = (data, result = '--') => {
    return data && data !== 'null' ? data : result
}

/* eslint-disable */
export const getUUID = () => {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'
    var uuid = s.join('')
    return uuid
}
