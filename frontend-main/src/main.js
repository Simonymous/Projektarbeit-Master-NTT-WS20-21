import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import VueCookies from 'vue-cookies'
import PrimeVue from 'primevue/config'

import Button from 'primevue/button'
import Panel from 'primevue/panel'
import Menubar from 'primevue/menubar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Menu from 'primevue/menu'
import TabMenu from 'primevue/tabmenu'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import Dropdown from 'primevue/dropdown'
import Password from 'primevue/password'
import Listbox from 'primevue/listbox'
import Dialog from 'primevue/dialog'
import Editor from 'primevue/editor'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Card from 'primevue/card'
import Slider from 'primevue/slider'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import { stateSymbol, createState } from './store/store'

const app = createApp(App)
app.use(ConfirmationService)
app.use(PrimeVue)
app.use(router, VueCookies)
app.provide(stateSymbol, createState())

app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Dropdown', Dropdown)
app.component('Menubar', Menubar)
app.component('Dialog', Dialog)
app.component('Menu', Menu)
app.component('Panel', Panel)
app.component('TabMenu', TabMenu)
app.component('InputText', InputText)
app.component('ConfirmDialog', ConfirmDialog)
app.component('SelectButton', SelectButton)
app.component('Password', Password)
app.component('Listbox', Listbox)
app.component('Editor', Editor)
app.component('Splitter', Splitter)
app.component('SplitterPanel', SplitterPanel)
app.component('Card', Card)
app.component('Slider', Slider)

app.mount('#app')
