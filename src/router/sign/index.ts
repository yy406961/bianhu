export const signRouter = [
    {
        path: '/signup',
        name: '注册',
        component: () => import('@/views/sign/index.vue')
    },
    {
        path: '/signin',
        name: '登陆',
        component: () => import('@/views/sign/index.vue')
    }
]
