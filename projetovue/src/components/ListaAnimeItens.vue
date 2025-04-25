<template>
  <v-container >
    <v-row>
      <v-col v-for="(todo, index) in todos" :key="index" :todo="todo" 
            cols="12"
            sm="4"
            md="3"
            lg="3">
        <v-card class="ma-2 pa-2"  elevation="3">
          <div class="d-flex flex-column flex-ms-row">
            <v-img
              class="images "
              :src="`/imgs/${todo.image}`"
              height="200"
              right="200"
              @click="goToAnime(todo.id)"
              style="cursor: pointer"
              />
            <v-card-title>{{ todo.title }}</v-card-title>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed, ref } from "vue";
import { useTodoStore } from '@/stores/todoStore'
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
    const todoStore = useTodoStore()
    const router = useRouter();

    const show = ref(false)

    const toggleDone = (index) => {
      todoStore.commit(toggleDone(), index);
    };

    const removeTodo = (index) => {
      todoStore.commit(removeTodo(), index)
    };

    const goToAnime = (id) => {
      router.push({ name: "AnimeDetails", params: { id } });
    };

    return {
      toggleDone,
      removeTodo,
      goToAnime,
      show
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
