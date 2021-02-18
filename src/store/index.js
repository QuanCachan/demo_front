import Vue from 'vue'
import Vuex from 'vuex'

import home from "./home.module";
import locations from "./locations.module";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home,
        locations
    }
})