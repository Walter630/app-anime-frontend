<template>

  <v-container  class="pa-8 " style="margin-top: 20px">
    <v-col v-for="(todo, index) in todos" :key="index" cols="12" class="d-flex justify-center">
      <v-card class="card pa-0" elevation="8">
       
        <v-btn icon @click="abrirCadastro">
          <v-icon color="red">mdi-plus</v-icon>
        </v-btn>
        <v-img :src="`/imgs/${todo.image}`" height="100" cover class="rounded mb-2"></v-img>
        <v-text-field
          v-model="editedImage"
          label="URL da imagem"
          dense
          outlined
          color="red"
          v-if="editingIndex === index"
        />

        <v-card-title >
          <div v-if="editingIndex === index">
            <v-text-field v-model="editedTitle" label="Título" dense outlined
            color="red"/>
          </div>
          <div v-else>
            {{ todo.title }}
          </div>
        </v-card-title>

        <v-card-text>
          <div v-if="editingIndex === index">
            <v-textarea v-model="editedDescription" label="Descrição" dense outlined
            color="red"/>
          </div>
          <div v-else>
            {{ todo.descrition }}
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
        <v-btn icon small color="green" @click="startEdition(index, todo)"
         v-if="editingIndex !== index">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small color="error" @click="removeTodo(todo.id)"
        v-if="editingIndex !== index">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
        
         <v-btn icon color="success" @click="saveEdit(todo)" v-if="editingIndex === index">
         <v-icon>
          mdi-content-save-plus
        </v-icon>
      </v-btn>
        <v-btn icon class="ml-auto" color="error" v-if="editingIndex === index" 
        @click="cancelTodo">
        <v-icon >mdi-close</v-icon>
      </v-btn>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { useTodoStore} from '@/stores/todoStore'
import { useRouter } from "vue-router";

export default {
  setup() {
    const todoStore = useTodoStore()
    const todos = todoStore.todos
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

      todoStore.updateTodo( {
        id: todo.id,
        data: updatedData,
      });

      cancelTodo();
    };

    const toggleDone = (index) => {
      todoStore.toggleDone(index);
    };

    const removeTodo = (todo) => {
      todoStore.removeTodo(todo.id);
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
      removeTodo,
      todos,
    };
  },
};
</script>

<style>

.card {
  width: 100%;
  max-width: 800px;
  background-color: #1a1a1a;
  color: white;
  border: 1px solid red;
  border-radius: 16px;  
}
</style>
