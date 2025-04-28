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
                <h1>sa</h1>
                    <v-card-title >
                        <h2>{{ todoStore.userLogado?.email || 'Usuário não logado'}} </h2>
                        <small v-if="todoStore.userLogado && todoStore.userLogado.email" class="text-success">
                        Usuário logado: {{ todoStore.userLogado.email }}
                        </small>
                    </v-card-title>
                </v-card>
            </v-cols>
        </main>
    </v-container>
</template>
  
<script >
import {useTodoStore} from '@/stores/todoStore'
import { computed } from "vue";
import TodoLogin from '@/components/TodoLogin.vue';
export default {
    components: {TodoLogin},
    setup() {
        const todoStore = useTodoStore()
        const usuarios = todoStore.usuarios

        const useEdit = computed(() => {
            return todoStore.userLogado ? todoStore.userLogado : null;
        });

        return{
            usuarios,
            useEdit,
           
        }
    }
}

  </script>
