import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/stock",
            name: "stock",
            component: () => import("./components/stock/Stock")
        },
        {
            path: "/products",
            name: "products",
            component: () => import("./components/product/ProductList")
        },
        {
            path: "/inventories",
            name: "inventories",
            component: () => import("./components/inventory/InventoryList")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./components/login/Authentication")
        }
    ]
})