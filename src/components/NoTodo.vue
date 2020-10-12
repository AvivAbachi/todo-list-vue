<template>
  <fade :duration="500" :opacity="0.25" :show="show">
    <div class="no-todo">
      <h2>
        Empty List
      </h2>
      <InboxIcon />
    </div>
  </fade>
</template>

<script>
import Fade from './elements/Fade';
import { InboxIcon } from './elements/Icons';

export default {
  name: 'NoTodo',
  components: { InboxIcon, Fade },
  props: {
    show: { type: Boolean, default: true },
  },
};
</script>
