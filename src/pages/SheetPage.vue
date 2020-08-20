<template>
  <q-page padding>
    <div v-if="sheet" class="q-gutter-y-md">
      <div class="row text-weight-medium text-blue-7 flex align-center justify-between">
        <div class="col-2 flex items-center">
          <p class="text-h5 q-ma-none">{{ sheet.name }}</p>
          <q-popup-edit v-model="sheet.name" @save="updateSheetName" buttons>
            <q-input v-model="sheet.name" dense autofocus>
              <template v-slot:append>
                <q-icon name="edit" />
              </template>
            </q-input>
          </q-popup-edit>
        </div>

        <div class="col-2 flex items-center q-gutter-x-sm justify-end">
          <q-btn unelevated dense color="negative" size="sm" icon="delete" @click="confirm" />
        </div>
      </div>

      <todo-input :text="todo.title" v-on:submit="onSubmit" v-on:input="onInput" />

      <todo-list :completed="completed" :ongoing="ongoing" :moveCallback="onMoveCallback" />
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { TodoMixin } from '@/mixins/todos'

export default {
  name: 'sheet-page',

  data () {
    return { }
  },

  mixins: [TodoMixin],

  computed: {
    ...mapState({
      sheet: s => s.client.sheet
    })
  },

  watch: {
    '$route.params.id': {
      handler: function (id) {
        this.todo.sheet_id = id
        this.sheetId = id
        this.loadSheet()
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    ...mapActions({
      updateSheet: 'client/updateSheet',
      getSheet: 'client/getSheet',
      getSheets: 'client/getSheets',
      deleteSheet: 'client/deleteSheet'
    }),
    updateSheetName () {
      if (this.sheet.text === '') {
        return
      }

      this.updateSheet(this.sheet)
    },
    confirm () {
      this.$q.dialog({
        title: `Delete "${this.sheet.name}"`,
        message: 'You won\'t be able to undo this action.',
        ok: {
          color: 'negative',
          flat: true,
          label: 'Delete'
        },
        cancel: {
          flat: true
        },
        persistent: true
      }).onOk(() => {
        this.deleteSheet(this.sheet)
      })
    },
    loadTodos () {
      const query = { ...this.query, sheet_id: this.sheetId }
      this.getTodos(query)
    },
    loadSheet () {
      this.getSheet(this.sheetId)
        .then(() => { this.loadTodos() })
        .then(() => { this.$store.commit('client/setTodo', null) })
    }
  },

  mounted () {
    this.loadSheet()
  }
}
</script>
