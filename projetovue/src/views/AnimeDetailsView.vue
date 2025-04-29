<template>
  <v-app-bar :elevation="2" color="black" dark>
  <v-row class="d-flex align-center w-100" no-gutters>
    <v-col cols="auto" class="d-flex align-center">
      
      <v-btn icon @click="Home">
        <v-icon>mdi-arrow-left-bold-outline</v-icon>
      </v-btn>
      <v-card-title>
        <img src="/logo.png" height="50" style="margin-top: 5px;" />
      </v-card-title>
    </v-col>
    <v-col cols="auto" class="d-flex justify-end">
      <v-app-bar-title class="d-none d-md-flex">Yokosu</v-app-bar-title>
    </v-col>
  </v-row>
  </v-app-bar>
  <v-empty-state
    icon="mdi-magnify"
    text="Pagina ainda em Construcao aguarde"
    title="We couldn't find a match."
    style="margin-top: 200px;"
  ></v-empty-state>
<!-- <v-container>
    <v-card class="ma-4 pa-4" elevation="4" v-if="anime">
      <v-img :src="`/imgs/${anime.image}`" height="300px" cover></v-img>
      <v-card-title class="text-h5">{{ anime.title }}</v-card-title>
      <v-card-text>{{ anime.descrition }}</v-card-text>

      <v-divider class="my-4"></v-divider>

      <h2 class="text-h5 mb-2">Capítulos</h2>

      <v-row v-if="anime.chapters && anime.chapters.length" dense>
        <v-col
          v-for="(chapter, index) in anime.chapters"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card elevation="2" class="pa-2">
            <v-img
              :src="`/imgMangas/${chapter.image}`"
              height="200px"
              cover
              class="mb-2 images"
              cols="12"
              sm="6"
              md="4"
            />
            <v-card-title class="text-subtitle-1">
              Capítulo {{ chapter.number }}: {{ chapter.title }}
            </v-card-title>
            <v-card-text class="text-body-2">
              {{ chapter.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-alert type="error" v-else> Nenhum capítulo cadastrado. </v-alert>
    </v-card>

    <v-alert type="error" v-else> Anime não encontrado. </v-alert>
  </v-container> -->
</template> 

<script >
import { useRoute } from "vue-router";

import { computed } from "vue";
import router from "../router";
import { useTodoStore } from "../stores/todoStore";
export default {
  setup(){
    const route = useRoute();
    const todoStore = useTodoStore()
    const todos = todoStore.todos

    const anime = computed(() => {
      return todoStore.todos.find((todo) => todo.id === Number(route.params.id));
    });
    const Home = () => {
      router.push('/home')
    }
    return{
      anime,
      Home
    }
  }
}

</script>
<style>
.images {
  transition: transform 0.3s ease-in-out;
}
.images:hover {
  transform: scale(1.08); /* aumenta 5% */
  cursor: pointer;
}

</style>