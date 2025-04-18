<script setup>
import router from '@/router'
import { ref } from 'vue'
import MatchCard from '@/components/MatchCard.vue';

function pushToAddGamePage() {
  router.push('/game')
}

const matches = ref([]);
const isLoading = ref(false);
const user = JSON.parse(localStorage.getItem("user"));

function fetchMatches(){
    isLoading.value = true;
    fetch("http://localhost:3000/matches/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        }
    })
    .then((response) => response.json())
    .then((data) => {
        matches.value = data;
        console.log("matches.value = ",matches.value.at(0).activity);
        isLoading.value = false;
    });
}
fetchMatches();


</script>

<template>
  <main>
    <div class="header">
      <h1>Mes matches</h1>
      <div class="container">
        <button @click="pushToAddGamePage">Ajouter un match</button>
      </div>
    </div>
    <div>
      <h1>c'est les matches</h1>
      <div v-if="isLoading">
          <p>Chargement...</p>
      </div>
      <div v-else-if="matches.length === 0">
          <p>Aucun classement disponible.</p>
      </div>
      <div v-else class="centerer">
          <MatchCard v-for="match in matches" :key="match.id" :match = "match" class="card"/>

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
