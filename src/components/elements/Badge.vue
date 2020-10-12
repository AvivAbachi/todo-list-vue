<template>
  <div ref="badge" class="badge">
    <transition :css="false" appear @enter="enter" @leave="leave">
      <div v-if="counter > 0" ref="body" class="badge_body">
        {{ counter }}
        <div ref="pulse" class="badge_pulse" />
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import anime from 'animejs/lib/anime.es.js';

// Animation Property
// Body
const easingIn = 'spring(1,100,5, 5)'; // Mass, Stiffness, Damping, Velocity
const scaleBody = 1.5; // Percentage

// Pulse
const duration = 2000; // ms
const scalePulse = 1.625; // Percentage

export default {
  name: 'Badge',
  props: {
    counter: { type: Number, required: true },
  },
  setup(props) {
    const initial = ref(null);
    const badge = ref(null);
    const body = ref(null);
    const pulse = ref(null);

    // Play Pulse Animation When Counter Update
    watch(
      () => props.counter,
      () => initial.value && props.counter >= 1 && pulseAnime().restart()
    );

    // Enter Animation
    function enter(el, done) {
      initial.value = true;
      anime({
        targets: el,
        easing: easingIn,
        opacity: [0, 1],
        scale: [0, 1],
        complete: done,
      });
    }

    // leave Animation
    function leave(el, done) {
      initial.value = false;
      anime({
        targets: el,
        duration: 250,
        easing: 'linear',
        opacity: 0,
        scale: 0,
        complete: done,
      });
    }

    // Pulse Animation
    function pulseAnime() {
      return anime
        .timeline({ duration, autoplay: false })
        .add({ targets: body.value, scale: scaleBody })
        .add({ targets: body.value, scale: 1 }, 200)
        .add({ targets: pulse.value, duration, scale: [1, scalePulse], opacity: [1, 0] }, 0);
    }

    return { badge, body, pulse, enter, leave };
  },
};
</script>
