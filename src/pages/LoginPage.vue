<template>
  <q-page class="row justify-center items-center">
    <div class="col-5">
      <div class="col">
        <h2 class="q-my-md text-center">Login</h2>
      </div>
      <div class="col">
        <q-card square flat class="q-pa-lg">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                ref="username"
                square
                filled
                v-model="form.username"
                type="text"
                label="Username" />
              <q-input
                ref="password"
                square
                filled
                v-model="form.password"
                type="password"
                label="Password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="blue-7" size="lg" class="full-width" label="Login" @click="onSubmit"/>
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6"></p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LoginPage',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },

  computed: {
    ...mapState({
      uuid: s => s.client.uuid
    })
  },

  methods: {
    ...mapActions({
      login: 'client/login'
    }),
    onSubmit () {
      this.login(this.form).then((response) => {
        this.$store.commit('client/login', response.data)
      }).then(() => {
        this.$router.push({ name: 'task-page' })
      })
    }
  }
}
</script>
