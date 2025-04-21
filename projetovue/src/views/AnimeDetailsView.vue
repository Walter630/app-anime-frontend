<template>
  <v-container>
    <v-card class="ma-4 pa-4" elevation="4" v-if="anime">
      <v-img :src="`/imgs/${anime.image}`" height="400px" cover></v-img>
      <v-card-title class="text-h5">{{ anime.title }}</v-card-title>
      <v-card-text>{{ anime.descrition }}</v-card-text>

      <v-divider class="my-4"></v-divider>

      <h2 class="text-h6 mb-2">Capítulos</h2>

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
              class="mb-2"
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
  </v-container>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

const route = useRoute();
const store = useStore();

const anime = computed(() => {
  return store.state.todos.find((todo) => todo.id === Number(route.params.id));
});
</script>
