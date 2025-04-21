// src/main.js
import { createApp } from 'vue'


import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'vuetify/styles' // Importa os estilos
import App from './App.vue'
import store from './store'
import router from './router'



const vuetify = createVuetify({
  components,
  directives,
})


createApp(App)
  .use(vuetify)
  .use(store)
  .use(router)
  .mount('#app')