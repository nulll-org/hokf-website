import bookings from "../../../store/modules/bookings";
import Stats from "../../../components/stats/index.vue";
import onlineStore from "../../../store/modules/online-store";

export default {
  name: "Overview",
  components: { Stats },
  props: [],
  data() {
    return {
      month: new Date().toLocaleDateString("en-US", { month: "long" }),
      today: new Date().getDate(),
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      chart: {
        caption: "Split of Revenue by Product Categories",
        subCaption: "Last year",
        numberPrefix: "$",
        defaultCenterLabel: "Total Sold: $64.08K",
        centerLabel: "Revenue from $label: $value",
        decimals: "0",
        theme: "fusion",
      },
      type: "doughnut2d",
      renderAt: "chart-container",
      width: "550",
      height: "350",
      dataFormat: "json",
    };
  },
  computed: {
    topSoldProducts() {
      const products = [];
      onlineStore.state.allProducts.forEach((product) => {
        products.push({
          id: product.name,
          name: product.name,
          totalSold: product.totalSold,
        });
      });
      return products.sort((a, b) => b.totalSold - a.totalSold).splice(0, 5);
    },
    chartData() {
      const chart = [];
      onlineStore.state.allProducts.forEach((product) => {
        chart.push({ label: product.name, value: product.totalSold });
      });
      return { data: chart, chart: this.chart };
    },
    orders() {
      return onlineStore.state.allOrders.filter(
        (order) =>
          order.date.toDate().toLocaleDateString("en-US", { month: "long" }) ==
          this.month
      ).length;
    },
    totalSales() {
      return onlineStore.state.allOrders
        .filter(
          (order) =>
            order.status == "paid" &&
            order.date
              .toDate()
              .toLocaleDateString("en-US", { month: "long" }) == this.month
        )
        .reduce((a, b) => a + b.price, 0);
    },
    bookings() {
      return bookings.state.allBookings.filter(
        (booking) =>
          new Date(booking.date).toLocaleDateString("en-US", {
            month: "long",
          }) == this.month
      ).length;
    },
    pendingOrders() {
      return onlineStore.state.allOrders.filter(
        (order) =>
          order.status == "pending" &&
          order.date.toDate().toLocaleDateString("en-US", { month: "long" }) ==
            this.month
      ).length;
    },
    pendingBookings() {
      return bookings.state.allBookings.filter(
        (booking) =>
          booking.status == "pending" &&
          new Date(booking.date).toLocaleDateString("en-US", {
            month: "long",
          }) == this.month &&
          new Date(booking.date).getDate() > this.today
      ).length;
    },
    upcomingBookings() {
      return bookings.state.allBookings.filter(
        (booking) =>
          new Date(booking.date).toLocaleDateString("en-US", {
            month: "long",
          }) == this.month && new Date(booking.date).getDate() > this.today
      ).length;
    },
    // cartItems() {
    //   return onlineStore.state.allCartItems;
    // }
  },
  mounted() {
    this.$store.dispatch("fetchAllProducts");
    this.$store.dispatch("fetchAllOrders");
    this.$store.dispatch("fetchAllBookings");
    // this.$store.dispatch("fetchAllCartItems");
  },
  methods: {
    goToPendingOrders() {
      this.$router.push({name: 'Orders', hash: 'pending'})
    },
    goToPendingBookings() {
      console.log('djjdjd')
      this.$router.push({name: 'Bookings', hash: 'pending'})
    }
  },
};
