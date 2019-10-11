<template lang="pug">
div.view-image()
    div.view-image__content.flex-start-center.flex-column
        div.view-image__block-top(
            :style="getStyleView"
        )
            img.view-image__image.cursor-pointer(
                :class="{ 'cursor-default': count < 2 }"
                @click="handleClickImage"
                :src="`${ $store.state.APP_IMAGE_URL_PREFIX }${ curImage.original }`"
                ref="image"
            )
        div.view-image__block-bottom
            span.regular.font-body.view-image__info(
                @click="$event.stopPropagation()"
            ) {{ curIndex + 1 }} {{ $t('$common.of').toLowerCase() }} {{ count }}
</template>

<script>
// TODO: set settings for big height and scrolling on mobile
export default {
    name: 'ViewImage',
    componentName: 'ViewImage',
    props: {
        indexModal: {
            type: Number,
            required: true
        },
        indexClickImage: {
            type: Number,
            required: true
        },
        value: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            curIndex: 0,
            count: 0,
            focused: true,
            curImages: [],
            curMaxHeight: 400
        };
    },
    watch: {
        value: {
            handler(newValue, oldValue) {
                this.curImages = newValue.filter(image => image !== null && image.hasOwnProperty('original'));
                this.count = this.curImages.length;
            },
            immediate: true
        }
    },
    computed: {
        curImage() {
            console.log('RETURN ', this.curImages,this.curIndex, this.curImages[this.curIndex]);
            return this.curImages[this.curIndex];
        },
        getStyleView() {
            return {
                'min-height': "400px",
                'max-height': `${ this.curMaxHeight }px`
                
                // 'max-height': (!!this.$refs.image && !!this.$refs.image.clientHeight ) ? `${ this.$refs.image.clientHeight }px` : '100%'
                // 'min-height': '400px',
                // 'max-height': `${ this.value[this.curIndex].height }px`
            };
        },
        getStyleImage(){
            return {
                // 'max-width': '100vw'
            };
        },
    },
    created() {
        this.curIndex = this.indexClickImage;
    },
    methods: {
        mountImage() {
            console.log("MOUNT IMAGE");
            this.curMaxHeight = 400;
            let urlSrc = `${ this.$store.state.APP_IMAGE_URL_PREFIX }${ this.curImage.original }`;
            let img = new Image();
            // img.onload = (event) => {
            //     console.log(event);
            //     if (event.path.length > 0) {
            //         let target = event.path[0];
            //         if (!!target) {
            //             this.curMaxHeight = target.naturalHeight;
            //         }
            //     }    
                
            //     //this.curMaxHeight = this.height;
            // };
            let self = this;
            img.onload = function() {
                self.curMaxHeight = this.height;
            }
            img.src = urlSrc;
            setTimeout(() => { img = null; }, 5000);
        },
        handleClickImage(event) {
            //console.log("[ViewImage.vue]: handleClickImage: ", event);
            event.stopPropagation();
            if (this.count > 1) {
                let width = event.target.scrollWidth;
                let X = event.offsetX;
                if (width / 2 <= X) {
                    this.curIndex = (this.curIndex + 1) % this.count;
                    //console.log('next');
                } else {
                    this.curIndex = (this.curIndex - 1 + this.count) % this.count;
                    //console.log('prev');
                }
                this.mountImage();
            }
            this.focused = true;
        },
        handleKeyDown(event) {
            console.log("[ViewImage.vue]: handleKeyDown: ", event);
            if (this.count > 1 && this.focused && (event.keyCode == 37 || event.keyCode == 39)) {
                if (event.keyCode == 39) {
                    this.curIndex = (this.curIndex + 1) % this.count;
                } else {
                    this.curIndex = (this.curIndex - 1 + this.count) % this.count;
                }
                this.mountImage();
            }
        },
    },
    mounted() {
        document.addEventListener("keydown", this.handleKeyDown);

        this.mountImage();
    },
    beforeDestroy() {
        document.removeEventListener("keydown", this.handleKeyDown);
    },
}
</script>

<style lang="scss">
.view-image {
    overflow-y: auto;
    height: 100vh;
    width: 100%;
    &__content {
        // margin-left: auto;
        // margin-right: auto;
        // text-align: center;
        // white-space: nowrap;
        width: 100%;
        height: 100%;
        // display: flex;
        // flex-direction: column;
    }
    &__block-top {
        height: calc(100% - 70px - 90px);
        position: relative;
        margin-top: 70px;
        text-align: center;
        white-space: nowrap;
    }
    &__image {
        max-width: calc(100vw - 10px);
        height: 100%;
        object-fit: cover;
        -o-object-fit: cover;
        object-position: top center;
        -o-object-position: top center;
        position: relative;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    &__block-bottom {
        text-align: center;
        margin-top: 30px;
        height: 40px;
        margin-bottom: 20px;
    }
    &__info {
        padding: 10px 25px 10px 25px;
        // background-color: $black-highlight;
        color: $white;
        display: inline-block;
    }
}
@media all and (min-height: 530px) {
    .view-image__content {
        justify-content: center;
    }
}
</style>