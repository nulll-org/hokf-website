import { getOrder } from "../../store/api";
import onlineStore from "../../store/modules/online-store";

export default {
  name: 'Order',
  components: {},
  props: [],
  data() {
    return {
      order: null,
    }
  },
  computed: {
    status() {
      return this.order.status
    }
  },
  mounted() {
    const orderId = this.$route.params.id;
    getOrder(orderId)
      .then((order) => {
        this.order = {...order.data(), id: order.id };
        onlineStore.state.cartService.clearCart();
      });
  },
  methods: {
    pay() {        
      window.location.replace(`https://checkout.paystack.com/${this.order.accessCode}`);
    }
  }
}