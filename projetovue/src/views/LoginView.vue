<template>
    <div>
        <TodoLogin/>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import TodoLogin from '../components/TodoLogin.vue';
import { useTodoStore } from '../stores/todoStore';

export default {
    components: {TodoLogin},
    setup() {
        const todoStore = useTodoStore()

        onMounted(() => {
           todoStore.getUsuario() // isso garante que a lista esteja disponível
        })
    }
}
</script>