import Mock from 'mockjs'

let signIn = Mock.mock({
    status: 200,
    message: '登录成功',
    data: {
        userName: 'U123',
        userId: 72
    },
    rows: null,
    total: null
})
let signUp = Mock.mock({
    status: 200,
    message: '注册成功',
    data: {
        userName: 'U124',
        passWord: 2333
    },
    rows: null,
    total: null
})
let signExit = Mock.mock({
    status: 200,
    message: '退出成功',
    data: null,
    rows: null,
    total: null,
    api_name: null
})
export default {
    signIn: () => signIn,
    signUp: () => signUp,
    signExit: () => signExit
}
