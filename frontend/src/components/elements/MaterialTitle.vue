<template lang="pug">
div.material-title(
    :class="{ 'is-disabled': disabled }"
)
    div.panel-container
        div.material-title__inner.cyan-30(:class="`material-${ materialTitle.material }-layout`")
            span.regular.font-desc.material-title__inner-element.pre-line.inline-block-bottom(
                v-for="(element, index) in materialTitle.elements"
                :class=`[
                    'pos' + index,
                    (!!element.class) ? element.class : '',
                    { 'is-disabled': element.disabled === true },
                    (index === value && !disabled && !element.disabled) ? (direction ? 'sort-active-down' : 'sort-active-up') : ''
                ]`
                :panel__tooltip="(!!element.panel__tooltip) ? element.panel__tooltip : undefined"
                @click="handleClick(index)"
            ) {{ element.value }}
            slot
</template>

<script>
export default {
    name: 'MaterialTitle',
    componentName: 'MaterialTitle',
    props: {
        value: {
            type: Number,
            default: null
        },
        direction: {
            type: Boolean,
            default: false
        },
        materialTitle: Object,
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick(index) {
            if (!this.disabled && !this.materialTitle.elements[index].disabled) this.$emit('input', index);
        }
    }
}
</script>

<style lang="scss">
.material-title {
    &__inner {
        width: 100%;
        padding: 40px 0 20px 0;
        &-element {
            cursor: pointer;
            &:hover {
                color: $grey50;
            }
            &:active {
                color: $black;
            }
            &.is-disabled {
                cursor: default;
                &:hover, &:active {
                    color: $grey33;
                }
            }
        }
        .sort-active-down {
            &:after {
                margin-left: 5px;
                content: '↓';
            }
        }
        .sort-active-up {
            &:after {
                margin-left: 5px;
                content: '↑'
            }
        }
    }
    &.is-disabled {
        .material-title__inner {
            &-element {
                cursor: default;
                &:hover, &:active {
                    color: $grey33;
                }
            }
        }
    }
}
</style>