import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/inventories",
            name: "inventories",
            component: () => import("./components/InventoryList")
        },
        /*{
            path: "/inventories/:id",
            name: "inventories-details",
            component: () => import("./components/Inventory")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./components/Authentication")
        }*/
    ]
})