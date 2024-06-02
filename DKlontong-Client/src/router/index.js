import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import HomeView from "../views/HomeView.vue";
import AddProductView from "../views/AddProductView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import EditProductView from "../views/EditProductView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/add-product",
      name: "add-product",
      component: AddProductView,
    },
    {
      path: "/product/:id",
      name: "product-detail",
      component: ProductDetailView,
    },
    {
      path: "/product/edit/:id",
      name: "product-edit",
      component: EditProductView,
    },
  ],
});

export default router;
