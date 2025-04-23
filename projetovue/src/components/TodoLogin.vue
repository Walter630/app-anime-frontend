<template>
  <v-container class="fill-height d-flex align-center justify-center" fluid style="background-color: #e0e5ec;">
    <v-card class="pa-6 rounded-xl ma-5" width="400" elevation="4" 
    style="box-shadow: 10px 10px 20px #bec8d2, -10px -10px 20px #ffffff;"
    >
      <v-card-title class="text-h4 text-center mb-4">Login</v-card-title>

      <form @submit.prevent="login">
        <v-text-field label="Usuário" prepend-inner-icon="mdi-account" variant="outlined" class="mb-4" 
        placeholder="hsahd@gmail.com"></v-text-field>
        <v-text-field label="Senha" type="password" prepend-inner-icon="mdi-lock" variant="outlined" class="mb-4"></v-text-field>
        <a href="">Esqueceu senha</a>

        <v-btn color="#6c63ff" block class="white--text" type="submit">
          Acessar
        </v-btn>

        <p class="mt-2">
            <router-link to="/cadastro">Cadastre-se</router-link>
        </p>
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

  <!-- Aqui o router-view é o lugar onde os componentes das rotas vão ser renderizados -->
  <router-view />
</template>


<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'UsuarioList',
  setup() {
    const store = useStore();
    const router = useRouter();

    const usuarios = computed(() => store.state.usuarios);
    const email = ref('');
    const senha = ref('');
    const mensagem = ref('');
    const mensagemTipo = ref('');

    const login = async () => {
      await store.dispatch('getUsuario');

      const usuariosAtualizados = store.state.usuarios[0]; // pega o array dentro do array

      const usuarioEncontrado = usuariosAtualizados.find(user =>
        user?.email?.toLowerCase?.() === email.value.trim().toLowerCase()
      );

      if (!usuarioEncontrado) {
        mensagem.value = 'Email não cadastrado';
        mensagemTipo.value = 'error';
        return;
      }

      if (usuarioEncontrado.senha !== senha.value) {
        mensagem.value = 'Senha incorreta';
        mensagemTipo.value = 'error';
        return;
      }

      mensagem.value = 'Logado com sucesso';
      mensagemTipo.value = 'success';

      // Redireciona baseado no email
      if (usuarioEncontrado.email.toLowerCase() === 'walter@gmail.com') {
        router.push('/adcionarAnime');
      } else {
        router.push('/home');
      }

      email.value = '';
      senha.value = '';
    };

    return {
      email,
      senha,
      mensagem,
      mensagemTipo,
      login,
      usuarios,
    };
  },
};
</script>


<style>


</style>