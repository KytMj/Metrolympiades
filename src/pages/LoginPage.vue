<script setup>
    import { computed, ref } from "vue";
    import { useRouter } from "vue-router";

    const router = useRouter();

    const email = ref("");

    const password = ref("");

    const boolean = computed(() => {
    return !!email.value.trim() && !!password.value.trim();
    });

    const isLoading = ref(false);

    function logIn() {
        isLoading.value = true;
        fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer jwt_token",
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data));
            console.log("user", JSON.parse(localStorage.getItem("user")));
            router.push("leaderboard").then(() => {
                location.reload();
            });
            isLoading.value = false;
        });
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
