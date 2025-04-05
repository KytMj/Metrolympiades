<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import SideNavbar from "./components/SideNavbar.vue";

const route = useRoute();



const showNavbar = computed(() => ["login", "register"].includes(route.path));
</script>

<template>
  <main>
    <SideNavbar /> <!-- Sould we do different navbars if the user is disconnected ? -->
    <RouterView />
  </main>
</template>
