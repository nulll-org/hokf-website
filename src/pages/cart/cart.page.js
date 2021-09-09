import onlineStore from "../../store/modules/online-store";

export default {
  name: 'Cart',
  components: {},
  props: [],
  data() {
    return {

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

  },
  methods: {
    removeFromCart(product) {
      onlineStore.state.cartService.removeProductFromCart(product)
    },
    async updateProductQuantity(operator, cartItem) {
      const updatedProduct = await onlineStore.state.cartService.getProduct(cartItem.product.id)
      const quantityAvailable = await updatedProduct.data().quantityAvailable[cartItem.size]
      if (cartItem.quantity <= quantityAvailable ) {
        if (operator == '+' && cartItem.quantity < quantityAvailable) {
          cartItem.quantity++
        } else if (operator == '-' && cartItem.quantity > 1) {
          cartItem.quantity--
        }
      } else {
        cartItem.quantity = quantityAvailable
      }
      onlineStore.state.cartService.updateProductQuantity(cartItem);
    }

  }
}