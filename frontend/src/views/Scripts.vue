<template lang="pug">
div#page-scripts.scroll-container.overflow-hidden-auto.back_white(
    @scroll="scrollFunction"
)
    div.width-window
        top-line-content
            div.top-line__slot(slot="top-line-content__start")
            div.top-line__slot(slot="top-line-content__end")
                div.top-line__button.btn-cyan.text-center(@click="handleClickTopButton") {{ $t('$buttons.new') }}

    div.width-window.material-list
        div.panel-container
            material-process(
                v-for="(material, index) in materials"
                :data="material"
                :key="index"
                @onSignal="handleSignalElement(index, $event)"
                @onEdit="handleEditElement(index)"
            )
</template>

<script>
import TopLineContent from '@/components/elements/TopLineContent.vue';
import SelectComponent from '@/components/elements/fields/SelectComponent.vue';
import MaterialTitle from '@/components/elements/MaterialTitle.vue';
import MaterialProcess from '@/components/materials/lines/MaterialProcess.vue';

const MessageBox = () => import(/* webpackChunkName: "MessageBox" */ '@/components/modals/MessageBox.vue');
const EditScriptsModal = () => import( /* webpackChunkName: "EditScriptsModal" */ '@/components/modals/EditScriptsModal.vue')
export default {
    name: 'PageScripts',
    nameComponent: 'PageScripts',
    components: {
        TopLineContent,
        MaterialTitle,
        SelectComponent, MaterialProcess
    },
    data() {
        return {
            materials: [],
            scrollTop: 0,
        };
    },
    computed: {
        noBorder() {
            return this.scrollTop < 100 && this.materials.length !== 0;
        }
    },
    created() {
        console.log("[Processes.vue]: created ", this.$route);
        this.fetchData();
    },
    methods: {
        getStructModal() {
            let struct = {
                title: '',
                button: '',
                buttonNameEvent: '',
                sectionStruct: {
                    options: null,
                    fields: [
                        {
                            name: 'cmd',
                            type: 'input',
                            options: {
                                label: this.$t('$fields.cmd'),
                                maxLength: 80
                            }
                        },
                        {
                            name: 'attributes',
                            type: 'input',
                            options: {
                                label: this.$t('$fields.attributes'),
                                passFillValid: true,
                            }
                        }
                    ]
                }
            };
            return struct;
        },
        handleInputTitle(index) {
            // let curIndex = index === 1 ? 0 : index;         // disabled district index 1
 
            if (this.currentSort === index) {
                this.currentSortDirection = !this.currentSortDirection;
            } else {
                this.currentSort = index;
                this.currentSortDirection = true;
            }

            localStorage.setItem('sort_omanager_direction', this.currentSortDirection);
            localStorage.setItem('sort_omanager', index);
            this.clearData();
            this.fetchData();
        },
        handleClickTopButton(event) {
            console.log("[Processes.vue]: handleClickTopButton: ", event);
            this.showModal('create');
        },
        showModal(key, obj = null) {
            let struct = this.getStructModal();
            let value = null;
            if (key === 'create') {
                struct.title = this.$t('$fields.new_public_process');
                struct.button = this.$t('$buttons.start');
                struct.buttonNameEvent = 'create';

                value = {
                    cmd: '',
                    attributes: ''
                };
            }

            this.$store.commit('addModal', {
                value: value,
                options: {
                    struct: struct,
                    callback: this.callbackModal,
                    eventValue: obj === null ? null : obj.index
                },
                component: EditScriptsModal
            });
        },
        callbackModal(event) {
            console.log("[Processes.vue]: callbackModal: ", event);
            if (!!event) {
                if (event.typeEvent === 'close') {
                    this.$store.commit('removeModal', event.indexModal);
                } else if (event.typeEvent === 'create') {
                    console.log("CREATE PROCESS");
                    this.postPromocode(event.value, event.indexModal);
                }
            }
        },
        clearData() {
            this.materials = [];
        },
        handleTopSelect(key, event) {
            this.topLine[key] = event;
            localStorage.setItem(`omanager-panel__${ key }-scripts`, event);

            this.clearData();
            this.fetchData();
        },
        getLocalStorageValue(key, defaultValue) {
            let localVar = localStorage.getItem(key);
            if (localVar) {
                return localVar;
            } else {
                localStorage.setItem(key, defaultValue);
            }
            return defaultValue;
        },
        scrollFunction(event) {
            this.scrollTop = event.target.scrollTop;
        },
        getQueryLine(args) {
            let length = Object.keys(args).length;
            if (length < 1) {
                return '';
            } else {
                let str = Object.keys(args)
                                .map(key => `${ key }=${ args[key] }`)
                                .join('&');
                return '?' + str;
            }
        },
        handleSignalElement(indexRemove, signal) {
            console.log("[Promovodes.vue]: handleRemoveElement: ", indexRemove);
            this.$store.commit('addModal', {
                value: this.$t('$modals.message_box.question_leave'),
                options: {
                    text: this.$t('$modals.message_box.cannot_undone'),
                    callback: this.callbackMessageBox,
                    buttonCancel: this.$t('$buttons.cancel'),
                    buttonOk: this.$t('$buttons.ok'),
                    type: 'delete',
                    eventValue: { index: indexRemove, data: { signal } }
                },
                component: MessageBox
            });
        },
        callbackMessageBox(event) {
            console.log("[Processes.vue]: callbackMessageBox: ", event);
            this.$store.commit('removeModal', event.indexModal);
            if (event.value) {
                this.PostIdData(event.eventValue.index, event.eventValue.data);
            }
        },
        PostIdData(indexElement, postData) {
            console.log("[Processes.vue]: PostIdData: ", postData);
            this.$store.state.axios.post(`/scripts/${ this.curMaterials[indexElement].pid }`, postData).then(response => {
                console.log("[FeedId.vue]: PostIdData(response): ", response);
                if (response.status === 200) {
                    // this.materials.splice(indexDelete, 1);
                    // this.isRouteNext = true;
                    // this.$router.replace({ path: '/feed' });
                    this.fetchData();
                }
            }).catch(error => {
                console.log("[FeedId.vue]: PostIdData(error): ", error);
            })
        },
        deleteData(indexDelete) {
            console.log("[Processes.vue]: deleteData: ", indexDelete);
            this.$store.state.axios.delete(`/scripts/${ this.curMaterials[indexDelete].pid }`).then(response => {
                console.log("[FeedId.vue]: deleteFeed(response): ", response);
                if (response.status === 200) {
                    // this.materials.splice(indexDelete, 1);
                    // this.isRouteNext = true;
                    // this.$router.replace({ path: '/feed' });
                    this.fetchData();
                }
            }).catch(error => {
                console.log("[FeedId.vue]: deleteFeed(error): ", error);
            })
            // this.materials.splice(indexDelete, 1);
        },
        handleEditElement(indexEdit) {
            console.log("[Promovodes.vue]: handleEditElement: ", indexEdit);
            this.showModal('edit', { index: indexEdit, material: this.materials[indexEdit] });
            
        },
        getFilterByUser(source) {
            console.log(this.topLine.user);
            if (this.topLine.user === 'ALL_USERS') {
                return source;
            }
            return source.filter(process => process.user === this.topLine.user);
        },
        globalSort() {
            let materials = this.$panel.clone(this.materials);
            materials = this.getFilterByUser(materials)
            materials = this.sortByField(materials, this.currentSort);
            this.curMaterials = materials;
        },
        sortByField(v, current){
            let array = this.$panel.clone(v)
            function sortByCurrent(a, b){
                let tmp1 = a,
                    tmp2 = b;
                switch(current) {
                    case 0:
                        tmp1 = a.user.toLowerCase();
                        tmp2 = b.user.toLowerCase(); 
                        break;
                    case 1:
                        tmp1 = a.c;
                        tmp2 = b.c; 
                        break;
                    case 2: 
                        tmp1 = a.mem;
                        tmp2 = b.mem;
                        break;
                    case 3:
                        tmp1 = a.pid;
                        tmp2 = b.pid;
                        break;
                    case 4: 
                        tmp1 = a.pgid;
                        tmp2 = b.pgid;
                        break;
                    case 5: 
                        tmp1 = a.ppid;
                        tmp2 = b.ppid;
                        break;
                    case 6: 
                        tmp1 = a.psr;
                        tmp2 = b.psr;
                        break;
                    case 7: 
                        tmp1 = a.rss;
                        tmp2 = b.rss;
                        break;
                    case 8: 
                        tmp1 = a.sid;
                        tmp2 = b.sid;
                        break;
                    case 9: 
                        tmp1 = a.start;
                        tmp2 = b.start;
                        break;
                    case 10: 
                        tmp1 = a.stat;
                        tmp2 = b.stat;
                        break;
                    case 11: 
                        tmp1 = a.sz;
                        tmp2 = b.sz;
                        break;
                    case 12: 
                        tmp1 = a.time;
                        tmp2 = b.time;
                        break;
                    case 13: 
                        tmp1 = a.tpgid;
                        tmp2 = b.tpgid;
                        break;
                    case 14: 
                        tmp1 = a.tty;
                        tmp2 = b.tty;
                        break;
                    case 15: 
                        tmp1 = a.uid;
                        tmp2 = b.uid;
                        break;
                    case 16: 
                        tmp1 = a.vsz;
                        tmp2 = b.vsz;
                        break;
                    case 17: 
                        tmp1 = a.cmd.toLowerCase();
                        tmp2 = b.cmd.toLowerCase();
                        break;
                    default:
                        tmp1 = a.toString().toLowerCase();
                        tmp2 = b.toString().toLowerCase();
                }
                if (tmp1 < tmp2) return -1;
                if (tmp1 > tmp2) return 1;
                return 0;
            }
            array.sort(sortByCurrent);
            if (!this.currentSortDirection) {
                array = array.reverse();
            }
            // console.log(Object.prototype.toString.call(array), array);
            //console.log(this.current_sort);
            return array;
        },
        updateSelect(array) {
            let users = [];
            array.forEach(process => {
                if (users.indexOf(process.user) === -1) {
                    users.push(process.user);
                }
            });
            let usersOptions = [
                { value: 'ALL_USERS', label: this.$t('$common.all_users'), fixed_index: 0 },
            ];
            users.forEach(username => {
                usersOptions.push({ value: username, label: username })
            });
            this.topLine.options.user = usersOptions;
        },
        postPromocode(postData, index = null) {
            this.$store.state.axios.post('/scripts', postData).then(response => {
                console.log("[Processes.vue]: postPromocode(response): ", response);
                if (response.status === 200) {
                    if (this.index !== null) {
                        this.$store.commit('removeModal', index);
                        this.$store.commit('addNotification', { 
                            text: `${ this.$t('$notifications.process_started') }`, 
                            color: 'green' 
                        });
                    }
                    this.fetchData();
                }
            }).catch(error => {
                console.log("[Processes.vue]: postPromocode(error): ", error);
                this.$store.commit('addNotification', { 
                    text: `${ this.$t('$notifications.process_started_failed') }`, 
                    color: 'red' 
                });
            })
        },
        putPromocode(putData, index = null, indexMaterial = null) {
            let id = putData.id;
            delete putData.id;
            if (id !== null) {
                this.$store.state.axios.post(`/processs/${ id }`, putData).then(response => {
                    console.log("[Processes.vue]: postPromocode(response): ", response);
                    if (response.status === 200) {
                        if (this.index !== null) {
                            this.$store.commit('removeModal', index);
                        }
                        if (indexMaterial !== null && indexMaterial >= 0 && indexMaterial < this.materials.length) {
                            // this.materials[indexMaterial] = response.data;
                            let materials = this.$panel.clone(this.materials);
                            materials[indexMaterial] = response.data;
                            this.materials = materials;
                        }
                        // this.fetchData();
                    }
                }).catch(error => {
                    console.log("[Processes.vue]: postPromocode(error): ", error);
                })
            }
        },
        fetchData() {
            this.$store.state.axios.get('/scripts').then(response => {
                console.log("[Processes.vue]: fetchData(response): ", response);
                if (response.status === 200) {
                    // this.materials = response.data;
                    // this.updateSelect(this.materials);
                    // this.globalSort();
                    // this.isUpdate = true;
                }
            }).catch(error => {
                console.log("[Processes.vue]: fetchData(error): ", error);
            });
            
        },
    }
}
</script>

<style lang="scss">
#page-scripts {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);
    box-sizing: border-box;
    padding-bottom: 60px;
    & .top-line {
        &__slot {

        }
        &__select {
            width: 250px;
        }
        &__button {
            min-width: 150px;
            padding: 10px 20px;
            box-sizing: border-box;
        }
    }
    & .material {
        &__title-names {
            border-bottom: 1px solid $grey10;
            position: -webkit-sticky; /* Required for Safari */
            position: sticky;
            top: -20px;
            z-index: 100;
            margin-bottom: -1px;
            &-border-no {
                border-bottom: none;
                margin-bottom: 0px;
            }
        }
    }
}
</style>