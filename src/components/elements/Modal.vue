<template>
  <teleport to="#modal">
    <transition :css="false" @enter="enter" @leave="leave">
      <div v-if="show" v-bind="attrs" class="modal" @click="emit('close')">
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';

// Animation Property
const duration = 1000; // ms
const durationOut = 1000; // ms
const translateY = 50 + '%'; // px | percentage

export default {
  name: 'Modal',
  inheritAttrs: false,
  props: {
    show: { type: Boolean, default: true },
  },
  setup(props, { emit, attrs, slot }) {
    // Enter Animation
    function enter(el, done) {
      anime({
        targets: el,
        duration,
        easing: 'linear',
        opacity: [0, 1],
        complete: done,
      });
      el.firstElementChild &&
        anime({
          targets: el.firstElementChild,
          duration: duration * 2,
          easing: 'easeOutElastic',
          translateY: [translateY, 0],
          opacity: [0, 1],
        });
    }

    // leave Animation
    function leave(el, done) {
      anime({
        targets: el,
        duration: durationOut,
        easing: 'linear',
        opacity: 0,
        complete: done,
      });
      el.firstElementChild &&
        anime({
          targets: el.firstElementChild,
          duration: durationOut,
          easing: 'easeOutBack',
          translateY,
          opacity: 0,
        });
    }

    return { enter, leave, slot, attrs, emit };
  },
};
</script>
