import onlineStore from "../../store/modules/online-store"

export default {
  name: 'Header',
  components: {},
  props: [],
  data() {
    return {
      isNavOpen: false
    }
  },
  computed: {
    isInStore() {
      return this.$route.name == 'Store'
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
    }

  }
}