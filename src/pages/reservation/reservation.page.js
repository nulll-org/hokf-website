import { RxFormBuilder } from "@rxweb/reactive-forms";
import { errorNotification } from "../../services/notification.service";
import { newReservation } from "../../store/api";
import { ReservationValidator } from "../../store/validators";

export default {
  name: 'Reservation',
  components: {},
  props: [],
  data() {
    const formBuilder = new RxFormBuilder();
    const reservationFormGroup = formBuilder.formGroup(ReservationValidator);
    const duration = ['1 hour', '2 hours', '4 hours', '6 hours', 'Whole Day'];
    const areas = ['Pitch', 'Cinema', 'Garden', 'Gym', 'Whole HOKF'];
    return {
      reservationMade: false,
      reservationFormGroup,
      duration,
      areas,
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    async makeReservation() {
      if (this.reservationFormGroup.valid) {
        const request = this.reservationFormGroup.props.request ? this.reservationFormGroup.value.request : ''
        await newReservation({...this.reservationFormGroup.value, request: request, status: 'pending'})
        .then(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.reservationMade = true;
        }).catch(() => {
          errorNotification('There was an issue making your reservation. Please try again later')
        });
      } else {
        errorNotification('Please fill all required fields.')
      }
    }
  }
}