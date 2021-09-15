import Header from "./components/header/index.vue"
import Footer from "./components/footer/index.vue"

export default {
    name: 'App',
    components: {
      Header,
      Footer
    },
    props: [],
    data() {
      return {
  
      }
    },
    computed: {
      adminRoute() {
        return this.$route.meta.isAdmin
      }
    },
    mounted() {
  
    },
    methods: {
  
    }
  }