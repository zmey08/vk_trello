<template>
    <div>
        <a v-if="_is_show_button" @click="login" class="button is-large">Vk</a>
        <div v-if="!_is_show_button" class="box">
            Vk
            <span class="icon">
              <i class="fa fa-check"></i>
            </span>
        </div>
    </div>
</template>

<script>
    import Auth from '@/models/Vk/Auth'

    export default {
        data() {
            return {};
        },
        computed: {
            _is_show_button() {
                return !this.$store.state.Main.is_vk_auth;
            }
        },
        methods:  {
            isAuth() {
                const auth = Auth();
                return auth.isAuth();
            },
            login() {
                const auth = Auth();
                auth.run().then(result => {
                    this.$store.dispatch('setVkAuth', {
                        token: result.accessToken
                    });
                    console.log(result);
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    };
</script>