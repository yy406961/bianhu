import Mock from 'mockjs'

// 登录 注册
import sign from './sign'
Mock.mock(/\/sign\/signIn/, 'post', sign.signIn)
Mock.mock(/\/sign\/signUp/, 'post', sign.signUp)
Mock.mock(/\/sign\/signExit/, 'get', sign.signExit)
