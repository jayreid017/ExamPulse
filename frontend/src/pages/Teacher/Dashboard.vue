<script setup lang="ts">
// Dashboard logic can go here
</script>

<template>
    <div class="dashboard-container">
        <header class="mb-8">
            <h1 class="text-3xl  text-gray-800 font-merriweather">Teacher Dashboard</h1>
            <p class="text-gray-500 mt-2">Welcome back! Here's what's happening today.</p>
        </header>

            <!-- Dashboard Content -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[160px] flex flex-col justify-center">
                    <h3 class="text-gray-500 text-sm font-medium mb-2">Total Students</h3>
                    <p class="text-4xl font-bold text-gray-800">124</p>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[160px] flex flex-col justify-center">
                    <h3 class="text-gray-500 text-sm font-medium mb-2">Upcoming Classes</h3>
                    <p class="text-4xl font-bold text-gray-800">4</p>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[160px] flex flex-col justify-center">
                    <h3 class="text-gray-500 text-sm font-medium mb-2">Unread Messages</h3>
                    <p class="text-4xl font-bold text-gray-800">12</p>
                </div>
            </div>
            
            <!-- Quick Actions or Activity Feed -->
            <div class="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 class="text-xl font-bold text-gray-800 mb-4 font-merriweather">Recent Activity</h3>
                <div class="space-y-4">
                    <div class="flex items-center gap-4 py-3 border-b border-gray-50">
                        <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center font-bold">
                            <!-- Icon could go here -->
                            P
                        </div>
                        <div>
                            <p class="text-gray-800 font-medium">Physics 101 - Assignment Submitted</p>
                            <p class="text-gray-500 text-sm">3 students submitted their homework.</p>
                        </div>
                        <span class="ml-auto text-xs text-gray-400">2h ago</span>
                    </div>
                </div>
            </div>
    </div>
</template>

<style scoped>
/* Add any dashboard specific styles here */
</style>
