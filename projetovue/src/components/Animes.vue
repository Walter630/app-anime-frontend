<template>
    <v-app-bar :elevation="2" color="primary" scroll-behavior="fade">
    <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Bar</v-app-bar-title>
    

    <v-btn icon >
        <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    </v-app-bar>
  
    <v-container >
        <main>
        <div>  
            <PesquisarAnimes/>
            <ListaAnimeItens />
        </div>
    </main>
    </v-container>
    <v-footer  class="d-flex align-center justify-center ga-2 flex-wrap flex-grow-1 py-3"
    color="primary">
    Redes
  </v-footer>
</template>

<script>
   
    import ListaAnimeItens from './ListaAnimeItens.vue';
    import PesquisarAnimes from './PesquisarAnimes.vue';
    export default {
        components: {ListaAnimeItens, PesquisarAnimes},
    }
</script>

<style>


</style>