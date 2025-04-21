<template>
    <v-container>
      <v-row>
        <v-col
          v-for="(user, index) in usuarios"
          :key="user.id"
          cols="12"
          md="4"
        >
          <v-card class="ma-4">
            <v-card-title primary-title>
              {{ user.name }}
            </v-card-title>
            <v-card-text>
              {{ user.email }}
            </v-card-text>
            <v-card-actions>
            <v-btn @click="toggleDoneUser(index)" color="primary">
              {{ user.done ? 'Desativar' : 'Ativar' }}
            </v-btn>
          </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>  
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UsuarioList',
  setup() {
    const store = useStore()
    const usuarios = computed(() => store.state.usuarios)

    const toggleDoneUser = (index) => {
      store.commit('toggleDoneUser', index)
    }

    // Busca usuários assim que o componente carregar
    onMounted(() => {
      store.dispatch('getUsuario')
    })

    return {
      usuarios,
      toggleDoneUser,
    }
  },
}
</script>


<style scoped>

</style>
  