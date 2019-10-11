<template lang="pug">
div.input-number(
    :class=`[
        (!!style_component && !!style_component.class) ? style_component.class : '',
        {
            'is-disabled': disabled,
            'is-focused': focused
        }
    ]`
)
    span.regular-font-body.input-number__label(
        v-if="!!label"
        :class="{ 'error': (isError && (value === '' || value === null)) }"
    ) {{ label }}
    div.input-number__inner.back_grey2.flex
        div.input-number__prepend.inline-block
            slot(name="prepend-input")
        input.input-number__input.inline-block.black.back_grey2(
            :value="curValue"
            @input="handleInput"
            @change="handleInput"
            :placeholder="placeholder"
            :disabled="disabled"
            type="text"
            @keypress="keyPress"
            @keydown.up="keyDown(38, $event)"
            @keydown.down="keyDown(40, $event)"
            @focus="handleFocus"
            @blur="handleBlur"
            :id="idObject"
            ref="input"
        )
        div.input-number__text.regular.font-tech.inline-block.grey50(v-if="!!text") {{ text }}
        div.input-number__append.inline-block
            slot(name="append-input")
</template>

<script>
export default {
    name: 'InputNumber',
    componentName: 'InputNumber',
    props: {
        value: {
            type: [String, Number],
            default: null
        },
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
        nullable: {
            type: Boolean,
            default: false
        },
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        integer: {
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
                if (Object.prototype.toString.call(newValue) === '[object Number]') {
                    this.curValue = isNaN(newValue) ? (this.nullable ? '' : '0') : newValue.toString();
                } else {
                    this.curValue = newValue.length === 0 ? (this.nullable ? '' : '0') : newValue;
                }
               
            },
            immediate: true
        }
    },
    computed: {
    },
    methods: {
        keyPress(event) {
            console.log("[InputNumber.vue]: keyPress: ", event.target.value);
            let evt = (event) ? event : window.event;
            let charCode = (evt.which) ? evt.which : evt.keyCode;

            if (charCode < 48 || charCode > 57) {
                evt.preventDefault();
            }
            console.log(charCode);
        },
        handleInput(event) {
            console.log("[InputNumber.vue]: handleInput: ", event);
            let targetValue = event.target.value,
                parseValue = Number.parseInt(event.target.value);

            if (targetValue !== '' && !isNaN(parseValue)) {
                if (this.min > parseValue) {
                    this.$emit('input', this.min);
                    event.target.value = this.min.toString();
                } else if (this.max < parseValue) {
                    this.$emit('input', this.max);
                    event.target.value = this.max.toString();
                } else {
                    this.$emit('input', parseValue);
                }
            } else {
                if (this.nullable) {
                    this.$emit('input', null);
                    event.target.value = '';
                } else {
                    this.$emit('input', 0);
                    event.target.value = '0';
                }
            }
        },
        keyDown(key, event) {
            console.log("[InputNumber.vue]: keyDown: ", key, event, event.target.value === '');
            let parseValue = Number.parseInt(event.target.value);
            if (key === 38) {   // up
                event.preventDefault();
                this.$emit('input', event.target.value === '' || isNaN(parseValue) ? 1 : (parseValue + 1 > this.max) ? this.max : ++parseValue);
            } else if (key === 40) {            // down
                event.preventDefault();
                this.$emit('input', (event.target.value === '' || isNaN(parseValue) || parseValue < 1) ? 0 : --parseValue);
            }
        },
        handleFocus(event) {
            this.focused = true;
        },
        handleBlur(event) {
            this.focused = false;
            let targetValue = event.target.value,
                parseValue = Number.parseInt(event.target.value);
            if (targetValue !== '' && !isNaN(parseValue)) {
                if (this.min > parseValue) {
                    this.$emit('input', this.min);
                    event.target.value = this.min.toString();
                } else if (this.max < parseValue) {
                    this.$emit('input', this.max);
                    event.target.value = this.max.toString();
                } else {
                    this.$emit('input', parseValue);
                }
            } else {
                if (this.nullable) {
                    this.$emit('input', null);
                    event.target.value = '';
                } else {
                    this.$emit('input', 0);
                    event.target.value = '0';
                }
            }
        }
    }

}
</script>

<style lang="scss">
.input-number {
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
    &__text {
        margin-left: 10px;
        margin-top: 12px;
        margin-bottom: 11px;
    }
    &.is-focused {
        .input-number {
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
        .input-number {
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
</style>