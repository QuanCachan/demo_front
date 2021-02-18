import Vue from 'vue'
import Vuex from 'vuex'

import home from "./home.module";
import location from "./location.module";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home,
        location
    }
})