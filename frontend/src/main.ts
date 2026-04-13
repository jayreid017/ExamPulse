import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createNotivue } from 'notivue'
import 'notivue/animations.css'

const app = createApp(App)

const notivue = createNotivue({
  position: 'top-right',
  limit: 5,
  enqueue: true,
  avoidDuplicates: true,
  notifications: {
    global: {
      duration: 3000
    }
  }
})

app.use(notivue)
app.use(router)
app.mount('#app')
