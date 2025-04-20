<script setup>
//import { XMarkIcon } from "@heroicons/vue/24/outline";

import { ref } from "vue";


const user = JSON.parse(localStorage.getItem("user"));

const teamData = ref(null);
const isLoading = ref(false);
const teamName = ref("");
const teamMembers = ref(null);
const userName = ref("");

const newTeamMember = ref("")

function fetchTeam() {
    isLoading.value = true;
    fetch("http://localhost:3000/teams/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
    })
    .then((response) => response.json())
    .then((data) => {
      teamData.value = data;
      isLoading.value = false;
      teamName.value = teamData.value.name
      teamMembers.value = teamData.value.members
      userName.value = user.username
    })
}

function updateTeam() {
    isLoading.value = true;
    fetch("http://localhost:3000/teams/me", {
        method: "PUT",
        headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                name: teamName.value,
                members: teamMembers.value,
            }),
    })
    .then((response) => response.json())
    .then((data) => {
      fetch("http://localhost:3000/teams/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('userTeam', JSON.stringify({"id": data.id, "name": data.name}))
      })
      console.log(data.message)
      console.log(localStorage.getItem('userTeam'))
      isLoading.value = false;
    })
}

function addMember() {
  if(newTeamMember.value != ""){
    teamMembers.value.push(newTeamMember.value);
    newTeamMember.value = "";
  }
}

function deleteMember(member) {
  teamMembers.value.splice(teamMembers.value.indexOf(member), 1);
}

fetchTeam()

</script>

<template>
  <div class="container">
    <form class="card" @submit.prevent="">
      <div class="grid">
        <h1 class="teamPageTitle"> Mon équipe </h1>
        <button class="teamPageSaveBtn" @click="updateTeam">Enregistrer</button>
      </div>

      <div class="grid">
        <p class="text">Nom de l'équipe</p>
        <input
        type="text"
        id="teamName"
        name="teamName"
        :placeholder="teamName"
        v-model="teamName"
        required
        />

        <p class="text">Membres de l'équipe</p>
        <input
          type="text"
          id="userMember"
          name="userMember"
          :placeholder="userName + ' (Vous)'"
          readonly
          />
        <div v-for="(member) in teamMembers" :key="member" class="grid">
          <input
          type="text"
          name="teamMember"
          :placeholder="member"
          readonly
          />
          <button @click="deleteMember(member)" class="deleteButton">X</button>
        </div>
        <input
          type="text"
          id="newTeamMember"
          name="newTeamMember"
          v-model="newTeamMember"
          placeholder="Ecrire le nom d'un nouveau membre"
        />
        <button @click="addMember">Ajouter un coéquipier</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
 .grid{
    display: grid;
  }

  .grid button {
    align-items: center;
    place-self: center;
    justify-self: center;
  }

  .deleteButton{
    grid-column: 2;
    align-items: center;
    max-width: fit-content;
    max-height: fit-content;
    padding: 1rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-bottom: 16px;
  }

  .teamPageTitle {
    text-align: justify;
    grid-column: 1;
  }

  .teamPageSaveBtn {
    grid-column: 2;
    max-width: fit-content;
    max-height: fit-content;
  }

  input:focus::-webkit-input-placeholder {
	color : transparent;
  }
  input:focus::-moz-placeholder {
    color : transparent;
  }
  input:-moz-placeholder {
    color : transparent;
  }
  input:focus::-webkit-input-placeholder {
    opacity : 0;
  }
  input:focus::-moz-placeholder {
    opacity : 0;
  }
  input:-moz-placeholder {
    opacity : 0;
  }
</style>
