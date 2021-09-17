import onlineStore from "../../../store/modules/online-store";
import {} from "../../../store/api";
import Modal from "../../../components/modal/index.vue";

export default {
  name: "Orders",
  components: { Modal },
  props: [],
  data() {
    return {
      isModalOpen: false,
      modalData: null,
    };
  },
  computed: {
    orders() {
      if (this.show !== "all") {
        return onlineStore.state.allOrders.filter(
          (order) => order.status == this.show
        );
      } else {
        return onlineStore.state.allOrders.sort((a, b) => b.date.toDate() - a.date.toDate());
      }
    },
    relatedCartItems() {
      return onlineStore.state.relatedCartItems
    },
    show() {
      if (this.$route.hash == '') {
        return 'all'
      }
      return this.$route.hash.replace('#', '')
    }
  },
  mounted() {
    this.$store.dispatch("fetchAllOrders");
  },
  methods: {
    openModal(order) {
      this.$store
        .dispatch("fetchRelatedCartItems", order.id)
        .then(() => {
          this.modalData = { ...order };
          this.isModalOpen = true;
        });
    },
    closeModal() {
      this.isModalOpen = false;
      this.clearOrderState();
    },
    localDate(date) {
      return date.toDate().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    },
    display(query) {
      if (query)
      this.$router.push({hash: query})
    },
    clearOrderState() {
      this.modalData = null;
    },
  },
};
