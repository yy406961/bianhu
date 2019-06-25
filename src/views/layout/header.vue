<template>
    <div class="header">
        <div class="header__container">
            <div>
                header
            </div>
            <div>
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link>
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
