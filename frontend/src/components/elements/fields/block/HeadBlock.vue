<template lang="pug">
div.head-block
    p.regular.font-desc.head-block__index.inline-block.cyan-dark {{ indexComponent + 1 }} Position
    p.regular.font-body.inline-block.cyan-50(
        v-if="!!status && (status !== 'NOT_CHANGED')"
        :class=`{
            'error': status === 'DELETE',
            'warning': status === 'UPDATE'
        }`) {{ $t(`$common.status_script.${ status }`) }} 
    div.head-block__handlebar.inline-block.cursor-pointer
        handlebar
    dropdown-component.head-block__dropdown.inline-block(
        :items="dropdownItems"
        @onChange="handleDropdown"
    )
        div.head-block__dropdown-icon.cursor-pointer(slot="dropdown-slot-label")
            action-icon
</template>

<script>
import Handlebar from 'icons/Handlebar.svg'
import DropdownComponent from '@/components/dropdown/DropdownComponent.vue';
import ActionIcon from 'icons/Action.svg';

export default {
    name: 'HeadBlock',
    componentName: 'HeadBlock',
    components: {
        Handlebar, ActionIcon,
        DropdownComponent
    },
    props: {
        indexComponent: {
            type: Number,
            required: true
        }, 
        status: {
            type: String,
            default: null
        }
    },
    data() {
        return {
        }
    },
    computed: {
        dropdownItems() {
            if (this.status === 'NOT_CHANGED') {
                return [
                    this.$t('$dropdown.start'),
                    this.$t('$dropdown.delete')
                ];
            } else if (this.status === 'NEW') {
                return [
                    this.$t('$dropdown.delete')
                ];
            } else if (this.status === 'DELETE') {
                return [
                    this.$t('$dropdown.cancel'),
                ];
            } else if (this.status === 'UPDATE') {
                return [
                    this.$t('$dropdown.delete')
                ];
            } else if (this.status === 'START') {
                return [
                    this.$t('$dropdown.cancel'),
                    this.$t('$dropdown.delete')
                ];
            } else {
                return [
                    this.$t('$dropdown.cancel'),
                    this.$t('$dropdown.start'),
                    this.$t('$dropdown.delete')
                ];
            }
        }
    },
    methods: {
        handleDropdown(indexDropdown) {
            console.log("[MaterialPromocode.vue]: handleDropdown: ", indexDropdown);
            switch (indexDropdown) {
                case 0:
                    if (this.status === 'NOT_CHANGED') {
                        this.$emit('onStatus', 'START');
                    } else if (this.status === 'NEW') {
                        this.$emit('onDelete');
                    } else if (this.status === 'UPDATE') {
                        this.$emit('onStatus', 'DELETE');
                    } else {
                        this.$emit('onStatus', 'UPDATE');
                    }
                    break;
                case 1: 
                    if (this.status === 'NOT_CHANGED' || this.status === 'START') {
                        this.$emit('onStatus', 'DELETE');
                    } else {
                        this.$emit('onStatus', 'START');
                    }
                    break;
                case 2: 
                    this.$emit('onStatus', 'DELETE');
                    break;
            }
        }
    }
}
</script>

<style lang="scss">
.head-block {
    position: relative;
    background-color: $cyan-10;
    padding: 14px 0 14px 0;
    width: 100%;
    border-bottom: 1px solid $cyan-20;
    &__index {
        margin: 0px 10px 0 14px;
        padding: 1px 5px 0px 5px;
        background-color: $white;
        border-radius: 30px;
        min-width: 25px;
        text-align: center;
    }
    &__handlebar {
        position: absolute;
        padding: 15px 20px 15px 20px;
        top: 0px;
        // left: 379px;
        left: calc(50% - 30px);
        & .handlebar-icon--line {
            stroke: $cyan-30;
        }
    }
    &__dropdown {
        position: absolute;
        top: 10px;
        right: 14px;
        & .action-icon--{
            fill: $cyan-30;
        }
    }
}        
</style>