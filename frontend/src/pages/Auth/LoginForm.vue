<script setup lang="ts">
import { reactive, ref, computed } from "vue";

import api from "../../api";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { useToast } from "../../composables/useToast";
import glowingIcon from "@/components/glowingIcon/glowingIcon.vue";

// ── Types ────────────────────────────────────────────────────
interface LoginForm  { email: string; password: string; }

// ── Router ───────────────────────────────────────────────────
const router = useRouter();
const toast = useToast();
// ── Shared state ─────────────────────────────────────────────
const loading   = ref(false);
const success   = ref(false);
const error     = ref('');

const letterGrid = ["EXAM", "PULSE", "ORG."];

// ── Login form ───────────────────────────────────────────────
const loginForm = reactive<LoginForm>({ email: '', password: '' });

async function handleLogin(): Promise<void> {
  if (!loginForm.email || !loginForm.password) {
    toast.error("Please fill in all fields.");
    return;
  }
  try {
    loading.value = true;
    error.value   = '';
    toast.info("Please wait...");
    const { data } = await api.post('/auth/login', {
      email:    loginForm.email,
      password: loginForm.password,
    });

    const token = data.session?.access_token;
    if (token) localStorage.setItem('token', token);

    const { data: user } = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    success.value = true;
    toast.success("Login successful!");

    const routes: Record<string, string> = {
      teacher: '/teacher/dashboard',
      student: '/student/dashboard',
      admin:   '/admin/dashboard',
    };

    setTimeout(() => router.push(routes[user.role] ?? '/'), 800);

  } catch (err: any) {
    toast.error(err?.response?.data?.error ?? 'An unexpected error occurred. Please try again.');
  } finally {
    loading.value = false;
  }
}

// ── Computed helpers ─────────────────────────────────────────
const btnLabel = computed(() => {
  
  if (success.value) return "Welcome! ✓";
  if (loading.value) return "Signing in...";
  return "Login";
});

function clearError() { error.value = ''; }

function handleSubmit() {
  handleLogin();
}
</script>
<template>
 <div 
  class="h-screen flex overflow-hidden"
