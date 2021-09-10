import onlineStore from "../../store/modules/online-store"

export default {
  name: 'StoreMain',
  components: {},
  props: [],
  data() {
    return {

    }
  },
  computed: {
    products() {
      return onlineStore.state.products
    }

  },
  mounted() {
    this.$store.dispatch("fetchProducts")
  },
  methods: {
    goToProduct(productId) {
      this.$router.push({name: 'Product', params: {id: productId}})
    }
  }
}