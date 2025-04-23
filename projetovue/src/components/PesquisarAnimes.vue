<template>
  <v-app-bar :elevation="2" color="primary">
  <template v-slot:prepend>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
  </template>

  <v-app-bar-title>Bar</v-app-bar-title>

  <v-btn icon >
    <v-icon>mdi-magnify</v-icon>
  </v-btn>

  <v-btn icon>
    <v-icon>mdi-dots-vertical</v-icon>
  </v-btn>
</v-app-bar>
  
  <v-container class="mt-4 d-flex flex-column flex-sm-row" fluid v-if="search">
    <v-row dense>
      <v-col
        v-for="(todo, index) in filteredTodos"
        :key="index"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="ma-2 pa-2" elevation="5">
          <v-img
            :src="`/imgs/${todo.image}`"
            height="200px"
            @click="goToAnime(todo.id)"
            class="imagess"
          />
          <v-card-title>{{ todo.title }}</v-card-title>
          <v-card-text>{{ todo.descrition }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    // Campo de busca
    const search = ref("");

    // Lista de animes (todos)
    const todos = computed(() => store.state.todos);

    // Filtro com base na busca
    const filteredTodos = computed(() => {
      if (!search.value) return todos.value;
      return todos.value.filter((todo) =>
        (todo.title?.toLowerCase() || "").includes(search.value.toLowerCase()) ||
        (todo.descrition?.toLowerCase() || "").includes(search.value.toLowerCase())
      );
    });

    // Redirecionar para a página de detalhes do anime
    const goToAnime = (id) => {
      router.push({ name: "AnimeDetails", params: { id } });
    };

    return {
      search,
      todos,
      filteredTodos,
      goToAnime,
    };
  },
};
</script>



<style>
    .imagess{
        transition: transform 0.3s ease-in-out;
    }
    .imagess:hover{
        transform: scale(1.05);
        cursor: pointer;
    }
    
</style>
