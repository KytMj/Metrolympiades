<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

function logout() {
  localStorage.removeItem("user");
  router.push("/register");
}

const showNavbar = computed(() => ["login", "register"].includes(route.path));
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>