<template>
  <label class="label-input">
    <input
      v-if="title"
      v-bind="attrs"
      :class="{ 'input-rounded': rounded, 'input-clean': clean, 'input-edit': edit }"
      :readonly="!edit"
      :value="modelValue"
      class="input"
      type="text"
      @input="(e) => emit('update:modelValue', e.target.value)"
    />
    <textarea
      v-else
      ref="textarea"
      v-bind="attrs"
      :class="{ 'input-rounded': rounded, 'input-clean': clean, 'input-edit': edit }"
      :readonly="!edit"
      :value="modelValue"
      class="input"
      @blur="(e) => handelInput(e, true)"
      @input="(e) => handelInput(e)"
    />
  </label>
</template>

<script>
import { nextTick, onMounted, ref } from 'vue';

export default {
  name: 'InputTodo',
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: '' },
    title: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    clean: { type: Boolean, default: false },
  },
  setup(props, { attrs, emit }) {
    const textarea = ref(null);

    onMounted(() => {
      !props.title && resize();
    });

    // Textarea Update Event + call Resize
    function handelInput(e, trim = false) {
      emit('update:modelValue', trim ? e.target.value.trim() : e.target.value);
      resize();
    }

    // Resize Textarea Height
    function resize() {
      textarea.value !== null &&
        (() => {
          const lastHeight = textarea.value.style.height || 0;
          nextTick(() => {
            textarea.value.style.height = 'auto';
            textarea.value.style.height = `${textarea.value.scrollHeight + 2}px`;
            textarea.value.style.height !== lastHeight && emit('resize-text');
          });
        })();
    }

    return { attrs, emit, textarea, handelInput, resize };
  },
};
</script>
