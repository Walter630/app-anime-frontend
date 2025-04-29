// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import { useTodoStore } from '@/stores/todoStore';


const routes = [
  {
    path: '/',
    redirect: '/login' // Redireciona para /cadastro ao acessar a raiz
  },
  {
    path: '/home',
    name: 'home',
    meta: { requiresAuth: true }, // 🔥 Marca que precisa estar logado
    component: () => import('@/views/HomeView.vue') // Confirme se o nome e o caminho estão corretos
  },
  {
    path: '/cadastro', // Utilize em minúsculas
    name: 'cadastro',
    component: () => import('@/views/CadastroView.vue') // Certifique-se de que o componente existe
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/adcionarAnime',
    name: 'adcionarAnime',
    component: () => import('@/views/AdicionarAnimesView.vue')
  },
  {
    path: '/editarAnimes',
    name: 'editarAnimes',
    component: () => import('@/views/EditarAnimesView.vue')
  },
  {
    path: '/usuariosss',
    name: 'usuariosss',
    component: () => import('@/views/UsuariosView.vue')
  },
  {
    path: '/anime/:id',
    name: 'AnimeDetails',
    component: () => import('@/views/AnimeDetailsView.vue') // crie essa view
  },
  {
    path: '/editarUsuario',
    name: 'editarUsuario',
    component: () => import('@/views/EdicaoUsuarioView.vue')
  },
  {
    path: '/admHome',
    name: 'admHome',
    component: () => import('@/views/AdmHomeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const todoStore = useTodoStore();

  // ⚡ Garante que o usuário carregado do localStorage
  if (!todoStore.userLogado) {
    const userData = localStorage.getItem('userLogado');
    if (userData) {
      todoStore.setUsuarioLogado(JSON.parse(userData));
    }
  }

  if (to.meta.requiresAuth && !todoStore.userLogado) {
    next('/'); // Se a rota precisar login e não tiver logado, vai para o login
  } else {
    next(); // Se não, segue normal
  }
});


export default router
