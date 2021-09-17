import { firebaseAuth } from "../../../firebase";
import { successNotification } from "../../../services/notification.service";

export default {
  name: "Admin",
  components: {},
  props: [],
  data() {
    return {};
  },
  computed: {
    pageName() {
      return this.$route.name;
    },
    isLogin() {
      if (this.$route.name == "Login") {
        return true;
      }
    },
  },
  mounted() {},
  methods: {
    logout() {
      firebaseAuth.signOut().then(() => {
        successNotification("Logged Out");
        this.$router.push({ name: "Login" });
      });
    },
  },
  created() {},
};
