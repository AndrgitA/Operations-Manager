import Vue from 'vue'
import App from './App.vue'
import { router, routerBeforeEach } from '@/tools/router.js';
import store from '@/tools/store.js';
import i18n from '@/tools/language.js';
import { initMiddleWare } from '@/tools/axios';
import { initUser } from '@/tools/additionalMain.js';

// import TextareaAutosize from 'vue-textarea-autosize';

import VueCookie from 'vue-cookie';

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';


import '@/assets/js/date.js';
import '@/assets/js/templates.js';
import PanelPlugin from '@/plugins/panel/panel.js';

locale.use(lang);
Vue.use(VueCookie);

Vue.use(PanelPlugin);

import {
  // Pagination,
  // Dialog,
  // Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  // Menu,
  // Submenu,
  // MenuItem,
  // MenuItemGroup,
  // Input,
  // InputNumber,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Checkbox,
  // CheckboxButton,
  // CheckboxGroup,
  // Switch,
  // Select,          --off
  // Option,          --off
  // OptionGroup,
  // Button,
  // ButtonGroup,
  // Table,
  // TableColumn,
  // DatePicker,      --off
  // TimeSelect,
  // TimePicker,
  // Popover,
  // Tooltip,
  // Breadcrumb,
  // BreadcrumbItem,
  // Form,
  // FormItem,
  // Tabs,
  // TabPane,
  // Tag,
  // Tree,
  // Alert,
  // Slider,
  // Icon,
  // Row,
  // Col,
  // Upload,
  // Progress,        --off
  // Spinner,
  // Badge,
  // Card,
  // Rate,
  // Steps,
  // Step,
  // Carousel,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  // Cascader,
  // ColorPicker,
  // Transfer,
  // Container,
  // Header,
  // Aside,
  // Main,
  // Footer,
  // Timeline,
  // TimelineItem,
  // Link,
  // Divider,
  // Image,
  // Calendar,
  // Backtop,
  // PageHeader,
  // CascaderPanel,
  // Loading,
  // MessageBox,
  // Message,
  // Notification
} from 'element-ui';

Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
// Vue.use(DatePicker);
// Vue.use(Select);
// Vue.use(Option);
// Vue.use(Progress);


Vue.config.productionTip = false

const token = VueCookie.get('involvis-panel__token');



/**
 * Initialize Application function
 * @param { Object } user 
 */
function initApp(user = null) {
  console.log("[main.js]: initApp: ", user);

  // comment this code, until there are no server requests
  // router.beforeEach(routerBeforeEach(store));       // registration hooh beforeEach for router
  
  store.dispatch('initializeUserData', { user, token });

  const app =  new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
    created() {
      initMiddleWare(this);
    }
  }).$mount('#app')
}

if (!!token) {                                              // init when have token key
  console.log("[main.js]: wase-panel__token: ", token);
  initUser(store.state.axios, token, initApp);
} else {                                                    // init clear app without data
  console.log("[main.js]: have no token");
  initApp(null);
}