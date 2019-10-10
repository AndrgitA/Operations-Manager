<template lang="pug">
div#page-scripts.scroll-containter.overflow-hidden-auto.back_cyan-1(v-if="isShowData")
    div.width-window.scripts__title
        title-page.back_cyan-10(
            :value="getTitleValue"
        )
    div.width-window.scripts__content
        div.panel-container
            div.scripts__content-left.inline-block
                div.scripts__section
                    blocks-component(
                        :value="material.blocks"
                        @input="handleInput('blocks', $event)"
                        :optionsDraggable="optionsDraggable"
                    )
            div.scripts__content-right.scripts__panel-control.inline-block
                scripts-panel(
                    :title="$t('$controls.scripts')"
                    :count="material.blocks.length"
                    :needSave="needSave"
                    @onEmit="handleEmitControl"
                )
</template>

<script>
import TitlePage from '@/components/titles/TitlePage.vue';
import BlocksComponent from '@/components/elements/fields/BlocksComponent.vue';

import ScriptsPanel from '@/components/controlPanels/ScriptsPanel.vue';

export default {
    name: 'PageScripts',
    componentName: 'PageScripts',
    components: {
        TitlePage,
        BlocksComponent,
        ScriptsPanel
    },
    data() {
        return {
            optionsDraggable: {
                handle: '.head-block__handlebar',
                draggable: '.script-block',
            },
            isShowData: false,
            originalMaterial: null,
            material: {
                blocks: []
            }
        };
    },
    computed: {
        getTitleValue() {
            return {
                titleText: "Скрипты для тестирования",
                titleInfo: "(OS) Ubuntu 18.04.3 LTS"
            };
        },
        needSave() {
            return !this.$panel.isEqual(this.material, this.originalMaterial);
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        handleInput(key, value) {
            this.material[key] = value;
        },
        handleEmitControl() {
            console.log("[Scripts.vue]: handleEmitControl: ");
            let data = this.setPositions(this.material.blocks);
            data.map(block => {
                if (block.status === 'NOT_CHANGED') {
                    block.status = 'UPDATE';
                }
                return block;
            });
            console.log("POST DATA: ", data);
            this.putScripts(data);
        },
        putScripts(putData) {
            console.log("[Scripts.vue]: putScripts: ", putData);
            this.$store.state.axios.put('/scripts', putData).then(response => {
                console.log('[Scripts.vue]: putScripts(response): ', response);
                if (response.status === 200) {
                    this.$store.commit('addNotification', { 
                        text: `${ this.$t('$notifications.update_success') }`, 
                        color: 'green' 
                    });
                    this.fetchData();
                }
            }).catch(error => {
                console.log('[Scripts.vue]: putScripts(error): ', error);
            })
        },
        setPositions(values) {
            let i = 0;
            let array = values.map(block => {
                block.position = i++;
                return block;
            })
            return array;
        },
        getSortPosition(values) {
            let result = this.$panel.clone(values);
            result.sort((a, b) => {
                if (a.position < b.position) return -1;
                if (a.position > b.position) return 1;
                return 0;
            });
            return result;
        },
        fetchData() {
            this.$store.state.axios.get('/scripts').then(response => {
                console.log("[Scripts.vue]: fetchData(response): ", response);
                if (response.status === 200){
                    let material = { blocks: this.getSortPosition(response.data) };
                    material.blocks.map(block => {
                        block.status = 'NOT_CHANGED';
                        return block;
                    });
                    this.material = material;
                    this.originalMaterial = this.$panel.clone(this.material);
                    this.isShowData = true;
                }
            }).catch(error => {
                console.log("[Scripts.vue]: fetchData(error): ", error);
            });
        },

    }

}
</script>

<style lang="scss">
#page-scripts {
    width: 100%;
    height: calc(100vh - 60px);
    box-sizing: border-box;
    padding-bottom: 100px;
    .scripts {
        &__title {
            position: -webkit-sticky; /* Required for Safari */
            position: sticky;
            top: -20px;
            z-index: 100;
        }
        &__content {
            width: 100%;
            &-left {
                width: 820px;
            }
            &-right {
                width: 400px;
                margin-left: 20px;
                margin-top: 20px;
            }
        }
        &__section {
            margin-top: 20px;
            width: 100%;
            background-color: $white;
        }
        &__panel-control {
            position: -webkit-sticky; /* Required for Safari */
            position: sticky;
            top: 100px;
        }
    }
}
</style>