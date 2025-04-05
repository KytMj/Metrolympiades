<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
function logout() {
  localStorage.removeItem("user");
  router.push("/register");
}

function sendToHome() {
  router.push("/");
}
</script>

<template>

  <div class="navbar">
    <div @click="sendToHome">Metrolympiades</div>

    <div></div>
    <ul>
      <li><router-link to="/">Classement général</router-link></li>
      <li><router-link to="/team">Mon équipe</router-link></li>
      <li><router-link to="/games">Mes matchs</router-link></li>
      <li><button @click="logout">Se déconnecter</button></li>
    </ul>
  </div>
</template>



<style scoped>
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
