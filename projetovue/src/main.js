// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'  // Não precisa mais de store diretamente
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'  // Importa os estilos
import '@mdi/font/css/materialdesignicons.css';


import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  defaults: {},
  icons: {
    defaultSet: 'mdi'
  },
})

createApp(App)
  .use(vuetify)
  .use(createPinia())  // Pinia já é configurado assim
  .use(router)
  .mount('#app')
