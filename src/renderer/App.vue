<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <Vk/>
                <Trello />
            </div>
        </div>
    </section>
</template>

<script>
    import Vk from './components/Vk.vue';
    import Trello from './components/Trello.vue';

    export default {
        data() {
            return {}
        },
        components: {
            Vk:     Vk,
            Trello: Trello
        }
    }
</script>

<style>
    @import '~font-awesome/css/font-awesome.min.css';
    @import "~bulma/css/bulma.css";
    @import "./assets/custom.css";
</style>
