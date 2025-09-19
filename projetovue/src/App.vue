<template>
  <v-app>

    <div>

        <!-- Aqui vai o conteúdo das rotas -->
        <router-view />

        <!-- Spinner global, se quiser -->
        <TodoSpinner v-if="loading" />

    </div>
  </v-app>
</template>

<script>
import TodoSpinner from "./components/TodoSpinner.vue";
import { onMounted, ref } from "vue"; // ✅ ADICIONE onMounted AQUI!
import { useTodoStore } from "@/stores/todoStore";


export default {
  name: "App",
  components: { TodoSpinner },

  setup() {
    const loading = ref(false);
    const todoStore = useTodoStore();

    todoStore.loadUsuarioLogado();

    onMounted(async () => { // ✅ Agora onMounted está definido!
      loading.value = true;
      try {
        await Promise.all([todoStore.getTodos(), todoStore.getUsuario()]);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        loading.value = false;
      }
    });

    return {
      loading,
    };
  },
};
</script>

<style>

</style>
