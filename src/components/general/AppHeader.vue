<template>
  <q-header flat>
    <q-toolbar>
      <q-toolbar-title>
        Ottoke
      </q-toolbar-title>
      <q-space />
      <q-btn stretch flat label="Login" icon="login" to="/login" v-if="!apiKey" />
      <q-separator dark vertical />
      <q-btn stretch flat label="Join" icon="upgrade" to="/join" v-if="!apiKey" />
      <q-btn stretch flat label="Logout" icon="logout" to="/join" v-if="apiKey" />
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-header',

  computed: {
    ...mapState({
      apiKey: s => s.client.apiKey,
      uuid: s => s.client.uuid
    })
  }
}
</script>
