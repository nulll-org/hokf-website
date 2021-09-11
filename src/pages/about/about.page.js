import { RxFormBuilder } from "@rxweb/reactive-forms";
import { errorNotification } from "../../services/notification.service";
import { newQuery } from "../../store/api";
import { QueryValidator } from "../../store/validators";

export default {
  name: 'About',
  components: {},
  props: [],
  data() {
    const formBuilder = new RxFormBuilder();
    const queryFormGroup = formBuilder.formGroup(QueryValidator);
    return {
      querySent: false,
      queryFormGroup,
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    async submitQuery() {
      if(this.queryFormGroup.valid) {
        await newQuery(this.queryFormGroup.value)
        .then(() => {
          this.querySent = true;
        }).catch(() => {
          errorNotification('There was an issue sending your Query. Please try again later')
        });
      } else {
        console.log('hhdjjd')
        Object.keys(this.queryFormGroup).forEach(key => {
          this.queryFormGroup.props[key] = null;
        })
      }
    }
  }
}