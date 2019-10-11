<template lang="pug">
div.dropdown-component(:class="{ 'is-active': dropdownActive }")
    el-dropdown.grey50(trigger="click" @visible-change="dropdownActive = $event")
        slot(name="dropdown-slot-label")
        el-dropdown-menu.dropdown-component__drop-menu(slot="dropdown")
            div(v-for="(item, index) in items" @click="$emit('onChange', index);")
                el-dropdown-item.regular.font-body {{ item }}
</template>

<script>
import Chevron from 'icons/smallChevron.svg';

export default {
    name: 'DropdownComponent',
    componentName: 'DropdownComponent',
    props: {
        dropdown_title: String,
        items: Array
    },
    data() {
        return {
            dropdownActive: false
        }
    },
}
</script>

<style lang="scss">
.dropdown-component {
    & .el-dropdown {
        outline: none;
        padding-bottom: 10px;
        height: 20px;
        .dropdown-component {
            &__title {
                outline: none;
                height: 20px;
                margin-right: 22px;
                @include user-select(none);
            }
            &__chevron {
                position: absolute;
                right: 0;
                .chevron-- {
                    stroke: $grey50;
                }
            }
            
        }
        &:hover {
            color: $white;
            .dropdown-component__chevron {
                .chevron-- {
                    stroke: $white;
                }
            }
        }
    }
}
.el-popper[x-placement^=bottom] {
    margin-top: 0px;
}
.dropdown-component__drop-menu {
    padding: 7px 0 8px 0;
    .el-dropdown-component__item {
        min-width: 170px;
        padding: 8px 15px 7px 15px;
        @include user-select(none);
    }
}
</style>