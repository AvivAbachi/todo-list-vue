<script>
import { computed, h } from 'vue';

export default {
  name: 'Card',
  props: {
    done: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    clean: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    const className = computed(
      () => `card${props.done ? ' card-done' : ''}${props.edit ? ' card-edit' : ''}${props.clean ? ' card-clean' : ''}`
    );
    return () => h('div', { ...attrs, class: className.value }, slots);
  },
};

export const CardHeader = {
  name: 'CardHeader',
  props: {
    border: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    const className = computed(() => `card_header${props.border ? ' card_header-border' : ''}`);
    return () => h('div', { ...attrs, class: className.value }, slots);
  },
};

export const CardBody = {
  name: 'CardBody',
  setup(props, { slots, attrs }) {
    return () => h('div', { ...attrs, class: 'card_body' }, slots);
  },
};

export const CardFooter = {
  name: 'CardFooter',
  props: {
    border: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    const className = computed(() => `card_footer${props.border ? ' card_footer-border' : ''}`);
    return () => h('div', { ...attrs, class: className.value }, slots);
  },
};
</script>
