<template>
  <q-page class="row justify-center items-center">
    <div class="col-5">
      <div class="col">
        <h2 class="q-my-md text-center">Join Ottoke</h2>
      </div>
      <div class="col">
        <q-card square flat class="q-pa-lg">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                ref="username"
                :rules="[
                  val => !!val || 'This field is required',
                  val => val.length >= 8 || '   be atleast 8 characters minimum'
                ]"
                square
                filled
                lazy-rules
                v-model.trim="form.username"
                :error-message="usernameErrors"
                :error="usernameErrors.length > 0"
                type="text"
                label="Username" />
              <q-input
                ref="password"
                square
                filled
                v-model.trim="form.password"
                :rules="[
                  val => !!val || 'This field is required',
                  val => val.length >= 8 || 'Should be atleast 8 characters minimum'
                ]"
                type="password"
                label="Password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn :disabled="disabled" unelevated color="blue-7" size="lg" class="full-width" label="Join" @click="onSubmit"/>
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
  name: 'JoinPage',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      errors: {},
      disabled: false
    }
  },

  computed: {
    ...mapState({
      uuid: s => s.client.uuid
    }),
    usernameErrors: function () {
      if (!('username' in this.errors)) {
        return ''
      }

      return this.errors.username[0]
    }
  },

  methods: {
    ...mapActions({
      join: 'client/join'
    }),
    onSubmit () {
      this.disabled = true
      this.join(this.form).then((response) => {
        this.disabled = false
      }).catch(error => {
        this.errors = { ...error.response.data }
        this.disabled = false
      })
    }
  }
}
</script>
