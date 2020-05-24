<template>
  <q-page padding>
    <div class="q-gutter-y-md">
      <div>
        <p class="text-h5 q-ma-none text-blue-7">My Day</p>
        <p class="text-caption text-blue-4">{{ today }}</p>
      </div>

      <todo-input :text="todo.title" v-on:submit="onSubmit" v-on:input="onInput" />

      <q-list separator bordered v-if="hasTodos">
        <todo-item v-for="task in tasks" :key="task.id" :todo="task" />
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { date } from 'quasar'
import TodoItem from '@/components/todos/TodoItem'
import TodoInput from '@/components/todos/TodoInput'

export default {
  name: 'myday-page',

  data () {
    return {
      todo: {
        title: null,
        my_day: date.formatDate(Date.now(), 'YYYY-MM-DD')
      },
      tasks: [],
      borderless: true,
      query: {
        search: ''
      }
    }
  },

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

  components: {
    TodoInput,
    TodoItem
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
    }
  },

  mounted () {
    this.loadTodos()
  }
}
</script>
