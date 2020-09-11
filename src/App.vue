<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script >
import { mapActions } from 'vuex'

export default {
  name: 'App',

  methods: {
    ...mapActions({
      checkUuid: 'client/checkClientUuid',
      getTags: 'client/getTags'
    })
  },

  created () {
    // load tags here
    this.checkUuid()
    this.getTags()
  }
}
</script>
