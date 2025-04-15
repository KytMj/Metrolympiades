<script setup>
import { ref } from "vue";

const user = JSON.parse(localStorage.getItem("user"));

const teamName = ref(null);

if (user !== null && user !== undefined) {
  teamName.value = user.team.name;
}

const teamData = ref(null);

fetch("http://localhost:3000/teams/me", {
    method: "GET",
    headers: {
    "Authorization":  "Bearer jwt_token"
    },
})
.then((response) => response.json())
.then((data) => {
    console.log(data);
    teamData.value = data;
});

</script>

<template>
  <div>
    <h1> Mon équipe </h1>
    <button>Enregistrer</button>
  </div>

  <div class="container">
      <form class="card" @submit.prevent="">
        <p>Nom de l'équipe</p>
        <input
        type="text"
        id="teamName"
        name="teamName"
        :placeholder="teamName"
        v-model="teamName"
        required
        />

        <p>Membres de l'équipe</p>
        <input
        type="text"
        id="teamMember"
        name="teamMember"
        placeholder="teamMember"
        required
        />
      </form>
  </div>
</template>
