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
}
@media all and (min-height: 510px) {
    #page-login {
        align-items: center;
    }
}
</style>
