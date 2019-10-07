<template lang="pug">
div.dropdown-menu
    el-dropdown.grey50(trigger="click" @visible-change="dropdownHover = $event")
        div.regular.font-body.dropdown-menu__title(:class="{ 'white-item-menu': dropdownHover }") {{ dropdown_title }}
            chevron.dropdown-menu__chevron(:style="{ transform: `rotate(${ dropdownHover ? 180 : 0 }deg)` }")
        el-dropdown-menu.dropdown-menu__m-menu(slot="dropdown")
            div(v-for="(item, index) in items" @click="onClick(index)")
                el-dropdown-item.regular.font-body {{ item }}
</template>

<script>
import Chevron from 'icons/smallChevron.svg';

export default {
    props: {
        dropdown_title: String,
        items: Array
    },
    components: {
        Chevron
    },
    data() {
        return {
            dropdownHover: false
        }
    },
    methods: {
        onClick(index) {
            this.$emit('onChange', index);
        }
    }
}
</script>

<style lang="scss">
.dropdown-menu {
    & .el-dropdown {
        outline: none;
        padding-bottom: 10px;
        height: 20px;
        .dropdown-menu {
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
            .dropdown-menu__chevron {
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
.dropdown-menu__m-menu {
    padding: 7px 0 8px 0;
    .el-dropdown-menu__item {
        min-width: 170px;
        padding: 8px 15px 7px 15px;
        @include user-select(none);
    }
}
.white-item-menu {
    outline: none;
    color: $white;
    .dropdown-menu__chevron {
        .chevron-- {
            stroke: $white !important;
        }
    }
}
</style>