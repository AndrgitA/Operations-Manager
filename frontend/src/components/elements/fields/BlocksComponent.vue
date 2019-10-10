<template lang="pug">
div.blocks-component(v-if="!!value")
    vue-draggable.blocks(
        :value="value"
        v-bind="optionsDraggable || {}"
        :id="createdID"
        @input="inputDraggableHandle"
    )
        script-block.draggable-section__element(
            v-for="(val, index) in curValue"
            :key="index"
            :value="val"
            @input="inputHandle(index, $event)"
            :indexComponent="index"
            @onRemove="removeHandle(index)"
        )
    div.blocks-component__options
        div.button-script.inline-block.cursor-pointer(@click="addHandle")
            paragraph-icon.button-script__icon.inline-block
            p.regular.font-body.button-script__text.inline-block {{ $t('$buttons.add_script') }}
</template>

<script>

import VueDraggable from 'vuedraggable';
import ScriptBlock from '@/components/elements/fields/block/ScriptBlock.vue';

// import DropdownContent from '@/components/Dropdown/DropdownContent.vue'

// import ParagraphContent from '@/components/Fields/Additional/ParagraphContent.vue'
// import ImageContent from '@/components/Fields/Additional/ImageContent.vue'


import ParagraphIcon from 'icons/Paragraph.svg'
// import ImageIcon from 'icon/Image.svg'

export default {
    name: 'BlocksComponent',
    componentName: 'BlocksComponent',
    components: {
        VueDraggable,
        ScriptBlock,
        ParagraphIcon
    },
    props: {
        value: {
            type: Array,
            required: null
        },
        optionsDraggable: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            curValue: [],
            createdID: '',
        };
    },
    created() {
        this.$store.commit('incObjectID');
        this.createdID = this.$store.getters.getObjectID;
    },
    watch: {
        value: {
            handler(newValue, oldValue) {
                this.curValue = this.$panel.clone(newValue);
            },
            immediate: true
        }
    },
    methods: {
        inputDraggableHandle(values) {
            console.log(values);
            this.$emit('input', values);
        },
        inputHandle(index, value) {
            let tmp = this.$panel.clone(this.curValue);
            tmp[index] = value;
            this.$emit('input', tmp);
        },
        removeHandle(index) {
            let tmp = this.$panel.clone(this.curValue);
            tmp.splice(index, 1);
            this.$emit('input', tmp);
        },
        addHandle() {
            console.log("ADD HANDLE")
            let tmp = this.$panel.clone(this.curValue);
            tmp.push({
                id: -1,
                text: '#!/bin/bash\n',
                position: -1,
                status: 'NEW'
            });
            this.$emit('input', tmp);
        }
    //     onRemove(index){
    //         if (!!this.options.disabled && this.options.disabled){
    //             return;
    //         }
    //         this.value.splice(index, 1);
    //     },
    //     addParagraph: function(){
    //         if (!!this.options.disabled && this.options.disabled){
    //             return;
    //         }
    //         this.value.push({
    //             type: 'TEXT', //enum('paragraph', 'image'),
    //             content: {
    //                 // Paragraph blocks
    //                 text: {
    //                     en: '',
    //                     ru: ''
    //                 },// Image block
    //             }
    //         });
            
    //     },
    //     addImage: function(){
    //         if (!!this.options.disabled && this.options.disabled){
    //             return;
    //         }
    //         this.value.push({
    //             type: 'IMAGE', //enum('paragraph', 'image'),
    //             content: {
    //                 image: null,
    //                 caption: {
    //                     en: '',
    //                     ru: ''
    //                 }
    //             }
    //         });
    //     },
    //     editBlock(index, v){
    //         if (!!this.options.disabled && this.options.disabled){
    //             return;
    //         }
    //         let new_value = this.value;
    //         new_value[index].content = v;
    //         //console.log(new_value);
    //         this.$emit('input', new_value);
    //     },
    //     edit(v){
    //         if (!!this.options.disabled && this.options.disabled){
    //             return;
    //         }
    //         //console.log('edit', v);
    //         //this.value.splice(0, this.value.length).push.apply(this.value, v);
    //         //console.log(this.value);
    //         this.$emit('input', v);
    //         this.changeKey = !this.changeKey;
    //     },
    },
}
</script>

<style lang="scss">
.blocks-component {
    position: relative;
    width: 100%;
    border: 1px solid $cyan-10;
    box-sizing: border-box;
    &__options {
        width: 100%;
        color: darken($cyan-30, 5);
        position: relative;
        border-top: 5px solid $cyan-10;
        background-color: $white;
        & .button-script {
            margin-left: 20px;
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 10px 15px 0px 10px;
            height: 30px;
            &:hover {
                background-color: lighten($cyan-10, 17);
                opacity: 0.8;
            }
            &:active {
                opacity: 1;
            }
            &__icon {
                margin: 11px 7px 0 0px;
                margin-top: -5px;
                & .paragraph-icon-- {
                    stroke: darken($cyan-30, 5);
                }
            }
        }
    }
}
</style>