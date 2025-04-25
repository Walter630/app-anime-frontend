<template>
    <v-app-bar flat class="border-b" title="Meu app"></v-app-bar>
    
    <v-container >
        <main>
        <div>  
            <PesquisarAnimes/>
            <section id="animes-lancados">
                <ListaAnimeItens />
            </section>
        </div>
    </main>
    </v-container>
  
</template>

<script>
   
    import ListaAnimeItens from './ListaAnimeItens.vue';
    import PesquisarAnimes from './PesquisarAnimes.vue';
    export default {
        components: {ListaAnimeItens, PesquisarAnimes},
    }
  

</script>

<style>
template{
  scroll-behavior: smooth;
}
.cabecalho{
    padding: 30px;
    right: 100%;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.781);
    border-radius: 5px;
}
.texto{
    margin: 10px;
    width: 25%;
    border: 10px;
}
.card{
    color: white;
}
a{
    text-decoration: none;
    color: white;
    margin: 20px;
}
a:hover{
    color: aqua;
}
.rodape{
    padding: 30px;
    right: 100%;
    background-color: rgba(0, 0, 0, 0.781);
    text-align: center;
}
</style>