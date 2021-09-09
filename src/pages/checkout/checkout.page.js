import { createOrder, getNigerianStates } from "../../store/api"
import onlineStore from "../../store/modules/online-store";

export default {
  name: 'Checkout',
  components: {},
  props: [],
  data() {
    return {
    states: [],
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    addressLine1: null,
    addressLine2: null,
    city: null,
    state: null,
    country: 'Nigeria'
    }
  },
  computed: {
    cartItems() {
      return onlineStore.state.cartService.cart.cartItems;
    },
    total() {
      return onlineStore.state.cartService.totalCost;
    }
  },
  mounted() {
    getNigerianStates()
    .then((states) => {
      states.forEach((state) => {
        this.states.push(state.name)
      })
    })
  },
  methods: {
    async checkOut() {
      let _cartItems = []
      this.cartItems.forEach((cartItem) => {
        _cartItems.push({productId: cartItem.product.id, quantity: cartItem.quantity, size: cartItem.size})
      })
      const order = {
        customer: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber,
        },
        cartItems: _cartItems,
        addressLine1: this.addressLine1,
        addressLine2: this.addressLine2,
        city: this.city,
        state: this.state,
        country: this.country,
      }
      const response = await createOrder(order)
      console.log(response)
    }

  }
}