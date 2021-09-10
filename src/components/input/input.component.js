import { RxFormGroup } from "@rxweb/reactive-forms";

export default {
  name: 'Input',
  props: {
    type: {
      readonly: true
    },
    placeholder: {
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