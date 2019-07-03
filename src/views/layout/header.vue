<template>
    <div class="header">
        <div class="header__container">
            <div class="header__leftPart">
                <router-link to="/" class="header__systemName"
                    >编乎</router-link
                >
                <router-link
                    v-for="(item, index) in routerData"
                    :key="index"
                    :to="item.path"
                    :class="[
                        'header__routerName',
                        routerActive === item.path ? 'header__routerActive' : ''
                    ]"
                    >{{ item.name }}</router-link
                >
                <div class="header__search">
                    <el-autocomplete
                        style="width: 320px"
                        popper-class="my-autocomplete"
                        v-model="state"
                        :fetch-suggestions="querySearch"
                        placeholder="搜索你感兴趣的内容"
                        @select="handleSelect"
                    >
                        <i
                            class="el-icon-search el-input__icon"
                            slot="suffix"
                            @click="handleIconClick"
                        >
                        </i>
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.value }}</div>
                        </template>
                    </el-autocomplete>
                </div>
                <div class="header__editBtn">
                    <el-button type="primary" @click="toEdit">
                        我 来 编
                    </el-button>
                </div>
            </div>
            <div class="header__rightPart">
                <el-dropdown
                    class="ga-sysHeader__userConfig"
                    trigger="click"
                    placement="bottom"
                    @command="handleCommand"
                >
                    <span class="el-dropdown-link"
                        ><img
                            class="header__portrait"
                            src="../../assets/portrait/user.jpg"
                            width="30"
                            height="30"
                        />
                    </span>
                    <el-dropdown-menu slot="dropdown" class="userConfigList">
                        <el-dropdown-item
                            v-for="(item, index) in userConfigList"
                            :key="index"
                            :command="item.name"
                        >
                            <i :class="item.class"></i>
                            {{ item.name }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { ajax, storage } from '@/common/index'
import sign from '../sign/index.vue'
import { Route } from 'vue-router'

@Component({})
export default class Header extends Vue {
    private routerActive: string = '/'
    private routerData: Array<object> = [
        { name: '首页', path: '/' },
        { name: '关注', path: '/follow' },
        { name: '热榜', path: '/hot' }
    ]
    private restaurants: any = []
    private state: string = ''
    private userConfigList: Array<object> = [
        { name: '我的主页', class: 'el-icon-user' },
        { name: '我的私信', class: 'el-icon-chat-dot-round' },
        { name: '通知', class: 'el-icon-bell' },
        { name: '设置', class: 'el-icon-setting' },
        { name: '退出', class: 'el-icon-switch-button' }
    ]

    // computed

    // watch
    @Watch('$route')
    routeChange(val: Route) {
        this.routerActive = val.path
    }

    // mounted
    mounted() {
        this.restaurants = this.loadAll()
    }

    querySearch(queryString: any, cb: any) {
        let restaurants = this.restaurants
        let results = queryString
            ? restaurants.filter(this.createFilter(queryString))
            : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
    }
    createFilter(queryString: any) {
        console.log('bbbbbbbbbbbb', this.state)
        return (restaurant: any) => {
            return (
                restaurant.value
                    .toLowerCase()
                    .indexOf(queryString.toLowerCase()) === 0
            )
        }
    }
    loadAll() {
        return [
            { value: '三全鲜食（北新泾店）' },
            { value: 'Hot ho（仙霞路）' },
            { value: '新旺角茶餐厅' }
        ]
    }
    handleSelect(item: any) {
        console.log('1111111', item)
    }
    handleIconClick() {
        console.log('2222222', this.state)
    }
    // 我来编
    toEdit() {
        console.log('我来编')
    }
    // 个人菜单
    handleCommand(command: string) {
        console.log(command)
        switch (command) {
            case '我的主页':
                this.$router.push({
                    path: '/people'
                })
                break
            case '我的私信':
                this.$router.push({
                    path: '/people'
                })
                break
            case '通知':
                this.$router.push({
                    path: '/people'
                })
                break
            case '设置':
                this.$router.push({
                    path: '/people'
                })
                break
            case '退出':
                ajax.get('sign/signExit')
                    .then((resp: any) => {
                        this.$emit('change', false)
                        this.$router.push({
                            path: '/signin'
                        })
                        localStorage.clear()
                        sessionStorage.clear()
                    })
                    .catch((err: any) => {
                        console.log(err)
                    })
                break
        }
    }

    // 退出
    signExit() {}
}
</script>

<style lang="scss" scope>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.header {
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    &__container {
        width: 1000px;
        height: 60px;
        margin: 0 auto;
        line-height: 60px;
        // background: #ddd;
        display: flex;
        justify-content: space-between;
    }
    &__leftPart {
        display: flex;
    }
    &__systemName {
        @include systemName;
        font-size: 40px;
        letter-spacing: 5px;
        &:hover {
            color: $hight-fColor;
        }
    }
    &__routerName {
        color: $font-color;
        margin-left: 30px;
        font-size: $title-size;
    }
    &__routerActive {
        font-weight: bold;
        border-bottom: 4px solid $hight-fColor;
    }
    &__search {
        margin-left: 30px;
        i {
            cursor: pointer;
        }
    }
    &__editBtn {
        margin-left: 15px;
    }
    &__portrait {
        // border-radius: 50%;
        margin-top: 14px;
        cursor: pointer;
    }
}
</style>
