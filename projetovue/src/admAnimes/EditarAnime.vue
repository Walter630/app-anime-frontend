<template>
   <v-app-bar :elevation="2" color="primary" >
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>EditarAnime</v-app-bar-title>

    <v-btn icon >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
    
  <v-container>
    <v-col v-for="(todo, index) in todos" :key="index" cols="6" md="12" >
      <v-card class="ma-2 pa-4" elevation="5">
        <v-img :src="`/imgs/${todo.image}`" height="50" right="50" cover></v-img>

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
        <v-btn icon @click="startEdition(index, todo)"
        v-if="editingIndex !== index">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="removeTodo(todo)"
          v-if="editingIndex !== index"
          color="error">
         <v-icon >
            mdi-delete
          </v-icon>
        </v-btn>
        
         <v-btn icon text @click="saveEdit(todo)" v-if="editingIndex === index">
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

  <v-footer color="primary" class="pa-6">
    Redes
  </v-footer>
</template>

<script>
import { ref } from "vue";
import { useTodoStore} from '@/stores/todoStore'

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
      todos
    };
  },
};
</script>

<style>

</style>
