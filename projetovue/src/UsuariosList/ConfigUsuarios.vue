<template>
    <v-app-bar :elevation="2" height="250" image="/imgs/Nanatsu.jpg" cover >
        <v-avatar size="100" image="/imgs/Nanatsu.jpg">
                </v-avatar>
            
                <!-- Ícone sobreposto -->
                <v-btn
                    icon
                    position-reactive
                >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
    </v-app-bar> 
    

    <v-container>
        <main class="pa-12" style="margin-top: 200px">
            <v-col v-for="(user, index) in usuarios" :key="index">
                <v-card>
                    <v-card-title>
                        {{ user.name }}
                        <h2>sd</h2>
                    </v-card-title>
                </v-card>
            </v-col>
        </main>
    </v-container>
</template>
  
<script >
import {useTodoStore} from '@/stores/todoStore'
import { ref } from "vue";
export default {
    setup() {
        const todoStore = useTodoStore()
        const usuarios = todoStore.usuarios

        const name = ref('')
        const email = ref('')

        return{
            usuarios,
            name,
            email
        }
    }
}

  </script>
