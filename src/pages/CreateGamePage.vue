<script setup>
import { ref } from "vue";
const isLoading = ref(false);
const opponents = ref([]);

const myTeam = ref(null);
const allTeams = ref([]);

function fetchOpponents() {

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("token", user.token);

  isLoading.value = true;
    fetch("http://localhost:3000/teams/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${user.token}`,
        }
    })
    .then((response) => response.json())
    .then((data) => {

        myTeam.value = data;
        isLoading.value = false;
    }).then(() => {
      const user = JSON.parse(localStorage.getItem("user"));

      isLoading.value = true;
      fetch("http://localhost:3000/teams", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
      })
      .then((response) => response.json())
      .then((data) => {
          allTeams.value = data;
          opponents.value = allTeams.value.filter((team) => {
            return team.id !== myTeam.value.id;
          });
          isLoading.value = false;
      })
    });
}

fetchOpponents();

const activities = ref([]);
function fetchActivities() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("token", user.token);

  isLoading.value = true;
    fetch("http://localhost:3000/activities", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${user.token}`,
        }
    })
    .then((response) => response.json())
    .then((data) => {
        activities.value = data;
        isLoading.value = false;
    });
}
fetchActivities();


</script>

<template>
    <h1>
        Create Games!
    </h1>
    <div class="container">
    <form v-if="!isLoading" onsubmit="">
        <div class="opponent form-element">
          <label for="opponent">Adversaire</label>
          <select v-if="opponents.length > 0">
            <option :selected="true" disabled>Choisir un adversaire</option>
            <option v-for="opponent in opponents" :key="opponent.id" :value="opponent.id">
              {{ opponent.name }}
            </option>
          </select>
          <p v-else>Aucun adversaire disponible. Vous ne pouvez pas créer de matchs...</p>
        </div>
        <div class="activity form-element">
          <label for="activity">Activité</label>
          <select v-if="activities.length > 0">
            <option :selected="true" disabled>Choisir une activité</option>
            <option v-for="activity in activities" :key="activity.id" :value="activity.id">
              {{ activity.name }}
            </option>
          </select>
          <p v-else>Aucune activité disponible. Vous ne pouvez pas créer de matchs...</p>
        </div>

      </form>
      <div v-else>
        <p>Loading...</p>
      </div>

    </div>
</template>


<style scoped>
form {
  margin-top: 2.5%;
  display: flex;
  width: 20%;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
}

.form-element {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  gap: 0.5rem;
}

label{
  align-self: start;
}
</style>
