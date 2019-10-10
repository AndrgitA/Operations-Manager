<template lang="pug">
div.script-block(v-if="!!value")
    head-block.script-block__header(
        :indexComponent="indexComponent"
        @onDelete="$emit('onRemove')"
        @onStatus="changeStatusHandle"
        :status="getStatus"
    )
    div.script-block__area
        textarea-component(
            :value="curValue"
            :rows="3"
            placeholder="Script text ..."
            @input="inputHandle"
        )
    //- //textarea-lang-component(
    //-     v-model="value.text"
    //-     @input="edit('text', $event)"
    //-     :options="{'max_length': 1000, 'autosize_': true, 'crop': false }"
    //- //)
    //- markdown-locale-component.mklc(
    //-     v-model="value.text"
    //-     @input="edit('text', $event)"
    //-     :options="{'max_length': 1000, 'crop': false, 'disabled': disabled}"
    //-     :index="index"
    //- )
</template>

<script>
import HeadBlock from '@/components/elements/fields/block/HeadBlock.vue';
// import HeadContent from '@/components/Fields/Additional/HeadContent.vue'
// import InputLangComponent from '@/components/Fields/InputLocaleComponent.vue'
import TextareaComponent from '@/components/elements/fields/TextareaComponent.vue'

// import MarkdownLocaleComponent from '@/components/Fields/Additional/MarkdownLocaleComponent.vue'
export default {
    name: 'ScriptBlock',
    componentName: 'ScriptBlock',
    components: {
        HeadBlock, 
        TextareaComponent
    },
    props: {
        value: {
            type: Object,
            default: null
        },
        indexComponent: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            curValue: '',
            statuses: [ 'DELETE', 'START', 'NEW', 'UPDATE', 'NOT_CHANGED' ]
        }
    },
    watch: {
        value: {
            handler(newValue, oldValue) {
                if (!!newValue && newValue.hasOwnProperty("text")) {
                    this.curValue = newValue.text;
                }
            },
            immediate: true
        }
    },
    computed: {
        getStatus() {
            if (!!this.value &&
                this.value.hasOwnProperty('status') &&
                this.statuses.indexOf(this.value.status) !== -1) {
                return this.value.status;
            }
            return null;
        }
    },
    methods: {
        inputHandle(value) {
            let tmp = this.$panel.clone(this.value);
            tmp.text = value;
            if (tmp.status !== 'NEW') {
                tmp.status = 'UPDATE';
            }
            this.$emit('input', tmp);
        },
        changeStatusHandle(status) {
            let tmp = this.$panel.clone(this.value);
            tmp.status = status;
            this.$emit('input', tmp);
        }
    }
}
</script>

<style lang="scss">
.script-block {
    background-color: $white;
    box-sizing: border-box;
    border-bottom: 1px solid $cyan-20;
    &__area {
        padding: 20px;
        width: 100%;
        box-sizing: border-box;
    }
    &:last-child {
        border-bottom: none;
    }
}
// @import "@/assets/styles/variables.sass"
// .script-block
//     width: 100%
//     position: relative
//     .hc
//         margin-bottom: 20px
//     .mklc
        
</style>