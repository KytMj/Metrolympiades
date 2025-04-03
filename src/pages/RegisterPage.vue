<script setup>
    import { computed, ref } from "vue";
    import { useRouter } from "vue-router";

    const router = useRouter();

    const email = ref("");

    const password = ref("");

    const username = ref("");

    const teamName = ref("");

    const boolean = computed(() => {
    return !!email.value.trim() && !!password.value.trim() && !!username.value.trim() && !!teamName.value.trim();
    });

    const isLoading = ref(false);

    function createAccount() {
        isLoading.value = true;
        fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization":  "Bearer jwt_token",
            },
            body: JSON.stringify({
                email: email.value,
                username: username.value,
                password: password.value,
                teamName: teamName.value,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data));
            router.push("leaderboard");
        });
    }
</script>

<template>
    <main>
        <div class="container">
            <form class="card" @submit.prevent="createAccount()">
                <h1 style="margin-bottom: 1rem">Inscription</h1>
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
                type="text"
                id="username"
                name="username"
                autocomplete="username"
                placeholder="Nom d'utilisateur"
                required
                v-model="username"
                />
                <input
                type="text"
                id="teamName"
                name="teamName"
                autocomplete="teamName"
                placeholder="Nom d'équipe"
                required
                v-model="teamName"
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
                <button type="submit" :disabled="!boolean || isLoading">J'inscris mon équipe</button>
            </form>
            <p>Déjà inscrit ? <a href="#">Me connecter</a></p>
        </div>
    </main>
</template>

<style scoped>
    input {
        background: var(--color-bg-tertiary);
        border: solid gray;
        border-radius: 10px;
        color: var(--color-text-primary);
        outline: none;
        padding: 1rem;
        margin-bottom: 1rem;
    }
    button {
        width: 100%;
    }
</style>
  