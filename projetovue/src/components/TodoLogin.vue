<template>
  <v-container class="pa-14 fill-height d-flex align-center justify-center"
   fluid style="background-image: url('/imgs/Atras.jpg'); background-size: cover;
   background-position: center;">
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
          placeholder="hsahd@gmail.com">
        </v-text-field>
        <small v-if="mensagem && mensagemTipo === 'error' && !usuarioEncontrado" class="text-error">
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
import { useTodoStore } from '@/stores/todoStore'

export default {
  name: 'UsuarioList',
  setup() {
    const todoStore = useTodoStore();
    const router = useRouter();

    const email = ref('');
    const senha = ref('');
    const mensagem = ref('');
    const mensagemTipo = ref('');

    const login = async () => {
      // Espera que o getUsuario() busque os usuários
      await todoStore.getUsuario();

      // Acesso direto ao array de usuários
      const usuariosAtualizados = todoStore.usuarios;

      // Encontra o usuário pelo email
      const usuarioEncontrado = usuariosAtualizados.find(user =>
        user?.email?.toLowerCase() === email.value.trim().toLowerCase()
      );


      // Se o usuário não for encontrado
      if (!usuarioEncontrado) {
        mensagem.value = 'Email não cadastrado';
        mensagemTipo.value = 'error';
        return;
      }

      // Se a senha estiver incorreta
      if (usuarioEncontrado.senha !== senha.value) {
        mensagem.value = 'Senha incorreta';
        mensagemTipo.value = 'error';
        return;
      }

      // Se login for bem-sucedido
      mensagem.value = 'Logado com sucesso';
      mensagemTipo.value = 'success';

      // Redireciona para a página correta
      if (usuarioEncontrado.email.toLowerCase() === 'walter@gmail.com') {
        todoStore.setUsuarioLogado(usuarioEncontrado) // <- Aqui!
        router.push('/home');
      } else {
        todoStore.setUsuarioLogado(usuarioEncontrado) // <- Aqui também!
        router.push('/home');
      }

      // Limpa os campos após o login
      email.value = '';
      senha.value = '';

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
img{
  height: 100px;
  right: 100px;
}
.card{
  background-color: rgb(red, green, blue, 0.1);
}
</style>