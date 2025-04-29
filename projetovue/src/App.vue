<template>
  <v-app>
    <div>
      <div>
        <!-- Aqui vai o conteúdo das rotas -->
        <router-view />

        <!-- Spinner global, se quiser -->
        <TodoSpinner v-if="loading" />
      </div>
    </div>
  </v-app>
</template>

<script>
import TodoSpinner from "./components/TodoSpinner.vue";
import { onMounted, ref } from "vue";
import { useTodoStore } from "@/stores/todoStore";


export default {
  name: "App",
  components: { TodoSpinner },

  setup() {
    const loading = ref(false);
    const todoStore = useTodoStore();
    
    todoStore.loadUsuarioLogado();

    onMounted(async () => {
      loading.value = true;
      // Esperar as ações de pegar os todos e usuários
      await Promise.all([todoStore.getTodos(), todoStore.getUsuario()]);
      loading.value = false;
    });
     // 🔥 carrega se tiver alguém logado

    return {
      loading,
    };
  },
};
</script>

<style>

</style>
