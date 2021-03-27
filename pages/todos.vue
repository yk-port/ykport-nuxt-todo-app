<template>
  <div>
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
  created() {
    this.$store.dispatch('todos/init')
  },
  methods: {
    add() {
      this.$store.dispatch('todos/add', this.name)
      this.name = ''
    },
  },
}
</script>

<style lang="scss" scoped></style>
