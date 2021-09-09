import Home from '@/pages/home/index.vue';
import Cart from '@/pages/cart/index.vue';
import Store from '@/pages/store/index.vue';
import Product from '@/pages/product/index.vue';
import StoreMain from '@/pages/store-main/index.vue';
import About from '@/pages/about/index.vue';
import Reservation from '@/pages/reservation/index.vue';
import Checkout from '@/pages/checkout/index.vue';
// import Tournaments from '@/pages/tournaments/index.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/store', name: 'Store', component: Store },
  { path: '/about', name: 'About', component: About },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/store/main', name: 'StoreMain', component: StoreMain },
  // { path: '/tournaments', name: 'Tournaments', component: Tournaments },
  { path: '/reservation', name: 'Reservation', component: Reservation },
  { path: '/store/products/:id', name: 'Product', component: Product, meta: { props: true } },
]

export default routes