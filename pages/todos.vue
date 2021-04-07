<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.done"
          @change="toggleDone(todo)"
        />
        <span :class="{ done: todo.done }">{{ todo.name }}</span>
        <span>{{ todo.created.$moment().format('YYYY-MM-DD') }}</span>
        <button @click="remove(todo.id)">X</button>
      </li>
    </ul>
    <form @submit.prevent="add">
      <input v-model="name" />
      <button>add</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      done: false,
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos.todos
    },
  },
  created() {
    this.$store.dispatch('todos/init')
  },
  methods: {
    add() {
      this.$store.dispatch('todos/add', this.name)
      this.name = ''
    },
    remove(id) {
      this.$store.dispatch('todos/remove', id)
    },
    toggleDone(todo) {
      this.$store.dispatch('todos/toggle', todo)
    },
  },
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
