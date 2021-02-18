import Vue from 'vue';
import App from './App.vue';
import router from "./router/router";
import store from "./store";

import DateFilter from './common/date.filter'

Vue.config.productionTip = false

Vue.filter("date", DateFilter);

//TODO: Authentication

/*// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
    Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
);*/

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
