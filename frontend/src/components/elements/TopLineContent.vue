<template lang="pug">
div.top-line-content.back_cyan-5.cyan-30
    div.panel-container
        div.top-line-content__flex.flex-start
            div.top-line-content__flex-start.inline-block
                slot(name="top-line-content__start")
            div.top-line-content__flex-end.inline-block
                slot(name="top-line-content__end")
</template>

<script>
export default {
    name: 'TopLineContent',
    componentName: 'TopLineContent'
}
</script>

<style lang="scss">
.top-line-content {
    position: relative;
    width: 100%;
    height: calc(100px - 61px);
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid $cyan-10;
    &__flex {
        &-start {
            flex: 1;
            width: 100%;
        }   
        &-end {
            margin-left: 10px;
        }
    }
}
</style>