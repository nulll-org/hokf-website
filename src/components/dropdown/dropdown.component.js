import { RxFormGroup } from "@rxweb/reactive-forms";

export default {
  name: 'Dropdown',
  props: {
    type: {
      readonly: true
    },
    options: {
      readonly: true
    },
    label: {
      required: true
    },
    field: {
      required: true
    },
    modelValue: {
      required: true,
      type: RxFormGroup
    },
    optional: {
      readonly: true
    }
 }
}