<template>
    <div class="home">
        <div class="card home__content">主要内容</div>
        <div class="home__sideBar">
            <div class="card">1</div>
            <div class="card">2</div>
            <div class="card">3</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Component({
    components: {
        HelloWorld
    }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scope>
.home {
    display: flex;
    align-items: flex-start;

    &__content {
        margin-right: 10px;
        margin-bottom: 0;
        width: 694px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
        min-height: 1000px;
    }

    &__sideBar {
        flex: 1 1;
    }
}
</style>
