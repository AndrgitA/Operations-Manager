<template lang="pug">
div.textarea-component(
    :class=`[
        (!!style_component && !!style_component.class) ? style_component.class : '',
        { 
            'is-disabled': disabled,
            'is-focused': focused
        }
    ]`
)
    span.regular.font-body.textarea-component__label(
        v-if="!!label"
        :class="{ 'error': (isError && value === '') }"
    ) {{ label }}
    div.textarea-component__inner.back_grey2.flex
        div.textarea-component__prepend.inline-block
            slot(name="prepend-textarea")
        textarea-autosize.textarea-component__textarea.inline-block.black.back_grey2(
            v-model="curValue",
            @input="handleTextarea"
            :maxLength="crop ? maxLength : ''"
            :placeholder="placeholder"
            :disabled="disabled"
            @focus.native="handleFocus"
            @blur.native="handleBlur"
            :id="idObject"
            :autosize="autosize"
            :rows="rows"
            ref="textarea"
        )
        div.inline-block.textarea-component__right-block
            p.textarea-component__counter.regular.font-tech.inline-block(
                v-if="hasMaxlength"
                :class="limitClasses"
            ) {{ counter }}
            p.textarea-component__text.regular.font-tech.inline-block.grey50(v-if="!!text") {{ text }}
        div.textarea-component__append.inline-block
            slot(name="append-textarea")
</template>

<script>
import Maxlength from '@/utils/mixins/maxLength.js';

export default {
    name: 'TextareaComponent',
    componentName: 'TextareaComponent',
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
        autosize: {
            type: Boolean,
            default: true
        },
        rows: {
            type: Number,
            default: 1
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
                this.curValue = newValue;
                this.updateCounter(newValue);
            },
            immediate: true
        }
    },
    created(){
        console.log("CREATED TEXTAREA");
        this.$store.commit('incObjectID');
        this.idObject = this.$store.getters.getObjectID;
    },
    methods:{
        handleFocus(event){
            this.focused = true;
        },
        handleBlur(event){
            this.focused = false;
        },
        handleTextarea(value) {
            if (this.value !== value) {
                this.$emit('input', value);
            }
        },
    }
}
</script>

<style lang="scss">
.textarea-component {
    width: 100%;
    position: relative;
    padding: 0;
    &__label {
        width: 100%;
        padding: 10px 0;
    }
    &__inner {
        width: calc(100% - 30px);
        // height: 38px;
        border: 1px solid $grey10;
        padding: 10px 14px;
        &:hover {
            border: 1px solid $grey33;
        }
    }
    &__textarea {
        flex: 1;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: none;
        outline: none;
    }
    &__counter , &__text {
        margin-left: 10px;
        margin-top: 4px;
        width: auto;
    }
    &__right-block {
        display: inline-flex;
        flex-direction: column-reverse;
    }
    &__text {
        order: 1;
        height: 100%;
    }
    &__counter {
        padding-bottom: 2px;
    }
    &.is-focused {
        .textarea-component {
            &__inner {
                background-color: $white;
                border: 1px solid $grey33;
            }
            &__textarea {
                background-color: $white;
            }
        }
    }
    &.is-disabled {
        color: $grey50;
        .textarea-component {
            &__inner {
                border: 1px solid $grey10;
                &:hover {
                    border: 1px solid $grey10;
                }
            }
            &__textarea {
                cursor: not-allowed;
                color: $grey50;
            }
        }
    }
}
</style>