<template>
    <div class="header">
        <div class="header__container">
            <div>
                <router-link to="/">首页</router-link> |
                <router-link to="/follow">关注</router-link> |
                <router-link to="/hot">热榜</router-link> |
                <router-link to="/people">个人中心</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class Header extends Vue {}
</script>

<style lang="scss" scope>
.header {
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    &__container {
        width: 1000px;
        height: 60px;
        margin: 0 auto;
        background: #ddd;
    }
}
</style>
