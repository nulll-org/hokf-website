import { RxFormGroup } from "@rxweb/reactive-forms";

export default {
  name: "Input",
  props: {
    type: {
      readonly: true,
    },
    placeholder: {
      readonly: true,
    },
    label: {
      required: true,
    },
    field: {
      required: true,
    },
    modelValue: {
      required: false,
      type: RxFormGroup,
    },
    optional: {
      readonly: true,
    },
    smaller: {
      readonly: true,
    },
  },
};
