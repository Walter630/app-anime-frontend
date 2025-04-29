// src/store/index.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodoStore = defineStore('todo', {
    state: () => ({
      todos: [],
      usuarios: [],
      loading: false,
      uploadStats: '',
      userLogado: null
    }),
  

  actions: {
    // Ação para pegar os todos da API
    async getTodos() {
    this.loading = true
      try {
        const response = await axios.get('http://localhost:4000/todos')
        this.todos = response.data  // Modifica o estado diretamente
      } catch (error) {
        console.error('Erro ao buscar todos:', error.response?.data || error.message)
      } finally {
        this.loading = false
      }
    },

    // Ação para adicionar um novo "todo"
    async addTodo(data) {
      this.loading = true
      try {
        const response = await axios.post('http://localhost:4000/todos', data)
        this.todos.push(response.data)  // Atualiza a lista após adicionar
      } catch (error) {
        console.log('Erro ao adicionar todo:', error.response?.data || error.message)
      } finally {
        this.loading = false
      }
    },

    // Ação para atualizar um "todo"
    async updateTodo({ id, data }) {
      try {
        const response = await axios.put(`http://localhost:4000/todos/${id}`, data)
        const index = this.todos.findIndex(todo => todo.id === id)
        if (index !== -1) {
          this.todos[index] = response.data  // Atualiza o todo no estado
        }
      } catch (error) {
        console.error('Erro ao atualizar todo:', error.response?.data || error.message)
      } finally {
        this.loading = false
      }
    },
  

    // Ação para remover um "todo"
    async removeTodo(id) {
      try {
        await axios.delete(`http://localhost:4000/todos/${id}`)
        this.todos = this.todos.filter(todo => todo.id !== id)  // Atualiza o estado removendo o todo
      } catch (error) {
        console.error('Erro ao remover todo:', error.response?.data || error.message)
      }
    },

    // Ação para pesquisar todos (por exemplo, filtrando por título)
    async searchTodos(query) {
      try {
        const { data } = await axios.get(`http://localhost:4000/todos?q=${query}`)
        this.todos = data  // Atualiza o estado com os resultados da pesquisa
      } catch (error) {
        console.error('Erro na busca:', error.response?.data || error.message)
      }
    },

    // Ação para pegar os usuários da API
    async getUsuario() {
      try {
        const { data } = await axios.get('http://localhost:4000/usuarios')
        this.usuarios = data  // Modifica o estado com a lista de usuários
      } catch (error) {
        console.error('Erro ao buscar usuários:', error.response?.data || error.message)
      }
    },

    // Ação para adicionar um novo usuário
    async addUsuario({ name, email, senha }) {
      try {
        const response = await axios.post('http://localhost:4000/usuarios', {
          name: name, // alterando de 'nome' para 'name' conforme o backend
          email: email,
          senha: senha
        })
        return response.data;  // Atualiza a lista de usuários após adicionar
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error.response?.data || error.message)
        throw error; //
      }
    },
  
      // Ação para realizar o upload de uma imagem
      async uploadImage(file) {
        if (!file) {
          this.uploadStatus = 'Nenhuma imagem selecionada';
          return;
        }

        const formData = new FormData();
        formData.append('image', file);

        this.uploadStatus = 'Enviando imagem...';

        try {
          const response = await axios.post('http://localhost:4000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          this.uploadStatus = 'Imagem enviada com sucesso!';
          console.log(response.data); // Log de resposta
        } catch (error) {
          this.uploadStatus = 'Erro ao enviar a imagem';
          console.error('Erro ao enviar imagem:', error);
        }
      },
      loadUsuarioLogado() {
        const userData = localStorage.getItem('userLogado');
        if (userData) {
          this.userLogado = JSON.parse(userData); // 🔥 pega o que estava salvo
        }
      },

      setUsuarioLogado(user) {
        this.userLogado = user;
        localStorage.setItem('userLogado', JSON.stringify(user)); // 🔥 salva no localStorage
      },
      setUsuarios(usuarios) {
        this.usuarios = usuarios;  // Atualiza a lista de usuários
      },
      logout() {
        this.userLogado = null;
        localStorage.removeItem('userLogado'); // 🔥 remove do localStorage
      },
    }

})