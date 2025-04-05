<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')

const password = ref('')

const confirmPassword = ref('')

const username = ref('');
const teamName = ref('');

const boolean = computed(() => {
  return !!email.value.trim() && !!password.value.trim() && !!confirmPassword.value.trim() && !!username.value.trim() && !!teamName.value.trim()
})

const isLoading = ref(false)

function createAccount() {

  isLoading.value = true
  if (password.value !== confirmPassword.value) {
    alert('Les mots de passe ne correspondent pas')
    return
  }
  fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer jwt_token',
    },
    body: JSON.stringify({
      email: email.value,
      username: username.value,
      password: password.value,
      teamName: teamName.value
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data))
      console.log('user', JSON.parse(localStorage.getItem('user')))
      router.push('leaderboard').then(() => {
        location.reload()
      })
      isLoading.value = false
    })
}
</script>

<template>
  <main>
    <h1>Inscription</h1>
    <div class="container">
      <form class="card" @submit.prevent="createAccount">
        <input
          type="text"
          id="username"
          name="username"
          autocomplete="Nom d'utilisateur"
          placeholder="Nom d'utilisateur"
          required
          v-model="username"
        />
        <input
          type="text"
          id="teamName"
          name="teamName"
          autocomplete="Nom d'équipe"
          placeholder="Nom d'équipe"
          required
          v-model="teamName"
        />
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
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autocomplete="new-password"
          placeholder="Confirmation de Mot de passe"
          required
          v-model="confirmPassword"
        />

        <button type="submit" :disabled="!boolean || isLoading">J'inscris mon équipe</button>
        <p>Déjà inscrit ?
          <router-link to="/login">
            Me connecter
          </router-link>
        </p>
      </form>


    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
  form {
    display: flex;
    flex-direction: column;
    width: 33%;
    margin-top: 20px;
  }
  input {
    border: 1px solid rgba(0,0,0, 0.5);
    border-radius: 10px;
    color: black;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  button{
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
  button:disabled {
    background-color: lightgray;
    color: white;
    cursor: not-allowed;
  }
</style>
