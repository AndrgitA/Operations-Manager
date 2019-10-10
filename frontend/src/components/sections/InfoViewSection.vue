<template lang="pug">
div.info-view-section.back_white(v-if="!!title && !!data")
    p.semi-bold.font-title.info-view-section__title {{ title }}
    div.info-view-section__inner.flex
        div.info-view-section__inner-column(
            v-for="(col, index) in data"
            :key="index"
        )
            template(v-if="Object.prototype.toString.call(col) === '[object Array]'")
                div.info-view-section__inner-row(
                    v-for="(row, indexR) in col"
                    :key="indexR"
                )
                    //- TODO break-words: word-bereak testing 
                    p.regular.font-desc.grey50  {{ row.name }}
                    template(v-if="row.type === 'link'")
                        a.regular.font-body.black.pre-line.break-word.info-view-section__dark-link(
                            :href="row.link" target="_blank"
                        ) {{ row.text }}
                    template(v-else)
                        p.regular.font-body.black.break-word.pre-line {{ row.text }}
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: undefined
        },
        data: {
            type: Array,
            default: undefined
        }
    }
}
</script>

<style lang="scss">
.info-view-section {
    width: calc(100% - 2px);
    border: 1px solid $grey10;
    &__title {
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
        border-bottom: 1px solid $grey5;
    }
    &__inner {
        padding: 0px 19px 19px 19px;
        width: calc(100% - 38px);
        &-column {
            width: 100%;
            flex: 1;
            margin-left: 20px;
            &:first-child {
                margin-left: 0;
            }
        }
        &-row {
            margin-top: 20px;
            width: 100%;

        }
    }
    &__link {
        &:active, &:hover {
            color: $blue;
        }
    }
    &__dark-link {
        &:hover, &:active {
            color: rgba($black, .75);
        }
    }
}
</style>