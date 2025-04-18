<script setup>
import { ref } from "vue";

const ranking = ref([]);


const isLoading = ref(false);

function fetchRanking() {
  console.log(localStorage.getItem("user"));
    isLoading.value = true;
    fetch("http://localhost:3000/ranking", {
        method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
        ranking.value = data;
        isLoading.value = false;

    });
}


    fetchRanking();


</script>

<template>
    <main>
        <div class="container">
            <h1>Classement général</h1>
        </div>
        <div>
          <div class="container">
            <button :disabled=isLoading @click="fetchRanking">Rafraichir le classement</button>
          </div>
            <div v-if="isLoading">
                <p>Loading...</p>
            </div>
            <div v-else-if="ranking.length === 0">
                <p>Aucun classement disponible.</p>
            </div>
            <div v-else class="container">
                <div v-for="(i) in ranking.length" :key="i" class="card container">
                    <p>{{ i }}</p>
                    <p class="teamName">{{ ranking[i-1].team }}</p>
                    <p class="">{{ ranking[i-1].points }}pts</p>

                </div>
            </div>
        </div>

    </main>
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
    align-items: left;
    width: 33%;
  }
  .card p {
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
    color: #333;
    text-align: left;
  }
  p.teamName{
    font-size: 1.5rem;
    font-weight: bold;
    align-self: left;
    width: 75%;
    margin-left: 25%;
  }
</style>
