<template lang="pug">
div.input-component(
    :class=`[
        (!!style_component && !!style_component.class) ? style_component.class : '',
        { 
            'is-disabled': disabled,
            'is-focused': focused
        }
    ]`
)
    span.regular.font-body.input-component__label(
        v-if="!!label"
        :class="{ 'error': (isError && value === '') }"
    ) {{ label }}
    div.input-component__inner.back_grey2.flex
        div.input-component__prepend.inline-block
            slot(name="prepend-input")
        input.input-component__input.inline-block.black.back_grey2(
            :value="upperAllCase ? value.toUpperCase() : value",
            @input="handleInput"
            @change="handleChange"
            :maxLength="crop ? maxLength : ''"
            :placeholder="placeholder"
            :disabled="disabled"
            type="text"
            @focus="handleFocus"
            @blur="handleBlur"
            :id="idObject"
            ref="input"
        )
        p.input-component__counter.regular.font-tech.inline-block(
            v-if="hasMaxlength"
            :class="limitClasses"
        ) {{ counter }}
        p.input-component__text.regular.font-tech.inline-block.grey50(v-if="!!text") {{ text }}
        div.input-component__append.inline-block
            slot(name="append-input")
</template>

<script>
import Maxlength from '@/utils/mixins/maxLength.js';

export default {
    name: 'InputComponent',
    componentName: 'InputComponent',
    mixins: [ Maxlength ],
    props: {
        value: String,
        placeholder: String,
        label: String,
        text: String,
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
        crop: {
            type: Boolean,
            default: true
        },
        upperAllCase: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            curValue: '',
            focused: false,
            idObject: '',
        }
    },
    watch: {
        value: {
            handler(newValue, oldValue) {
                // this.curValue = newValue;
                this.updateCounter(newValue);
            },
            immediate: true
        }
    },
    created(){
        console.log("CREATED INPUT");
        this.$store.commit('incObjectID');
        this.idObject = this.$store.getters.getObjectID;
        // this.updateCounter(this.value);
    },
    methods:{
        handleFocus(event){
            this.focused = true;
        },
        handleBlur(event){
            this.focused = false;
        },
        handleInput(event) {
            console.log("[InputComponent.vue]: handleInput: ", event);
            // this.curValue = event.target.value;
            this.$emit('input', this.upperAllCase ? event.target.value.toUpperCase() : event.target.value);
        },
        handleChange(event) {
            console.log("[InputComponent.vue]: handleChange: ", event);
            // this.curValue = event.target.value;
            this.$emit('input', this.upperAllCase ? event.target.value.toUpperCase() : event.target.value);
        },
    }
}
</script>


<style lang="scss">



.input-component {
    width: 100%;
    position: relative;
    padding: 0;
    &__label {
        width: 100%;
        padding: 10px 0;
    }
    &__inner {
        width: calc(100% - 30px);
        height: 38px;
        border: 1px solid $grey10;
        padding: 0 14px;
        &:hover {
            border: 1px solid $grey33;
        }
    }
    &__input {
        flex: 1;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: none;
        outline: none;
    }
    &__counter , &__text {
        margin-left: 10px;
        margin-top: 12px;
        margin-bottom: 11px;
    }
    &.is-focused {
        .input-component {
            &__inner {
                background-color: $white;
                border: 1px solid $grey33;
            }
            &__input {
                background-color: $white;
            }
        }
    }
    &.is-disabled {
        color: $grey50;
        .input-component {
            &__inner {
                border: 1px solid $grey10;
                &:hover {
                    border: 1px solid $grey10;
                }
            }
            &__input {
                cursor: not-allowed;
                color: $grey50;
            }
        }
    }
}



// @import "@/assets/styles/variables.sass"


    
// .input-component
//     position: relative
//     width: calc(100% - 40px)
//     padding: 0 20px 20px 20px
//     .input-component-title
//         padding: 10px 00px 10px 00px
//         color: $black
//         width: calc(100%)
//     .red_color
//         color: $red
//     .disabled
//         color: $grey50
//     .input-container
//         width: calc(100% - 30px)
//         height: 38px
//         position: relative
//         border: 1px solid $grey10
//         padding: 0 14px 0 14px
//         background-color: $grey2
//         display: flex
//         &:hover
//             border: 1px solid $grey33
//         .input-place
//             background-color: $grey2
//             height: 100%
//             width: 100%
//             margin: auto auto
//             padding: 0
//             color: $black
//             border: 0
//             display: inline-block
//             outline: none
//         .count-symbol
//             display: inline-block
//             position: relative
//             color: $grey50
//             //right: 14px
//             top: 12px
//             margin-left: 10px
//         .text-info
//             display: inline-block
//             position: relative
//             font-size: 12px
//             line-height: 15px
//             //right: 10px
//             color: $grey50
//             margin: 12px 0 2px 0
//             margin-left: 10px
//         .red_color
//             color: $red
//         .orange_color
//             color: #D17E00
//         .count-active
//             //width: calc(100% - 30px)
//         .permalink
//             //width: calc(100% - 65px)
//         .text-info-
//             //width: calc(100% - 35px)
//         .div-permalink
//             display: inline-block
//             position: relative
//             padding: 9px 0 0 0 
//             margin: 0
//             color: $grey50
//             //width: 65px
    
//     .disabled-border
//         border: 1px solid $grey10  
//         &:hover
//             border: 1px solid $grey10
//         .input-place  
//             cursor: not-allowed
//             color: $grey50

//     .red_border
//             border-color: $red
    
//     .focus-input
//         background-color: $white
//         border: 1px solid $grey33
//         .input-place
//             background-color: $white
       
</style>