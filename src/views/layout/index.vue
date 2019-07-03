<template>
    <div class="layout__container">
        <div v-if="isLogin" class="layout__container">
            <div class="layout__header">
                <headerCom @change="loginChange"></headerCom>
            </div>
            <div class="layout__body">
                <div class="layout__body__content">
                    <router-view />
                </div>
            </div>
        </div>
        <div v-else class="layout__container">
            <sysLogin @change="loginChange"></sysLogin>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import headerCom from './header.vue'
import sysLogin from '@/views/sign/index.vue'
import { storage } from '@/common/index'
@Component({
    components: {
        headerCom,
        sysLogin
    }
})
export default class Layout extends Vue {
    private isLogin: boolean = false

    mounted() {
        if (storage.local.storage.lastuser) {
            this.isLogin = true
        } else {
            this.$router.push('/signin')
        }
    }

    loginChange(val: boolean) {
        this.isLogin = val
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.layout {
    &__container {
        width: 100%;
        height: 100%;
    }

    &__header {
        width: 100%;
        position: fixed;
        top: 0;
    }

    &__body {
        width: 100%;
        background: $bg-color;
        margin-top: 60px;
        &__content {
            width: 1000px;
            margin: 0 auto;
            padding-top: 10px;
        }
    }
}
</style>
