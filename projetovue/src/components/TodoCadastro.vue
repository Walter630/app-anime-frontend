<template>
  <v-container
  class="pa-0 d-flex align-center justify-center fill-height"
  fluid
  style="background: url('/imgs/Atras.jpg') no-repeat center center / cover; min-height: 100vh;"
    >
    <v-card class="pa-6 rounded-xl ma-5" width="400" elevation="4" 
    style="box-shadow: 10px 10px 20px #bec8d2, -10px -10px 20px #ffffff;">
      <v-card-title class="text-h4 text-center mb-3">Cadastro</v-card-title>

      <form @submit.prevent="addUsuario()">
        <v-text-field label="Usuário" v-model="nome" prepend-inner-icon="mdi-account"
         variant="outlined" class="mb-3" placeholder="Nome">
        </v-text-field>

        <v-text-field label="Email" v-model="email"
        :rules="emailRules" prepend-inner-icon="mdi-account" variant="outlined" class="mb-4" 
        placeholder="hsahd@gmail.com">
        </v-text-field>

        <small v-if="mensagem && mensagemTipo === 'error' && !email.includes('@gmail.com')" class="text-error">
          {{ mensagem }}
        </small>

        <v-text-field 
        label="Senha" v-model="senha"
        :rules="senhaRules" type="password" 
        prepend-inner-icon="mdi-lock" 
        variant="outlined" class="mb-4">
        </v-text-field>

        <small v-if="mensagem && mensagemTipo === 'error' && senha.length < 8" class="text-error">
          {{ mensagem }}
        </small>
        
        <v-btn color="#6c63ff" block class="white--text" type="submit">
          Acessar
          <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
        </v-btn>
      </form>

      <v-snackbar v-model="snackbar.visible" :color="snackbar.type" top right>
        {{ snackbar.message }}
        <v-btn color="white" text @click="snackbar.visible = false">Fechar</v-btn>
      </v-snackbar>

  </v-card>
</v-container>
</template>
  
<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '@/stores/todoStore'

export default {
  name: 'UsuarioList',
  setup() {
    const todoStore = useTodoStore()
    const router = useRouter()

    const email = ref('')
    const nome = ref('')
    const senha = ref('')
    const mensagem = ref('')
    const mensagemTipo = ref('') // success, error, info, warning
    const snackbar = ref({
      visible: false,
      message: '',
      type: 'success'
    })

    const emailRules = [
      v => !!v || 'O e-mail é obrigatório',
      v => /.+@gmail\.com$/.test(v) || 'O e-mail deve ser do tipo @gmail.com'
    ]

    const senhaRules = [
      v => !!v || 'A senha é obrigatória',
      v => v.length >= 8 || 'A senha deve ter no mínimo 8 caracteres'
    ]

    const addUsuario = async () => {
  // Prevenção de email inválido e senha curta
  if (!email.value.includes('@gmail.com')) {
    mensagem.value = 'Email inválido: use @gmail.com';
    mensagemTipo.value = 'error';
    return;
  }

  if (senha.value.length < 8) {
    mensagem.value = 'Senha muito curta (mínimo 8 caracteres)';
    mensagemTipo.value = 'error';
    return;
  }

  let isRedirecting = false;  // Controla o redirecionamento

  try {
    // Chama a função para adicionar usuário
     await todoStore.addUsuario({
      nome: nome.value,
      email: email.value,
      senha: senha.value
    });

    // Após sucesso no cadastro, faz login automaticamente
    todoStore.setUsuarioLogado({
      name: nome.value,
      email: email.value
    });

    // Mostra snackbar de sucesso
    snackbar.value = {
      visible: true,
      message: 'Usuário cadastrado com sucesso!',
      type: 'success'
    };

    // Limpa campos
    nome.value = '';
    email.value = '';
    senha.value = '';

    // Marca redirecionamento como permitido
    isRedirecting = true;

    // Redireciona para a página home após um tempo
    setTimeout(() => {
      if (isRedirecting) {
        router.push('/home');
      }
    }, 1000);

  } catch (error) {
    // Se ocorrer erro de email duplicado
    if (error.response && error.response.status === 409) {
      snackbar.value = {
        visible: true,
        message: 'Email já cadastrado!',
        type: 'error'
      };
    } else {
      snackbar.value = {
        visible: true,
        message: 'Erro ao cadastrar usuário.',
        type: 'error'
      };
    }

    // Impede o redirecionamento caso erro
    isRedirecting = false;  // Impede navegação

    return;  // Não prossegue com o código, cancelando o redirecionamento
  }
};
    return {
      email,
      nome,
      senha,
      mensagem,
      mensagemTipo,
      snackbar,
      addUsuario,
      emailRules,
      senhaRules,
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

</style>
