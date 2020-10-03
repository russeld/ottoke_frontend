import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'
import { Loading } from 'quasar'

axios.defaults.baseURL = process.env.DEV ? 'http://localhost:8000/' : process.env.BASE_URL

axios.defaults.paramsSerializer = params => {
  return qs.stringify(params, { arrayFormat: 'repeat' })
}

axios.interceptors.request.use((config) => {
  Loading.show()
  return config
})

axios.interceptors.response.use(function (response) {
  Loading.hide()
  return response
}, function (error) {
  Loading.hide()
  return Promise.reject(error)
})

Vue.prototype.$axios = axios
