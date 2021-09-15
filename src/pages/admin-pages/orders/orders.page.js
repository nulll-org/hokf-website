import onlineStore from "../../../store/modules/online-store";
import {} from "../../../store/api";
import Modal from "../../../components/modal/index.vue";

export default {
  name: "Product",
  components: { Modal },
  props: [],
  data() {
    return {
      show: "all",
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
        return onlineStore.state.allOrders;
      }
    },
    relatedCartItems() {
      return onlineStore.state.relatedCartItems
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
      this.show = query;
    },
    clearOrderState() {
      this.modalData = null;
    },
  },
};
