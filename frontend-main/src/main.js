import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import VueCookies from 'vue-cookies';

import Button from 'primevue/button';
import Menubar from 'primevue/menubar';   
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css'; 
                         //icons                       //icons
import { stateSymbol, createState } from './store/store'

const app = createApp(App)

app.use(router, VueCookies)
app.provide(stateSymbol, createState())

app.component('Button', Button)
app.component('Menubar', Menubar)

app.mount('#app')

//createApp(App).use(router, VueCookies).provide(stateSymbol, createState()).component('Button', Button).mount('#app')
