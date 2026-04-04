<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import api from '../../api';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);

const handleRegister = async () => {
  // Simple validation
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }
  
  isLoading.value = true;
  
  try { 
    // This hits the /api/auth/register endpoint in your backend index.ts,
    // which in turn uses the registerUser function from users.ts!
    await api.post('/auth/register', {
      email: email.value,
      password: password.value,
      name: name.value,
    });

    router.push("/teacher/dashboard");
  } catch (error: any) {
    console.error("Error registering user:", error);
    if (error.response && error.response.data && error.response.data.error) {
      alert("Error: " + error.response.data.error);
    } else {
      alert("An unexpected error occurred during registration.");
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Left: Decorative Side -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-olive-900 overflow-hidden items-center justify-center">
      <!-- Decorative Shapes -->
      <div class="absolute top-10 left-10 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute top-0 right-10 w-72 h-72 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div class="relative z-10 flex flex-col items-center text-center px-12">
        <div class="mb-8 w-24 h-24 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl">
            <Icon icon="lucide:graduation-cap" class="w-12 h-12 text-red-400" />
        </div>
        <h1 class="text-4xl font-bold text-white font-merriweather mb-4">Join ExamPulse Today</h1>
        <p class="text-lg text-gray-300 max-w-md">Create an account to streamline your teaching workflow and enhance student engagement.</p>
      </div>
    </div>

    <!-- Right: Form Side -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <RouterLink to="/" class="absolute top-8 left-8 sm:left-12 flex items-center text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
            <Icon icon="lucide:arrow-left" class="w-4 h-4 mr-2" />
            Back to Home
        </RouterLink>

      <div class="w-full max-w-md mt-6">
        <div class="mb-8 text-center lg:text-left">
          <h2 class="text-3xl font-bold text-gray-900 font-merriweather mb-2">Create Account</h2>
          <p class="text-gray-500">Sign up to get started as an educator.</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <div class="mt-2 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="lucide:user" class="h-5 w-5 text-gray-400" />
                </div>
              <input 
                id="name" 
                v-model="name" 
                type="text" 
                required 
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 sm:text-sm transition-all duration-200 outline-none bg-gray-50 focus:bg-white" 
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <div class="mt-2 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="lucide:mail" class="h-5 w-5 text-gray-400" />
                </div>
              <input 
                id="email" 
                v-model="email" 
                type="email" 
                required 
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 sm:text-sm transition-all duration-200 outline-none bg-gray-50 focus:bg-white" 
                placeholder="teacher@exampulse.com"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-2 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="lucide:lock" class="h-5 w-5 text-gray-400" />
                </div>
              <input 
                id="password" 
                v-model="password" 
                type="password" 
                required 
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 sm:text-sm transition-all duration-200 outline-none bg-gray-50 focus:bg-white" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div class="mt-2 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="lucide:shield-check" class="h-5 w-5 text-gray-400" />
                </div>
              <input 
                id="confirm-password" 
                v-model="confirmPassword" 
                type="password" 
                required 
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 sm:text-sm transition-all duration-200 outline-none bg-gray-50 focus:bg-white" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="pt-2">
            <button 
              type="submit" 
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent cursor-pointer rounded-xl shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              <span v-if="isLoading">Creating account...</span>
              <span v-else>Register</span>
            </button>
          </div>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600 cursor-pointer">
            Already have an account?
            <RouterLink to="/login" class="font-medium text-red-400 hover:text-red-500 transition-colors cursor-pointer">
              Sign in instead
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
</style>
