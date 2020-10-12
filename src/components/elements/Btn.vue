<script>
import { computed, h } from 'vue';

// Color List
const colors = [
  ' btn-red',
  ' btn-yellow',
  ' btn-orange',
  ' btn-green',
  ' btn-blue',
  ' btn-indigo',
  ' btn-purple',
  ' btn-pink',
  ' btn-gray',
  ' btn-clean',
  ' btn-link',
];

export default {
  name: 'Btn',
  props: {
    href: { type: String, default: undefined },
    color: { type: String, default: undefined },
    icon: { type: Boolean, default: false },
    border: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    // HTML Tag(a, button) by Href
    const Tag = props.href !== undefined ? 'a' : 'button';

    // Btn Class Name
    const className = computed(
      () =>
        (colors.find((color) => color === ` btn-${props.color}`) || '') +
        (props.border ? ' btn-border' : '') +
        (props.rounded ? ' btn-rounded' : '') +
        (props.icon ? ' btn-icon' : '')
    );

    return () => h(Tag, { ...attrs, class: 'btn' + className.value }, slots);
  },
};
</script>
