<template lang="pug">
div.menu-bar.back_cyan-dark
    div.panel-container
        div.menu-bar__bar.flex-start
            div.menu-bar__bar-start
                span.medium.font-title.white {{ $t('$menu.name_panel') }}
            div.menu-bar__bar-center.ml-30
                a.inline-block(v-for="item in pages")
                    router-link.regular.font-body.item-menu.cyan-50(v-if="item.link !== ''" :to="item.link" :class="item.class || ''") {{ item.name }}
            div.menu-bar__bar-end
                dropdown-menu.menu-bar_bar-end-dropdown.cyan-50(
                    :dropdown_title="fullName"
                    :items="settings"
                    @onChange="onChange"
                )
</template>

<script>
import DropdownMenu from '@/components/dropdown/DropdownMenu.vue';

export default {
    components: {
        DropdownMenu
    },
    data() {
        return {
            name: 'MenuBar',
            nameComponent: 'MenuBar',
            pages: [],
            settings: [ this.$t('$menu.logout') ],
            all_menu: {
                MONITORING: { name: this.$t('$menu.monitoring'), link: '/monitoring' },
                PHOTOSESSIONS: { name: this.$t('$menu.processes'), link: '/processes' },
                FEED: { name: this.$t('$menu.scripts'), link: '/scripts' },
            }
        };
    },
    computed: {
        fullName() {
            let user = this.$store.state.user;
            return `${ user.login }`;
        }
    },
    created() {
        this.initMenu();
    },
    methods: {
        initMenu() {
            this.pages = Object.values(this.all_menu);
        },
        onChange(index) {
            switch (index) {
                case 0:
                    this.$store.commit('Logout', this.$router);
                    // this.$router.replace({ path: '/login' });
                    this.$store.commit('updatePageData');
                    break;
            }
        }
    }
}
</script>

<style lang="scss">
.menu-bar {
    position: relative;
    width: 100%;
    height: 60px;
    &__bar {
        position: relative;
        width: 100%;
        &-start {
            & span {
                padding: 20px 0;
            }
        }
        &-center {
            flex: 1;
            width: 100%;
            & a {
                text-decoration: none;
                outline: none;
                padding-top: 20px;
                .item-menu {
                    position: relative;
                    padding: 20px 15px;
                    &:hover {
                        color: $white;
                    }
                }
                &.router-link-active {
                    color: $white;
                    padding-bottom: 17px;
                    border-bottom: 3px solid $grey5;
                }
            }
        }
        &-end {
            margin-left: 30px;
            padding-top: 20px;
            .menu-bar_bar-end-dropdown {
                display: inline-block;
                padding-bottom: 10px;
                > .el-dropdown {
                    cursor: pointer;
                    .dropdown-menu__title {
                        padding-bottom: 20px;
                        padding-left: 15px;
                    }
                }
            }
        }
        .ml-30 {
            margin-left: 30px;
        }
    }
}
</style>