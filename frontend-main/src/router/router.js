import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/SignUp.vue'
import Test from '../views/storetest.vue'
import UserManagment from '../views/userManagement.vue'
import MenuBar from '../views/MenuBar'
import CreateTask from '../components/CreateTask'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/userManagment',
    name: 'UserManagment',
    component: UserManagment
  },
  {
    path: '/menubar',
    name: 'MenuBar',
    component: MenuBar
  },
  {
    path: '/createTask',
    name: 'CreateTask',
    component: CreateTask
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
