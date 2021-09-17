import Home from "@/pages/home/index.vue";
import Cart from "@/pages/cart/index.vue";
import Order from "@/pages/order/index.vue";
import About from "@/pages/about/index.vue";
import Store from "@/pages/store/index.vue";
import Product from "@/pages/product/index.vue";
import Checkout from "@/pages/checkout/index.vue";
import StoreMain from "@/pages/store-main/index.vue";
import Reservation from "@/pages/reservation/index.vue";
import Admin from "@/pages/admin-pages/admin/index.vue";
import Login from "@/pages/admin-pages/login/index.vue";
import Orders from "@/pages/admin-pages/orders/index.vue";
import Queries from "@/pages/admin-pages/queries/index.vue";
import Bookings from "@/pages/admin-pages/bookings/index.vue";
import Products from "@/pages/admin-pages/products/index.vue";
import Overview from "@/pages/admin-pages/overview/index.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "House of Kits and Fits Gardens",
      metaTags: [
        {
          name: "description",
          content:
            "Welcome to Family friendly activities in the heart of Abuja",
        },
        {
          name: "og:description",
          content:
            "Welcome to Family friendly activities in the heart of Abuja",
        },
      ],
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      title: "Cart | House of Kits and Fits Gardens",
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "About | House of Kits and Fits Gardens",
      metaTags: [
        {
          name: "description",
          content: "Family friendly activities and areas in the heart of Abuja",
        },
        {
          name: "og:description",
          content: "Family friendly activities and areas in the heart of Abuja",
        },
      ],
    },
  },
  {
    path: "/store",
    name: "Store",
    component: Store,
    meta: {
      title: "Store | House of Kits and Fits Gardens",
      metaTags: [
        {
          name: "description",
          content:
            "Shop your favourite jerseys and sport apparels from our store",
        },
        {
          name: "og:description",
          content:
            "Shop your favourite jerseys and sport apparels from our store",
        },
      ],
    },
  },
  {
    path: "/admin/",
    name: "Admin",
    component: Admin,
    redirect: "admin/overview",
    children: [
      {
        path: "login",
        name: "Login",
        component: Login,
        meta: { title: "Login | HOKF Admin", isAdmin: true, requiresAuth: false },
      },
      {
        path: "overview",
        name: "Overview",
        component: Overview,
        meta: { title: "Overview | HOKF Admin", isAdmin: true, requiresAuth: true },
      },
      {
        path: "products",
        name: "Products",
        component: Products,
        meta: { title: "Products | HOKF Admin", isAdmin: true, requiresAuth: true },
      },
      {
        path: "orders",
        name: "Orders",
        component: Orders,
        meta: { title: "Orders | HOKF Admin", isAdmin: true, requiresAuth: true },
      },
      {
        path: "bookings",
        name: "Bookings",
        component: Bookings,
        meta: { title: "Bookings | HOKF Admin", isAdmin: true, requiresAuth: true },
      },
      {
        path: "queries",
        name: "Queries",
        component: Queries,
        meta: { title: "Queries | HOKF Admin", isAdmin: true, requiresAuth: true },
      },
      {
        path: "*",
        name: "Admin 404",
        component: Products,
        meta: { title: "404", isAdmin: true, requiresAuth: true },
      },
    ],
    meta: { isAdmin: true },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: {
      title: "Checkout | House of Kits and Fits Gardens",
    },
  },
  {
    path: "/store/main",
    name: "StoreMain",
    component: StoreMain,
    meta: {
      title: "Store | House of Kits and Fits Gardens",
      metaTags: [
        {
          name: "description",
          content:
            "Shop your favourite jerseys and sport apparels from our store",
        },
        {
          name: "og:description",
          content:
            "Shop your favourite jerseys and sport apparels from our store",
        },
      ],
    },
  },
  {
    path: "/reservation",
    name: "Reservation",
    component: Reservation,
    meta: {
      title: "Make a Reservation! | House of Kits and Fits Gardens",
      metaTags: [
        {
          name: "description",
          content:
            "Reserve any over our facilities for your events, soccer matches and much more",
        },
        {
          name: "og:description",
          content:
            "Reserve any over our facilities for your events, soccer matches and much more",
        },
      ],
    },
  },
  {
    path: "/order/:id",
    name: "Order",
    component: Order,
    meta: { title: "Order | House of Kits and Fits Gardens", props: true },
  },
  {
    path: "/store/products/:id",
    name: "Product",
    component: Product,
    meta: {  props: true },
  },
];

export default routes;
