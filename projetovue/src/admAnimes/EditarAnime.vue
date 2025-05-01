<template>
  <v-card-title color="white">
    <h1 color="white">Area Admin</h1>
  </v-card-title>
  <v-container elevation-10 class="pa-0" style="margin-top: 20px; background-color: black;">
    <AdcionarAnime style="align-items: end;"/>
    <v-col
      v-for="(todo, index) in todos"
      :key="index"
      cols="12"
      class="d-flex justify-center col"
    >
      <v-card class="card pa-0 d-flex " elevation="8">
        <v-img :src="todo.image" height="200" cover class="rounded mb-2 image"></v-img>

        <v-card-title>
          <div v-if="editingIndex === index">
            <v-text-field v-model="editedTitle" label="Título" dense outlined color="red" />
          </div>
          <div v-else>
            {{ todo.title }}
          </div>
        </v-card-title>

        <v-card-text>
          <div v-if="editingIndex === index">
            <v-textarea v-model="editedDescription" label="Descrição" dense outlined color="red" />
          </div>
          <div v-else>
            {{ todo.descrition }}
          </div>
        </v-card-text>

        <v-card-actions class="d-flex justify-end">
          <v-btn color="green" icon @click="startEdition(index, todo)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small color="error" @click="removeTodo(todo.id)" v-if="editingIndex !== index">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <!-- DIALOG DE EDIÇÃO -->
    <v-dialog v-model="dialog" persistent max-width="500px" color="black" dark>
      <v-card class="pa-2 card2" color="black" dark>
        <v-form class="mt-2">
          <v-img :src="editedImage" height="200" class="rounded mb-1"></v-img>
          <v-text-field
            v-model="editedImage"
            label="URL da imagem"
            dense
            outlined
            color="red"
          />

          <v-card-title>
            <v-text-field v-model="editedTitle" label="Título" dense outlined color="red" />
          </v-card-title>

          <v-card-text>
            <v-textarea
              v-model="editedDescription"
              label="Descrição"
              dense
              outlined
              color="red"
            />
          </v-card-text>

          <v-card-text>
            <v-text-field
              v-model="editedCategoria"
              label="Hentai, magia..."
              dense
              outlined
              color="red"
            />
          </v-card-text>

          <v-card-actions>
            <v-btn icon color="success" @click="saveEdit">
              <v-icon>mdi-content-save-plus</v-icon>
            </v-btn>
            <v-btn icon class="ml-auto" color="error" @click="cancelTodo">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import AdcionarAnime from "./AdcionarAnime.vue";

export default {
  components: {AdcionarAnime},
  setup() {
    const todoStore = useTodoStore();
    const todos = todoStore.todos;

    const editingIndex = ref(null);
    const editedTitle = ref("");
    const editedDescription = ref("");
    const editedCategoria = ref("");
    const editedImage = ref("");
    const dialog = ref(false);
    const editingTodoId = ref(null);

    const startEdition = (index, todo) => {
      editingIndex.value = index;
      editingTodoId.value = todo.id;
      editedTitle.value = todo.title;
      editedDescription.value = todo.descrition;
      editedCategoria.value = todo.categoria;
      editedImage.value = todo.image;
      dialog.value = true;
    };

    const cancelTodo = () => {
      editingIndex.value = null;
      editedTitle.value = "";
      editedDescription.value = "";
      editedCategoria.value = "";
      editedImage.value = "";
      dialog.value = false;
    };

    const saveEdit = async () => {
      if (!editedTitle.value.trim()) return;

      const updatedData = {
        title: editedTitle.value,
        descrition: editedDescription.value,
        categoria: editedCategoria.value,
        image: editedImage.value,
      };

      await todoStore.updateTodo({
        id: editingTodoId.value,
        data: updatedData,
      });

      cancelTodo();
    };

    const removeTodo = async (id) => {
      await todoStore.removeTodo(id);
    };

    return {
      todos,
      editingIndex,
      editedTitle,
      editedDescription,
      editedCategoria,
      editedImage,
      dialog,
      startEdition,
      cancelTodo,
      saveEdit,
      removeTodo,
    };
  },
};
</script>

<style>
.card {
  width: 100%;
  max-height: 100px;
  background-color: #1a1a1a;
  color: white;
  border: 1px solid red;
  border-radius: 16px;
}
.card2 {
  width: 100%;
  max-height: 100vh;
}
.image{
  max-width: 100px;

}

</style>
  