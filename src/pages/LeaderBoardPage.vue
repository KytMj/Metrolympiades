<script setup>
import { ref } from "vue";

const ranking = ref([]);


const isLoading = ref(false);

function fetchRanking() {
    isLoading.value = true;
    fetch("http://localhost:3000/ranking", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Authorization":  "Bearer jwt_token",
        }
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
            <div v-if="isLoading">
                <p>Loading...</p>
            </div>
            <div v-else-if="ranking.length === 0">
                <p>Aucun classement disponible.</p>
            </div>
            <div v-else class="centerer">
                <div v-for="(i) in ranking.length" :key="i" class="card">
                    <p>{{ i }}</p>
                    <p class="teamName">{{ ranking[i-1].team }}</p>
                    <p class="">{{ ranking[i-1].points }}pts</p>

                </div>
            </div>
        </div>
        <div>
          <button @click="fetchRanking">Rafraichir le classement</button>
        </div>
    </main>
</template>

<style scoped>
  .centerer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
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
  button {
    background-color: lightgray;
    color: black;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 20px;
  }
  button:hover {
    background-color: gray;
    color: white;
  }
</style>
