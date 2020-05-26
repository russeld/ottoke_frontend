export function ongoing (state) {
  return state.todos.filter(t => t.status === false)
}

export function completed (state) {
  return state.todos.filter(t => t.status === true)
}
