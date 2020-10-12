<template>
  <fade :show="show">
    <div class="btp">
      <btn :icon="true" :rounded="true">
        <up-icon />
      </btn>
    </div>
  </fade>
</template>

<script>
import Btn from './elements/Btn';
import Fade from './elements/Fade';
import { UpIcon } from './elements/Icons';

export default {
  name: 'BackToTop',
  components: { Btn, UpIcon, Fade },
  props: {
    show: { type: Boolean, default: false },
  },
};
</script>
