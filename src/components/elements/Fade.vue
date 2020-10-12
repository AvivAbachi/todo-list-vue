<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <slot v-if="show"></slot>
  </transition>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';

export default {
  name: 'Fade',
  props: {
    show: { type: Boolean, default: false },
    duration: { type: Number, default: 1000 },
    opacity: { type: Number, default: 1 },
    delay: { type: Number, default: 0 },
  },
  setup(props) {
    // Enter Animation
    function enter(el, done) {
      anime({
        targets: el,
        duration: props.duration,
        delay: props.delay,
        easing: 'linear',
        opacity: [0, props.opacity],
        complete: done,
      });
    }

    // leave Animation
    function leave(el, done) {
      anime({
        targets: el,
        duration: props.duration / 2,
        easing: 'linear',
        opacity: 0,
        complete: done,
      });
    }

    return { enter, leave };
  },
};
</script>
