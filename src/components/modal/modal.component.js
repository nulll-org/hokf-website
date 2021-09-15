export default {
  name: "Modal",
  props: {
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
  },
};
