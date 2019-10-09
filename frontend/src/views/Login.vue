<template lang="pug">
div#page-login.flex-center-start.scroll-container.overflow-hidden-scroll.back_grey5
    login-component
</template>

<script>
import LoginComponent from '@/components/login/LoginComponent.vue';

export default {
    name: 'PageLogin',
    componentName: 'PageLogin',
    components: { LoginComponent }
}
</script>

<style lang="scss">
#page-login {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);
    padding-bottom: 60px;
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
        linear-gradient(90deg, rgb(2, 110, 165),rgb(50, 216, 218));
}
@media all and (min-height: 510px) {
    #page-login {
        align-items: center;
    }
}
</style>
