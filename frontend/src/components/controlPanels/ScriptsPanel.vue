<template lang="pug">
div.scripts-panel.back_white
    span.scripts-panel__title.semi-bold.font-title.black {{ title }}
    div.scripts-panel__row
        p.scripts-panel__row-left-p.regular.font-body {{ $t('$fields.need_save') }}
        p.scripts-panel__row-right-p.regular.font-body(v-if="needSave !== null") {{ $t(`$common.${ (needSave ? 'yes' : 'no') }`) }}
    div.scripts-panel__row
        p.scripts-panel__row-left-p.regular.font-body {{ $t('$fields.all_scripts') }}
        p.scripts-panel__row-right-p.regular.font-body(v-if="count !== null") {{ count }}
    div.scripts-panel__row()
        div.scripts-panel__row-button.btn-cyan.text-center.user-select-none(@click="$emit('onEmit')") {{ $t('$buttons.save') }}
</template>

<script>
export default {
    name: 'ScriptsPanel',
    componentName: 'ScriptsPanel',
    props: {
        title: {
            type: String,
            default: ''
        },
        count: {
            type: Number,
            default: null
        },
        needSave: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style lang="scss">
.scripts-panel {
    width: calc(100% - 2px);
    border: 1px solid $cyan-10;
    &__title {
        height: 20px;
        padding: 19px;
    }
    &__row {
        background-color: $white;
        width: 100%;
        border-top: 1px solid $cyan-10;
        display: flex;
        &-left-p {
            flex: 1;
            width: 100%;
            color: $cyan-dark;
            display: inline-block;
            margin: 20px 0 19px 19px;
            white-space: nowrap;
        }
        &-right-p {
            display: inline-block;
            color: $cyan-20;
            margin: 20px 19px 19px 10px;
            white-space: nowrap;
        }
        &-button {
            width: calc(100% - 18px);
            margin: 10px 9px 9px 9px;
            padding: 10px 0;
        }
    }
}
</style>