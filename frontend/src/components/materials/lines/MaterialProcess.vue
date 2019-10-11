<template lang="pug">
div.material-line-process(v-if="!!data")
    div.material-line-process__inner.material-process-layout.back_white
        span.pos0.regular.font-body.black.inline-block.limited-text-line {{ data.user }}
        span.pos1.regular.font-body.black.inline-block.limited-text-line {{ data.c }}
        span.pos2.regular.font-body.black.inline-block.limited-text-line {{ data.mem }}
        span.pos3.regular.font-body.black.inline-block.limited-text-line {{ data.pid }}
        span.pos4.regular.font-body.black.inline-block.limited-text-line {{ data.pgid }}
        span.pos5.regular.font-body.black.inline-block.limited-text-line {{ data.ppid }}
        span.pos6.regular.font-body.black.inline-block.limited-text-line {{ data.psr }}
        span.pos7.regular.font-body.black.inline-block.limited-text-line {{ data.rss }}
        span.pos8.regular.font-body.black.inline-block.limited-text-line {{ data.sid }}
        span.pos9.regular.font-body.black.inline-block.limited-text-line {{ data.start }}
        span.pos10.regular.font-body.black.inline-block.limited-text-line {{ data.stat }}
        span.pos11.regular.font-body.black.inline-block.limited-text-line {{ data.sz }}
        span.pos12.regular.font-body.black.inline-block.limited-text-line {{ data.time }}
        span.pos13.regular.font-body.black.inline-block.limited-text-line {{ data.tpgid }}
        span.pos14.regular.font-body.black.inline-block.limited-text-line {{ data.tty }}
        span.pos15.regular.font-body.black.inline-block.limited-text-line {{ data.uid }}
        span.pos16.regular.font-body.black.inline-block.limited-text-line {{ data.vsz }}
        template(v-if="!!data.cmd && data.cmd.length > 146")
            div.pos17(:panel__tooltip="data.cmd")
                span.regular.font-body.black.limited-text-line {{ data.cmd }}
        template(v-else)
                span.pos17.regular.font-body.black.limited-text-line {{ data.cmd }}
        dropdown-component.material-line-process__dropdown.inline-block(
            :items="dropdownItems"
            @onChange="handleDropdown"
        )
            div.material-line-process__dropdown-icon.cursor-pointer(slot="dropdown-slot-label")
                action-icon



</template>

<script>
import DropdownComponent from '@/components/dropdown/DropdownComponent.vue';
import ActionIcon from 'icons/Action.svg';

export default {
    name: 'MaterialPromocode',
    componentName: 'MaterialPromocode',
    components: {
        DropdownComponent, ActionIcon
    },
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            codeSignal: {
                0: "EXIT",
                1: "STOP",
                2: "INTERRUPT",
                3: "KILL"
            },
        };
    },
    computed: {
        dropdownItems() {
            let result = [
                this.$t('$dropdown.exit'),
                this.$t('$dropdown.stop'),
                this.$t('$dropdown.interrupt'),
                this.$t('$dropdown.kill')
            ];
            // if (!!this.data) {
            //     if (this.data.type === 'PUBLIC') {
            //         result.unshift(this.$t('$dropdown.edit'))
            //     }
            // }
            return result;
        }
    },
    methods: {
        handleDropdown(indexDropdown) {
            console.log("[MaterialPromocode.vue]: handleDropdown: ", indexDropdown);
            
            this.$emit('onSignal', this.codeSignal[indexDropdown]);
            // if (this.data.type === 'PUBLIC') {
            //     if (indexDropdown === 0) {
            //         console.log("EDIT");
            //         this.$emit('onEdit');
            //     } else {
            //         console.log("DELETE");
            //         this.$emit('onRemove');
            //     }
            // } else if (this.data.type === 'REFERAL') {
            //     console.log("DELETE");
            //     this.$emit('onRemove');
            // }
        }
    }
    
}
</script>

<style lang="scss">
.material-line-process {
    &__inner {
        width: 100%;
        min-height: 80px;
        box-sizing: border-box;
        padding: 20px 0 19px 0;
        border-right: 1px solid $cyan-10;
        border-bottom: 1px solid $cyan-10;
        border-left: 1px solid $cyan-10;
        &:hover {
            background-color: lighten($cyan-5, 18);
        }
        // & .pos0 {
        //     margin-left: 10px;
        // }
        & .pos17 {
            width: calc(100% - 40px);
            margin: 10px 20px 0 20px;
            word-wrap: normal;
            &::before {
                width: 100%;    
            }
        }
    }
    &:first-child {
        .material-line-process__inner {
            padding-top: 19px;
            border-top: 1px solid $cyan-10;
        }
    }
    &__dropdown {
        width: 30px;
        height: 30px;
        right: 20px;
        top: 10px;
        position: absolute;
        &-icon {
            & .action-icon-- {
                fill: $cyan-highlight;
            }
        }
    }
    &__indicator {
        margin-top: 5px;
        margin-left: 19px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: $grey33;
    }
    &__link {
        &:active, &:hover {
            color: $blue;
        }
    }
    // &-inner {
    //     width: 100%;
    //     height: 100px;
    //     box-sizing: border-box;
    //     padding: 20px 19px 19px 19px;
    //     border-bottom: 1px solid $grey10;
    //     border-right: 1px solid $grey10;
    //     border-left: 1px solid $grey10;
    //     &:hover {
    //         background-color: $grey2;
    //     }
    //     .pos0 {
    //         margin-left: 10px;
    //     }
    // }

    // &-image {
    //     height: 60px;
    //     width: 60px;
    //     border-radius: 30px;
    //     background-size: cover;
    // }
    // &-icon {
    //     width: 10px;
    //     height: 10px;
    //     margin: 5px 0 0 20px;
    //     border-radius: 10px;
    // }
    // // .material-span {

    // // }
    // // .material-p {
    // //     max-height: 40px;
    // //     word-break: break-all;
    // //     display: block;
    // //     overflow-y: hidden;
    // // }

}
</style>