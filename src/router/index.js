import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../components/global/AppLayout.vue";
import HomeView from "@/views/HomeView.vue";
import AdminLayout from "../components/admin/layout/AdminLayout.vue";

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
    name: "login",
    component: () => import('@/views/LoginPage'),
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/",
        name: "admin_layout",
        component: AdminLayout,
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  const role = JSON.parse(localStorage.getItem("profile"))?.role || "";

  const id = JSON.parse(localStorage.getItem("profile"))?.id || "";

  const firstName = JSON.parse(localStorage.getItem("profile"))?.firstName || "";
  const lastName = JSON.parse(localStorage.getItem("profile"))?.lastName || "";

  localStorage.setItem("role", role);
  localStorage.setItem("userId", id);
  localStorage.setItem("fullName", firstName + " " + lastName);
  

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: "login" });
    } else {
      const requiredRoles = to.meta.roles || [];
      if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
        // Redirect to a "not authorized" page or home
        next({ name: "403" });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});


export default router;
