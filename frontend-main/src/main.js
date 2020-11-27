import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import VueCookies from 'vue-cookies';
import { stateSymbol, createState } from './store/store'
createApp(App).use(router, VueCookies).provide(stateSymbol, createState()).mount('#app')
