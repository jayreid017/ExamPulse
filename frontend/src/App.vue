<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import AppNotification from "./components/AppNotification.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col bg-jb-dirtywhite">
    <Navbar v-if="!$route.meta.hideNavbar" />

    <main class="grow flex flex-col">
      <router-view />
    </main>

    <AppNotification />
  </div>
</template>