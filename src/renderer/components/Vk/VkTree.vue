<template>
    <div>
        <div @itemSelected="addGroup" @itemRemoved="removeGroup" is="TreeItem" v-for="group in groups" :group="group" :is_selected="isSelected(group)"></div>
    </div>
</template>

<script>
    import Groups from '@/models/Vk/Groups'

    import TreeItem from './VkTree/TreeItem.vue';
    import _ from 'lodash';

    export default {
        data() {
            return {
                groups: [],
            };
        },
        components: {
            TreeItem: TreeItem
        },
        mounted() {
            const model = Groups(this.$store.state.Main.vk_token);
            model.request().then((groups) => {
                this.groups = groups;
            });
        },
        methods:    {
            isSelected(group) {
                const selected = this.$store.state.Main.groups_selected;
                return _.includes(selected, group.gid);
            },
            addGroup(group) {
                this.$store.dispatch('addGroup', {
                    group: group.gid
                });
            },
            removeGroup(group) {
                this.$store.dispatch('removeGroup', {
                    group: group.gid
                });
            },
        }
    };
</script>