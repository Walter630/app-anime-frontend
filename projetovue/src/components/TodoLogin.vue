<template>
  <header class="Cabecalho">
    <h2>Cabeça</h2>
  </header>

  <v-container class="d-flex justify-center align-center pa-5" style="height: 85vh;">
    <v-sheet class="pa-4" width="400" color="gray-800">
      <v-form class="formulario" @submit.prevent="login"><br>
        <h2>Login</h2><br>
        <v-text-field
          placeholder="Digite Email"
          v-model="email"
          label="Email"
        />

        <v-text-field
          placeholder="Digite Senha"
          v-model="senha"
          label="Senha"
          type="password"
        />

        <v-btn type="submit" color="primary" class="mt-2 ma-4 pa-2 ">
          Confirmar
        </v-btn>

        <p class="mt-2">
          <router-link to="/cadastro">Cadastre-se</router-link>
        </p>

        <p>Esqueceu <a href="">Senha</a></p>

        <v-alert
          v-if="mensagem"
          :type="mensagemTipo"
          class="mt-4"
          icon="mdi-alert-circle"
          dismissible
        >
          {{ mensagem }}
        </v-alert>
      </v-form>
    </v-sheet>
  </v-container>

  <!-- Aqui o router-view é o lugar onde os componentes das rotas vão ser renderizados -->
  <router-view />

  <footer class="footer">
    Redes
  </footer>
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