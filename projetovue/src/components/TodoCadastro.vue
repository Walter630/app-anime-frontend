<template>
  <v-container class="fill-height d-flex align-center justify-center" fluid style="background-color: #e0e5ec;">
    <v-card class="pa-6 rounded-xl ma-5" width="400" elevation="4" 
    style="box-shadow: 10px 10px 20px #bec8d2, -10px -10px 20px #ffffff;"
    >
      <v-card-title class="text-h4 text-center mb-3">Cadastro</v-card-title>

    <form @submit.prevent="addUsuario()">
      <v-text-field label="Usuario" prepend-inner-icon="mdi-account"
       variant="outlined" class="mb-3" placeholder="Nome">
      </v-text-field>
      <v-text-field label="Email" prepend-inner-icon="mdi-account" variant="outlined" class="mb-4" 
      placeholder="hsahd@gmail.com"></v-text-field>
      <v-text-field label="Senha" type="password" prepend-inner-icon="mdi-lock" variant="outlined" class="mb-4"></v-text-field>
      
      <v-btn color="#6c63ff" block class="white--text" type="submit">
        Acessar
        <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
      </v-btn>
        <v-alert
          v-if="mensagem"
          :type="mensagemTipo"
          class="mt-4"
          icon="mdi-alert-circle"
          dismissible
        >
          {{ mensagem }}
        </v-alert>
      </form>
  </v-card>
</v-container>
</template>
  
<script>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useStore } from 'vuex/dist/vuex.cjs.js'
export default {
  name: 'UsuarioList',
  props: {
     usuarios: {
         type: Object,
         default: () => ({})
     },
},
    setup() {
      const store = useStore()
      const usuarios = computed(() => store.state.usuarios)

      const email = ref('')
      const nome = ref('')
      const senha = ref('')
      const mensagem = ref('')
      const mensagemTipo = ref('') // success, error, info, warning
  
      const router = useRouter()
  
      const addUsuario = () => {
      if (!email.value.includes('@gmail.com')) {
        mensagem.value = 'Email inválido: use @gmail.com'
        mensagemTipo.value = 'error'
        return
      }

      if (senha.value.length < 8) {
        mensagem.value = 'Senha muito curta (mínimo 8 caracteres)'
        mensagemTipo.value = 'error'
        return
      }

      store.dispatch('addUsuario', {
        nome: nome.value,
        email: email.value,
        senha: senha.value
      })

      mensagem.value = 'Usuário cadastrado com sucesso!'
      mensagemTipo.value = 'success'

      nome.value = ''
      email.value = ''
      senha.value = ''

      router.push('/home')
    }

    return {
      email, nome, senha,
      mensagem, mensagemTipo,
      addUsuario
    }
  }
}
</script>
  
<style>
  .formulario {
    background-color: rgba(196, 196, 196, 0.452);
    border-radius: 10px;
    margin: 10px;
    padding: 20px;
  }
  header {
    background-color: rgba(0, 0, 0, 0.76);
    padding: 40px;
  }
</style>
  