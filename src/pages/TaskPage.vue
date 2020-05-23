<template>
  <q-page padding>
    <div class="q-gutter-y-md">
      <div>
        <p class="text-h5 q-ma-none text-blue-7">Tasks</p>
      </div>

      <todo-input :text="text" v-on:submit="onSubmit" v-on:input="onInput"/>

      <draggable
        v-bind="dragOptions"
        v-model="tasks"
        class="task-list"
        v-if="hasTodos"
        @change="onMoveCallback">
        <todo-item v-for="task in tasks" :key="task.id" :todo="task" />
      </draggable>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import draggable from 'vuedraggable'
import TodoItem from '@/components/todos/TodoItem'
import TodoInput from '@/components/todos/TodoInput'

export default {
  name: 'task-page',

  data () {
    return {
      text: null,
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
    hasTodos () {
      return (this.tasks.length > 0)
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

  components: {
    draggable,
    TodoInput,
    TodoItem
  },

  watch: {
    todos (list) {
      this.tasks = list
    }
  },

  methods: {
    ...mapActions({
      getTasks: 'client/getTasks',
      createTask: 'client/createTask',
      swap: 'client/swap'
    }),
    onSubmit (text) {
      if (!text) {
        return
      }

      this.createTask(text)
        .then(response => { this.text = '' })
        .then(() => this.getTasks())
    },
    onInput (text) {
      this.text = text
    },
    onMoveCallback (evt) {
      const payload = {
        todos: this.tasks.map(t => t.id)
      }
      this.swap(payload)
    }
  },

  mounted () {
    this.getTasks()
  }
}
</script>
