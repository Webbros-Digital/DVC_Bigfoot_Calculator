import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faRoad, faGasPump, faWrench,
  faTruckMonster, faCogs, faWind, faList,
  faUndoAlt, faCaretRight, faCaretLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

dom.watch();
library.add(faRoad, faGasPump, faWrench, faTruckMonster,
  faCogs, faWind, faList, faUndoAlt, faCaretRight, faCaretLeft);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);

import '@/assets/scss/theme.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
