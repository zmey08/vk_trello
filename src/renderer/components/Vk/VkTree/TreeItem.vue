<template>
    <div @click="click" :class="_class_custom" class="box">
        <article class="media">
            <div class="media-left">
                <figure class="image is-200x200">
                    <img :src="group.image"/>
                </figure>
            </div>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong>{{ group.name }}</strong>
                    </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
    export default {
        props:   ['group', 'is_selected'],
        computed: {
            _class_custom() {
                const classes = [];
                if (this.is_selected) {
                    classes.push('selected');
                }
                return classes;
            }
        },
        mounted() {

        },
        methods: {
            click() {
                if (!this.is_selected) {
                    this.$emit('itemSelected', this.group);
                } else {
                    this.$emit('itemRemoved', this.group);
                }
            }
        }
    };
</script>