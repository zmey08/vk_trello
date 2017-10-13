<template>
    <div class="column">
        <VkButton v-if="_is_show_buttons"></VkButton>
        <VkTree v-if="!_is_show_buttons"></VkTree>
    </div>
</template>

<script>
    import VkButton from './Vk/VkButton.vue';
    import VkTree from './Vk/VkTree.vue';

    export default {
        components: {
            VkButton: VkButton,
            VkTree:   VkTree
        },
        computed:   {
            _is_show_buttons() {
                return !this.$store.state.Main.is_vk_auth;
            }
        },
    };
</script>