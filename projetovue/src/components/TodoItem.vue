<template>
    <div>
        <ListaAnimeItens v-for="todo in $store.state.todos"
        :key="todo.id"/>
    </div>
</template>

<script>
import ListaAnimeItens from './ListaAnimeItens.vue';
export default {
    components: {ListaAnimeItens}
}
</script>