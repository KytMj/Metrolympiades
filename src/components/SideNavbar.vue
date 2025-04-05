<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const isConnected = computed(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user !== null;
});

const router = useRouter();

function logout() {
  localStorage.removeItem("user");
  localStorage.setItem("user", null);
  isConnected.value = false;
  router.push("/register");
}

function sendToHome() {
  router.push("/");
}

const teamName = ref(null);

const user = JSON.parse(localStorage.getItem("user"));
if (user !== null) {
  teamName.value = user.team.name;
}
</script>

<template>

  <div class="navbar">
    <div @click="sendToHome">Metrolympiades</div>

    <div v-if="teamName !== null && isConnected" class="teamName">{{ teamName }}</div>
    <ul>
      <li><router-link to="/">Classement général</router-link></li>
      <li v-if="isConnected"><router-link to="/team">Mon équipe</router-link></li>
      <li v-if="isConnected"><router-link to="/games">Mes matchs</router-link></li>
      <li v-if="isConnected"><button @click="logout">Se déconnecter</button></li>

      <li v-if="!isConnected"><router-link to="/login">Se Connecter</router-link></li>
      <li v-if="!isConnected"><router-link to="/register">Créer une équipe</router-link></li>
    </ul>
  </div>
</template>



<style scoped>
.teamName {
  margin: 10px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
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
