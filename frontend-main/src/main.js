import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { stateSymbol, createState } from './store/store'
createApp(App).use(router).provide(stateSymbol, createState()).mount('#app')
