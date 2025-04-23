<template>
  <v-app>
  
    <div class="px-3">
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
import { useStore } from "vuex";

export default {
  name: "App",
  components: { TodoSpinner },

  setup() {
    const loading = ref(false);
    const store = useStore();

    onMounted(async () => {
      loading.value = true;
      await store.dispatch("getTodos");
      loading.value = false;
    });

    onMounted(async () => {
      await store.dispatch("getUsuarios");
    });

    return {
      loading,
    };
  },
};
</script>

<style></style>
