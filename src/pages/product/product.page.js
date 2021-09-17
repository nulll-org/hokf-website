import { CartItem } from "../../classes/cartItem"
import onlineStore from "../../store/modules/online-store"

export default {
  name: 'Product',
  components: {},
  props: [],
  data() {
    return {
      allSizes: ['xs', 's', 'm', 'l', 'xl'],
      selectedSize: null,
      quantity: 0
    }
  },
  computed: {
    product() {
      return onlineStore.state.product
    },
    sizes() {
      const quantityAvailable = onlineStore.state.product.quantityAvailable
      return quantityAvailable;
    },
    quantityAvailable() {
      let _quantityAvailable = 0
      const quantityAvailable = onlineStore.state.product.quantityAvailable
      if (quantityAvailable) {
        for (var key of Object.keys(quantityAvailable)) {
          _quantityAvailable += quantityAvailable[key]
        }
      }
      return _quantityAvailable
    }
  },
  mounted() {
    this.$store.dispatch('fetchProduct', this.$route.params.id)
    document.title = this.product.name
  },
  methods: {
    selectSize(size) {
      this.selectedSize = size;
      this.updateProductQuantity('+')
      this.quantity = 1
    },
    updateProductQuantity(operator) {
      const quantityAvailable = this.sizes[this.selectedSize]
      if (this.quantity <= quantityAvailable ) {
        if (operator == '+' && this.quantity < quantityAvailable) {
          this.quantity++
        } else if (operator == '-' && this.quantity > 1) {
          this.quantity--
        }
      } else {
        this.quantity = quantityAvailable
      }
    },
    addToCart() {
      if(this.selectedSize) {
        const cartItem = new CartItem({product: this.product, size: this.selectedSize, quantity: this.quantity})
        onlineStore.state.cartService.addProductToCart(cartItem)
          .then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          })
      }
    },
    goBackToStore() {
      this.$router.push({ name: 'StoreMain' });
      this.$store.dispatch('emptyProduct')
    }
  }
}
