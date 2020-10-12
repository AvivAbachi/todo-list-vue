<script>
import { h } from 'vue';

export default {
  name: 'NavBar',
  setup(props, { slots }) {
    return () => h('nav', { class: 'nav' }, slots);
  },
};

export const NavBtn = {
  name: 'NavBtn',

  setup(props, { slots, attrs }) {
    const Tag = attrs.href !== undefined ? 'a' : 'button';
    return () => h(Tag, { class: 'nav_btn' }, slots);
  },
};
</script>