>
 <!-- Left: Decorative Side -->
    <div
      class="hidden lg:flex lg:w-1/3 xl:w-2/5 relative overflow-hidden items-center justify-center bg-cover bg-center bg-no-repeat"
    >
      <!-- Decorative Shapes -->
      <div class="absolute top-10 left-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute top-0 right-10 w-72 h-72 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div class="relative z-10 flex flex-col items-center text-center px-12">
        <div class="mb-8 w-24 h-24 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl">
          <glowingIcon variant="rose" size="lg" viewBox="0 0 24 24">  
            <path d="M12 21V7m4 5l2 2l4-4"/>
            <path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4a4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3a3 3 0 0 1 3-3h6a1 1 
            0 0 0 1-1v-1.3"/>
          </glowingIcon>
        </div>
        <h1 class="text-4xl font-bold text-white font-merriweather mb-4">Welcome back to ExamPulse</h1>
        <p class="text-lg text-gray-300 max-w-md">Seamlessly manage your classes, schedules, and students with our intelligent dashboard.</p>
      </div>

      
    </div>
    <div class="flex flex-col items-center  justify-start w-full lg:w-2/3 xl:w-3/5 min-h-screen px-4 bg-white" 
    style="animation: swingIn 0.7s cubic-bezier(.34,1.56,.64,1) both">

      <!-- Lanyard Strap -->
      <div
        class="w-20 h-40 rounded-t flex items-start justify-center pt-1.5 overflow-hidden"
        style="background: linear-gradient(135deg, #1D1A14 0%, #4f4b4b 50%, #1D1A14 100%)"
      >
        <span
          class="text-white font-black tracking-wider"
          style="font-family: 'Nunito', sans-serif; font-size: 6px; writing-mode: vertical-rl; transform: rotate(180deg)"
        >
          EXAMPULSE · EXAMPULSE ·
        </span>
      </div>

      <!-- Clip -->
      <div class="w-5 h-6 bg-[#c0c0c0] border-2 border-[#353535] rounded-b-full" />

      <!-- Connector -->
      <div class="w-0.5 h-3.5 bg-[#bbb]" />

      <!-- ID Badge Card -->
      <form
        class="w-full max-w-[320px] rounded-2xl overflow-hidden shadow-2xl  bg-cover bg-center bg-no-repeat"
       
        novalidate
        @submit.prevent="handleSubmit"
      >
        <!-- Card Header -->
        <div class="relative flex items-center px-[18px] py-4 border-b border-gray-100 min-h-[82px] overflow-hidden">
          <div
            class="z-10 leading-tight font-black text-lg text-white font-merriweather tracking-wider"
            style="font-family: 'Nunito', sans-serif"
          >
            LOG<br />IN<br />HERE
            <span class="text-[#ffffff] text-[10px]">♥</span>
          </div>

          <!-- Letter background pattern -->
          <div
            class="absolute right-0 top-0 bottom-0 w-24 overflow-hidden opacity-[0.8] flex flex-col justify-center"
            aria-hidden="true"
          >
            <div
              v-for="(row, i) in letterGrid"
              :key="i"
              class="text-[#ffffff] font-magilio text-[18px] font-black leading-[1.3] tracking-[4px]"
              style="font-family: 'Nunito', sans-serif"
            >
              {{ row }}
            </div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="flex flex-col px-[18px] py-5 ">

          <!-- LOGIN FIELDS -->
          <label class="text-[11px] font-medium text-white uppercase tracking-[0.8px] mb-1.5" for="id-input">Email</label>
          <div class="relative mb-3.5">
            <Icon icon="lucide:mail" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              id="id-input"
              v-model="loginForm.email"
              type="email"
              placeholder="your@exampulse.com"
              autocomplete="email"
              class="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#1a1857] bg-gray-50 outline-none transition-colors focus:border-[#e91e8c] focus:bg-white placeholder:text-gray-300"
              @input="clearError"
            />
          </div>

          <label class="text-[11px] font-medium text-white uppercase tracking-[0.8px] mb-1.5" for="password-input">Password</label>
          <div class="relative mb-3.5">
            <Icon icon="lucide:lock-keyhole" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              id="password-input"
              v-model="loginForm.password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              class="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#1a1857] bg-gray-50 outline-none transition-colors focus:border-[#e91e8c] focus:bg-white placeholder:text-gray-300"
              @input="clearError"
            />
          </div>


          <!-- Error message -->
          <p v-if="error" class="text-[#ffffff] text-xs mb-2 -mt-2">{{ error }}</p>

          <!-- Submit Button -->
       <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || success"
            class="w-full text-white rounded-xl py-3 uppercase cursor-pointer text-sm font-bold border border-[#b82450] tracking-wide transition-all 
            duration-200 mt-0.5 disabled:cursor-not-allowed active:scale-[0.98] hover:scale-[1.02] hover:border hover:border-white"
            :class="{
              'bg-purple-600':               success,
              'bg-[#b82450]':                loading && !success,
              'bg-[#1D1A14] hover:bg-[#f23863]': !loading && !success,
            }"
            style="font-family: 'Nunito', sans-serif"
          >
            {{ btnLabel }}
          </button>

          <!-- Forgot password -->
          <p class="text-center mt-2 text-xs text-gray-100">
            <a href="#" class="text-white font-medium hover:underline">
              Forgot credentials?
            </a>
          </p>

          <!-- Toggle sign-up / sign-in -->
          <p class="text-center mt-3 text-xs text-white/70">
            Don't have an account?
            <button type="button" class="text-white font-bold hover:underline cursor-pointer" @click="router.push('/register')">
              Sign up
            </button>
          </p>
        </div>

        <!-- Card Footer -->
        <div class="bg-olive-900 border-t border-pink-100 py-2.5 text-center">
          <span
            class="text-[10px] font-bold tracking-[2px] text-[#776a85]"
            style="font-family: 'Nunito', sans-serif"
          >
            ID #2026 · PALAVREADO EVENT
          </span>
        </div>
      </form>

    </div>
  </div>
</template>



<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&family=Space+Grotesk:wght@400;500;600&display=swap");

@keyframes swingIn {
  0%   { transform: translateY(-60px) rotate(-8deg); opacity: 0; }
  100% { transform: translateY(0)     rotate(0deg);  opacity: 1; }
}
</style>