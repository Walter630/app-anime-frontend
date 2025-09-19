<template>
  <AppBarComponent />
    <div>
      <Animes />
    </div>
</template>
  
<script>
import Animes from '../components/Animes.vue'
import AppBarComponent from '../components/AppBarComponent.vue'
export default {
    components: { Animes, AppBarComponent }
  }
</script>
  