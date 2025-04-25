<template>
        <header class="cabecalho">
        <v-card-title primary-title class="card">
            Administrador
        </v-card-title>
        <router-link to="/editarAnimes">EditarAnimes</router-link>
    </header>
    
    <main>
    <v-container class="d-flex justify-center align-center pa-5"
    style="height: 100hv;">
        <v-sheet class="pa-4"  width="400" color="gray-800">
            <v-form class="formulario">
                <v-file-input 
                    v-model="image" 
                    label="Escolha uma imagem" 
                    accept="image/*"
                    outlined
                    ></v-file-input>
                    <v-btn @click="uploadImage">Upload</v-btn>
                <v-text-field
                    v-model="title"
                    name="titulo"
                    label="titulo"
                    placeholder="Titulo anime"
                ></v-text-field>
                <v-text-field
                    v-model="descrition"
                    name="name"
                    label="Descrição"
                    placeholder="Descreva o Anime"
                ></v-text-field>
                
                <v-btn @click="addTodo()" color="success" class="ma-2">Adicionar</v-btn>
                <v-btn color="info">Cancelar</v-btn>
            </v-form>
        </v-sheet>
    </v-container>
        
    </main>
    <footer class="rodape">
    <v-card-text>
        @Sobre nos
    </v-card-text>
  </footer>
   
</template>

<script>
import { useTodoStore } from '@/stores/todoStore'
import { ref } from 'vue'
export default {
    name: 'TodoList',
    props: {
    todo: {
        type: Object,
        default: () => ({})
    },
  },
  
    setup() {
            const todoStore = useTodoStore()
            const title = ref('')
            const descrition = ref('')

        const addTodo = () =>{
            if(!title.value){
                console.warn("Preencha o título e selecione uma imagem.")
                return  
            }
            todoStore.addTodo({
                title: title.value,
                descrition: descrition.value
            })
            
            title.value = ''
            descrition.value = ''
        }

        return{
            title,
            descrition,
            addTodo,
        }
    }
}
</script>

<style>

.cabecalho{
    padding: 30px;
    right: 100%;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.781);
    border-radius: 5px;
}
.texto{
    margin: 10px;
    width: 25%;
    border: 10px;
}
.card{
    color: white;
}
a{
    text-decoration: none;
    color: white;
    margin: 20px;
}
a:hover{
    color: aqua;
}
.rodape{
    padding: 30px;
    right: 100%;
    background-color: rgba(0, 0, 0, 0.781);
    text-align: center;
}
</style>