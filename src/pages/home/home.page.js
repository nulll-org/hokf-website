import onlineStore from "../../store/modules/online-store";

export default {
  name: "Home",
  computed: {
    products() {
      return onlineStore.state.products;
    },
  },
  mounted() {
    this.$store.dispatch("fetchProducts");
  },
};
