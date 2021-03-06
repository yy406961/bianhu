import Vue from 'vue'
import Router from 'vue-router'
import { commonRouter } from './common/index'
import { homeRouter } from './home/index'
import { peopleRouter } from './people/index'
import { signRouter } from './sign/index'

Vue.use(Router)

let routerMenuList: any[] = []
routerMenuList = routerMenuList
    .concat(commonRouter)
    .concat(homeRouter)
    .concat(peopleRouter)
    .concat(signRouter)

const routes = routerMenuList.map(item => {
    return item
})

export default new Router({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes
})
