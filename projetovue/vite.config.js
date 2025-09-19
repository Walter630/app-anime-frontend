import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify' // 👈 Importe o plugin

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vuetify({ autoImport: true }) // 👈 Adicione aqui
    ],
    server: {
        proxy: {
            '/Api': 'http://localhost:3000'
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})