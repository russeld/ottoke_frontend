import { mapActions, mapState, mapGetters } from 'vuex'
import TodoItem from '@/components/todos/TodoItem'
import TodoInput from '@/components/todos/TodoInput'
import TodoList from '@/components/TodoList'

export const TodoMixin = {
  data () {
    return {
      todo: {
        status: false,
        title: null,
        sheet_id: null
      },
      tasks: [],
      query: {
        search: ''
      }
    }
  },

  components: {
    TodoInput,
    TodoItem,
    TodoList
  },

  computed: {
    ...mapState({
      todos: s => s.client.todos
    }),
    ...mapGetters({
      completed: 'client/completed',
      ongoing: 'client/ongoing'
    }),
    hasTodos () {
      return (this.ongoing.length > 0)
    },
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },

  watch: {
    todos (list) {
      this.tasks = list
    },
    'query.search' (value) {
      if (value) {
        this.loadTodos()
      }
    }
  },

  methods: {
    ...mapActions({
      getTodos: 'client/getTodos',
      createTodo: 'client/createTodo',
      getSheets: 'client/getSheets',
      swap: 'client/swap'
    }),
    onSubmit (text) {
      if (!text) {
        return
      }

      this.createTodo(this.todo)
        .then(() => { this.todo.title = '' })
        .then(() => this.getSheets())
    },
    onInput (text) {
      this.todo.title = text
    },
    onMoveCallback (orderedTasks) {
      const payload = {
        todos: orderedTasks.map(t => t.id)
      }
      this.swap(payload)
    },
    loadTodos () {
      this.$store.commit('client/setTodos', [])
      this.$store.commit('client/setTodo', null)
      this.$q.loading.show()
      this.getTodos(this.query)
        .then(() => { this.$q.loading.hide() })
    }
  }
}
