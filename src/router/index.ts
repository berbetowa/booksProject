import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import CurrentlyReadingList from '../views/CurrentlyReadingList.vue'
import PlansView from '../views/PlansView.vue'
import WishList from '../views/WishList.vue'
import UnreadBooks from '../views/UnreadBooks.vue'
import ReadList from '../views/ReadList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/reading', name: 'reading', component: CurrentlyReadingList },
    { path: '/plans', name: 'plans', component: PlansView },
    { path: '/wishlist', name: 'wishlist', component: WishList },
    { path: '/unread', name: 'unread', component: UnreadBooks },
    { path: '/read', name: 'read', component: ReadList }
  ]
})

export default router
