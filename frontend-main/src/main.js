import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import VueCookies from 'vue-cookies';

import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Menubar from 'primevue/menubar';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column';
import Menu from 'primevue/menu';
import TabMenu from 'primevue/tabmenu';
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import Dropdown from 'primevue/dropdown'
import Password from 'primevue/password';
import Listbox from 'primevue/listbox';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css'; 

import { stateSymbol, createState } from './store/store'

const app = createApp(App)

app.use(router, VueCookies)
app.provide(stateSymbol, createState())

app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Dropdown', Dropdown)
app.component('Menubar', Menubar)
app.component('Menu', Menu)
app.component('Panel', Panel)
app.component('TabMenu', TabMenu)
app.component('InputText', InputText)
app.component('SelectButton', SelectButton)
app.component('Password', Password)
app.component('Listbox', Listbox)

app.mount('#app')

// createApp(App).use(router, VueCookies).provide(stateSymbol, createState()).component('Button', Button).mount('#app')
