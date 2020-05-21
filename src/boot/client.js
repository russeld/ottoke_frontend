import { LocalStorage, Loading } from 'quasar'
import axios from 'axios'
import { randomString } from '@/utils/strings'

export default ({ store, redirect, urlPath, router }) => {
  router.beforeEach((to, from, next) => {
    Loading.show()
    let uuid = LocalStorage.getItem('uuid')

    if (!uuid) {
      uuid = randomString(255)
      axios.post('/clients', { uuid })
        .then(() => {
          LocalStorage.set('uuid', uuid)
          store.commit('client/setUuid', uuid)
          Loading.hide()
          next('/tasks')
        })
        .catch(err => console.log(err))
    } else {
      if (to.name === 'index') {
        next('/tasks')
      }
      next()
    }
  })

  router.afterEach(() => {
    Loading.hide()
  })
}
