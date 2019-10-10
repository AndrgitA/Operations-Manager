<template lang="pug">
div.title-page
    div.panel-container
        div.title-page__inner.flex-start
            slot(name="prepend")
            div.title-page__inner-info.inline-block
                slot(name="prepend-content")
                div.title-page__inner-info-content.inline-block
                    div
                        p.semi-bold.font-title.cyan-dark.inline-block {{ value.titleText }}
                        slot(name="append-content-top-line")
                    p.regular.font-desc.cyan-30 {{ value.titleInfo }}
                slot(name="append-content")
            slot(name="append")
</template>

<script>

export default {
    props: {
        value: {
            type: Object,
            required: true,
            validator(newValue) {
                console.log("[TitlePage.vue]: validator(value): ", newValue);
                return newValue.hasOwnProperty('titleText') &&
                       newValue.hasOwnProperty('titleInfo');
            }
        }
    },
}
</script>

<style lang="scss">

.title-page {
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 30px 0 29px 0;
    border-bottom: 1px solid $cyan-20;
    &__inner {
        &-info {
            width: 100%;
            flex: 1;
        }
    }
}
</style>