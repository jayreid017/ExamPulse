<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../../api';

const users = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
    try {
        // Fetch from the backend using the reusable api instance
        const response = await api.get('/users');
        users.value = response.data;
    } catch (err: any) {
        error.value = err.message || 'Failed to fetch users';
        console.error("Error fetching users:", err);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="dashboard-container h-full flex flex-col p-8">
        <div class="mb-6">
            <h1 class="text-3xl font-bold text-gray-800 font-merriweather">Students</h1>
            <p class="text-gray-500 mt-2">Manage your students here.</p>
        </div>
        
        <div v-if="loading" class="flex-1 flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
        
        <div v-else-if="error" class="bg-red-50 text-red-500 p-4 rounded-lg border border-red-200">
            {{ error }}
        </div>

        <div v-else class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex-1 flex flex-col">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Details</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(user, index) in users" :key="user.id || index" class="hover:bg-gray-50 transition-colors">
                            <td class="px-6 py-4 text-sm text-gray-900">
                                <pre class="text-xs bg-gray-50 p-3 rounded border border-gray-100 max-w-full overflow-x-auto">{{ JSON.stringify(user, null, 2) }}</pre>
                            </td>
                        </tr>
                        <tr v-if="users.length === 0">
                            <td class="px-6 py-8 text-center text-gray-500">No students found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
