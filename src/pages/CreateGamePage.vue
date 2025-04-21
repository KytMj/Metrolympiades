<script setup>
import router from '@/router'
import { ref } from 'vue'
import { fetchAllTeams, fetchMatches, fetchMyTeam } from '../utils/APIFetches.js'
const isLoading = ref(false)

const myTeam = ref(null)
const user = JSON.parse(localStorage.getItem('user'))
const myMatches = ref([]);


fetchMatches(user.token).then((data) => {
  myMatches.value = data
})

const opponents = ref([]) //all the opponents
const filteredOpponents = ref([]) //the opponents displayed in the select input
//sets opponents value to all teams except the logged in team
function fetchOpponents() {
  isLoading.value = true
  fetchMyTeam(user.token)
    .then((data) => {
      myTeam.value = data
    })
    .then(() => {
      return fetchAllTeams()
    })
    .then((data) => {
      // Filter out the team that is logged in
      opponents.value = data.filter((team) => team.id !== myTeam.value.id)
      filteredOpponents.value = opponents.value
    })
    .finally(() => {
      isLoading.value = false
    })
}
fetchOpponents()

const activities = ref([]) // all the activities
const filteredActivities = ref([]) // the activities displayed in the select input
function fetchActivities() {
  isLoading.value = true
  fetch('http://localhost:3000/activities', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      activities.value = data
      filteredActivities.value = activities.value;
      isLoading.value = false
    })
}
fetchActivities()

const team = ref(null)
if (user !== null && user !== undefined) {
  team.value = user.team
}

const opponent = ref(null)

function opponentSet(event) {
  opponent.value = opponents.value.filter((opponent) => {
    return opponent.id === event.target.value
  })[0]

  // Remove activities that have already been played against the team in the selected activity
  filteredActivities.value = activities.value.filter((activity) => {
    return !myMatches.value.some((match) => {
      return match.team2 === opponent.value.name && match.activity === activity.name
    })
  })
}

const activity = ref(null)

function activitySet(event) {
  activity.value = activities.value.filter((activity) => {
    return activity.id === event.target.value
  })[0]

  // Remove opponents that have already played against the team in the selected activity
  filteredOpponents.value = opponents.value.filter((opponent) => {
    return !myMatches.value.some((match) => {
      return match.activity === activity.value.name && match.team2 === opponent.name
    })
  })
}

function formatDate(date) {
  return date.toString().slice(0, 19) + 'Z'
}

function checkFormCompleted() {
  return !(opponent.value === null || activity.value === null)
}

function checkPageLoadedSuccessfully() {
  return !(opponents.value.length === 0 || activities.value.length === 0)
}

function createGame(submitEvent) {
  const FORM = submitEvent.target.elements

  const now = new Date()

  const [hours, minutes] = FORM.beginingHour.value.split(':')
  now.setHours(hours, minutes, 0, 0)
  console.log('date', now)

  const formattedDate = formatDate(now)
  console.log('formattedDate', formattedDate)

  isLoading.value = true
  fetch('http://localhost:3000/matches', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      team2Id: opponent.value.id,
      activityId: activity.value.id,
      startedAt: formattedDate,
      team1Score: parseInt(FORM.teamScore.value),
      team2Score: parseInt(FORM.opponentScore.value),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Match created') {
        isLoading.value = false
        alert('Match créé avec succès')
        console.log('PUSHING')

        router.push('/games')
      } else if (data.message === 'Match already exists') {
        isLoading.value = false
        alert('Un match de l\'activité choisie existe déjà entre ces deux équipes')
      } else {
        console.log(data)
        isLoading.value = false
        alert('Erreur lors de la création du match')
      }
    })
}
</script>

<template>
  <h1>Créer un match</h1>
  <div class="container">
    <form v-if="!isLoading" @submit.prevent="createGame">
      <div class="opponent form-element">
        <label for="opponent">Adversaire</label>
        <select @input="opponentSet" id="opponent" class="opponent" v-if="opponents.length > 0">
          <option :selected="true" disabled>Choisir un adversaire</option>
          <option v-for="opponent in filteredOpponents" :key="opponent.id" :value="opponent.id">
            {{ opponent.name }}
          </option>
        </select>
        <p v-else>Aucun adversaire disponible. Vous ne pouvez pas créer de matchs...</p>
      </div>
      <div class="activity form-element">
        <label for="activity">Activité</label>
        <select @input="activitySet" id="activity" class="activity" v-if="activities.length > 0">
          <option :selected="true" disabled>Choisir une activité</option>
          <option v-for="activity in filteredActivities" :key="activity.id" :value="activity.id">
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
        <div class="score form-element">
          <label for="teamScore">{{ team.name }}</label>
          <input type="number" id="teamScore" name="teamScore" required defaultValue="0" />
        </div>
        <div class="score form-element">
          <input
            class="notinput"
            v-model="opponent.name"
            v-if="opponent != null"
            for="opponentScore"
            disabled
          />
          <label v-else for="opponentScore">Adversaire</label>
          <input type="number" id="opponentScore" name="opponentScore" required defaultValue="0" />
        </div>
      </div>

      <div class="form-element">
        <button
          type="submit"
          :disabled="isLoading || !checkPageLoadedSuccessfully() || !checkFormCompleted()"
        >
          Créer le match
        </button>
      </div>
    </form>
    <div v-else>
      <p>Chargement...</p>
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

label,
h4 {
  align-self: start;
}

input {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  width: 50%;
}

input[type='number'] {
  width: 15%;
}

.notinput {
  border: none;
  margin: 0;
  padding: 0;
  border-radius: 0;
}

.score {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.score * {
  margin-bottom: 0;
  align-self: center;
}
</style>
