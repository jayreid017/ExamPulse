<script setup lang="ts">
import TeacherNavbar from '../components/TeacherNavbar.vue';
import TeacherHeader from '../components/TeacherHeader.vue';
</script>

<template>
    <div class="h-screen w-full flex bg-olive-100/50 overflow-hidden  ">
        <div class="px-2 bg-olive-100/50">
            <!-- Sidebar Navigation -->
            <TeacherNavbar />
        </div>
        
        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col min-w-0 bg-olive-100/50 py-2">
            <!-- Top Navbar/Header -->
            <TeacherHeader />
            
            <!-- Dynamic Page Content -->
            <main class="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </main>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
