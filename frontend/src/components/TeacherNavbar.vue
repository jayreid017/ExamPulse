<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';
import ExamPulse from "../assets/img/ExamPulse_Logo.png";

const route = useRoute();

const menuItems = [
    { name: 'Dashboard', icon: 'lucide:layout-dashboard', path: '/teacher/dashboard' },
    { name: 'Create', icon: 'lucide:file-plus', path: '/teacher/create' },
    { name: 'Classes', icon: 'lucide:book-open', path: '/teacher/classes' },
    { name: 'Students', icon: 'lucide:users', path: '/teacher/students' },
    { name: 'Schedule', icon: 'lucide:calendar', path: '/teacher/schedule' },
    { name: 'Messages', icon: 'lucide:message-square', path: '/teacher/messages' },
];

const bottomItems = [
    { name: 'Settings', icon: 'lucide:settings', path: '/teacher/settings' },
];

// Helper to determine active state safely
const isActive = (path: string) => {
    return route?.path === path;
};
</script>

<template>
    <aside class="h-screen w-20 flex flex-col items-center bg-olive-100/50 py-4   sticky top-0 left-0 z-50 shrink-0">
        <!-- Top: Logo -->
        <div class="mb-8">
            <router-link to="/teacher/dashboard" class="block p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <img :src="ExamPulse" alt="Logo" class="w-16 h-16 object-contain">
            </router-link>
        </div>

        <!-- Middle: Menus (Icons Only) -->
        <nav class="flex-1 w-full flex flex-col items-center justify-center gap-4">
            <template v-for="item in menuItems" :key="item.name">
                <router-link
                    :to="item.path"
                    class="group relative w-12 h-12 rounded-full border border-gray-200 transition-all duration-300 flex items-center justify-center"
                    :class="[
                        isActive(item.path)
                            ? 'bg-black text-white shadow-sm' 
                            : 'text-gray-900 hover:bg-gray-50 hover:text-gray-700 bg-white'
                    ]"
                    :title="item.name"
                >
                    <Icon :icon="item.icon" class="text-md transition-transform duration-300 group-hover:scale-110" />
                    
                    <!-- Tooltip -->
                    <div class="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl whitespace-nowrap z-50">
                        {{ item.name }}
                        <div class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
                    </div>
                </router-link>
            </template>
        </nav>

        <!-- Below: Settings Icon -->
        <div class="mt-auto w-full flex flex-col items-center gap-4 pt-4 border-t border-gray-200 mb-6">
            <template v-for="item in bottomItems" :key="item.name">
                <router-link
                    :to="item.path"
                    class="group relative w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center"
                    :class="[
                        isActive(item.path)
                                ? 'bg-black text-white shadow-sm' 
                            : 'text-gray-900 hover:bg-gray-50 hover:text-gray-700 bg-white'
                    ]"
                    :title="item.name"
                >
                    <Icon :icon="item.icon" class="text-md transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
                    
                    <!-- Tooltip -->
                    <div class="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl whitespace-nowrap z-50">
                        {{ item.name }}
                        <div class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
                    </div>
                </router-link>
            </template>
            
            
        </div>
    </aside>
</template>

<style scoped>
/* Optional: smooth scrolling or extra tweaks */
</style>
