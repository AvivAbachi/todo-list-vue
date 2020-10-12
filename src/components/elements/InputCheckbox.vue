<template>
  <label class="checkbox">
    <input v-bind="$attrs" :checked="modelValue" type="checkbox" @input="(e) => $emit('update:modelValue', e.target.checked)" />
    <span class="checkbox_body">
      <check-icon />
    </span>
  </label>
</template>

<script>
import { CheckIcon } from './Icons';

export default {
  name: 'InputCheckbox',
  components: { CheckIcon },
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: null },
  },
};
</script>
