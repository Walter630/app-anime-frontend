<template>
   <v-app-bar :elevation="2" color="primary" >
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Yokosu</v-app-bar-title>

   
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
        <v-btn color="primary" dark v-bind="props">
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
            <h3>nome</h3>
            <p>Email</p>
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
    <v-container>
        <main  class="pa-12" style="margin-top: 0px">
        <div>  
            <PesquisarAnimes/>
            <ListaAnimeItens />
        </div>
    </main>
    </v-container>
    <v-footer  class="d-flex align-center justify-center ga-2 flex-wrap flex-grow-1 py-3"
    color="primary">
    Redes
  </v-footer>
</template>

<script>
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
            const irPara = (pagina) => {
                router.push('/adcionarAnime')
            }
            const logout = () => {
            // Aqui você poderia limpar o token/login do usuário
            console.log('Usuário deslogado')
            router.push('/login')
            }
            return {
                irPara,
                todoStore,
                logout // ⬅️ não esquece de retornar!
            }
        }
    }
</script>

<style>


</style>