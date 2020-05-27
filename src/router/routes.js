
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('layouts/SheetLayout.vue'),
    children: [
      {
        path: '/sheets/:id/tasks',
        name: 'sheet-page',
        component: () => import('pages/SheetPage.vue')
      },
      {
        path: '/tasks',
        name: 'task-page',
        component: () => import('pages/TaskPage.vue')
      },
      {
        path: '/today',
        name: 'myday-page',
        component: () => import('pages/MyDayPage.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
