<template>
  <app-bar-component/>
  <v-container v-if="anime" class="mt-8" margin-top="200px">
    <v-card class="ma-4 pa-4" elevation="4">
      <v-img :src="`/imgs/${anime.image}`" height="300px" cover></v-img>
      <v-card-title class="text-h5">{{ anime.title }}</v-card-title>
      <v-card-text>{{ anime.descrition || 'Sem descrição disponível.' }}</v-card-text>

      <v-divider class="my-4"></v-divider>

      <h2 class="text-h5 mb-2">Capítulos</h2>

      <v-row v-if="anime.chapters && anime.chapters.length" dense style="margin-top: 40px; background-color: rgba(15, 15, 15, 0.1);">
        <v-col
            v-for="(chapter, index) in anime.chapters"
            :key="index"
            cols="12"
            sm="6"
            md="4"
        >
          <v-card elevation="2" class="pa-2">
            <v-img
                :src="chapter.image || '/imgs/default-chapter.jpg'"
                height="200px"
                cover
                class="mb-2 images"
            />
            <v-card-title class="text-subtitle-1">
              Capítulo {{ chapter.number }}: {{ chapter.title }}
            </v-card-title>
            <v-card-text class="text-body-2">
              {{ chapter.description || 'Sem descrição.' }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-alert type="warning" v-else> Nenhum capítulo cadastrado. </v-alert>
    </v-card>
  </v-container>

  <v-container v-else style="margin-top: 200px;">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
    <p>Carregando detalhes do anime...</p>
  </v-container>
</template>
<script setup>
import { onMounted, computed, ref } from 'vue'; // 👈 Importe onMounted e ref
import { useRoute } from 'vue-router';
import { useTodoStore } from '../stores/todoStore';
import { useRouter } from 'vue-router';
import AppBarComponent from "@/components/AppBarComponent.vue";


const router = useRouter();
const route = useRoute();
const todoStore = useTodoStore();

// ✅ Crie um ref para o anime completo (com chapters)
const anime = ref(null);

// ✅ Carregue o anime completo ao montar o componente
onMounted(async () => {
  try {
    anime.value = await todoStore.getAnimeById(route.params.id);
    console.log('Dados carregados:', anime.value); // 👈 VEJA O QUE REALMENTE CHEGOU!
  } catch (error) {
    console.error('Erro ao carregar detalhes do anime:', error);
  }
});

const Home = () => {
  router.push('/home');
};
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