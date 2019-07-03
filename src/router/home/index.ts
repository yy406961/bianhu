export const homeRouter = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        children: [
            { path: '/', component: () => import('@/views/home/home.vue') },
            {
                path: '/follow',
                component: () => import('@/views/home/follow.vue')
            },
            { path: '/hot', component: () => import('@/views/home/hot.vue') }
        ]
    }
]
