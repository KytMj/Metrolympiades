<script setup>
  import { XMarkIcon } from '@heroicons/vue/24/solid'
  import { PlusIcon } from '@heroicons/vue/24/solid';
  
  import { fetchMyTeam, updateMyTeam } from "@/utils/APIFetches";
  import { ref } from "vue";


  const user = JSON.parse(localStorage.getItem("user"));

  const teamData = ref(null);
  const isLoading = ref(false);
  const teamName = ref("");
  const teamMembers = ref([]);
  const userName = ref("");

  const newTeamMember = ref("")
  fetchMyTeam(user.token)
    .then((data) => {
      teamData.value = data;
      isLoading.value = false;
      teamName.value = teamData.value.name
      userName.value = user.username
      teamMembers.value = (teamData.value.members !== null ?  [user.username, ...teamData.value.members] : [user.username])
    })


  function updateTeam() {
    isLoading.value = true;
    updateMyTeam(user.token, teamName.value, teamMembers.value.filter(member => member != userName.value))
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
      <div class="titleRow">
        <h1 class="pageTitle"> Mon équipe </h1>
        <button class="pageButton" @click="updateTeam">Enregistrer</button>
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
          <div class="memberRow">
            <p class="memberCard">{{ member }}{{ member == userName ? " (Vous)":"" }}</p>
            <button v-show="!(member == userName)" @click="deleteMember(member)" ><XMarkIcon class="icon" /></button>
          </div>
        </div>
        <div class="memberRow">
          <input
            type="text"
            id="newTeamMember"
            name="newTeamMember"
            v-model="newTeamMember"
            placeholder="Inscrire un nouveau membre"
            class="memberCard"
          />
          <button class="newMember" @click="addMember"><PlusIcon class="icon" /></button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
 .grid{
    display: grid;
  }

  .memberRow{
    display: flex;
    align-items: center;
  }

  .memberRow button {
    max-width: fit-content;
    max-height: fit-content;
    padding: 0.5rem;
    background-color:  #bc4749;
    color: #e0e1dd;
  }

  .memberRow p,
  .memberRow button,
  .memberRow input{
    align-self: center;
  }


  .memberCard{
    width:100%;
    padding:10px;
    margin:5px;
    background-color: #e0e1dd;
    border-radius: 8px;
  }

  .newMember{
    background-color: #386641 !important;
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
