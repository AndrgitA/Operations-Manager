<template lang="pug">
div#page-information.scroll-containter.overflow-hidden-auto.back_cyan-1(v-if="isShowData")
    div.width-window.information__content
        div.panel-container
            div.information__content-left.inline-block
                info-view-section.information__section(
                    :title="`${ $t('$sections.board') } / ${ $t('$sections.chassis') }`"
                    :data="getBoard"
                )
                info-view-section.information__section(
                    :title="`${ $t('$sections.storage') }`"
                    :data="getStorage"
                )

            div.information__content-right.information__panel-control.inline-block
                information-panel(
                    :title="$t('$controls.information')"
                    :name_os="material.packageInfo.os.name"
                    :architecture="material.packageInfo.os.architecture"
                    :bios="getBios"
                    :memoryRam="getRam"
                    :node="getNode"
                )
</template>

<script>
// import TitlePage from '@/components/titles/TitlePage.vue';
// import BlocksComponent from '@/components/elements/fields/BlocksComponent.vue';

import InformationPanel from '@/components/controlPanels/InformationPanel.vue';
import InfoViewSection from '@/components/sections/InfoViewSection.vue';

export default {
    name: 'PageInformation',
    componentName: 'PageInformation',
    components: {
    //     TitlePage,
    //     BlocksComponent,
        InfoViewSection,
        InformationPanel
    },
    data() {
        return {
            isShowData: false,
            material: {
                packageInfo: null,
                systemInfo: null
            }
        };
    },
    computed: {
        getBios() {
            return `${ this.material.packageInfo.bios.vendor }\nВерсия: ${ this.material.packageInfo.bios.version }\n ` +
                   this.material.packageInfo.bios.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1").toDateMyFormat(0, this);
        },
        getRam() {
            return `Всего ОП: ${ Math.round(this.material.systemInfo.Totalram / (1024 ** 3))  } GB\n` +
                   `Доступный: ${ Math.round(this.material.systemInfo.Freeram / (1024 ** 2))  } MB\n` +
                   `Всего подкачки: ${ Math.round(this.material.systemInfo.Totalswap / (1024 ** 2))  } MB\n` +
                   `Доступно подскачки: ${ Math.round(this.material.systemInfo.Freeswap / (1024 ** 2))  } MB\n`;
        },
        getNode() {
            return `Хост: ${ this.material.packageInfo.node.hostname }\n` +
                   `${ this.material.packageInfo.node.machineid }\n` +
                   `Часовой пояс: ${ this.material.packageInfo.node.timezone }\n`;
        },
        getBoard() {
            return [
                [
                    { name: 'assettag', text: this.material.packageInfo.board.assettag },
                    { name: 'name', text: this.material.packageInfo.board.name },
                    { name: 'vendor', text: this.material.packageInfo.board.vendor },
                    { name: 'version', text: this.material.packageInfo.board.version }
                ],
                [
                    { name: 'assettag', text: this.material.packageInfo.chassis.assettag },
                    { name: 'type', text: this.material.packageInfo.chassis.type },
                    { name: 'vendor', text: this.material.packageInfo.chassis.vendor },
                    { name: 'version', text: this.material.packageInfo.chassis.version }
                ]
            ]
        },
        getStorage() {
            return this.material.packageInfo.storage.map(storage => {
                return Object.keys(storage).map(key => {
                    return { name: key, text: storage[key] }
                })
            })
        }
        // getTitleValue() {
        //     return {
        //         titleText: "Скрипты для тестирования",
        //         titleInfo: "(OS) Ubuntu 18.04.3 LTS"
        //     };
        // },
        // needSave() {
        //     return !this.$panel.isEqual(this.material, this.originalMaterial);
        // }
    },
    created() {
        this.fetchData();
    },
    methods: {
        // handleInput(key, value) {
        //     this.material[key] = value;
        // },
        // handleEmitControl() {
        //     console.log("[Information.vue]: handleEmitControl: ");
        //     let data = this.setPositions(this.material.blocks);
        //     data.map(block => {
        //         if (block.status === 'NOT_CHANGED') {
        //             block.status = 'UPDATE';
        //         }
        //         return block;
        //     });
        //     console.log("POST DATA: ", data);
        //     this.putInformation(data);
        // },
        // putInformation(putData) {
        //     console.log("[Information.vue]: putInformation: ", putData);
        //     this.$store.state.axios.put('/information', putData).then(response => {
        //         console.log('[Information.vue]: putInformation(response): ', response);
        //         if (response.status === 200) {
        //             this.$store.commit('addNotification', { 
        //                 text: `${ this.$t('$notifications.update_success') }`, 
        //                 color: 'green' 
        //             });
        //             this.fetchData();
        //         }
        //     }).catch(error => {
        //         console.log('[Information.vue]: putInformation(error): ', error);
        //     })
        // },
        // setPositions(values) {
        //     let i = 0;
        //     let array = values.map(block => {
        //         block.position = i++;
        //         return block;
        //     })
        //     return array;
        // },
        // getSortPosition(values) {
        //     let result = this.$panel.clone(values);
        //     result.sort((a, b) => {
        //         if (a.position < b.position) return -1;
        //         if (a.position > b.position) return 1;
        //         return 0;
        //     });
        //     return result;
        // },
        fetchData() {
            this.$store.state.axios.get('/information').then(response => {
                console.log("[Information.vue]: fetchData(response): ", response);
                if (response.status === 200){
                    this.material = response.data;
                    this.isShowData = true;
                }
            }).catch(error => {
                console.log("[Information.vue]: fetchData(error): ", error);
            });
        },

    }

}
</script>

<style lang="scss">
#page-information {
    width: 100%;
    height: calc(100vh - 60px);
    box-sizing: border-box;
    padding-bottom: 100px;
    .information {
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
    }
}
</style>