<script setup>
import router from '@/router'
import { ref } from 'vue'
import MatchCard from '@/components/MatchCard.vue'
import { FunnelIcon } from '@heroicons/vue/24/outline'

function pushToAddGamePage() {
  router.push('/game')
}

const matches = ref([])
const isLoading = ref(false)
const user = JSON.parse(localStorage.getItem('user'))

function fetchMatches() {
  isLoading.value = true
  fetch('http://localhost:3000/matches/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      matches.value = data
      isLoading.value = false
    })
}
fetchMatches()

function sortByDate(a, b) {
  return new Date(b.startedAt) - new Date(a.startedAt)
}

function highestScore(a) {
  return a.team1Score > a.team2Score ? a.team1Score : a.team2Score
}

function lowestScore(a) {
  return a.team1Score < a.team2Score ? a.team1Score : a.team2Score
}

function sortMatches(event) {
  console.log('sortMatches', event.target.value)

  switch (event.target.value) {
    case 'date':
      matches.value.sort(sortByDate)
      break
    case 'activity':
      matches.value.sort((a, b) => a.activity.localeCompare(b.activity))
      break
    case 'team':
      matches.value.sort((a, b) => a.team2.localeCompare(b.team2))
      break
    case 'highestScore':
      matches.value.sort((a, b) => highestScore(b) - highestScore(a))
      break
    case 'lowestScore':
      matches.value.sort((a, b) => lowestScore(a) - lowestScore(b))
      break
    default:
      break
  }
}
</script>

<template>
  <main>
    <div class="header">
      <h1>Mes matchs</h1>
      <div class="container columnDisplay">
        <button @click="pushToAddGamePage">Ajouter un match</button>
      </div>
    </div>
    <div>
      <div class="container filter">
        <FunnelIcon class="icon" />
        <select @change="sortMatches($event)">
          <option :selected="true" disabled>Trier par</option>
          <option value="date">Date</option>
          <option value="activity">Activité</option>
          <option value="team">Équipe</option>
          <option value="highestScore">Plus grand score</option>
          <option value="lowestScore">Plus petit score</option>
        </select>
      </div>
      <div v-if="isLoading">
        <p>Chargement...</p>
      </div>
      <div v-else-if="matches.length === 0">
        <p>Aucun classement disponible.</p>
      </div>
      <div v-else class="container columnDisplay">
        <MatchCard v-for="match in matches" :key="match.id" :match="match" class="card" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.icon{
  margin-right: 10px;
}
.filer{
  flex-direction: row;
}
.columnDisplay{
  flex-direction: column;
}
select{
  width: 10%;
}
main {
  margin: 50px;
}
.header {
  margin-left: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
button {
  margin-right: 200px;
}

</style>
