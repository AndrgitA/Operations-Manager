<template lang="pug">
div.header-modal.flex-start.back_grey10
    span.header-modal__title.semi-bold.font-title.inline-block.grey50 {{ title }}
    div.header-modal__delete-icon.cursor-pointer(@click="handleClose")
        cross-icon
</template>

<script>
import CrossIcon from 'icons/Cross.svg';

export default {
    name: 'HeaderModal',
    componentName: 'HeaderModal',
    components: {
        CrossIcon
    },
    props: {
        title: String
    },
    methods: {
        handleClose(event) {
            console.log("[HeaderModal.vue]: handleClose: ", event);
            this.$emit('onClose', event);
        }
    }
}
</script>

<style lang="scss">
.header-modal {
    width: 100%;
    height: 50px;
    &__title {
        padding: 15px 0 15px 20px;
        flex: 1;
        width: 100%;
    }
    &__delete-icon {
        height: 30px;
        margin: 10px 15px;
    }
}
</style>