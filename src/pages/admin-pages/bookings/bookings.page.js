import Modal from "../../../components/modal/index.vue";
import { updateReservationStatus } from "../../../store/api";
import bookings from "../../../store/modules/bookings";

export default {
  name: "Bookings",
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
    bookings() {
      if (this.show !== "all") {
        return bookings.state.allBookings.filter(
          (booking) => booking.status == this.show && booking.area != null
        );
      } else {
        return bookings.state.allBookings.filter((booking) => booking.area != null).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      }
    },
  },
  mounted() {
    this.$store.dispatch("fetchAllBookings");
  },
  methods: {
    openModal(booking) {
      this.$store;
      this.modalData = { ...booking };
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.clearOrderState();
    },
    localDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
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
    async approveBooking() {
      await updateReservationStatus(this.modalData, "approved").then(() => {
        this.$store.dispatch("fetchAllBookings");
        this.closeModal();
      });
    },
    async declineBooking() {
      await updateReservationStatus(this.modalData, "declined").then(() => {
        this.$store.dispatch("fetchAllBookings");
        this.closeModal();
      });
    },
  },
};
