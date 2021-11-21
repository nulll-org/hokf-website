import { createOrder, getNigerianStates } from "../../store/api";
import onlineStore from "../../store/modules/online-store";
import { RxFormBuilder } from "@rxweb/reactive-forms";
import { OrderValidator } from "../../store/validators";
import { errorNotification } from "../../services/notification.service";
import loading from "../../store/modules/loading";

export default {
  name: "Checkout",
  components: {},
  props: [],
  beforeRouteEnter(to, from, next) {
    if (onlineStore.state.cartService.cart.cartItems.length < 1) {
      next({ name: from.name || "Home" });
    } else {
      next();
    }
  },
  data() {
    const formBuilder = new RxFormBuilder();
    const orderFormGroup = formBuilder.formGroup(OrderValidator);

    return {
      states: [],
      orderFormGroup,
      country: "Nigeria",
    };
  },
  computed: {
    cartItems() {
      return onlineStore.state.cartService.cart.cartItems;
    },
    total() {
      return onlineStore.state.cartService.totalCost;
    },
    loading() {
      return loading.state.loading;
    },
  },
  mounted() {
    getNigerianStates().then((states) => {
      states.forEach((state) => {
        this.states.push(state.name);
      });
    });
  },
  methods: {
    async checkOut() {
      if (this.orderFormGroup.valid) {
        let _cartItems = [];
        this.cartItems.forEach((cartItem) => {
          _cartItems.push({
            productId: cartItem.product.id,
            quantity: cartItem.quantity,
            size: cartItem.size,
          });
        });
        const order = {
          order: {
            customer: {
              firstName: this.orderFormGroup.value.firstName,
              lastName: this.orderFormGroup.value.lastName,
              email: this.orderFormGroup.value.email,
              phoneNumber: this.orderFormGroup.value.phoneNumber,
            },
            cartItems: _cartItems,
            addressLine1: this.orderFormGroup.value.addressLine1,
            addressLine2: this.orderFormGroup.value.addressLine2,
            city: this.orderFormGroup.value.city,
            state: this.orderFormGroup.value.state,
            country: this.country,
          },
        };
        await createOrder(order)
          .then((response) => {
            window.location.replace(response.authorization_url);
          })
          .catch(() => {
            errorNotification(
              "Your order could not be placed right now. Please try again later."
            );
          });
      } else {
        errorNotification(
          "Please fill all required fields. We need your info to deliver to you :)"
        );
      }
    },
  },
};
