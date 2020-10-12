<template>
  <header class="header">
    <nav-bar>
      <nav-btn aria-label="theme toggle" @click="emit('theme')">
        <moon-icon v-if="dark" />
        <sun-icon v-else />
      </nav-btn>
      <h1 class="header_headlining">
        Todo List
        <badge :counter="counter" />
      </h1>
      <nav-btn aria-label="open about" @click="state.showModal = !state.showModal">
        <info-icon />
      </nav-btn>
    </nav-bar>
    <about-modal :show="state.showModal" @close="state.showModal = false" @open="emit('open')" @save="emit('save')" />
  </header>
</template>

<script>
import { reactive } from 'vue';
import AboutModal from './AboutModal';
import Badge from './elements/Badge';
import NavBar, { NavBtn } from './elements/NavBar';
import { InfoIcon, MoonIcon, SunIcon } from './elements/Icons';

export default {
  name: 'Header',
  components: { Badge, NavBar, NavBtn, SunIcon, MoonIcon, InfoIcon, AboutModal },
  props: {
    counter: { type: Number, default: 0 },
    dark: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const state = reactive({
      showModal: false,
    });

    return { emit, state };
  },
};
</script>
