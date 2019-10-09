<template lang="pug">
div.dynamic-fields-section(v-if="!!fields && !!value")
    div.dynamic-flelds-section__content.width-max-limit
        component.dynamic-fields-section__component(
            v-for="(field, index) in curFields"
            :key="index"
            :is="curComponents[field.type]"
            v-model="value[field.name]"
            v-bind="field.options"
            @input="handleInput(field.type, field.name, $event)"
        )
</template>

<script>
export default {
    name: 'DynamicFieldsSection',
    componentName: 'DynamicFieldsSection',
    props: {
        value: {
            type: Object,
            default: null
        },
        fields: {
            type: Array,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            allFields: {                // path(@/components/fields/{...})
                'input': 'InputComponent.vue',
                // 'inputDate': 'InputDate.vue',
                // 'inputImage': 'InputImage.vue',
                'inputNumber': 'InputNumber.vue',
                'select': 'SelectComponent.vue',
                'textarea': 'TextareaComponent.vue'
            },
            curFields: [],
            curComponents: {}
        };
    },
    watch: {
        fields: {
            handler(newValue, oldValue) {
                this.initializeStruct(newValue);
            },
            immediate: true
        }
    },
    methods: {
        handleInput(type, name, event) {
            console.log("[DynamicFieldsSection.vue]: handleInput: ", type, name, event);
            let newValue = this.$panel.clone(this.value);
            newValue[name] = event;
            this.$emit('input', newValue);
        },
        loadComponent(type) {
            return (resolve) => require([ `../elements/fields/${ this.allFields[type] }` ], resolve);
        },
        initializeStruct(struct) {
            console.log(struct);
            let fields = [];
            let components = [];
            if (Object.prototype.toString.call(struct) !== '[object Array]') {
                return;
            }
            struct.forEach(field => {
                if (Object.prototype.toString.call(field) === '[object Object]' &&
                    field.hasOwnProperty('type') &&
                    this.allFields.hasOwnProperty(field.type)) {
                    if (components.indexOf(field.type) === -1) {
                        components.push(field.type);
                    }
                    if (!this.curComponents.hasOwnProperty(field.type)) {
                        let load = this.loadComponent(field.type);
                        this.curComponents[field.type] = load;
                    }
                    fields.push(field);
                }
            })
            this.curFields = fields;

            Object.keys(this.curComponents).forEach(key => {
                if (components.indexOf(key) === -1) {               // old load component
                    delete this.curComponents[key];
                }
            });
            components = null;
        }
    }
}
</script>

<style lang="scss">
.dynamic-fields-section {
    & &__component {
        padding: 0 20px 20px 20px;
        width: calc(100% - 40px);
    }
}
</style>