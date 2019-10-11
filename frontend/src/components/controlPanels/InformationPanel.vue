<template lang="pug">
div.information-panel.back_white
    span.information-panel__title.book.font-title-huge.black {{ title }}
    div.information-panel__row
        p.information-panel__row-left-p.regular.font-body {{ $t('$fields.name_os') }}
        p.information-panel__row-right-p.regular.font-body(v-if="name_os !== null") {{ name_os }}
    div.information-panel__row
        p.information-panel__row-left-p.regular.font-body {{ $t('$fields.architecture') }}
        p.information-panel__row-right-p.regular.font-body(v-if="architecture !== null") {{ architecture }}
    div.information-panel__row
        p.information-panel__row-left-p.regular.font-body {{ $t('$fields.bios') }}
        p.information-panel__row-right-p.regular.font-body(v-if="bios !== null") {{ bios }}
    div.information-panel__row
        p.information-panel__row-left-p.regular.font-body {{ $t('$fields.memory_ram') }}
        p.information-panel__row-right-p.regular.font-body(v-if="memoryRam !== null") {{ memoryRam }}
    div.information-panel__row
        p.information-panel__row-left-p.regular.font-body {{ $t('$fields.node') }}
        p.information-panel__row-right-p.regular.font-body(v-if="node !== null") {{ node }}
</template>

<script>
export default {
    name: 'InformationPanel',
    componentName: 'InformationPanel',
    props: {
        title: {
            type: String,
            default: ''
        },
        name_os: {
            type: String,
            default: null
        },
        architecture: {
            type: String,
            default: null
        },
        bios: {
            type: String,
            default: null
        },
        memoryRam: {
            type: String,
            default: null
        },
        node: {
            type: String,
            default: null
        }
    },
}
</script>

<style lang="scss">
.information-panel {
    width: calc(100% - 2px);
    border: 1px solid $cyan-10;
    &__title {
        height: 35px;
        padding: 19px;
        font-size: 28px;
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
            // direction: rtl;
            text-align: right;
            white-space: pre-wrap;
        }
        &-button {
            width: calc(100% - 18px);
            margin: 10px 9px 9px 9px;
            padding: 10px 0;
        }
    }
}
</style>