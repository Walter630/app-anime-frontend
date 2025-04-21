// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login' // Redireciona para /cadastro ao acessar a raiz
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue') // Confirme se o nome e o caminho estão corretos
  },
  {
    path: '/cadastro', // Utilize em minúsculas
    name: 'cadastro',
    component: () => import('../views/CadastroView.vue') // Certifique-se de que o componente existe
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/adcionarAnime',
    name: 'adcionarAnime',
    component: () => import('../views/AdicionarAnimesView.vue')
  },
  {
    path: '/editarAnimes',
    name: 'editarAnimes',
    component: () => import('../views/EditarAnimesView.vue')
  },
  {
    path: '/usuariosss',
    name: 'usuariosss',
    component: () => import('../views/UsuariosView.vue')
  },
  {
    path: '/anime/:id',
    name: 'AnimeDetails',
    component: () => import('../views/AnimeDetailsView.vue') // crie essa view
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
