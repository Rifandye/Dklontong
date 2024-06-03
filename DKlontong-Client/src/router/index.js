import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import HomeView from "../views/HomeView.vue";
import AddProductView from "../views/AddProductView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import EditProductView from "../views/EditProductView.vue";
import { useUserStore } from "@/stores/userStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home-cms",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresGuest: true },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { requiresGuest: true },
    },
    {
      path: "/add-product",
      name: "add-product",
      component: AddProductView,
      meta: { requiresAuth: true },
    },
    {
      path: "/product/:id",
      name: "product-detail",
      component: ProductDetailView,
      meta: { requiresAuth: true },
    },
    {
      path: "/product/edit/:id",
      name: "product-edit",
      component: EditProductView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = userStore.isAuthenticated;

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (requiresGuest && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
