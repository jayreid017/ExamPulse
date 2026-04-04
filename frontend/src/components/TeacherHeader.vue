<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const route = useRoute();
const pageTitle = computed(() => {
    const name = route.name as string;
    if (!name) return 'Dashboard';
    // convert teacher-dashboard to Dashboard, teacher-classes to Classes
    const suffix = name.split('-').pop() || 'Dashboard';
    return suffix.charAt(0).toUpperCase() + suffix.slice(1);
});

const searchOpen = ref(false);
const vFocus = {
  mounted: (el: HTMLInputElement) => el.focus()
};
</script>

<template>
    <header class="h-20 bg-olive-100/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40  shrink-0">
        <!-- Left: Page Title / Breadcrumbs -->
        <div class="px-6 py-4 bg-red-300  border border-red-500/30 rounded-full shadow-sm">
            <h2 class="text-sm font-light text-white font-merriweather">{{ pageTitle }}</h2>
          <!--  <p class="text-sm text-gray-500 hidden sm:block">Manage your {{ pageTitle.toLowerCase() }} and settings.</p> -->
        </div>

        <!-- Right: Actions & Profile -->
       <div class="flex items-center gap-2">
  <div class="relative hidden md:flex items-center justify-end">
    <input
      v-if="searchOpen"
      v-focus
      type="text"
      placeholder=""
      class="w-48 pl-4 pr-10 py-4 bg-white border border-gray-200 rounded-full text-md focus:outline-none 
      focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all text-gray-700"
      @blur="searchOpen = false"
    />
    <button
      class="p-4 text-gray-900 hover:text-gray-600 transition-colors border border-gray-200 rounded-full bg-white hover:bg-gray-50 "
      :class="searchOpen ? 'absolute right-0' : ''"
      @click="searchOpen = true"
    >
      <Icon icon="lucide:search" class="text-lg block" />
    </button>
  </div>

          <button class="relative p-4 text-gray-900 border border-gray-200 cursor-pointer transition-colors rounded-full bg-white hover:bg-gray-50">
  <Icon icon="lucide:bell" class="text-md block" />

</button>

            <div class="flex items-center gap-3 border-l border-gray-100 pl-6">
                <div class="text-right hidden sm:block">
                    <p class="text-sm font-bold text-gray-800">Mr. Anderson</p>
                    <p class="text-xs text-gray-500">Physics Teacher</p>
                </div>
                <button class="w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-tr from-gray-800 to-gray-600 text-white font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                    A
                </button>
            </div>
        </div>
    </header>
</template>

<style scoped>
</style>
