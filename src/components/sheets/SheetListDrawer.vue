<template>
  <q-drawer
    v-model="display"
    :mini="isOpen"
    show-if-above
    :width="250"
    :breakpoint="500"
    bordered
    content-class="white text-weight-medium">

    <q-scroll-area class="fit">
      <q-list>
        <q-item clickable @click="isOpen = !isOpen" >
          <q-item-section avatar>
            <q-icon flat name="menu"/>
          </q-item-section>
        </q-item>

        <q-item clickable :to="{ name: 'myday-page' }" active-class="bg-orange-2 text-orange-8">
          <q-item-section class="text-capitalize">Today</q-item-section>
          <q-item-section avatar>
            <q-icon flat name="wb_sunny" color="orange"/>
          </q-item-section>
        </q-item>

        <q-item clickable :to="{ name: 'task-page' }" active-class="bg-green-2 text-green-8">
          <q-item-section class="text-capitalize">Tasks</q-item-section>
          <q-item-section avatar>
            <q-icon flat name="view_list" color="green" />
          </q-item-section>
        </q-item>

        <q-item
          :to="{ name: 'sheet-page', params: { id: sheet.id } }"
          active-class="bg-blue-2 text-blue-7"
          v-for="sheet in sheets"
          :key="sheet.id"
          clickable
          v-ripple>
          <q-item-section class="text-capitalize">
            {{ sheet.name }}
          </q-item-section>
          <q-item-section avatar>
            <div v-if="!isOpen">
              {{ sheet.ongoing ? sheet.ongoing : '' }}
            </div>
            <div class="text-capitalize" v-else>
              {{ sheet.name.substring(0, 2) }}
              <q-badge transparent align="middle" color="blue-10" floating v-if="sheet.ongoing">{{ sheet.ongoing }}</q-badge>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <q-input square filled placeholder="New List" bg-color="white" v-model.trim="text" class="col-12" @keypress.enter="onSubmit" @focus="isOpen = false">
        <template v-slot:prepend>
          <q-icon color="blue-7" size="md" name="add" />
        </template>
        <template v-slot:append>
          <q-icon v-if="text" name="clear" color="blue-12" class="cursor-pointer" @click="text = ''" />
        </template>
      </q-input>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'sheet-list-drawer',
  data () {
    return {
      text: null,
      isOpen: false,
      display: false
    }
  },

  computed: {
    ...mapState({
      uuid: s => s.client.uuid,
      sheets: s => s.client.sheets
    })
  },

  watch: {
    uuid (id) {
      this.getSheets()
    }
  },

  methods: {
    ...mapActions({
      getSheets: 'client/getSheets',
      createSheet: 'client/createSheet'
    }),
    onSubmit () {
      if (!this.text) {
        return
      }
      this.createSheet(this.text).then(response => { this.text = '' })
    }
  },

  mounted () {
    if (this.uuid) {
      this.getSheets()
    }
  }
}
</script>
