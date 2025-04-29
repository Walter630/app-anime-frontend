<template>
  <v-container
    class="pa-0 d-flex align-center justify-center fill-height"
    fluid
    style="background: url('/imgs/Atras.jpg') no-repeat center center / cover; min-height: 100vh;"
  >
    <v-card class="card pa-6 rounded-xl ma-5" width="400" elevation="4" 
    style="box-shadow: 10px 10px 20px #bec8d2, -10px -10px 20px #ffffff;">
      <v-card-title class="text-h4 text-center mb-4"><img src="/logo.png" alt=""></v-card-title>

      <form @submit.prevent="login">
        <v-text-field 
          label="Usuário" 
          v-model="email" 
          prepend-inner-icon="mdi-account" 
          variant="outlined" 
          class="mb-2" 
          placeholder="pedro@gmail.com">
        </v-text-field>

        <small v-if="mensagem && mensagemTipo === 'error'" class="text-error">
            {{ mensagem }}
        </small>

        <v-text-field 
          label="Senha" 
          v-model="senha" 
          type="password" 
          prepend-inner-icon="mdi-lock" 
          variant="outlined" 
          class="mb-2">
        </v-text-field>
        <a href="">Esqueceu senha</a>

        <v-btn color="#6c63ff" block class="white--text" type="submit">
          Acessar
        </v-btn>
          
        <p class="mt-2">
            <router-link to="/cadastro">Cadastre-se</router-link>
        </p>
      </form>
    </v-card>
  </v-container>

  <router-view />
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTodoStore } from '@/stores/todoStore';
import axios from 'axios';

export default {
  name: 'Login',
  setup() {
    const todoStore = useTodoStore();
    const router = useRouter();

    const email = ref('');
    const senha = ref('');
    const mensagem = ref('');
    const mensagemTipo = ref('');

    const login = async () => {
      mensagem.value = ''; // limpa mensagens anteriores

      if (!email.value || !senha.value) {
        mensagem.value = 'Por favor, preencha todos os campos.';
        mensagemTipo.value = 'error';
        return;
      }

      try {
        const response = await axios.post('http://localhost:4000/usuarios/login', {
          email: email.value,
          senha: senha.value,
        });

        if (response.data.usuario) {
          todoStore.setUsuarioLogado(response.data.usuario);
          localStorage.setItem('token', response.data.token);
          // Salva no LocalStorage
          
          router.push('/home');
          
          email.value = '';
          senha.value = '';
        }
          else {
          mensagem.value = response.data.message || 'Erro ao fazer login';
          mensagemTipo.value = 'error';
        }
      } catch (error) {
        console.error('Erro no login:', error);

        // Aqui tentamos pegar a mensagem que o backend mandou
        if (error.response && error.response.data && error.response.data.message) {
          mensagem.value = error.response.data.message;
        } else {
          mensagem.value = 'Erro interno ao fazer login. Tente novamente.';
        }

        mensagemTipo.value = 'error';
      }
    };

    return {
      email,
      senha,
      mensagem,
      mensagemTipo,
      login,
    };
  },
};
</script>


<style scoped>
img {
  height: 100px;
}
.card {
  background-color: rgba(255, 255, 255, 0.7);
}
.v-container {
  padding: 0; /* Remove padding padrão */
}
</style>
