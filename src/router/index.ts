import Vue from 'vue'
import Router from 'vue-router'
import { commonRouter } from './common/index'
import { homeRouter } from './home/index'

Vue.use(Router)

let routerMenuList: any[] = []
routerMenuList = routerMenuList.concat(commonRouter).concat(homeRouter)

const routes = routerMenuList.map(item => {
    return item
})

export default new Router({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes
})
