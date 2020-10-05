<template>
  <q-header flat>
    <q-toolbar>
      <q-toolbar-title @click="onClickTitle" class="cursor-pointer">
        Ottoke
      </q-toolbar-title>
      <q-space />
      <q-btn stretch flat label="Login" icon="login" to="/login" v-if="!apiKey" />
      <q-separator dark vertical />
      <q-btn stretch flat label="Join" icon="upgrade" to="/join" v-if="!apiKey" />
      <q-btn stretch flat label="Logout" icon="logout" to="/join" v-if="apiKey" @click="onClickLogout" />
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapState } from 'vuex'
import { LocalStorage } from 'quasar'

export default {
  name: 'app-header',

  computed: {
    ...mapState({
      apiKey: s => s.client.apiKey,
      uuid: s => s.client.uuid
    })
  },

  methods: {
    onClickTitle () {
      this.$router.push({ name: 'task-page' })
    },
    onClickLogout () {
      this.$q.dialog({
        title: 'Logout',
        message: 'You are about to leave Ottoke. Tasks will be cleared and a new session will be created.',
        options: {
          model: [],
          items: [
            { label: 'I want to keep my tasks', value: 'true', color: 'secondary' }
          ],
          type: 'checkbox'
        }
      }).onOk(data => {
        if (!data.length) {
          LocalStorage.remove('uuid')
          this.$store.commit('client/setUuid', null)
        }

        LocalStorage.remove('api_key')
        this.$store.commit('client/setApiKey', null)
      }).onOk(data => {
        location.reload()
      })
    }
  }
}
</script>
