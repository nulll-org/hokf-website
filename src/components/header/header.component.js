import onlineStore from "../../store/modules/online-store"

export default {
  name: 'Header',
  components: {},
  props: [],
  data() {
    return {
      isNavOpen: false,
      query: ''
    }
  },
  computed: {
    isInStore() {
      // return this.$route.name == 'StoreMain' ? true : false
      return false
    },
    cartSize() {
      return onlineStore.state.cartService.quantity
    }
  },
  mounted() {

  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen
    },
    searchStore() {
      if (this.query.length > 2) {
        console.log(this.query)
        this.$store.dispatch('searchForProducts', this.query)
      } else {
        this.$store.dispatch("fetchProducts")
      }
    }
  }
}