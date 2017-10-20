<template>
    <div>
        <div is="TreeItem" v-for="board in boards" :board="board"></div>
    </div>
</template>

<script>
    import Boards from '@/models/Trello/Boards';
    import TreeItem from './TrelloTree/TreeItem.vue';

    export default {
        data() {
            return {
                boards: null
            }
        },
        components: {
            TreeItem: TreeItem
        },
        mounted() {
            const model = Boards(this.$store.state.Main.trello_token);
            model.request().then((boards) => {
                this.boards = boards;
            });
        },
    };
</script>