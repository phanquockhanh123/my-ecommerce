import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../components/global/AppLayout.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/products/:category/:title",
        name: "products_category",
        component: () => import('@/views/ProductCategory'),
        
      },
      {
        path: "/products/product-details/:productId",
        name: "product_details",
        component: () => import('@/views/ProductDetails'),
      },
      {
        path: "/cart-page",
        name: "cart_page",
        component: () => import('@/views/CartPage'),
      },
      {
        path: "/products/search",
        name: "products_search",
        component: () => import('@/views/ProductSearch'),
      },
    ],
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import('@/views/CheckOut'),
  },
  {
    path: "/login",
    name: "login_page",
    component: () => import('@/views/LoginPage'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
