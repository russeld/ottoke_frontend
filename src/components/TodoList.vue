<template>
  <div class="q-gutter-y-md">
    <draggable
      v-bind="dragOptions"
      v-model="tasks"
      class="task-list"
      v-if="ongoing.length > 0"
      handle=".handle"
      @change="onChange">
      <todo-item v-for="task in tasks" :key="task.id" :todo="task">
        <template v-slot:handle>
          <q-icon class="fa fa-align-justify handle" name="drag_handle" />
        </template>
      </todo-item>
    </draggable>

    <q-list bordered :disabled="!completed.length">
      <q-expansion-item
        ref="completedList"
        :duration="100"
        expand-separator
        icon="check"
        label="Completed"
      >
        <q-list separator>
          <todo-item v-for="task in completed" :key="task.id" :todo="task" />
        </q-list>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import TodoItem from '@/components/todos/TodoItem'
import draggable from 'vuedraggable'

export default {
  name: 'todo-list',

  data () {
    return {
      tasks: []
    }
  },

  props: {
    ongoing: {
      type: Array
    },
    completed: {
      type: Array
    },
    moveCallback: {
      type: Function
    }
  },

  watch: {
    ongoing (ongoing) {
      this.tasks = ongoing
    }
  },

  methods: {
    onChange () {
      this.moveCallback(this.tasks)
    }
  },

  components: {
    draggable,
    TodoItem
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
  }
}
</script>
