<template>
  <q-page padding>
    <div class="q-gutter-y-md">
      <div>
        <p class="text-h5 q-ma-none text-blue-7">Tasks</p>
      </div>

      <todo-input :text="todo.title" v-on:submit="onSubmit" v-on:input="onInput"/>

      <todo-list :completed="completed" :ongoing="ongoing" :moveCallback="onMoveCallback"/>
    </div>
  </q-page>
</template>

<script>
import { TodoMixin } from '@/mixins/todos'

export default {
  name: 'task-page',

  mixins: [TodoMixin],

  data () {
    return {
      visible: false
    }
  },

  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },

  mounted () {
    this.getTodos()
  }
}
</script>
