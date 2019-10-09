<template lang="pug">
div.select-component(
    :class=`[
        (!!style_component && !!style_component.class) ? style_component.class : '',
        { 'is-disabled': disabled }
    ]`
)
    span.regular.font-body.select-component__label(
        v-if="!!label"
        :class="{ 'error': !!isError && getEmptyCheck }"
    ) {{ label }}
    el-select.select-component__general(
        v-model="tmpValue" 
        @change="update($event)" 
        :multiple="multiple"
        :allow-create="multiple" 
        :default-first-option="multiple"
        :disabled="disabled"
        :class="{'disabled': disabled}"
        :placeholder="getArrayCount"
        :id="id_tag"
        :noDataText="this.$t('$common.no_data')"
        v-bind="remoteOptions || {}"
        :filterable="getOptions.length > 30 || (!!remoteOptions && remoteOptions.hasOwnProperty('filterable') && remoteOptions.filterable)"
    )
        el-option.regular.font-body.select-component__general-option(
            v-for="(item, index) in getOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="!!item.disabled ? item.disabled : false"
        )
</template>

<script>
export default {
    name: 'SelectComponent',
    componentName: 'SelectComponent',
    props: {
        value: [ String, Array ],
        options: Array,
        label: {
            type: String,
            default: null
        },
        style_component: {
            type: Object,
            default: null
        },
        isError: {
            type: Boolean,
            default: false
        },
        placeholder: String,
        sortable: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        remoteOptions: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            tmpValue: null,
            select_options: [],
            id_tag: ''
        }
    },
    computed: {
        getArrayCount() {
            if (!!this.value && Object.prototype.toString.call(this.value) === '[object Array]') {
                return this.value.length + ' ' + this.$t('$fields.fields_selected');
            }
            return this.placeholder || this.$t('$common.none');
        },
        getEmptyCheck(){
            if (Object.prototype.toString.call(this.value) === '[object Array]'){
                return this.value.length == 0;
            } else {
                return this.value == '';
            }
            return false;
        },
        getOptions(){
            let cur_options = this.$panel.clone(this.select_options);
            if (this.sortable) {
                cur_options.sort((a, b) => {
                    let leftText = '',
                        rightText = '';
                    leftText = a.label;
                    rightText = b.label;
                    return (leftText.toLowerCase()).localeCompare(rightText.toLowerCase());
                });
                let fixedElements = {};
                for (let i = 0; i < cur_options.length; i++) {
                    if ('fixed_index' in cur_options[i]) fixedElements[i] = cur_options[i];
                }
                if (Object.keys(fixedElements).length !== 0) {
                    let new_options = this.$panel.clone(cur_options);
                    for (let j in fixedElements) {
                        new_options.splice(j, 1);
                    }
                    Object
                        .values(fixedElements)
                        .sort((a, b) => {
                            if (a.fixed_index < b.fixed_index) return -1;
                            if (a.fixed_index > b.fixed_index) return 1;
                            return 0;
                        })
                        .forEach(element => {
                            new_options.splice(element.fixed_index, 0, element);
                        });
                    return new_options;
                }
            }
            return cur_options;
            //this.setSelectValue(this.value);
        },
    },
    created(){
        //this.initializeSelect();
        this.$store.commit('incObjectID');
        this.id_tag = this.$store.getters.getObjectID;
    },
    watch: {
        value: {
            handler: function(n, o){
                this.setSelectValue(n);
            },
            immediate: true
        },
        options: {
            handler: function(n, o){
                this.initializeSelect();
            },
            immediate: true
        }
    },
    methods: {
        setSelectValue(n) {
            if (Object.prototype.toString.call(n) === '[object Array]'){
                this.tmpValue = this.$panel.clone(n);
                setTimeout(() => {
                    let element = document.getElementById(this.id_tag);
                    //console.log(element);
                    if (!!element) {
                        element.setAttribute('placeholder', this.getArrayCount)
                    }
                }, 500);
            } else {
                this.tmpValue = n;
            }
        },
        initializeSelect(){
            console.log("INIT SELECT", this.options);
            let options = [];
            if (!!this.options){
                this.options.forEach(selectValue => {
                    // if (select_value.type == 'value'){
                        options.push(selectValue);
                    // }
                });
            }
            console.log(options);
            this.select_options = options;
        },
        update(v){
            //console.log(v);
            this.$emit('input', v);
        },
    }
}
</script>

<style lang="scss">
.select-component {
    width: 100%;
    position: relative;
    padding: 0;
    &__label {
        width: 100%;
        padding: 10px 0;
    }
    &__general {
        width: calc(100% - 2px);
        .el-input {
            width: 100%;
            border: 1px solid $cyan-10;
            &:hover {
                border: 1px solid $cyan-20;
            }
            &.is-focus {
                border: 1px solid $cyan-10;
                background-color: $cyan-50;
            }
            &__inner {
                background-color: rgba($cyan-10, .2);
                color: $cyan-30;
                border: none;
                border-radius: 0;
            }
            &__icon {
                position: absolute;
                right: 0;
                color: $cyan-30;
            }
            &__suffix {
                margin: 0;
                left: 0;
                & .el-input__icon {
                    color: $cyan-30;
                }
            }
        }
        input::placeholder {
            color: $cyan-30;
        }
        .is-focus {
            box-shadow: 0 2px 12px 0 rgba($cyan-dark, 0.1);
            .el-input__inner {
                background-color: $white;
            }
        }
        .is-disabled {
            color: $grey33;
            .select-component__label {
                color: $grey33;
            }
            &:hover {
                color: $grey33;
                background-color: $white;
                border: 1px solid $grey10;
                .select-component__label {
                    color: $grey33;
                }
            }
            &:active {
                color: $grey33;
                background-color: $white;
            }
            .hover {
                color: $grey33;
                background-color: $grey33;
            }
        }
        &-option {

        }
    }
}
.black-placeholder {
    .el-select {
        input::placeholder {
            color: $black;
        }
        &__tags {
            display: none;
        }
    }
}
.select-component__general {
    &-option.selected {
        &::after {
            padding: 0;
            margin: 0;
            top: 8px;
            right: 0;
            color: $cyan-1;
        }
    }
}


</style>