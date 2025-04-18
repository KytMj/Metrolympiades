<script setup>

const props = defineProps({
  match: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <article class="card">
    <div>
      <p class="activity">{{ match.activity }}</p>
      <p class="date">{{ match.startedAt }}</p>
    </div>
    <div>
      <h2 class="teamName">{{ match.team1 }} - {{ match.team1Score }}</h2>

    </div>
    <div>
      <p class="score">{{ match.team2 }} - {{ match.team2Score }}</p>

    </div>

  </article>
</template>
