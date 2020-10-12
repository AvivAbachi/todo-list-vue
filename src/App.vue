<template>
  <div>
    <Header :counter="leftTodos" :dark="state.themeDark" @open="open" @save="save" @theme="toggleTheme" />
    <div ref="warpper" class="muuri-warpper" @scroll="handelScroll">
      <div class="muuri-grid">
        <new-todo :key="0" @add-todo="addTodo" @resize-text="layoutGrid" />
        <transition-group :css="false" @enter="enter" @leave="leave">
          <template v-for="todo in orderTodos">
            <todo
              v-if="todo.order <= state.loadTodos"
              :key="todo.id"
              :data-order="todo.order"
              :todo="todo"
              @modify-todo="modifyTodo"
              @delete-todo="deleteTodo"
              @resize-text="layoutGrid"
            />
          </template>
        </transition-group>
      </div>
      <back-to-top :dark="state.themeDark" :show="state.scrollTop" @click="backToTop" />
      <no-todo :show="state.todos.length === 0" />
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive, ref } from 'vue';

import Dexie from 'dexie';
import anime from 'animejs/lib/anime.es.js';
import BackToTop from './components/BackToTop';
import NewTodo from './components/NewTodo';
import Header from './components/Header';
import Muuri from 'muuri';
import Todo from './components/Todo';
import NoTodo from './components/NoTodo';

// Property
const addTodos = 30; // How many Todos  Add on Scroll
const dbName = 'todo_list';

// Animation Property
const duration = 1000; // ms
const easing = 'linear';

// Default Todos List
const defaultTodos = [
  { title: 'Welcome To my Todo App', text: '', done: false },
  { title: 'This is Todo Done', text: '', done: true },
  { title: 'Tasks list', text: '1. Task 1\n2. Task 2\n3. Task 3', done: false },
];

