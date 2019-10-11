<template lang="pug">
div.input-image(
    :class=`[
        (!!style_component && !!style_component.class) ? style_component.class : '',
        { 'is-disabled': disabled }
    ]`
)
    span.regular.font-body.input-image__label(
        v-if="!!label"
        :class="{ 'error': (isError && curValue === null) }"
    ) {{ label }}
    div.input-image__image-block.back_grey2(v-if="isImage").flex
        div.input-image__image-back(v-if="isDownload")
            el-progress(
                v-if="isDownload"
                type="circle" 
                :percentage="percentLoad"
                :width="30"
            )
        image-element.input-image__image-back(v-else :data="curValue")
        div.input-image__params-image.break-all-block.mh-60()
            p.input-image__name-file.regular.font-body.limited-text-line.black(v-if="!!nameImage") {{ nameImage }}
            template(v-if="!!paramsImage")
                p.regular.font-desc.limited-text-line.grey50(
                    v-for="(text, index) in paramsImage"
                    :key="index"
                ) {{ text }}
        label.input-image__icon-update.cursor-pointer.block(:for="idObject" v-if="!disabled && !isDownload")
            reload-icon
    div.input-image__button-block.flex.back_grey2(v-else)
        label.input-image__button.btn-grey.black.block.text-center(:for="idObject") {{ $t('$fields.choose_file') }}
        div.input-image__params-image.break-all-block.mh-40(v-if="!!paramsText")
            p.regular.font-desc.limited-text-line.grey50(
                v-for="(text, indexText) in paramsText"
                :key="indexText"
            ) {{ text }}
    input.input-image__input(
        ref="imageInput"
        type="file"
        accept=".jpg,.jpeg,.png"
        @input="uploadImage"
        :disabled="disabled"
        :id="idObject"
    )
    //- div.there-image(v-if="isImage")
    //-     div.image-block(
    //-         v-if="isDownload"
    //-     )
    //-         el-progress(
    //-             v-if="isDownload"
    //-             type="circle" 
    //-             :percentage="percentLoad"
    //-             :width="30"
    //-         )
    //-     image-element.image-block(
    //-         :data="value"
    //-         v-else
    //-     )
            
    //-     div.param-image
    //-         p.font-style-regular.font-body.name--(v-if="!!value && !!value.src") {{ nameImage }} 
    //-         p.font-style-regular.font-desc(v-if="!!this.value && !!value.size") File size: {{ value.size }} KB
    //-         p.font-style-regular.font-desc(v-if="!!this.value && !!value.width") Resulution: {{ value.width }} x {{ value.height }} PX
    //-     div.icon-update(@click="$refs.fileInput.click()" v-if="!options.disabled")
    //-         input(ref="fileInput" type="file" accept=".jpg,.png" @change="uploadImage($event)")
    //-         reload-icon
    //-     div.icon-delete(@click="deleteImage" v-if="!options.disabled")
    //-         trash-icon
</template>

