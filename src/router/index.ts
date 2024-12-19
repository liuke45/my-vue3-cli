import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
export interface IModuleType {
  default: Array<RouteRecordRaw> | RouteRecordRaw
}

const modules = import.meta.glob<IModuleType>('./**/*.ts', { eager: true })

const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce(
  (list: RouteRecordRaw[], key) => {
    const mod = modules[key]?.default ?? {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    return [...list, ...modList]
  },
  [],
)

const redirectRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
]

// 404 页面
const notFoundRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/404Page.vue'),
  },
]

const routes: RouteRecordRaw[] = [
  ...redirectRoutes,
  ...routeModuleList,
  ...notFoundRoutes,
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
