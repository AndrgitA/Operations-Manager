<template lang="pug">
div.component-login
    div.blank-login.back_white.m-row-1
        span.medium.font-title.black {{ $t('$login.title_login') }}
        span.medium.font-title.name-panel.grey33.m-row-2 {{ $t('$login.panel') }}
        div.blank-login-form
            span.regular.font-body.field-title {{ $t('$fields.login') }}
            input.blank-login-input.m-10(v-model="login" @keyup="keyUp")
            div.regular.font-body.field-title {{ $t('$fields.password') }}
            input.blank-login-input.m-row-2(v-model="pass" @keyup="keyUp" type="password")
            button.btn-black.blank-login-button(@click="onButton") {{ $t('$login.login') }}
</template>

<script>
import { setTimeout } from 'timers';
export default {
    name: 'LoginComponent',
    componentName: 'LoginComponent',
    data() {
        return {
            pass: '',
            login: '',
        }
    },
    methods: {
        keyUp(event) {
            console.log("[LoginComponent.vue]: keyUp: ", event);
            if (event.key === 'Enter') {
                this.onButton();
            }
        },
        setToken(v) {
            let user = {
                login: v.login,
                role: v.role,
                id: v.id
            };

            this.$cookie.set('omanager-panel__token', v.token);
            this.$store.commit('setUserData', user);
            this.$store.commit('Login', { token: v.token, router: this.$router });
            let mes = { text: this.$t('$notifications.welcome'), color: 'black' };
            this.$store.commit('removeAllNotification');
            setTimeout(() => { this.$store.commit('addNotification', mes); }, 500);
        },
        onButton() {
            if (this.pass != '' /*&& /^[a-zA-Z]\w*@[a-z]\w*.[a-zA-Z]+$/.test(this.login)*/){
                this.$store.state.axios.post('/login', { login: this.login, password: this.pass }).then(response => {
                    console.log('[LoginComponent.vue]: onButton(response): ', response);
                    this.setToken(response.data);
                }).catch(error => {
                    console.log('[LoginComponent.vue]: onButton(error): ', error, error.response);
                    if (error.response.status === 401){
                        this.$store.commit('addNotification', { text: this.$t('$notifications.login_failed'), color: 'white' });
                    }
                });
            } else {
                this.$store.commit('addNotification', { text: this.$t('$notifications.fill_all_fields'), color: 'white' });
            }
        }
    }

}
</script>

<style lang="scss">
.component-login {
    width: 400px;
    height: 405px;
    position: relative;
    .blank-login {
        width: calc(100% - 40px);
        padding: 30px 20px 25px 20px;
        .field-title {
            color: $black;
            margin-bottom: 10px;
        }
        &-input {
            position: relative;
            width: calc(100% - 20px);
            padding: 10px;
            // margin-bottom: 10px;
            border: 1px solid $grey10;
            background-color: $grey2;
            &:hover {
                border: 1px solid $grey33;
            }
            &:focus {
                background-color: $white;
            }
        }
        &-button {
            position: relative;
            width: 100%;
            padding-top: 10px;
            padding-bottom: 10px;
            margin-bottom: 35px;
        }
    }
}
</style>