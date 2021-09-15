import {} from "../../../store/api";
import Modal from "../../../components/modal/index.vue";
import queries from "../../../store/modules/queries";

import queryImage1 from "../../../assets/hokf-blogging.svg"
import queryImage2 from "../../../assets/hokf-brainstorming.svg"
import queryImage3 from "../../../assets/hokf-hiringpeople.svg"
import queryImage4 from "../../../assets/hokf-stockmarket.svg"

export default {
  name: "Product",
  components: { Modal },
  props: [],
  data() {
    return {
      show: "all",
      isModalOpen: false,
      modalData: null,
      images: [queryImage1, queryImage2, queryImage3, queryImage4]
    };
  },
  computed: {
    queries() {
      return queries.state.allQueries;
    },
    image() {
      const random = parseInt(Math.random() * this.images.length)
      return this.images[random]
    }
  },
  mounted() {
    this.$store.dispatch("fetchAllQueries");
  },
  methods: {
    openModal(query) {
      this.modalData = query;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.clearQueryState();
    },
    clearQueryState() {
      this.modalData = null;
    },
  },
};
