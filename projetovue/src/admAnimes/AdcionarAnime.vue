<template>  
  <main class="d-flex ">
    <v-btn color="green" dark @click="dialog = true">
      <v-icon>mdi-plus</v-icon> Adicionar Anime
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="500px" color="black" dark>
      <v-card class="pa-4" color="black" dark>
        <v-card-title class="text-h5">Adicionar Novo Anime</v-card-title>

        <v-form class="mt-4">
          <v-file-input 
            v-model="image" 
            label="Escolha uma imagem" 
            accept="image/*"
            outlined
            class="mb-4"
          ></v-file-input>

          <v-text-field
            v-model="title"
            label="Título"
            placeholder="Título do Anime"
            outlined
            class="mb-4"
          ></v-text-field>

          <v-text-field
            v-model="descrition"
            label="Descrição"
            placeholder="Descreva o Anime"
            outlined
            class="mb-4"
          >
          
          </v-text-field>

          <v-card-actions class="justify-end">
            <v-btn color="error" @click="cancelar">Cancelar</v-btn>
            <v-btn color="success" @click="confirmar">Confirmar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

export default {
  name: 'TodoList',
  setup() {
    const todoStore = useTodoStore()
    const dialog = ref(false)
    const title = ref('')
    const descrition = ref('')
    const image = ref(null)

    const confirmar = () => {
      if (!title.value || !image.value) {
        console.warn("Preencha o título e selecione uma imagem.")
        return
      }
      todoStore.addTodo({
        title: title.value,
        description: descrition.value
      })
      limpar()
      dialog.value = false // fecha o dialog só depois de confirmar
    }

    const limpar = () => {
      title.value = ''
      descrition.value = ''
      image.value = null
    }

    const cancelar = () => {
      limpar()
      dialog.value = false // fecha o dialog ao cancelar
    }

   

    return {
      dialog,
      title,
      descrition,
      image,
      confirmar,
      cancelar,
    }
  }
}
</script>

<style scoped>
.card {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
  