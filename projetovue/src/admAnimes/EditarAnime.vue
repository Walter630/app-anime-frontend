<template>
  <header>
    <v-card-title primary-title style="color: white"> EditarAnimes </v-card-title>
  </header>

  <v-container>
    <v-col v-for="(todo, index) in todos" :key="index" cols="12" md="5">
      <v-card class="ma-2 pa-2" elevation="5">
        <v-img :src="`/imgs/${todo.image}`" height="400" cover></v-img>

        <v-text-field
          v-model="editedImage"
          label="URL da imagem"
          dense
          v-if="editingIndex === index"
        />

        <v-card-title>
          <div v-if="editingIndex === index">
            <v-text-field v-model="editedTitle" label="Título" dense />
          </div>
          <div v-else>
            {{ todo.title }}
          </div>
        </v-card-title>

        <v-card-text>
          <div v-if="editingIndex === index">
            <v-textarea v-model="editedDescription" label="Descrição" dense />
          </div>
          <div v-else>
            {{ todo.descrition }}
          </div>
        </v-card-text>
      </v-card>
      <v-card-actions>
        <v-btn color="success" @click="saveEdit(todo)" v-if="editingIndex === index">
          Salvar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="startEdition(index, todo)"
          v-if="editingIndex !== index"
        >
          Editar
        </v-btn>
        <v-btn
          class="butao3"
          color="error"
          @click="removeTodo(todo)"
          v-if="editingIndex !== index"
          >Remover</v-btn
        >

        <v-btn color="warning" v-if="editingIndex === index" @click="cancelTodo"
          >Cacelar</v-btn
        >
      </v-card-actions>
    </v-col>
  </v-container>

  <footer>Sobre</footer>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const todos = computed(() => store.state.todos);
    const editingIndex = ref(null);
    const editedTitle = ref("");
    const editedDescription = ref("");

    const editedImage = ref("");

    const startEdition = (index, todo) => {
      editingIndex.value = index;
      editedTitle.value = todo.title;
      editedDescription.value = todo.descrition;
      editedImage.value = todo.image;
    };

    const cancelTodo = () => {
      editingIndex.value = null;
      editedTitle.value = "";
      editedDescription.value = "";
    };

    const saveEdit = async (todo) => {
      if (!editedTitle.value.trim()) return;

      const updatedData = {
        title: editedTitle.value,
        descrition: editedDescription.value,
        image: editedImage.value || todo.image,
      };

      await store.dispatch("updateTodo", {
        id: todo.id,
        data: updatedData,
      });

      cancelTodo();
    };

    const toggleDone = (index) => {
      store.commit("toggleDone", index);
    };

    const removeTodo = (todo) => {
      store.dispatch("removeTodos", todo.id);
    };

    return {
      toggleDone,
      saveEdit,
      editingIndex,
      editedTitle,
      editedDescription,
      editedImage,
      startEdition,
      cancelTodo,
      todos,
      removeTodo,
    };
  },
};
</script>

<style>
header {
  padding: 30px;
  right: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.781);
  border-radius: 5px;
}
.butao1 {
  background-color: rgba(95, 100, 104, 0.151);
}
.butao2 {
  background-color: rgba(95, 100, 104, 0.151);
}
.butao3 {
  background-color: rgba(95, 100, 104, 0.151);
}
footer {
  padding: 30px;
  right: 100%;
  background-color: rgba(0, 0, 0, 0.781);
  text-align: center;
}
</style>
