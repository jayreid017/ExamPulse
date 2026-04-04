import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../pages/Homepage.vue'
import TeacherLayout from '../layouts/TeacherLayout.vue'
import TeacherDashboard from '../pages/Teacher/Dashboard.vue'
import TeacherClasses from '../pages/Teacher/Classes.vue'
import TeacherStudents from '../pages/Teacher/Students.vue'
import TeacherSchedule from '../pages/Teacher/Schedule.vue'
import TeacherMessages from '../pages/Teacher/Messages.vue'
import TeacherSettings from '../pages/Teacher/Settings.vue'
import TeacherCreate from '../pages/Teacher/Create.vue'
import Login from '../pages/Auth/Login.vue'
import Register from '../pages/Auth/Register.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Homepage
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { hideNavbar: true }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { hideNavbar: true }
  },
  {
    path: '/teacher',
    component: TeacherLayout,
    meta: { hideNavbar: true },
    children: [
      {
        path: '',
        redirect: '/teacher/dashboard'
      },
      {
        path: 'dashboard',
        name: 'teacher-dashboard',
        component: TeacherDashboard
      },
      {
        path: 'create',
        name: 'teacher-create',
        component: TeacherCreate
      },
      {
        path: 'classes',
        name: 'teacher-classes',
        component: TeacherClasses
      },
      {
        path: 'students',
        name: 'teacher-students',
        component: TeacherStudents
      },
      {
        path: 'schedule',
        name: 'teacher-schedule',
        component: TeacherSchedule
      },
      {
        path: 'messages',
        name: 'teacher-messages',
        component: TeacherMessages
      },
      {
        path: 'settings',
        name: 'teacher-settings',
        component: TeacherSettings
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  }
})

export default router
