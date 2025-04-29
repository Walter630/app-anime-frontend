<template>
   <v-app-bar :elevation="scrolling ? 0 : 2" color="black" dark :style="{ backgroundColor: scrolling ? 'transparent' : 'black' }">
  <v-row class="d-flex align-center w-100" no-gutters>
    <v-col cols="auto" class="d-flex align-center">
      <v-app-bar-nav-icon class="d-none d-md-flex"></v-app-bar-nav-icon>
      <v-card-title>
        <img src="/logo.png" height="50" style="margin-top: 5px;" />
      </v-card-title>
    </v-col>
    <v-col cols="auto" class="d-flex justify-end">
      <v-app-bar-title class="d-none d-md-flex">Yokosu</v-app-bar-title>
    </v-col>
  </v-row>


    <v-btn>
       <p>animes</p>
    </v-btn>
    <v-btn>
       <p>Sobre</p>
    </v-btn>
    <v-btn v-if="todoStore.userLogado?.email === 'walter@gmail.com'" @click="irPara('admin')">
        <p>Admin</p>
    </v-btn>
    <v-menu max-width="200px"  :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" dark v-bind="props"  >
          <v-avatar image="/imgs/Nanatsu.jpg">
        </v-avatar>
      </v-btn>
    </template>
      <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
            <v-avatar
              image="/imgs/Nanatsu.jpg"
            />
            <h3>{{ todoStore.userLogado?.name || 'Usuário não logado'}}</h3>
            <p>{{ todoStore.userLogado?.email || 'Usuário não logado'}}</p>
            <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded @click="editarConta()"> Editar conta </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded @click="logout()">Sair</v-btn>
          </div>
      </v-card-text>   
      </v-card>
    </v-menu>

    <v-btn icon >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
  <div style="width: 100%;">
    <v-main class="pa-1 fundo-personalizado" style="margin-top: 1px; width: 100%;">
    <div>  
      <PesquisarAnimes />
      <ListaAnimeItens />
    </div>
  </v-main>
</div>
    <v-footer class="d-flex align-center justify-center ga-4 flex-wrap flex-grow-1 py-3"
    color="black" dark>
    Redes
  </v-footer>
</template>

<script>
import { onMounted, onBeforeUnmount, reactive } from 'vue';
    import TodoLogin from './TodoLogin.vue';
    import ListaAnimeItens from './ListaAnimeItens.vue';
    import PesquisarAnimes from './PesquisarAnimes.vue';
    import { useTodoStore } from '../stores/todoStore';
    import { useRouter } from 'vue-router';

    export default {
        components: {ListaAnimeItens, PesquisarAnimes, TodoLogin},
        setup(){
            const todoStore = useTodoStore()
            const router = useRouter()
            const state = reactive({
              scrolling: false,
            });
            const irPara = (pagina) => {
                router.push('/AdmHome')
            }
            const editarConta = () => {
              router.push({name: 'editarUsuario', params: { id: todoStore.userLogado.id } })
            }
            const logout = () => {
            // Aqui você poderia limpar o token/login do usuário
            console.log('Usuário deslogado')
            todoStore.logout();
            router.push('/login')
            },

            onScroll = () => {
              state.scrolling = window.scrollY > 50;
            };

            onMounted(() => {
              window.addEventListener('scroll', onScroll);
            });

            onBeforeUnmount(() => {
              window.removeEventListener('scroll', onScroll);
            });

            return {
                irPara,
                todoStore,
                logout, // ⬅️ não esquece de retornar!
                editarConta,
                scrolling: state.scrolling,
                
            }
        }
    }
</script>

<style>

.fundo-personalizado {
  background-color: #313131;
}
.v-app-bar {
  transition: background-color 0.3s ease, elevation 0.3s ease;
}

</style>