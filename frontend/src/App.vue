<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="min-h-screen w-full flex flex-col bg-jb-dirtywhite">
    <Navbar />
    <!-- Router View now spans full width. Individual pages can use class="page-container" to constrain width -->
    <main class="grow w-full flex flex-col">
      <router-view />
    </main>
  </div>
</template>
