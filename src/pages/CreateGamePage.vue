<script setup>
import { ref } from "vue";
const isLoading = ref(false);
const opponents = ref([]);

const myTeam = ref(null);
const allTeams = ref([]);
const user = JSON.parse(localStorage.getItem("user"));

function fetchOpponents() {

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

const team = ref(null);
if (user !== null && user !== undefined) {
  team.value = user.team;
}

const opponent = ref(null);

function opponentSet(event) {
  opponent.value = opponents.value.filter((opponent)=>{
    return opponent.id === event.target.value})[0];
}

const activity = ref(null);

function activitySet(event) {
  activity.value = activities.value.filter((activity)=>{
    return activity.id === event.target.value})[0];
}

function formatDate(date) {
  return date.toISOString().slice(0, 19) + 'Z';
}


function checkFormCompleted(){
  return !(opponent.value == null || activity.value == null);
}

function checkPageLoadedSuccessfully() {
  return !(opponents.value.length == 0 || activities.value.length == 0);
}


function createGame(submitEvent) {
  const FORM = submitEvent.target.elements;

  const now = new Date();

  const [hours, minutes] = FORM.beginingHour.value.split(':');
  now.setHours(hours, minutes, 0, 0);

  const formattedDate = formatDate(now);

  fetch('http://localhost:3000/matches', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "team2Id": opponent.value.id,
      "activityId": activity.value.id,
      "startedAt": formattedDate,
      "team1Score": parseInt(FORM.teamScore.value),
      "team2Score": parseInt(FORM.opponentScore.value),

    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "Match created") {
        alert("Match créé avec succès");
      } else {
        alert("Erreur lors de la création du match");
      }
      isLoading.value = false;
    })
}
</script>

<template>
    <h1>
        Create Games!
    </h1>
    <div class="container">
    <form v-if="!isLoading" @submit.prevent="createGame">
      <div class="opponent form-element">
        <label for="opponent">Adversaire</label>
        <select @input="opponentSet" id="opponent" class="opponent" v-if="opponents.length > 0">
          <option :selected="true" disabled>Choisir un adversaire</option>
          <option v-for="opponent in opponents" :key="opponent.id" :value="opponent.id">
            {{ opponent.name }}
          </option>
        </select>
        <p v-else>Aucun adversaire disponible. Vous ne pouvez pas créer de matchs...</p>
      </div>
      <div class="activity form-element">
        <label for="activity">Activité</label>
        <select @input="activitySet" id="activity" class="activity" v-if="activities.length > 0">
          <option :selected="true" disabled>Choisir une activité</option>
          <option v-for="activity in activities" :key="activity.id" :value="activity.id">
            {{ activity.name }}
          </option>
        </select>
        <p v-else>Aucune activité disponible. Vous ne pouvez pas créer de matchs...</p>
      </div>

      <div class="beginingHour form-element">
        <label for="beginingHour">Heure de début</label>
        <input type="time" id="beginingHour" name="beginingHour" required defaultValue="00:00" />
      </div>

      <div class="finalScores form-element">

        <h4>Score finaux</h4>
        <div class = "score form-element">
          <label for="teamScore">{{ team.name }}</label>
          <input type="number" id="teamScore" name="teamScore" required defaultValue="0" />
        </div>
        <div class = "score form-element">
          <input class="notinput" v-model="opponent.name" v-if="opponent!=null" for="opponentScore" disabled/>
          <label v-else for="opponentScore">Adversaire</label>
          <input type="number" id="opponentScore" name="opponentScore" required defaultValue="0" />
        </div>

      </div>

      <div class="form-element">
        <button type="submit" :disabled="isLoading || !checkPageLoadedSuccessfully() || !checkFormCompleted()">Créer le match</button>

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
  width: 33%;
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

label, h4{
  align-self: start;
}

input{
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  width: 50%;
}

input[type="number"]{
  width: 15%;
}

.notinput{
  border: none;
  margin: 0;
  padding: 0;
  border-radius: 0;
}

.score{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.score * {
  margin-bottom: 0;
  align-self: center;
}

select{
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  width: 75%;
}

</style>
