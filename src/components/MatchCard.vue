<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  match: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['delete'])

function getWinner() {
  if (props.match.team1Score > props.match.team2Score) {
    return props.match.team1
  } else if (props.match.team1Score < props.match.team2Score) {
    return props.match.team2
  } else {
    return 'Draw'
  }
}

function formatDate(dateString) {
  return dateString.substring(11, 16).replace(':', 'h')
}

function isWinnerOrElse(team) {
  if (team === getWinner()) {
    return 'winner'
  } else if ('Draw' === getWinner()) {
    return 'draw'
  } else {
    return 'loser'
  }
}

function removeMatch() {
  emit('delete', props.match.id)
}
</script>

<template>
  <article class="card">
    <div class="header container">
      <div class="smallHeader">
        <p class="activity">{{ match.activity }}</p>
        <p class="date">{{ formatDate(match.startedAt) }}</p>
      </div>
      <div>
        <button @click="removeMatch" class="suppButt"><XMarkIcon class="icon" /></button>
      </div>
    </div>
    <div class="score">
      <p :class="[isWinnerOrElse(props.match.team1)]">{{ match.team1 }}</p>
      <p>{{ match.team1Score }}</p>
    </div>
    <div class="score">
      <p :class="[isWinnerOrElse(props.match.team2)]">{{ match.team2 }}</p>
      <p>{{ match.team2Score }}</p>
    </div>
  </article>
</template>

<style scoped>
.header {
  width: 100%;
}

.smallHeader {
  display: flex;
  justify-content: start;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-content: center;
}
.smallHeader p {
  margin: 0;
  margin-right: 20px;
  align-self: center;
}
.date {
  font-size: 0.8rem;
  color: #888;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  margin: 8px;
  width: 24%;
}

.winner {
  font-weight: bold;
}

.loser {
  font-weight: normal;
  color: #666;
}

.draw {
  font-weight: normal;
  color: black;
}

.score {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
}

.suppButt :hover {
  cursor: pointer;
  color: red;
  transition: color 0.2s;
}
button {
  padding: 0;
  border: none;
  background: none;
}
</style>
