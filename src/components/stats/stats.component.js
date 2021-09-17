export default {
  name: 'Stat',
  props: {
    label: {
      required: true
    },
    value: {
      readonly: true
    },
    route: {
      default: '#',
      readonly: true,
    }
 }
}