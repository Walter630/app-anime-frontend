<template>
    <header>
      <img src="" alt="">logo
    </header>
  
    <v-container class="d-flex justify-center align-center pa-5" style="height: 90vh;">
      <v-sheet>
        <v-form class="formulario" @submit.prevent="addUsuario">
          <v-card-title primary-title class="text-center ma-1 pa-4">
              <h3>Cadastro</h3>
          </v-card-title>
          <v-text-field
            name="name"
            label="Nome"
            placeholder="Pedro"
            v-model="nome"
          ></v-text-field>
  
          <v-text-field
            name="email"
            label="Email"
            placeholder="@gmail.com"
            v-model="email"
          ></v-text-field>
  
          <v-text-field
            placeholder="Digite Senha"
            v-model="senha"
            label="Senha"
            type="password"
          />
  
          <v-btn class="ma-4" color="primary" type="submit ">Confirmar</v-btn>
          <v-btn class="ma-4" color="red">Cancelar</v-btn>
  
          <v-alert
            v-if="mensagem"
            :type="mensagemTipo"
            class="mt-4"
            border="start"
            prominent
          >
            {{ mensagem }}
          </v-alert>
        </v-form>
      </v-sheet>
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
  