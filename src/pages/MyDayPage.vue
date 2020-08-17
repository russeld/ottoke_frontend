<template>
  <q-page padding>
    <div class="q-gutter-y-md">
      <div>
        <p class="text-h5 q-ma-none text-blue-7">My Day</p>
        <p class="text-caption text-blue-4">{{ today }}</p>
      </div>

      <todo-input :text="todo.title" v-on:submit="onSubmit" v-on:input="onInput" />

      <todo-list :completed="completed" :ongoing="ongoing" :moveCallback="onMoveCallback"/>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { TodoMixin } from '@/mixins/todos'
import { date } from 'quasar'

export default {
  name: 'myday-page',

  data () {
    return {
      todo: {
        title: null,
        my_day: date.formatDate(Date.now(), 'YYYY-MM-DD')
      },
      borderless: true
    }
  },

  mixins: [TodoMixin],

  computed: {
    ...mapState({
      todos: s => s.client.todos
    }),
    today () {
      return date.formatDate(Date.now(), 'ddd, MMM DD, YYYY')
    },
    hasTodos () {
      return (this.tasks.length > 0)
    }
  },

  watch: {
    todos (list) {
      this.tasks = list.filter(i => i.is_myday === true)
    }
  },

  methods: {
    ...mapActions({
      getTodos: 'client/getTodos',
      createTodo: 'client/createTodo'
    }),
    onSubmit (text) {
      if (!text) {
        return
      }
      this.todo.my_day = date.formatDate(Date.now(), 'YYYY-MM-DD')
      this.createTodo(this.todo)
        .then(response => {
          this.todo.title = ''
        })
    },
    onInput (text) {
      this.todo.title = text
    },
    loadTodos () {
      const query = {
        my_day: date.formatDate(Date.now(), 'YYYY-MM-DD')
      }
      this.getTodos(query)
        .then(() => { this.$store.commit('client/setTodo', null) })
    }
  },

  mounted () {
    this.loadTodos()
  }
}
</script>
