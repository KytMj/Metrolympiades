<script setup>
import router from '@/router'
import { ref } from 'vue'
import MatchCard from '@/components/MatchCard.vue'
import { FunnelIcon } from '@heroicons/vue/24/outline'
import { fetchMatches } from '../utils/APIFetches.js'

function pushToAddGamePage() {
  router.push('/game')
}

const matches = ref([])
const isLoading = ref(false)
const user = JSON.parse(localStorage.getItem('user'))

isLoading.value = true
fetchMatches(user.token).then((data) => {
  matches.value = data
  isLoading.value = false
})

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

function handleDelete(matchId) {
  isLoading.value = true
  fetch('http://localhost:3000/matches/' + matchId, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Match deleted') {
        matches.value = matches.value.filter((match) => match.id !== matchId) // or fetch again
        isLoading.value = false
        alert('Match supprimé avec succès')
      } else {
        console.error('Error deleting match:', data.message)
        isLoading.value = false
        alert('Erreur lors de la suppression du match')
      }
    })
}
</script>

<template>
  <div class="container">
    <div class="prettyCard">
      <div class="titleRow">
        <h1 class="pageTitle">Mes matchs</h1>
        <button class="pageButton" @click="pushToAddGamePage">Ajouter un match</button>
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
          <p>Pas de encore de matchs avec cette équipe. Vous pouvez en créer un en appuyant sur "créer un match".</p>
        </div>
        <div v-else class="container columnDisplay">
          <MatchCard
            v-for="match in matches"
            :key="match.id"
            :match="match"
            @delete="handleDelete"
            class="card"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .icon {
    margin-right: 10px;
  }
  .filter {
    flex-direction: row;
  }
  .columnDisplay {
    flex-direction: column;
  }
  select {
    max-width: fit-content;
    max-height: fit-content;
  }
</style>
