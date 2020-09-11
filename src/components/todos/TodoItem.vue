<template>
  <q-item
    :clickable="clickable"
    :class="{'bg-cyan-1': activeTodo && activeTodo.id === todo.id}"
    ripple
    class="q-pa-sm text-weight-medium"
    @click="onClick">
    <q-item-section side>
      <q-checkbox v-model="val" :val="todo.id" color="green" @input="updateInput"/>
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{ 'text-strike': todo.status }" class="q-pl-xs">{{ todo.title }}</q-item-label>
      <q-item-label caption class="flex content-center q-gutter-x-sm">
        <span class="text-info" v-if="showSheetName">
          <q-icon name="list" />
        </span>
        <span v-if="showSheetName">{{ todo.sheet_name }}</span>
        <span
          v-if="todo.due_date"
          :class="{'text-primary': (!todo.is_overdue && !todo.status), 'text-warning': (todo.is_overdue && !todo.status)}"
          class="">
          <q-icon name="calendar_today" />
        </span>
        <span v-if="todo.due_date">Due on {{ formatDueDate() }}</span>

        <span v-if="todo.is_myday" class="text-green-5">
          <q-icon flat name="wb_sunny"/>
        </span>
        <span v-if="todo.is_myday">My Day</span>
      </q-item-label>
      <q-item-label>
        <q-chip color="blue" size="xs" v-for="tag in todo.tags" :key="tag.name">{{ tag.name }}</q-chip>
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <slot name="handle"></slot>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'todo-item',
  data () {
    return {
      val: true
    }
  },

  props: {
    todo: {
      type: Object
    },
    showDueDate: {
      type: Boolean,
      default: true
    },
    clickable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    showSheetName () {
      return this.$route.name === 'myday-page'
    },
    ...mapState({
      activeTodo: s => s.client.todo
    })
  },

  watch: {
    todo (todo) {
      this.val = todo.status
    }
  },

  methods: {
    ...mapActions({
      updateTodo: 'client/updateTodo',
      getSheets: 'client/getSheets'
    }),
    updateInput () {
      const todo = { ...this.todo, status: this.val ? 1 : 0, priority: 0 }
      this.updateTodo(todo).then(() => {
        if (todo.status) {
          this.$store.commit('client/setTodo', null)
        }
      }).then(() => {
        this.getSheets()
      })
    },
    onClick () {
      this.$store.commit('client/setTodo', this.todo)
    },
    formatDueDate () {
      return moment(this.todo.due_date, 'YYYY-MM-DD').format('ddd, MMMM D')
    }
  },

  mounted () {
    this.val = this.todo.status
  }
}
</script>
