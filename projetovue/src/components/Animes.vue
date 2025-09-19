<template>

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
  background-color: #0f0f0f;
}
.v-app-bar {
  transition: background-color 0.3s ease, elevation 0.3s ease;
}

</style>