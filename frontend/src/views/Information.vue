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
                    :title="`${ $t('$sections.cpu') } / ${ $t('$sections.kernel') } `"
                    :data="getCPUKernel"
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
                span.information__button-text.btn-text(
                    @click="handleExport"
                ) {{ $t('$buttons.export') }}
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
            ];
        },
        getStorage() {
            return this.material.packageInfo.storage.map(storage => {
                return Object.keys(storage).map(key => {
                    if (key === 'size') {
                        return { name: key, text: storage[key] + " GB" }
                    } else {
                        return { name: key, text: storage[key] }
                    }
                })
            });
        },
        getCPUKernel() {
            return [
                [
                    { name: 'model', text: this.material.packageInfo.cpu.model },
                    { name: 'cpus / cores / threads', text: `${ this.material.packageInfo.cpu.cpus } / ${ this.material.packageInfo.cpu.cores } / ${ this.material.packageInfo.cpu.threads }` },
                    { name: 'vendor', text: this.material.packageInfo.cpu.vendor },
                ],
                [
                    { name: 'architecture', text: this.material.packageInfo.kernel.architecture },
                    { name: 'release', text: this.material.packageInfo.kernel.release },
                    { name: 'version', text: this.material.packageInfo.kernel.version },
                ]
            ];
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
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
        handleExport() {
            if (!!this.material) {
                let text = JSON.stringify(this.material, null, "\t");
                let data = new Blob([text], { type : 'application/json' });
                let target = document.createElement("a");
                let url = window.URL.createObjectURL(data);
                target.setAttribute("href", url)
                target.setAttribute("download", "operations-manager__info-system.json");
                target.click();
                setTimeout(() => {
                    window.URL.revokeObjectURL(url);
                }, 100);
            }
        }
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
        &__button-text {
            margin-top: 30px;
            margin-left: 21px;
        }
    }
}
</style>