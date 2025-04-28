<template>
  <v-card-title primary-title>
    <h2><v-icon>mdi-fire</v-icon>Animes em Alta <v-icon>mdi-fire</v-icon></h2>
  </v-card-title>
  <v-window v-model="onboarding" show-arrows="hover" >
    <v-window-item v-for="(image, n) in imageList" :key="`card-${n}`" >
      <v-card
        class="d-flex align-center justify-center ma-2"
        elevation="2"
        height="200"
        color="black" dark
      >
         <img :src="image" alt="Imagem" height="500" width="1000" />
      </v-card>
    </v-window-item>
  </v-window>
  <v-container>
    <v-card-title primary-title>
    <h2>Animes</h2>
  </v-card-title>
    <v-row>
      <v-col v-for="(todo, index) in todos" :key="index" :todo="todo" 
            cols="12"
            sm="4"
            md="3"
            lg="3">
        <v-card class="ma-2 pa-2"  elevation="3" style="background-color: black;">
          <div class="d-flex flex-column flex-ms-row">
            <v-img
              class="images "
              :src="`/imgs/${todo.image}`"
              height="200"
              right="200"
              @click="goToAnime(todo.id)"
              style="cursor: pointer"
              />
          
            <v-card-title class="title">{{ todo.title }}</v-card-title>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';
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
    const todos = todoStore.todos
    
    const length = ref(4)
    const onboarding = ref(0)

    const imageList = ref([
        "/imgs/Nanatsu.jpg", 
        "/imgs/Jujutsu.jpg", 
        "/imgs/chainsaw.jpg", 
        "/imgs/soloLeveling.jpg"
      ]);

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
      show, 
      length,
      onboarding,
      imageList,
      todos
    };
  },
};
</script>

<style scoped>
/* Aplicando transição suave na troca de imagem de fundo */
.images {
  transition: transform 0.3s ease-in-out;
  
}
.images:hover {
  transform: scale(1.08); /* aumenta 5% */
  cursor: pointer;
}
img{
  transition: transform 0.3s ease-in-out;
  
}
img:hover{
  transform: scale(1.08); /* aumenta 5% */
  cursor: pointer;
}
h2{
  color: white;
}
.title{
  color: white;
}
</style>