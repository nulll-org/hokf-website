import Home from '@/pages/home/index.vue';
import Store from '@/pages/store/index.vue';
import About from '@/pages/about/index.vue';
import Reservation from '@/pages/reservation/index.vue';
import Checkout from '@/pages/checkout/index.vue';
import Tournaments from '@/pages/tournaments/index.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/store', name: 'Store', component: Store },
  { path: '/about', name: 'About', component: About },
  { path: '/reservation', name: 'Reservation', component: Reservation },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/tournaments', name: 'Tournaments', component: Tournaments }
]

export default routes