import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import 'virtual:windi.css'
import HomePage from './pages/index.vue'
import PlayPage from './pages/play.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/play', component: PlayPage }
  ]
})

createApp(App).use(router).mount('#app')