export default {
  name: 'App',
  components: { Header, Todo, NewTodo, NoTodo, BackToTop },
  setup() {
    const state = reactive({
      todos: [],
      loadTodos: -1,
      delay: 0,
      themeDark: false,
      scrollTop: false,
    });
    let grid = null;
    const warpper = ref(null);
    const body = document.body;
    const orderTodos = computed(() => state.todos.sort((a, b) => (a.order > b.order ? 1 : a.order < b.order ? -1 : 0)));
    const leftTodos = computed(() => state.todos.filter((todo) => !todo.done).length);

    // IndexedDB Create & Load
    let db = new Dexie(dbName);
    db.version(1).stores({ todos: 'id++,title,text,done,order' });
    Dexie.exists(dbName).then((exists) => {
      db.open();
      !exists && db.todos.bulkAdd(defaultTodos.map((todo, i) => ({ ...todo, order: i })));
      db.todos.toArray((dbTodos) => {
        state.todos = dbTodos;
      });
    });

    // Load Theme
    state.themeDark =
      localStorage['prefers-color-scheme'] === 'dark'
        ? true
        : localStorage['prefers-color-scheme'] === 'light'
        ? false
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
    state.themeDark ? body.classList.add('theme-dark') : body.classList.remove('theme-dark');

    onMounted(() => {
      // Create Gird
      grid = new Muuri('.muuri-grid', {
        showDuration: 0,
        hideDuration: 0,
        dragEnabled: true,
        dragAutoScroll: {
          targets: [{ element: warpper.value, axis: Muuri.AutoScroller.AXIS_Y }],
        },
        dragSortHeuristics: {
          sortInterval: 100,
          minDragDistance: 100,
          minBounceBackAngle: 1,
        },
        dragPlaceholder: {
          enabled: true,
        },
        dragStartPredicate: (item, event) => {
          const el = item.getElement();
          return el.className.match(/(new-todo)|(card-edit)/)
            ? false
            : event.type === 'end' && event.deltaTime >= 200
            ? setTodosOrder() && layoutGrid()
            : Muuri.ItemDrag.defaultStartPredicate(item, event, { delay: 100 });
        },
        dragSortPredicate: (item) => {
          const result = Muuri.ItemDrag.defaultSortPredicate(item);
          return result && result.index === 0 ? false : result;
        },

        layoutDuration: 450,
        layoutOnResize: 1,
        itemVisibleClass: null,
        itemHiddenClass: null,
        itemPositioningClass: null,
        itemReleasingClass: null,
      });

      // Load Todos
      state.loadTodos = addTodos;
    });

    // Add New Todo
    function addTodo(title, text) {
      state.delay = -1;
      state.todos = state.todos.map((todo) => ({ ...todo, order: todo.order + 1 }));
      db.todos.toArray((dbTodos) =>
        dbTodos.forEach((dbTodo) => {
          db.todos.update(dbTodo.id, { order: dbTodo.order + 1 });
        })
      );
      db.todos.add({ title, text, done: false, order: 0 }).then((id) => {
        state.todos.push({ id, title, text, done: false, order: 0 });
      });
    }

    //  Enter Todo Animation
    function enter(el, done) {
      const newTodo = state.delay === -1;
      const index = newTodo ? 1 : undefined;
      const delay = newTodo ? 0 : state.delay * 75;
      grid.add(el, { index });
      anime({
        targets: el,
        duration,
        delay,
        easing,
        opacity: [0, 1],
        begin: () => layoutGrid(),
        complete: done,
      });
      state.delay++;
    }

    // Modify Todo
    function modifyTodo(id, action, value) {
      const index = state.todos.findIndex((todo) => todo.id === id);
      state.todos[index][action] = value;
      db.todos.update(id, { [action]: value });
    }

    // Delete Todo
    function deleteTodo(id, order) {
      state.todos = state.todos
        .filter((todo) => todo.id !== id)
        .map((todo) => (todo.order > order ? { ...todo, order: todo.order - 1 } : todo));
      db.todos.delete(id);
      db.todos.toArray((dbTodos) =>
        dbTodos.forEach((dbTodo) => {
          dbTodo.order > order && db.todos.update(dbTodo.id, { order: dbTodo.order - 1 });
        })
      );
    }

    // leave Todo Animation
    function leave(el, done) {
      anime({
        targets: el,
        duration: duration / 4,
        easing,
        opacity: 0,
        complete: () => {
          const index = grid.getItems().findIndex((item) => item.getElement().id === el.id);
          grid.remove(grid.getItems(index));
          done();
        },
      });
    }

    // Set Todo Order from Grid
    function setTodosOrder() {
      const gridItems = grid.getItems().splice(1);
      gridItems.forEach((item, order) => {
        const todoID = Number(item.getElement().id);
        const index = state.todos.findIndex((todo) => todo.id === todoID);
        state.todos[index].order = order;
        db.todos.update(todoID, { order });
      });
    }

    // Refresh Grid Layout
    function layoutGrid() {
      grid.refreshItems().layout();
    }

    // Toggle Light & Dark Theme
    function toggleTheme() {
      state.themeDark = !state.themeDark;
      localStorage['prefers-color-scheme'] = state.themeDark ? 'dark' : 'light';
      state.themeDark ? body.classList.add('theme-dark') : body.classList.remove('theme-dark');
    }

    // Handel Scroll to Load More Todos
    function handelScroll() {
      const maxScroll = warpper.value.scrollHeight;
      const height = warpper.value.getBoundingClientRect().height;
      const currentScroll = warpper.value.scrollTop + height;

      currentScroll >= maxScroll &&
        (() => {
          state.delay = 0;
          state.loadTodos += addTodos;
        })();

      // Show / Hide Back To Top
      !state.scrollTop && currentScroll >= height * 2 && (state.scrollTop = true);
      state.scrollTop && currentScroll < height * 2 && (state.scrollTop = false);
    }

    // Back to Top
    function backToTop() {
      const duration = warpper.value.scrollTop / 1.5;
      anime({
        targets: warpper.value,
        scrollTop: 0,
        duration,
        easing: 'easeOutQuad',
      });
    }

    // Save Todos to JSON
    function save() {
      const el = document.createElement('a');
      const todos = orderTodos.value.map((todo) => ({ ...todo, id: undefined, order: undefined }));
      const file = new Blob([JSON.stringify(todos)], { type: 'application/json' });
      const time = new Date();
      el.href = URL.createObjectURL(file);
      el.download = `${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}-${time.getDate()}-${time.getMonth()}-${time.getFullYear()}`;
      body.appendChild(el);
      el.click();
      body.removeChild(el);
    }

    // Open Todos from JSON
    function open() {
      const el = document.createElement('input');
      el.type = 'file';
      el.accept = 'application/JSON';
      body.appendChild(el);
      el.click();
      el.addEventListener('change', () => getFile(el));
    }

    async function getFile(el) {
      try {
        const file = await el.files[0].text();
        const todos = JSON.parse(file).filter((todo) => todo.title !== undefined || todo.text !== undefined);
        if (todos.length !== 0) {
          db.close();
          db.delete();
          db = new Dexie(dbName);
          db.version(1).stores({ todos: 'id++,title,text,done,order' });
          db.open();
          db.todos.bulkPut(todos.map((todo, i) => ({ ...todo, order: i })));
          db.todos.toArray((dbTodos) => (state.todos = dbTodos));
        } else {
          throw 'Cant import todos list.';
        }
      } catch (error) {
        console.error(error);
      } finally {
        el.removeEventListener('change', (e) => getFile(e.target));
        body.removeChild(el);
      }
    }

    return {
      state,
      orderTodos,
      addTodo,
      save,
      open,
      deleteTodo,
      modifyTodo,
      leftTodos,
      enter,
      leave,
      layoutGrid,
      toggleTheme,
      handelScroll,
      backToTop,
      warpper,
    };
  },
};
</script>
<style lang="scss" src="./assets/tailwind.scss"></style>
