<template>
  <card :clean="true" class="new-todo item">
    <form @submit.prevent="onSubmit">
      <card-header>
        <input-todo
          v-model="state.title"
          :clean="true"
          :edit="true"
          :required="isRequired"
          :rounded="true"
          :title="true"
          aria-label="new todo title"
          placeholder="Todo Title..."
        />
        <btn :icon="true" :rounded="true" aria-label="add todo" class="ml-3" color="green" type="submit">
          <add-icon />
        </btn>
      </card-header>

      <card-body>
        <input-todo
          v-model="state.text"
          :clean="true"
          :edit="true"
          :required="isRequired"
          aria-label="new todo title"
          placeholder="Todo Text..."
          @keydown.enter.ctrl="onSubmit"
          @resize-text="() => emit('resize-text')"
        />
      </card-body>
    </form>
  </card>
</template>

<script>
import { computed, reactive } from 'vue';
import { AddIcon } from './elements/Icons';
import Btn from './elements/Btn';
import Card, { CardBody, CardHeader } from './elements/Card';
import InputTodo from './elements/InputTodo';

export default {
  name: 'NewTodo',
  components: { AddIcon, Btn, InputTodo, Card, CardHeader, CardBody },
  setup(props, { emit }) {
    const state = reactive({
      title: '',
      text: '',
    });

    // Check if Field are Fill
    const isRequired = computed(() => state.text === '' && state.title === '');

    // Add Todo on Submit
    function onSubmit() {
      emit('add-todo', state.title, state.text);
      state.title = '';
      state.text = '';
    }

    return { state, emit, isRequired, onSubmit };
  },
};
</script>
