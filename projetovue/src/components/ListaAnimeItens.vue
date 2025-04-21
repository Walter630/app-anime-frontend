<template>
  <v-container>
    <v-row>
      <v-col v-for="(todo, index) in todos" :key="index" :todo="todo" cols="4">
        <v-card class="ma-4" elevation="3">
          <v-img
            class="images"
            :src="`/imgs/${todo.image}`"
            height="400"
            cover
            @click="goToAnime(todo.id)"
            style="cursor: pointer"
            cols="12"
            sm="6"
            md="4"
          />
          <v-card-title>{{ todo.title }}</v-card-title>
          <v-card-text>
            Click para ver mais...
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "TodoList",
  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const store = useStore();

    const todos = computed(() => store.state.todos);

    const router = useRouter();

    const toggleDone = (index) => {
      store.commit("toggleDone", index);
    };

    const removeTodo = (index) => {
      store.commit("removeTodo", index);
    };

    const goToAnime = (id) => {
      router.push({ name: "AnimeDetails", params: { id } });
    };

    return {
      todos,
      toggleDone,
      removeTodo,
      goToAnime,
    };
  },
};
</script>

<style scoped>
.images {
  transition: transform 0.3s ease-in-out;
}
.images:hover {
  transform: scale(1.08); /* aumenta 5% */
  cursor: pointer;
}
</style>
