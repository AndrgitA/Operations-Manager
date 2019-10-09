<template lang="pug">
div.image-element
    template(v-if="!!data")
        img.image-element__img.image-element__priview(v-if="!!data.preview" :src="data.preview")
        img.image-element__img.image-element__original(ref="image" :src="`${ $store.state.APP_IMAGE_URL_PREFIX }${ data.original }`" :srcset="srcset" :sizes="width") 
        //- img.original(ref="image" :src="`${ $store.state.APP_IMAGE_URL_PREFIX }${ data.original }`" :srcset="srcset" :sizes="width" :alt="data.alt.en")  
    template(v-else)
        div.image-element__no-img.back_grey10
</template>

<script>
export default {
    name: 'ImageElement',
    componentName: 'ImageElement',
    props: {
        data: {
            required: true,
            validator(value) {
                return Object.prototype.toString.call(value) === '[object Object]' || value === null;
            }
        }
    },
    data() {
        return {
            width: "",
        }
    },
    computed: {
        srcset() {
            var string = ""
            if (!!this.data &&!!this.data.srcset)
                for (var size in this.data.srcset)
                    string += `${ this.$store.state.APP_IMAGE_URL_PREFIX }${ this.data.srcset[size] } ${ size },`
                    // string += this.$bus.APP_SERVER_ADDRESS + this.data.srcset[size] + " " + size + ","
            return string
        }
    },
    mounted() {
        if (!!this.data) {
            this.width = this.$refs.image.clientWidth + "px";
        }
    }
}
</script>

<style lang="scss">
.image-element {
    position: relative;
    width: 100%;
    height: 100%;
    //line-height: 0
    @include user-select(none);
    &__img {
        width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
        border-radius: inherit;
        object-position: center top;
    }
    &__priview {
        position: absolute;
        z-index: 1;
        border-radius: inherit;
    }
    &__original {
        position: relative;
        z-index: 2;
        border-radius: inherit;
    }
    &__no-img {
        width: 100%;
        height: 100%;
        border-radius: inherit;
    }
}
</style>