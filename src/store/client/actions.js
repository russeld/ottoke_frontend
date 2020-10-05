import axios from 'axios'
import { LocalStorage } from 'quasar'
import { randomString } from '@/utils/strings'

export async function checkClientUuid ({ commit }) {
  let uuid = LocalStorage.getItem('uuid')
  const apiKey = LocalStorage.getItem('api_key')

  if (!uuid) {
    uuid = randomString(255)
    await axios.post('/clients', { uuid })
      .then(response => {
        LocalStorage.set('uuid', uuid)
        commit('setUuid', uuid)
      })
      .catch(err => console.log(err))
  } else {
    commit('setUuid', uuid)
  }

  if (apiKey) {
    LocalStorage.set('api_key', apiKey)
    commit('setApiKey', apiKey)
  }
}

export async function getSheets ({
  commit,
  state
}) {
  const response = await axios.get(`/clients/${state.uuid}/sheets`)
  commit('setSheets', response.data)
}

export async function getSheet ({
  commit,
  state
}, sheetId) {
  const response = await axios.get(`/clients/${state.uuid}/sheets/${sheetId}`)
  commit('setSheet', response.data)
}

export async function createSheet ({ commit, state }, text) {
  const data = {
    name: text
  }
  const response = await axios.post(`/clients/${state.uuid}/sheets`, data)
  commit('addSheet', response.data)
}

export async function deleteSheet ({ commit, state }, sheet) {
  await axios.delete(`clients/${state.uuid}/sheets/${state.sheet.id}`)
  commit('removeSheet', sheet)
}

export async function updateSheet ({ commit, state }, sheet) {
  const response = await axios.put(`clients/${state.uuid}/sheets/${state.sheet.id}`, sheet)
  commit('updateSheet', response.data)
}

export async function getTodos ({ commit, state }, query) {
  const response = await axios.get(`${state.uuid}/todos`, { params: query })
  commit('setTodos', response.data)
}

export async function getTasks ({ commit, state }, text) {
  const response = await axios.get(`clients/${state.uuid}/todos`)
  commit('setTodos', response.data)
  return response
}

export async function createTodo ({ commit, state }, todo) {
  const response = await axios.post(`${state.uuid}/todos`, todo)
  commit('addTodo', response.data)
  return response
}

export async function deleteTodo ({ commit, state }, todo) {
  await axios.delete(`${state.uuid}/todos/${todo.id}`)
  commit('deleteTodo', todo)
}

export async function updateTodo ({ commit, state }, todo) {
  const response = await axios.put(`${state.uuid}/todos/${todo.id}`, todo)
  commit('updateTodo', response.data)
  return response
}

export async function swap ({ commit, state }, todos) {
  const response = await axios.post('todos/swap', todos)
  return response
}

export async function syncTodoTags ({ commit, state }, tag) {
  const response = await axios.post('tags', tag)
  return response
}

export async function createTag ({ commit, state }, tag) {
  var data = {
    tag
  }
  const response = await axios.post(`${state.uuid}/tags`, data)
  return response
}

export async function getTags ({ commit, state }) {
  const response = await axios.get(`${state.uuid}/tags`)
  commit('setTags', response.data)
}

export async function join ({ commit, state }, data) {
  var payload = { ...data, uuid: state.uuid }
  const response = await axios.post('auth/join', payload)
  return response
}

export async function login ({ commit, state }, data) {
  var payload = { ...data }
  const response = await axios.post('auth/login', payload)
  return response
}
