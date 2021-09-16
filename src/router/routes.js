import Home from '@/pages/home/index.vue';
import Cart from '@/pages/cart/index.vue';
import Order from '@/pages/order/index.vue';
import About from '@/pages/about/index.vue';
import Store from '@/pages/store/index.vue';
import Product from '@/pages/product/index.vue';
import Checkout from '@/pages/checkout/index.vue';
import StoreMain from '@/pages/store-main/index.vue';
import Reservation from '@/pages/reservation/index.vue';
import Admin from '@/pages/admin-pages/admin/index.vue';
import Orders from '@/pages/admin-pages/orders/index.vue';
import Queries from '@/pages/admin-pages/queries/index.vue';
import Bookings from '@/pages/admin-pages/bookings/index.vue';
import Products from '@/pages/admin-pages/products/index.vue';
import Overview from '@/pages/admin-pages/overview/index.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/about', name: 'About', component: About },
  { path: '/store', name: 'Store', component: Store },
  { path: '/admin/', name: 'Admin', component: Admin, redirect: 'admin/overview',
    children: [
      { path: 'overview', name: 'Overview', component: Overview, meta: { isAdmin: true, requiresAuth: true }},
      { path: 'products', name: 'Products', component: Products, meta: { isAdmin: true, requiresAuth: true }},
      { path: 'orders', name: 'Orders', component: Orders, meta: { isAdmin: true, requiresAuth: true }},
      { path: 'bookings', name: 'Bookings', component: Bookings, meta: { isAdmin: true, requiresAuth: true }},
      { path: 'queries', name: 'Queries', component: Queries, meta: { isAdmin: true, requiresAuth: true }},
      { path: '*', name: 'Admin 404', component: Products, meta: { isAdmin: true, requiresAuth: true }},
    ],
    meta: { isAdmin: true, requiresAuth: true }
  },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/store/main', name: 'StoreMain', component: StoreMain },
  { path: '/reservation', name: 'Reservation', component: Reservation },
  { path: '/order/:id', name: 'Order', component: Order, meta: { props: true } },
  { path: '/store/products/:id', name: 'Product', component: Product, meta: { props: true } },
]

export default routes