<template>
    <div class="column">
        <TrelloButton v-if="_is_show_buttons"></TrelloButton>
    </div>
</template>

<script>
    import TrelloButton from './Trello/TrelloButton.vue';

    export default {
        components: {
            TrelloButton: TrelloButton,
        },
        computed:   {
            _is_show_buttons() {
                return !this.$store.state.Main.is_trello_auth;
            }
        },
    };
</script>