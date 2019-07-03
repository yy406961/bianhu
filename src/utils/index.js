/**
 * 把电话号码中间4位****显示
 * @param {data} data 需要改变的手机号
 * @param {phone} 改变之后的号码
 */
export const phoneNumChange = data => {
    let phone
    if (data === null || data === undefined) return data
    data = String(data)
    if (data.substr(0, 2) === '86') {
        phone = data.replace(/(\d{5})\d{4}(\d{4})/, '$1****$2')
    } else {
        phone = data.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
    return phone
}
