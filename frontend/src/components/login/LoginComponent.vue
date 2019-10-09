<template lang="pug">
div.component-login.back_white
    div.blank-login.m-row-1.inline-block
        span.medium.font-title.black.blank-login__title {{ $t('$login.title_login') }}
        img.blank-login__image.events-none(src="/images/favicons/favicon.png")
    div.blank-login.m-row-1.inline-block
        div.blank-login-form
            span.regular.font-body.field-title {{ $t('$fields.login') }}
            input.blank-login-input.m-10(v-model="login" @keyup="keyUp")
            div.regular.font-body.field-title {{ $t('$fields.password') }}
            input.blank-login-input.m-row-3(v-model="pass" @keyup="keyUp" type="password")
            button.btn-black.blank-login-button.inline-block(@click="onButton") {{ $t('$login.login') }}
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
            let mes = { text: this.$t('$notifications.welcome'), color: 'cyan' };
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
    width: 800px;
    height: 405px;
    position: relative;
    border-radius: 30px;
    background-image: 
        linear-gradient(
            45deg, rgba(152, 152, 152, 0.07) 0%,
            rgba(152, 152, 152, 0.07) 48%,rgba(136, 136, 136, 0.07) 48%, 
            rgba(136, 136, 136, 0.07) 100%
        ),
        linear-gradient(
            45deg, rgba(235, 235, 235, 0.06) 0%, rgba(235, 235, 235, 0.06) 79%,
            rgba(218, 218, 218, 0.06) 79%, rgba(218, 218, 218, 0.06) 100%
        ),
        linear-gradient(
            135deg, rgba(12, 12, 12, 0.04) 0%, rgba(12, 12, 12, 0.04) 30%,
            rgba(79, 79, 79, 0.04) 30%, rgba(79, 79, 79, 0.04) 100%
        ),
        linear-gradient(
            45deg, rgba(173, 173, 173, 0.03) 0%, rgba(173, 173, 173, 0.03) 66%,
            rgba(245, 245, 245, 0.03) 66%, rgba(245, 245, 245, 0.03) 100%
        ),
        linear-gradient(
            135deg, rgba(84, 84, 84, 0.06) 0%, rgba(84, 84, 84, 0.06) 51%,
            rgba(165, 165, 165, 0.06) 51%, rgba(165, 165, 165, 0.06) 100%
        ),
        linear-gradient(
            45deg, rgba(15, 15, 15, 0.02) 0%, rgba(15, 15, 15, 0.02) 14%,
            rgba(95, 95, 95, 0.02) 14%, rgba(95, 95, 95, 0.02) 100%
        ),
        linear-gradient(
            0deg, rgba(34, 34, 34, 0.05) 0%, rgba(34, 34, 34, 0.05) 58%,
            rgba(98, 98, 98, 0.05) 58%, rgba(98, 98, 98, 0.05) 100%
        ),
        linear-gradient(90deg, #026ea58f, #32d8da47);
    .blank-login {
        width: calc(50% - 40px);
        height: 300px;
        padding: 30px 20px 25px 20px;
        margin-top: 25px;
        .field-title {
            color: $black;
            margin-bottom: 10px;
        }
        &:first-child {

        }
        &:last-child {
            padding-top: 45px;
            padding-bottom: 10px;
            border-left: 1px solid #109da4;
            width: calc(50% - 41px);
        }
        &-input {
            border-radius: 10px;
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
            border-radius: 10px;
            position: relative;
            width: 100%;
            padding-top: 15px;
            padding-bottom: 15px;
            margin-bottom: 35px;
            font-size: 18px;
        }
        &__image {
            width: 250px;
            height: 250px;
            margin-left: 50px;
            margin-top: 40px;
            animation: 10s linear 0s normal none infinite running rotate-360;
        }
        &__title {
            margin-left: auto;
            margin-right: auto;
            font-size: 25px;
            margin-left: 50px;
        }

    }
    @keyframes rotate-360 {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
}
</style>