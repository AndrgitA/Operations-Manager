<template lang="pug">
div.input-date(
    :class=`[
        (!!style_component && !!style_component.class) ? style_component.class : '',
        { 
            'is-disabled': disabled,
            'is-focused': focused
        }
    ]`
)
    span.regular.font-body.input-date__label(
        v-if="!!label"
        :class="{ 'error': (isError && value === '') }"
    ) {{ label }}
    el-date-picker.input-date__field(
        :value="value.toDateMyFormat(-1, this)"
        @input="handleInput"
        :type="type"
        prefix-icon="none"
        ref="input"
        :format="format"
        :disabled="disabled"
    )
    
</template>

<script>

export default {
    name: 'InputDate',
    componentName: 'InputDate',
    props: {
        value: String,
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
        type: {
            type: String,
            default: 'date'
        }
    },
    data() {
        return {
            value_format: 'dd.MM.yyyy',
            format: 'dd.MM.yyyy',
            focused: false
        }
    },
    created(){
        if (this.type === 'datetime'){          // TODO: check it fix for value_forma / format
            this.value_format = 'dd.MM.yyyy_HH:mm';
            this.format = 'dd.MM.yyyyHH:mm';
        } else {        // date
            this.value_format = 'dd.MM.yyyy';
            this.format = 'dd.MM.yyyy';
        }
    },
    methods: {
        handleInput(value) {
            console.log(value);
            if (value === null) {
                this.$emit('input', '');
            } else {
                if (this.type === 'datetime') {
                    this.$emit('input', new Date(value.getTime() + value.getTimezoneOffset() * 60 * 1000 * 2).toISOString().substr(0, 19));
                } else {    // date
                    this.$emit('input', new Date(value.getTime() - value.getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0]);
                }
            }
        }
    }
}
</script>

<style lang="scss">

.input-date {
    width: 100%;
    position: relative;
    padding: 0;
    &__label {
        width: 100%;
        padding: 10px 0;
    }
    & .el-date-editor.el-input, &__field {
        position: relative;
        width: 100%;
    }
    & .el-input__inner {
        height: 40px;
        padding: 10px 15px 10px 15px;
        border: 1px solid $grey10;
        border-radius: 0;
    }
    & input {
        border: 1px solid $grey10;
        background-color: $grey2;
        &::placeholder {
            color: $grey50;
        }
        &:active, &:focus {
            background-color: $white;
            border: 1px solid $grey33;
        }
        &:hover { 
            border: 1px solid $grey33;
        }
    }
}
span.el-date-picker__header-label {
    display: inline-block;
    vertical-align: sub;
}
</style>