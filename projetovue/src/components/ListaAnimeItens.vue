<template>
 <br>
  <v-window v-model="onboarding" show-arrows="hover" style="margin-top: 40px;">
    <v-window-item v-for="(image, n) in imageList" :key="`card-${n}`" >
      <v-card
        class="d-flex align-center justify-center "
        elevation="4"
        height="450"
        color="black" dark
      >
         <!-- <img :src="image" alt="Imagem" height="500" width="1000" /> -->
         <v-img class="img align-end" :src="image" cover>{{ todos[n]?.title }}</v-img>
      </v-card>
    </v-window-item>
  </v-window>
  <br><br>
  <v-card-title class="text-h4 title">
   <v-icon color="red">mdi-fire</v-icon> Animes em Alta <v-icon color="red">mdi-fire</v-icon>
  </v-card-title>
  <v-sheet
    class="mx-auto"
    elevation="8"
    max-width="2000"
    color="black" 
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      center-active
      show-arrows
    >
      <v-slide-group-item
        v-for="(todo, index) in todos"
        :key="index" :todo="todo"
        v-slot="{ isSelected, toggle }"
      >
        <v-card
          :color="isSelected ? 'primary' : 'black'"
          class="ma-2"
          height="200"
          width="200"
          @click="toggle"
          style="border-radius: 10px;"
        >
        <div class="d-flex flex-column flex-ms-row">
            <v-img
              class="images align-end "
              :src="`/imgs/${todo.image}`"
              height="200"
              right="200"
              @click="goToAnime(todo.id)"
              style="cursor: pointer; "
              ><v-card-title class="title">{{ todo.title }}</v-card-title></v-img> 
          </div>
          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
              <v-icon
                v-if="isSelected"
                color="white"
                icon="mdi-close-circle-outline"
                size="48"
              ></v-icon>
            </v-scale-transition>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>

  <v-card-title class="text-h4 title">
   <v-icon color="red">mdi-fire</v-icon> Animes em Alta <v-icon color="red">mdi-fire</v-icon>
  </v-card-title>
  
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
    const todoStore = useTodoStore();
    const router = useRouter();
    const todos = todoStore.todos;
    
    const length = ref(4);
    const onboarding = ref(0);

    const imageList = ref([
        "/imgs/janela1.jpg", 
        "/imgs/janela2.jpeg", 
        "/imgs/janela3One.jpg", 
        "/imgs/janela4.jpg"
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
.img{
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.3); /* sombra clara */
  border-radius: 8px; /* opcional, para suavizar as bordas */
}
.img:hover{
  transform: scale(1.08); /* aumenta 5% */
  cursor: pointer;
  box-shadow: 0px 6px 25px rgba(255, 255, 255, 0.5); /* sombra mais forte no hover */
}
h2{
  color: white;
}
.title{
  color: white;
}
</style>