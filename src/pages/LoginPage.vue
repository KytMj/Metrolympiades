<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')

const password = ref('')

const boolean = computed(() => {
  return !!email.value.trim() && !!password.value.trim()
})

const isLoading = ref(false)

function logIn() {
  isLoading.value = true
  fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Invalid email or password') {
        password.value = ''
        alert('email ou mot de passe incorrect')
        isLoading.value = false
        return
      }

      localStorage.setItem('user', JSON.stringify(data))
      router.push('leaderboard').then(() => {
        location.reload()
      })
      isLoading.value = false
    })
}
</script>

<template>
  <main>
    <div class="container">
      <form class="card" @submit.prevent="logIn">
        <h1 style="margin-bottom: 1rem">Connexion</h1>
        <input
          type="email"
          id="email"
          name="email"
          autocomplete="email"
          placeholder="Adresse email"
          required
          v-model="email"
        />
        <input
          type="password"
          id="password"
          name="password"
          autocomplete="new-password"
          placeholder="Mot de passe"
          required
          v-model="password"
        />
        <button type="submit" :disabled="!boolean || isLoading">Connexion</button>
        <p>
          Pas encore de compte ?
          <router-link to="/register"> Je m'inscris </router-link>
        </p>
      </form>
    </div>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 3rem;
}
</style>
