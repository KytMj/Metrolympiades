<script setup>
import router from '@/router'

function pushToAddGamePage() {
  router.push('/game')
}
</script>

<template>
  <main>
    <div class="header">
      <h1>Mes matchs</h1>
      <div class="container">
        <button @click="pushToAddGamePage">Ajouter un match</button>
      </div>
    </div>
  </main>
</template>


<style scoped>
main{
  margin: 50px;
}
.header {
  margin-left: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
button{
  margin-right: 200px;
}
</style>
