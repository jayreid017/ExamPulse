<script setup lang="ts">
import { ref } from 'vue';
import Navbar from "./components/Navbar.vue";
import AppNotification from "./components/AppNotification.vue";
import PreLoader from "./components/PreLoader.vue";

const isAppReady = ref(false);

const handlePreloaderComplete = () => {
  isAppReady.value = true;
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-jb-dirtywhite">
    <PreLoader @complete="handlePreloaderComplete" />

    <!-- <Navbar v-if="!$route.meta.hideNavbar" /> -->

    <main class="grow flex flex-col">
      <router-view />
    </main>

    <AppNotification />
  </div>
</template>