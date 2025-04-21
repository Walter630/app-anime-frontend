<template>
  <v-form>
    <v-text-field
      v-model="search"
      name="Anime"
      label="Buscar Anime"
      placeholder="Digite o anime"
      clearable
      class="mb-4"
    ></v-text-field>
  </v-form>

  <v-container>
    <v-col v-for="(todo, index) in filteredTodos" :key="index" v-if="search">
      <v-card class="ma-2 pa-2" elevation="2">
        <v-img :src="`/imgs/${todo.image}`" height="400px" cover @click="goToAnime(todo.id)"
        class="imagess"></v-img>
        <v-card-title>
          {{ todo.title }}
        </v-card-title>
        <v-card-text>
          {{ todo.descrition }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const search = ref("");
    const todos = computed(() => store.state.todos);
    const router = useRouter()

    // Computed para filtrar a lista de todos com base no valor de pesquisa
    const filteredTodos = computed(() => {
      if (!search.value) return todos.value;
      return todos.value.filter(
        (todo) =>
          todo.title.toLowerCase().includes(search.value.toLowerCase()) ||
          todo.descrition.toLowerCase().includes(search.value.toLowerCase())
      );
    })
    const goToAnime = (id) => {
      router.push({ name: "AnimeDetails", params: { id } });
    };
    return{
        search,
        todos,
        filteredTodos,
        goToAnime
    }
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
