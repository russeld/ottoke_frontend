<template>
  <q-layout view="hHh lpr fFf">
    <app-header />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AppHeader from '@/components/general/AppHeader'

export default {
  name: 'MainLayout',
  data () {
    return {
    }
  },
  components: {
    AppHeader
  }
}
</script>
