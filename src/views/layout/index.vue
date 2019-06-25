<template>
    <div class="layout__container">
        <div class="layout__header">
            <headerCom></headerCom>
        </div>
        <div class="layout__body">
            <div class="layout__body__container">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import headerCom from './header.vue'
@Component({
    components: {
        headerCom
    }
})
export default class Layout extends Vue {}
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
        &__container {
            width: 1000px;
            margin: 0 auto;
            padding-top: 10px;
        }
    }
}
</style>
