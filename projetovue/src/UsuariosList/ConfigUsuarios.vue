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
            
    </v-app-bar> 
    
    <v-container>
        <main class="pa-12" style="margin-top: 250px">
            <v-cols cols="5" ma-3 pa-2>
                <v-card >
                    <v-card-title >
                        
                        s
                        {{ useEdit.nome }}
                    </v-card-title>
                </v-card>
            </v-cols>
        </main>
    </v-container>
</template>
  
<script >
import {useTodoStore} from '@/stores/todoStore'
import { computed } from "vue";
export default {
    setup() {
        const todoStore = useTodoStore()
        const usuarios = todoStore.usuarios

        const useEdit = computed(() => {
            todoStore.userLogado || {}
        })

        return{
            usuarios,
            useEdit
        }
    }
}

  </script>