<script>
import ReloadIcon from 'icons/Reload.svg'
import ImageElement from '@/components/elements/ImageElement.vue';
export default {
    name: 'InputImage',
    componentName: 'InputImage',
    components: {
        ImageElement,
        ReloadIcon,
    },
    props: {
        value: {
            type: Object,
            default: null
        },
        label: String,
        style_component: {
            type: Object,
            default: null
        },
        isError: {
            type: Boolean,
            defaul: false
        },
        disabled: {
            type: Boolean,
            defaul: false
        },
        paramsText: {
            type: Array,
            default: null
        },
        maxSize: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            isDownload: false,
            percentLoad: 0,
            idObject: '',
            curValue: null
        }
    },
    created(){
        console.log("CREATED INPUT IMAGE");
        this.$store.commit('incObjectID');
        this.idObject = this.$store.getters.getObjectID;
        // this.updateCounter(this.value);
    },
    watch: {
        value: {
            handler(newValue, oldValue) {
                this.curValue = newValue;
            },
            immediate: true
        }
    },
    computed: {
        isImage(){
            return !!this.curValue || this.isDownload;
        },
        nameImage() {
            let result = null;
            if (!!this.curValue &&
                this.curValue.hasOwnProperty('original') &&
                Object.prototype.toString.call(this.curValue.original) === '[object String]') {
                let arr = this.curValue.original.split('/');
                result = arr[arr.length - 1];
                // result = this.value.src.replace(/.+\/(\w+)$/, "$1");
            }
            return result;
        },
        paramsImage() {
            let result = [];
            if (!!this.curValue) {
                if (!!this.curValue.size) {
                    let str = this.$t('$fields.file_size');
                    let sizeKB = this.curValue.size / 1024; 
                    if (sizeKB < 1024) {
                        result.push(`${ str }: ${ Math.round(sizeKB) } ${ this.$t('$common.types_calculus.KB') }`);
                    } else {
                        result.push(`${ str }: ${ Math.round(sizeKB / 1024) } ${ this.$t('$common.types_calculus.MB') }`);
                    }
                }
                if (!!this.curValue.width && !!this.curValue.height) {
                    result.push(`${ this.$t('$fields.resolution') } ${ this.curValue.width }x${ this.curValue.height } ${ this.$t('$common.types_calculus.PX') }`);
                }
            }
            return result.length === 0 ? null : result;
        }
    //     nameImage(){
    //         let arr = !!this.value ? this.value.src.split('/') : [,''];
    //         return arr[arr.length - 1];
    //     }
    },
    methods: {
        uploadImage(event) {
            console.log("[InputImage.vue]: uploadImage: ", event);
            if (event.target.files.length > 0) {
                let file = event.target.files[0];
                if (this.maxSize !== null) {
                    if (file.size > this.maxSize) {
                        this.$store.commit('addNotification', { 
                            text: `${ this.$t('$notifications.download_size_exceeds') } ${ this.maxSize / 1024 } ${ this.$t('$common.types_calculus.KB') }`, 
                            color: 'red' 
                        });
                        return;
                    }
                }

                let formData = new FormData();
                formData.append("image", file);
                this.isDownload = true;
                this.percentLoad = 0;
                this.curValue = null;
                this.postData(formData);
            }

    //         let formData = new FormData();
    //         formData.append("file", event.target.files[0]);
    //         this.isDownload = true;
    //         this.percentLoad = 0;

    //         axios.post('graphql/uploadImage', formData, {
    //             baseURL: process.env.NODE_ENV === 'development' ? 'https://beta.relocus.ru/' : 'https://beta.relocus.ru/',
    //             headers:{ token: "f2392211114629558002b9011e4dc057" }, 
    //             onUploadProgress: this.onUploadProgress 
    //         }).then(response => {
    //             //console.log(response);
    //             if (response.status === 200){
    //                 this.$emit('input', response.data);
    //                 setTimeout(() => {
    //                     this.isDownload = false;
    //                 }, 1000)
    //             }
    //         }).catch(error => {
    //             //console.log(error);
    //             setTimeout(() => {
    //                 this.isDownload = false;
    //             }, 1000)
    //         });


        },
        postData(dataPost) {
            this.$store.state.axios.post('/upload', dataPost, { 
                'baseURL': `${ this.$store.state.APP_SERVER_ADDRESS }/api/v${ this.$store.state.APP_VERSION_API }`,
                onUploadProgress: this.onUploadProgress
            }).then(response => {
                console.log("[InputImage.vue]: postData(response) :", response);
                if (response.status === 200){
                    this.$emit('input', response.data);
                    setTimeout(() => {
                        this.isDownload = false;
                    }, 1000)
                }
            }).catch(error => {
                console.log("[InputImage.vue]: postData(error): ", error);
                setTimeout(() => {
                    this.isDownload = false;
                }, 1000)
                this.curValue = this.value;
            })
        },
        onUploadProgress(progressEvent){
            this.percentLoad = (progressEvent.loaded / progressEvent.total) * 100;
        },
    }
}
</script>

<style lang="scss">

.input-image {
    &__input {
        display: none;
    }
    &__label {
        padding: 10px 0;
    }
    &__button {
        width: 170px;
        height: 40px;
        box-sizing: border-box;
        padding: 9px;
    }
    &__params-image {
        flex: 1;
        margin-left: 20px;
    }
    &__image-block {
        border: 1px solid $grey10;
        padding: 9px;
        height: 144px;
    }
    &__button-block {
        border: 1px solid $grey10;
        padding: 19px;
        height: 40px;
    }
    &__name-file {
        margin-top: 10px;
    }
    &__image-back {
        width: 120px;
        height: 144px;
        position: relative;
        & .el-progress {
            position: absolute;
            top: calc(50% - 15px);
            left: calc(50% - 15px);
            .el-progress__text {
                display: none;
            }
            .el-progress-circle__path {
                stroke-width: 10;
                stroke: $grey50;
            }
        }
    }
    &__icon-update {
        // display: inline-block
        //     position: relative
        //     vertical-align: top
        //     margin: 10px 10px 0 0
        //     cursor: pointer
        & .reload-icon-- {
            stroke: $grey33;
        }
        &:hover {
            & .reload-icon-- {
                stroke: $grey50;
            }
        }
        &:active {
            & .reload-icon-- {
                stroke: $black;
            }
        }
    }
    &.is-disabled {
        .input-image__label {
            color: $grey50;
        }
        .input-image__button {
            cursor: not-allowed;
            border: 1px solid $grey10;
            color: $grey50;
            &:hover, &:active {
                background-color: $grey2;
                border: 1px solid $grey10;
                color: $grey50;
            }
        }
    }
}
// .disabled
//     .span--
//         color: $grey50
//     .add-image-button
//         cursor: not-allowed
//         border: 1px solid $grey10
//         color: $grey50
//         &:hover, &:active
//             background-color: $grey2
//             border: 1px solid $grey10
//             color: $grey50 */


</style>