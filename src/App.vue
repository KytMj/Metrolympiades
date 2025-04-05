<script setup>
import SideNavbar from "./components/SideNavbar.vue";
import { computed } from "vue";
import { RouterView, useRouter } from "vue-router";

const router = useRouter();

const showNavbar = computed(() => {
  const routeName = router.currentRoute.value.name;
  return !["LoginPage", "RegisterPage"].includes(routeName);
});

const user = JSON.parse(localStorage.getItem("user"));
if (user === null) {
  router.push("/login");
}


</script>

<template>
  <main>
    <SideNavbar v-if="showNavbar"/>
    <RouterView />
  </main>
</template>
