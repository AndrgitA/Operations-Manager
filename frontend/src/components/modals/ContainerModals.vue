<template lang="pug">
div.container-modals
    div.container-modals__fixed-mask.scroll-container(
        v-for="(modal, index) in $store.state.modals"
        :key="index"
        @click="CloseModal(index)"
        :style="{ 'z-index': modal.zIndex || (1000 + index) }"
    )
        div.modal(:calss="modal.class")
            component.modal__content(
                :is="modal.component"
                :value="modal.value"
                :ref="`modal-${ index }`"
                v-bind="modal.options"
                :indexModal="index"
                @close="CloseModal(index)"
            )
        
</template>

<script>
export default {
    name: 'ContainerModals',
    componentName: 'ContainerModals',
    watch: {
        '$route'(to, from) {
            if (to.path !== from.path && this.$store.state.modals.length > 0) {
                this.$store.commit('removeAllModal');
            }
        }
    },
    methods: {
        CloseModal(index) {
            console.log("[ContaierModals.vue]: CloseModal: ", index);
            this.$store.commit('removeModal', index);
        }
    }
}
</script>

<style lang="scss">
.container-modals {
    &__fixed-mask {
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba($black-dark, 0.6);
    }
}
</style>