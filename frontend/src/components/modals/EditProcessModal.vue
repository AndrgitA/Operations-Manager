<template lang="pug">
div.scroll-container.overflow-hidden-auto.edit-process-modal(@click="$event.stopPropagation()")
    div.width-window.overflow-auto-hidden
        div.panel-container
            div.edit-process-modal__inner-containter.back_white(v-if="!!struct && !!curValue && !!curSectionStruct")
                header-modal(
                    :title="struct.title"
                    @onClose="handleCloseHeader"
                )
                dynamic-fields-section(
                    v-model="curValue"
                    :fields="curSectionStruct.fields"
                    v-bind="curSectionStruct.options"
                )
                div.edit-process-modal__bottom
                    button.edit-process-modal__bottom-button.btn-cyan.regular.font-body.white(@click="handleButton") {{ struct.button }}
</template>

<script>
import HeaderModal from '@/components/modals/elements/HeaderModal.vue';
import DynamicFieldsSection from '@/components/sections/DynamicFieldsSection.vue';

export default {
    name: 'EditProcessModal',
    componentName: 'EditProcessModal',
    components: {
        HeaderModal, 
        DynamicFieldsSection
    },
    props: {
        value: {
            type: Object,
            required: true
        },
        struct: {
            type: Object,
            required: true
        },
        callback: {
            type: Function,
            default: null
        },
        indexModal: {
            type: Number,
            required: true
        },
        eventValue: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            curValue: null,
            curSectionStruct: null
        }
    },
    watch: {
        value: {
            handler(newValue, oldValue) {
                this.curValue = this.$panel.clone(newValue);
            },
            immediate: true
        },
        struct: {
            handler(newValue, oldValue) {
                if (!!newValue && newValue.hasOwnProperty('sectionStruct')) {
                    this.curSectionStruct = this.$panel.clone(newValue.sectionStruct);
                }
            },
            immediate: true
        }
    },
    methods: {
        checkFillFields() {
            let flagFill = true;
            this.curSectionStruct.fields = this.curSectionStruct.fields.map(field => {
                let type = field.type,
                    fillValid = field.hasOwnProperty('options') &&
                                field.options.hasOwnProperty('passFillValid') &&
                                field.options.passFillValid,
                    notValidValue = {
                        'input': '',
                        'textarea': '',
                        'inputDate': '',
                        'inputNumber': ''
                    };
                if (!fillValid && notValidValue.hasOwnProperty(field.type)) {
                    if (this.$panel.isEqual(this.curValue[field.name], notValidValue[field.type])) {
                        flagFill = false;
                        field.options['isError'] = true;
                    }
                }
                return field;
            });
            return flagFill;
        },
        handleCloseHeader(event) {
            console.log("[EditProcessModal.vue]: handleCloseHeader: ", event);
            if (this.callback !== null && this.callback !== undefined) {
                this.callback({ indexModal: this.indexModal, typeEvent: 'close', event });
            }
        },
        handleButton(event) {
            console.log("[EditProcessModal.vue]: handleButton: ", event);
            if (!this.checkFillFields()) {
                // this.$store.commit('addNotification', { text: this.$t('$notifications.fill_all_fields'), color: 'white' })
                return;
            };
            if (this.callback !== null && this.callback !== undefined) {
                this.callback({ indexModal: this.indexModal, typeEvent: this.struct.buttonNameEvent, value: this.curValue, event, eventValue: this.eventValue });
            }
        }
    }
}
</script>

<style lang="scss">
.edit-process-modal {
    overflow-y: auto;
    height: 100vh;
    width: 100%;
    &__inner-containter {
        margin-left: auto;
        margin-right: auto;
        margin-top: 100px;
        width: 610px;
        margin-bottom: 20px;
    }

    &__bottom {
        width: 100%;
        height: 40px;
        position: relative;
        padding-bottom: 20px;
        padding-top: 40px;
        &-button {
            padding: 10px 20px;
            min-width: 150px;
            // margin: 20px;
            position: absolute;
            right: 20px;
            height: 42px;
        }
    }
    &__checkbox {
        margin: 10px 19px 20px 19px;
        width: auto;
        // width: calc(100% - 38px);
        &-label {

        }
    }
}
</style>