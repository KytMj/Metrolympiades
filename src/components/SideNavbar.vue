<script setup>
// icons
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  UserGroupIcon,
  TrophyIcon,
  PlusCircleIcon,
  RocketLaunchIcon,
  Bars4Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

function logout() {
  localStorage.removeItem('user')
  localStorage.setItem('user', null)
  router.push('/').then(() => {
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

const user = ref(null)
const teamName = ref(null)

if (localStorage.getItem('user') !== null) {
  user.value = JSON.parse(localStorage.getItem('user'))
  teamName.value = user.value?.team?.name
}

if (user.value !== null && user.value !== undefined) {
  teamName.value = user.value?.team?.name
}

const isConnected = user.value !== null && user.value !== undefined

const isNavbarOpen = ref(false)

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value
}

</script>

<template>
  <button class="hamburger" @click="toggleNavbar">
      <Bars4Icon class="icon" />
    </button>
  <div :class="['navbar', { open: isNavbarOpen }]">
    <button class="close-icon" @click="toggleNavbar">
      <XMarkIcon class="icon" />
    </button>

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
  grid-column: 1;
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

.hamburger{
  display: none;
  width: auto;
  background: none;
  color:black;
  border: none;
  cursor: pointer;
}

.close-icon{
  display:none;
}

@media screen and (max-width: 768px) {
  .navbar {
    opacity: 0;
    transform: translateX(-20px);
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .hamburger {
    display: block;
  }

  .hamburger:hover{
    color:grey;
  }

  .close-icon{
    display:block;
    background-color: transparent;
    width: fit-content;
    padding: 0;
    margin:5%;
    color:white;
  }

  .close-icon:hover{
    color:grey;
  }

  .navbar.open {
    background-color: #333;
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }
}
</style>
