<template>
    <div id="app">
        <layout></layout>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import layout from '@/views/layout/index.vue'
@Component({
    components: {
        layout
    }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
    width: 100%;
    height: 100%;
}
</style>
