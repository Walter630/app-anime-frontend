<template>
    <div>
        <TodoLogin/>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import TodoLogin from '../components/TodoLogin.vue';
import { useStore } from 'vuex';

export default {
    components: {TodoLogin},
    setup() {
        const store = useStore()
        const usuarios = computed(()=>store.state.usuarios)

        onMounted(() => {
            store.dispatch('getUsuario') // isso garante que a lista esteja disponível
        })
    }
}
</script>