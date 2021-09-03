// import { mapActions, mapGetters } from "vuex";
// import { Order } from "../../classes/order"
// import * as firebase from '../../firebase';

import onlineStore from "../../store/modules/online-store"

export default {
    name: 'Home',
    components: {},
    props: [],
    data() {
        return {

        }
    },
    computed: {
        products() {
            return onlineStore.state.products
        }
        // ...mapGetters(["products", "cart"])
    },
    mounted() {
        this.$store.dispatch("fetchProducts")

    },
    methods: {
        // ...mapActions(["fetchProducts", "addToCart", "checkOut"])
    },
    created() {
        // fetch('https://us-central1-house-of-kits-and-fits.cloudfunctions.net/test')
        //     .then((p) => {
        //         console.log(p)
        //     })
    }
    // created() {
    //     /*
    //     * Test methods. Will remove soon.
    //     */
    //     this.fetchProducts();
    //     let cartItems = [];
    //     this.cart.forEach(cartItem => {
    //         let productReference = firebase.productCollection.doc(cartItem.product.productId)

    //         cartItems.push({product: productReference, quantity: cartItem.quantity, price: cartItem.price})
    //     });
    //     let details = {
    //         email: 'ayorg@gmail.com',
    //         firstName: 'Ayomide',
    //         lastName: 'Oluniyi',
    //         phoneNumber: '+2340866554433',
    //         addressLine1: 'A Place',
    //         addressLine2: '',
    //         city: 'Abuja',
    //         state: 'FCT',
    //         country: 'Nigeria',
    //         cartItems: cartItems
    //     }
    //     let order = new Order(details);
    //     this.checkOut(order);
    //     // this.addToCart(this.products[1])
    // }
}