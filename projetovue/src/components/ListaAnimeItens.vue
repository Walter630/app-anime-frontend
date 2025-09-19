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
    style="margin-top: 40px; background-color: rgba(15, 15, 15, 0.1);"

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
          class="ma-1"
          height="280"
          width="190"
          @click="toggle"
          style="border-radius: 10px;"

        >
          <v-card-title>{{ todo.title }}</v-card-title>
        <div class="d-flex flex-column flex-ms-row">
          <v-card-text>{{ todo.descrition }}</v-card-text>
            <v-img
              class="images align-end "
              :src="`${todo.image}` "
              height="280"
              right="200"
              @click="goToAnime(todo.id)"
              style="cursor: pointer; "
              ></v-img>

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

  <v-container fluid class="pa-0 hells-paradise">
  <v-row no-gutters class="fill-height d-flex align-center justify-center text-center text-red">
    <v-col cols="12" md="6">
      <h1 class="text-h3 font-weight-bold mb-4">Gostou dos nossos conteúdos?</h1>
      <p class="text-subtitle-1">We know you'll love these</p>
    </v-col>
  </v-row>
</v-container>

 
</template>

<script>
import { ref, onMounted, computed } from 'vue'; // 👈 certifique-se de importar onMounted
import { useTodoStore } from '@/stores/todoStore'
import { useRouter } from "vue-router";

export default {
  setup() {
    const todoStore = useTodoStore();
    const router = useRouter();

    const todos = computed(() => todoStore.todos);
    const imageList = [
        "/imgs/janela4.jpg",
        "/imgs/janela1.jpg",
        "/imgs/janela2.jpeg",
        "/imgs/janela3One.jpg",
    ]
    const onboarding = ref(0);
    const model = ref(0);


    // 👇 CHAME getTodos() DENTRO DE onMounted
    onMounted(async () => {
      try {
        console.log("Carregando animes...");
        await todoStore.getTodos(); // ⚠️ Se isso falhar, o loading trava
      } catch (error) {
        console.error("Erro ao carregar animes:", error);
        // Mesmo se falhar, não deixe o app travado
      }
    });

    const goToAnime = (id) => {
      if (!id) {
        console.warn("ID inválido:", id);
        return;
      }
      router.push({ name: "AnimeDetails", params: { id: id.toString() } });
    };

    return {
      todos,
      goToAnime,
      imageList,
      onboarding,
      model,

      // ... outros valores
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
.fundo{
  background-color: rgba(15, 15, 15, 0.1);;
}
.hells-paradise {
  background-image: url('/imgs/hellsParadise.jpg');
  background-size: cover;
  min-height: 500px;
  box-shadow: 2px 6px 25px rgba(192, 0, 0, 0.836);
  border-radius: 8px;
}


</style>