<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

import api from '../../api';




const router = useRouter();
const email = ref('');
const password = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  try {
    isLoading.value = true;
    const {data} = await api.post('/auth/login', {
      email: email.value,
      password: password.value,
    });

    const session = data.session;
    const token = session?.access_token;
    
    if (token) {
      localStorage.setItem('token', token);
    }

    const res =await  api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    if (user.role === 'teacher') {
      router.push('/teacher/dashboard');
    } else if (user.role === 'student') {
      router.push('/student/dashboard');
    } else if (user.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/');
    }
 
  } catch (error: any) {
    console.error("Error logging in:", error);
    if (error.response && error.response.data && error.response.data.error) {
      alert("Error: " + error.response.data.error);
    } else {
      alert("An unexpected error occurred during login.");
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
      <div class="absolute top-10 left-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute top-0 right-10 w-72 h-72 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div class="relative z-10 flex flex-col items-center text-center px-12">
        <div class="mb-8 w-24 h-24 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl">
            <Icon icon="lucide:activity" class="w-12 h-12 text-red-400" />
        </div>
        <h1 class="text-4xl font-bold text-white font-merriweather mb-4">Welcome back to ExamPulse</h1>
        <p class="text-lg text-gray-300 max-w-md">Seamlessly manage your classes, schedules, and students with our intelligent dashboard.</p>
      </div>
    </div>

    <!-- Right: Form Side -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <RouterLink to="/" class="absolute top-8 left-8 sm:left-12 flex items-center text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
            <Icon icon="lucide:arrow-left" class="w-4 h-4 mr-2" />
            Back to Home
        </RouterLink>

      <div class="w-full max-w-md">
        <div class="mb-10 text-center lg:text-left">
          <h2 class="text-3xl font-bold text-gray-900 font-merriweather mb-2">Sign In</h2>
          <p class="text-gray-500">Enter your credentials to access your account.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
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
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-all duration-200 outline-none bg-gray-50 focus:bg-white" 
                placeholder="teacher@exampulse.com"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <a href="#" class="text-sm font-medium text-red-400 hover:text-red-500">Forgot password?</a>
            </div>
            <div class="mt-2 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="lucide:lock" class="h-5 w-5 text-gray-400" />
                </div>
              <input 
                id="password" 
                v-model="password" 
                type="password" 
                required 
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-all duration-200 outline-none bg-gray-50 focus:bg-white" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-red-400 cursor-pointer focus:ring-red-500 border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900 cursor-pointer">
              Remember me
            </label>
          </div>

          <div>
            <button 
              type="submit" 
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border cursor-pointer border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              <span v-if="isLoading">Signing in...</span>
              <span v-else>Sign in</span>
            </button>
          </div>
        </form>

        <div class="mt-8 text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <RouterLink to="/register" class="font-medium text-red-400 hover:text-red-500 transition-colors">
              Sign up now
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
