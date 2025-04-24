// src/store/index.js

import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    todos: [],
    usuarios: []
  },

  mutations: {
    storeTodos(state, payload) {
      state.todos = payload
    },
    
    storeTodo(state, payload){
        const index = state.todos.findIndex(todo => todo.id === payload.id)
        if(index >= 0){
          state.todos.splice(index, 1, payload)
        }else{
          state.todos.push(payload)
        }
    },
    removeTodo(state, id) {
      // Filtra os todos para remover o item com o id correspondente
      state.todos = state.todos.filter(todo => todo.id !== id);
    },
    toggleDone(state, index) {
        state.todos[index].done = !state.todos[index].done
    },
    storeUsuario(state, user){
      state.usuarios = user
    },
    storeUsuarios(state, user){
      const index = state.usuarios.findIndex(listUser => listUser.id === user.id)
      if(index >= 0){
        state.usuarios.splice(index, 1, user)
      }else{
        state.usuarios.push(user)
      }
    },
    toggleDoneUser(state, index) {
      state.usuarios[index].done = !state.usuarios[index].done
    },
  },

  getters: {},

  actions: {
    async getTodos( {commit} ) {
        try {
            const response = await axios.get('http://localhost:4000/todos')
            commit('storeTodos', response.data)
      } catch (error) {
            console.error('Erro ao buscar todos:', error)
      }
    },

    async addTodo({commit, dispatch}, data){
        try{
            await axios.post('http://localhost:4000/todos', data)
            dispatch('getTodos')
        } catch (error) {
            console.log("Erro encontrado", error)
        }
    },

    async updateTodo({ commit }, { id, data }) {
        try {
          await axios.put(`http://localhost:4000/todos/${id}`, data).then((response) =>{
            commit('storeTodo', response.data)
          })
        } catch (error) {
          console.error("Erro ao atualizar:", error)
        }
      },
   //promessas

    async removeTodos({ commit }, id) {
      try {
        await axios.delete(`http://localhost:4000/todos/${id}`)
        commit('removeTodo', id)  // Comita a mutação para remover o todo do estado
      } catch (err) {
        console.error("Erro ao tentar remover", err)
      }
    },
    
    async searchTodos({ commit }, query) {
      try {
        const response = await axios.get(`http://localhost:4000/todos?q=${query}`)
        commit('storeTodos', response.data)
      } catch (error) {
        console.error('Erro ao buscar todos:', error)
      }
    },

    async getUsuario( {commit} ) {
      try {
          const response = await axios.get('http://localhost:4000/usuarios')
          commit('storeUsuarios', response.data)
      } catch (error) {
            console.error('Erro ao buscar todos:', error)
      }
    },

    async addUsuario({ commit, dispatch }, data) {
      try {
        await axios.post('http://localhost:4000/usuarios', data)
        dispatch('getUsuario') // Isso já atualiza a lista inteira
      } catch (error) {
        console.log("Erro encontrado", error)
      }
    },
  },
  modules: {}
})
