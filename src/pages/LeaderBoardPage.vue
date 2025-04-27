<script setup>
import { ref } from 'vue'

const ranking = ref([])

const isLoading = ref(false)

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
  });
}

function fetchRanking() {
  isLoading.value = true
  fetch('http://localhost:3000/ranking', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      ranking.value = sortByKey(data, 'points')
      isLoading.value = false
    })
}


fetchRanking()
</script>

<template>
  <div class="container">
    <div class="prettyCard">
      <div class="titleRow">
        <h1 class="pageTitle">Classement général</h1>
        <button class="pageButton" :disabled="isLoading" @click="fetchRanking">Rafraichir le classement</button>
      </div>
      <div v-if="isLoading">
        <p>Chargement...</p>
      </div>
      <div v-else-if="ranking.length === 0">
        <p>Aucun classement disponible.</p>
      </div>
      <div v-else class="container">
        <div v-for="i in ranking.length" :key="i" class="card container">
          <p>{{ i }}</p>
          <p class="teamName">{{ ranking[i - 1].team }}</p>
          <p class="">{{ ranking[i - 1].points }}pts</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    margin-top: 20px;
    flex-direction: column;
  }
  .card {
    background-color: #fff;
    border-radius: 8px;
    border: 2px solid rgba(0, 0, 0, 0.5);
    padding: 20px;
    margin: 20px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: flex-start;
    width: 80%;
  }
  .card p {
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
    color: #333;
    text-align: left;
  }
  p.teamName {
    font-size: 1.5rem;
    font-weight: bold;
    align-self: left;
    width: 75%;
    margin-left: 25%;
  }
</style>
