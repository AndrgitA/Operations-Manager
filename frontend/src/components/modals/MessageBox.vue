<template lang="pug">
div.message-box(@click="$event.stopPropagation()")
    div.message-box__inner.back_white.black-dark
        span.semi-bold.font-title.message-box__title {{ value }}
        span.regular.font-body.message-box__text {{ text }}
        div.message-box__bottom(:class="buttonsClass")
            button.regular.font-body.message-box__cancel.cursor-pointer(@click="callback({ value: false, indexModal, type, eventValue })") {{ buttonCancel }}
            button.regular.font-body.message-box__ok.btn-black.cursor-pointer(@click="callback({ value: true, indexModal, type, eventValue })") {{ buttonOk }}
</template>

<script>
export default {
    name: 'MessageBox',
    componentName: 'MessageBox',
    props: {
        value: String,
        callback: {
            type: Function,
            required: true
        },
        text: String,
        buttonCancel: String,
        buttonOk: String,
        buttonsClass: String,
        type: String,
        indexModal: {
            type: Number,
            required: true
        },
        eventValue: {}
    },

}
</script>

<style lang="scss">
.message-box {
    overflow-y: auto;
    height: 100vh;
    width: 100%;
    &__inner {
        margin-left: auto;
        margin-right: auto;
        margin-top: 200px;
        width: 400px;
        height: 200px;
        margin-bottom: 20px;
        padding: 30px 20px 20px 30px;
        box-sizing: border-box;
    }
    &__title {

    }
    &__text {
        margin-top: 10px;
    }
    &__bottom {
        margin-top: 60px;
        &.unsaved-class {
            .message-box {
                &__cancel {
                }
                &__ok {
                    background-color: $red;
                    color: $white;
                    &:hover {
                        background-color: lighten($red, 2);
                    }
                    &:active {
                        background-color: darken($red, 10);
                    }
                }
            }
        }
    }
    &__cancel {
        margin-left: 63px;
        outline: none;
        width: 137px;
        height: 40px;
        background-color: $white;
        color: $black;
    }
    &__ok {
        width: 150px;
        height: 40px;
        outline: none;
    }
}
</style>