<template>
    <div>
        <a v-if="_is_show_button" @click="login" class="button is-large">Trello</a>
        <div v-if="!_is_show_button" class="box">
            Trello
            <span class="icon">
              <i class="fa fa-check"></i>
            </span>
        </div>
    </div>
</template>

<script>
    import Auth from '@/models/Trello/Auth'

    export default {
        data() {
            return {};
        },
        computed: {
            _is_show_button() {
                return !this.$store.state.Main.is_trello_auth;
            }
        },
        methods:  {
            login() {
                const auth = Auth();
                auth.run().then(result => {
                    console.log(result);
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    };
</script>