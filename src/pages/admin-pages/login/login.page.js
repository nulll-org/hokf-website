import { RxFormBuilder } from "@rxweb/reactive-forms";
import { firebaseAuth } from "../../../firebase";
import {
  errorNotification,
  successNotification,
} from "../../../services/notification.service";
import { LoginValidator } from "../../../store/validators";

export default {
  name: "Login",
  components: {},
  props: [],
  data() {
    const formBuilder = new RxFormBuilder();
    const loginFormGroup = formBuilder.formGroup(LoginValidator);
    return { loginFormGroup };
  },
  computed: {},
  mounted() {},
  methods: {
    async login() {
      if (this.loginFormGroup.valid) {
        const loginObject = this.loginFormGroup.value;
        firebaseAuth
          .signInWithEmailAndPassword(loginObject.email, loginObject.password)
          .then(() => {
            successNotification("Logged in successfully");
            this.$router.push({ name: "Overview" });
          })
          .catch((error) => {
            errorNotification(error.message);
          });
      } else {
        errorNotification("Please fill all required fields.");
      }
    },
  },
  created() {},
};
