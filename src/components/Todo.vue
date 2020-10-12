<template>
  <card :id="todo.id" :done="todo.done" :edit="edit" class="todo item">
    <card-header :border="true">
      <input-checkbox :model-value="todo.done" aria-label="todo done toggle" @change="(e) => modify('done', e.target.checked)" />
      <input-todo
        :id="`title-${todo.id}`"
        :edit="edit"
        :model-value="todo.title"
        :title="true"
        aria-label="todo title"
        @blur="handelBlur"
        @change.capture="(e) => modify('title', e.target.value)"
      />
      <btn :disabled="todo.done" :icon="true" :rounded="true" aria-label="edit todo" color="blue" @click="() => toggleEdit()">
        <edit-icon />
      </btn>
      <btn :icon="true" :rounded="true" aria-label="delete todo" color="red" @click="handelDelete">
        <remove-icon />
      </btn>
    </card-header>
    <card-body>
      <input-todo
        :id="`text-${todo.id}`"
        :edit="edit"
        :model-value="todo.text"
        aria-label="todo text"
        @blur="handelBlur"
        @change.capture="(e) => modify('text', e.target.value.trim())"
        @resize-text="emit('resize-text')"
      />
    </card-body>
  </card>
</template>

<script>
import { ref } from 'vue';
import Btn from './elements/Btn';
import InputCheckbox from './elements/InputCheckbox';
import Card, { CardBody, CardHeader } from './elements/Card';
import { EditIcon, RemoveIcon } from './elements/Icons';
import InputTodo from './elements/InputTodo';

export default {
  name: 'Todo',
  components: { Btn, EditIcon, RemoveIcon, InputCheckbox, InputTodo, Card, CardHeader, CardBody },
  props: {
    todo: {
      type: Object,
      default: () => ({
        id: { type: Number, default: NaN },
        order: { type: Number, default: NaN },
        title: { type: String, default: '' },
        text: { type: String, default: '' },
        done: { type: Boolean, default: false },
      }),
    },
  },
  setup(props, { emit }) {
    const edit = ref(false);

    // Callback to Modify Todo
    function modify(action = null, value = '') {
      action && emit('modify-todo', props.todo.id, action, value);
    }

    // Toggle Edit Mode
    function toggleEdit(editing = !edit.value) {
      edit.value = editing;
      edit.value
        ? document.querySelector(`#title-${props.todo.id}`).focus()
        : props.todo.title === '' && props.todo.text === '' && handelDelete();
    }

    // Disable Edit Mode when Blur
    function handelBlur() {
      setTimeout(() => {
        const el = document.activeElement;
        const isTodoBlur = el.id !== `text-${props.todo.id}` && el.id !== `title-${props.todo.id}` && !el.className.includes('btn');
        isTodoBlur && toggleEdit(false);
      }, 5);
    }

    // Callback Delete Todo
    function handelDelete() {
      emit('delete-todo', props.todo.id, props.todo.order);
    }

    return { emit, edit, toggleEdit, handelDelete, handelBlur, modify };
  },
};
</script>
