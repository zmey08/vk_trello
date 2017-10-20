<template>
    <div class="column">
        <TrelloButton v-if="_is_show_buttons"></TrelloButton>
        <TrelloTree v-if="!_is_show_buttons"></TrelloTree>
    </div>
</template>

<script>
    import TrelloButton from './Trello/TrelloButton.vue';
    import TrelloTree from './Trello/TrelloTree.vue';

    export default {
        components: {
            TrelloButton: TrelloButton,
            TrelloTree:   TrelloTree
        },
        computed:   {
            _is_show_buttons() {
                return !this.$store.state.Main.is_trello_auth;
            }
        },
    };
</script>