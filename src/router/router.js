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
            component: () => import("../vues/stock/Stock")
        },
        {
            path: "/products",
            name: "products",
            component: () => import("../vues/product/ProductList")
        },
        {
            path: "/inventories",
            name: "inventories",
            component: () => import("../vues/inventory/Inventories")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../vues/login/Authentication")
        }
    ]
})