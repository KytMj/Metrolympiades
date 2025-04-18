<script setup>
// icons
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  UserGroupIcon,
  TrophyIcon,
  PlusCircleIcon,
  RocketLaunchIcon,
} from '@heroicons/vue/24/outline'

import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

function logout() {
  localStorage.removeItem('user')
  localStorage.setItem('user', null)
  router.push('/register').then(() => {
    location.reload()
  })
}

function login() {
  router.push('/login')
}

function register() {
  router.push('/register')
}

function sendToHome() {
  router.push('/')
}

function sendToTeam() {
  router.push('/team')
}
let user = null
if (localStorage.getItem('user') !== null) {
  user = JSON.parse(localStorage.getItem('user'))
}
const teamName = ref(null)

if (user !== null && user !== undefined) {
  teamName.value = user?.team?.name
}

const isConnected = user !== null && user !== undefined
</script>

<template>
  <div class="navbar">
    <div class="brandName clickable" @click="sendToHome">Metrolympiades</div>

    <div
      v-if="teamName !== null && teamName !== undefined && isConnected"
      class="teamName clickable"
      v-on:click="sendToTeam"
    >
      {{ teamName }}
    </div>
    <ul>
      <li>
        <router-link to="/" class="linkWithIcon"
          ><TrophyIcon class="icon" />Classement général</router-link
        >
      </li>
      <li v-if="isConnected">
        <router-link to="/team" class="linkWithIcon"
          ><UserGroupIcon class="icon" />Mon équipe</router-link
        >
      </li>
      <li v-if="isConnected">
        <router-link to="/games" class="linkWithIcon"
          ><RocketLaunchIcon class="icon" />Mes matchs</router-link
        >
      </li>
      <li v-if="isConnected">
        <button @click="logout">
          <ArrowRightStartOnRectangleIcon class="icon" />Se déconnecter
        </button>
      </li>

      <li v-if="!isConnected">
        <button @click="register"><PlusCircleIcon class="icon" />Créer une équipe</button>
      </li>
      <li v-if="!isConnected">
        <button @click="login"><ArrowLeftEndOnRectangleIcon class="icon" />Se connecter</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
button {
  width: 100%;
}

.icon {
  margin-right: 5px;
}
.linkWithIcon {
  display: flex;
  align-items: center;
  direction: row;
  align-content: center;
  justify-content: space-between;
}
.brandName {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.teamName {
  margin: 10px;
  font-size: 1.2rem;
  font-weight: bold;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 200px;
  background-color: #333;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.navbar ul {
  list-style-type: none;
  padding: 0;
}

.navbar li {
  margin: 15px 0;
  display: flex;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.navbar a:hover {
  text-decoration: underline;
}
</style>
