<template>
  <div id="todo-list-example">
    <form @submit.prevent="addNewTodo">
      <label for="new-todo">Add a todo</label>
      <input id="new-todo" v-model="newTodoText" placeholder="E.g. Feed the cat" />
      <button type="submit">Add</button>
    </form>
    <ul>
      <li
        is="todo-item"
        v-for="(todo, index) in todos"
        :key="todo.id"
        :title="todo.title"
        @remove="todos.splice(index, 1)"
      ></li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import TodoItem from "./TodoItem";

export default Vue.extend({
  components: {
    TodoItem: TodoItem,
  },
  data: function () {
    return {
      newTodoText: "",
      todos: [
        {
          id: 1,
          title: "Do the dishes",
        },
        {
          id: 2,
          title: "Take out the trash",
        },
        {
          id: 3,
          title: "Mow the lawn",
        },
      ],
      nextTodoId: 4,
    };
  },
  computed: {},
  watch: {},
  created: function () {},
  methods: {
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText,
      });
      this.newTodoText = "";
    },
  },
});
</script>
