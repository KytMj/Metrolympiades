<script setup>
  import { XMarkIcon } from '@heroicons/vue/24/solid'
  import { fetchMyTeam } from "@/utils/APIFetches";
  import { ref } from "vue";


  const user = JSON.parse(localStorage.getItem("user"));

  const teamData = ref(null);
  const isLoading = ref(false);
  const teamName = ref("");
  const teamMembers = ref(null);
  const userName = ref("");

  const newTeamMember = ref("")
  fetchMyTeam(user.token)
    .then((data) => {
      teamData.value = data;
      isLoading.value = false;
      teamName.value = teamData.value.name
      userName.value = user.username
      if(teamData.value.members !== null) teamMembers.value = [user.username, ...teamData.value.members]
      else teamMembers.value = [user.username]
    })

  function updateTeam() {
    isLoading.value = true;
    updateTeam(user.token, teamName.value, teamMembers.value.filter(member => member != userName.value))
    .then(() => {
      fetchMyTeam(user.token)
        .then((data) => {
          user.team.name = data.name
          localStorage.setItem('user', JSON.stringify(user))
        })
      location.reload()
      isLoading.value = false;
    })
  }

  function addMember() {
    if(newTeamMember.value !== ""){
      teamMembers.value.push(newTeamMember.value);
      newTeamMember.value = "";
    }
  }

  function deleteMember(member) {
    teamMembers.value.splice(teamMembers.value.indexOf(member), 1);
  }
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
        <div v-for="(member) in teamMembers" :key="member" class="grid">
          <input v-if="member === userName"
          type="text"
          name="teamMember"
          :placeholder="userName + ' (Vous)'"
          readonly
          />
          <input v-else
          type="text"
          name="teamMember"
          :placeholder="member"
          readonly
          />
          <button v-if="!(member === userName)" @click="deleteMember(member)" class="deleteButton"> <XMarkIcon class="icon" /> </button>
        </div>
        <input
          type="text"
          class="writeInput"
          id="newTeamMember"
          name="newTeamMember"
          v-model="newTeamMember"
          placeholder="Ecrire le nom d'un nouveau membre"
        />
        <button @click="addMember"> Ajouter un coéquipier</button>
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

  .writeInput:focus::-webkit-input-placeholder {
	color : transparent;
  }
  .writeInput:focus::-moz-placeholder {
    color : transparent;
  }
  .writeInput:-moz-placeholder {
    color : transparent;
  }
  .writeInput:focus::-webkit-input-placeholder {
    opacity : 0;
  }
  .writeInput:focus::-moz-placeholder {
    opacity : 0;
  }
  .writeInput:-moz-placeholder {
    opacity : 0;
  }
</style>
