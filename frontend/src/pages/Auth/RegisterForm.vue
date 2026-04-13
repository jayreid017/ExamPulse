<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import BgAuth from "../../assets/img/bg-auth.png";
import CardBg from "../../assets/img/iccardbg.jpg";
import api from "../../api";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { useToast } from "../../composables/useToast";
import GlowIcon from "../../components/glowingIcon/glowingIcon.vue";


// ── Router ───────────────────────────────────────────────────
const router = useRouter();

// ── State ────────────────────────────────────────────────────
const loading = ref(false);
const success  = ref(false);
const error    = ref('');

const letterGrid = ["EXAM", "PULSE", "ORG."];


// ── Form ─────────────────────────────────────────────────────
interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const form = reactive<RegisterForm>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const formErrors = reactive<Record<keyof RegisterForm, boolean>>({
  name: false,
  email: false,
  password: false,
  confirmPassword: false,
});

// ── Submit ───────────────────────────────────────────────────
async function handleRegister(): Promise<void> {
  formErrors.name = !form.name;
  formErrors.email = !form.email;
  formErrors.password = !form.password;
  formErrors.confirmPassword = !form.confirmPassword;

  if (formErrors.name || formErrors.email || formErrors.password || formErrors.confirmPassword) {
    error.value = "Please fill in all fields.";
    useToast().info("Please fill in all fields.");
    return;
  }
  if (form.password !== form.confirmPassword) {
    formErrors.password = true;
    formErrors.confirmPassword = true;
    error.value = "Passwords do not match.";
    useToast().error("Passwords do not match.");
    return;
  }

  try {
    loading.value = true;
    error.value   = '';

    await api.post('/auth/register', {
      name:     form.name,
      email:    form.email,
      password: form.password,
    });

    success.value = true;
    // After brief success state, redirect to login
    setTimeout(() => router.push('/login'), 1200);
    useToast().success("Registration successful!");

  } catch (err: any) {
    error.value = err?.response?.data?.error ?? 'Registration failed. Please try again.';
    useToast().error(error.value);
  } finally {
    loading.value = false;
  }
}

// ── Computed ─────────────────────────────────────────────────
const btnLabel = computed(() => {
  if (success.value)  return "Registered! ✓";
  if (loading.value)  return "Creating account...";
  return "Sign Up";
});

function clearError(field?: keyof RegisterForm) { 
  error.value = ''; 
  if (field) formErrors[field] = false;
  
}
</script>

<template>
  <div class="h-screen flex overflow-hidden">

    <!-- Left: Decorative Side -->
    <div
      class="hidden lg:flex lg:w-1/3 xl:w-2/5 relative overflow-hidden items-center justify-center bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${BgAuth})` }"
    >
      <!-- Decorative blobs -->
      <div class="absolute top-10 left-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute top-0 right-10 w-72 h-72 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div class="relative z-10 flex flex-col items-center text-center px-12">
        <div class="mb-8 w-24 h-24 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl">
          <GlowIcon variant="rose" size="lg" viewBox="0 0 16 16">
          <path 
            d="M9.368 2.447a2.5 2.5 0 0 0-2.736 0L1.226 5.98a.5.5 0 0 0-.224.47L1 6.5v4a.5.5 0 0 0 1 0V7.342l1 
            .677v3.68a.5.5 0 0 0 .12.325l.002.003l.006.007l.02.022l.068.074c.059.062.144.148.254.25c.22.203.543
            .471.959.74c.83.536 2.049 1.08 3.571 1.08s2.74-.544 3.571-1.08c.416-.269.739-.537.959-.74a6 6 0 0 0 
            .322-.324l.02-.022l.006-.007l.002-.002l.001-.002A.5.5 0 0 0 13 11.7V8.018l1.78-1.205a.45.45 0 0 0 
            .22-.418a.5.5 0 0 0-.227-.415zM12 8.696v2.806q-.06.06-.149.143a6 6 0 0 1-.822.634c-.72.464-1.751.92-3.029.92s-2.31-.456-3.029-.92A6 
             0 0 1 4 11.502V8.696l2.599 1.759a2.5 2.5 0 0 0 2.802 0zM3.5 11.7l-.38.324zm3.679-8.416a1.5 1.5 0 0 1 1.642 0L13.597 6.4L8.841 9.627a1.5 1.5
              0 0 1-1.682 0l-4.757-3.22z"/>
          </GlowIcon>

        </div>
        <h1 class="text-4xl font-bold text-white font-merriweather mb-4">Join ExamPulse Today</h1>
        <p class="text-lg text-gray-300 max-w-md">Create an account to streamline your teaching workflow and enhance student engagement.</p>
      </div>
    </div>

    <!-- Right: Badge + Form -->
    <div
      class="flex flex-col items-center justify-start w-full lg:w-2/3 xl:w-3/5 min-h-screen px-4 bg-white"
      style="animation: swingIn 0.7s cubic-bezier(.34,1.56,.64,1) both"
    >

      <!-- Lanyard Strap -->
      <div
        class="w-20 h-26 rounded-t flex items-start justify-center pt-1.5 overflow-hidden"
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
      <div class="w-0.5 h-2 bg-[#bbb]" />

      <!-- ID Badge Card -->
      <form
        class="w-full max-w-[350px] rounded-2xl overflow-hidden shadow-xl bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url(${CardBg})` }"
        novalidate
        @submit.prevent="handleRegister"
      >
        <!-- Card Header -->
        <div class="relative flex items-center px-[18px] py-4 border-b border-gray-100 min-h-[82px] overflow-hidden">
          <div
            class="z-10 leading-tight font-black text-lg text-white tracking-wider"
            style="font-family: 'Nunito', sans-serif"
          >
            SIGN<br />UP<br />HERE
            <span class="text-white text-[10px]">♥</span>
          </div>

          <!-- Letter background pattern -->
          <div
            class="absolute right-0 top-0 bottom-0 w-24 overflow-hidden opacity-[0.8] flex flex-col justify-center"
            aria-hidden="true"
          >
            <div
              v-for="(row, i) in letterGrid"
              :key="i"
              class="text-[#ffffff] text-[18px] font-black leading-[1.3] tracking-[4px]"
              style="font-family: 'Nunito', sans-serif"
            >
              {{ row }}
            </div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="flex flex-col px-[18px] py-5">

          <!-- Full Name -->
          <label class="text-[11px] font-medium text-white uppercase tracking-[0.8px] mb-1.5" for="name-input">
            Full Name
          </label>
          <div class="relative mb-3.5">
            <Icon icon="lucide:user" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              id="name-input"
              v-model="form.name"
              type="text"
              placeholder="Juan dela Cruz"
              autocomplete="name"
              class="w-full border rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#1a1857] bg-gray-50 outline-none transition-colors focus:bg-white placeholder:text-gray-300"
              :class="formErrors.name ? 'border-yellow-400 focus:border-yellow-400 ring-1 ring-yellow-400' : 'border-gray-200 focus:border-[#e91e8c]'"
              @input="clearError('name')"
            />
          </div>

          <!-- Email -->
          <label class="text-[11px] font-medium text-white uppercase tracking-[0.8px] mb-1.5" for="email-input">
            Email
          </label>
          <div class="relative mb-3.5">
            <Icon icon="lucide:mail" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              id="email-input"
              v-model="form.email"
              type="email"
              placeholder="your@exampulse.com"
              autocomplete="email"
              class="w-full border rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#1a1857] bg-gray-50 outline-none transition-colors focus:bg-white placeholder:text-gray-300"
              :class="formErrors.email ? 'border-yellow-400 focus:border-yellow-400 ring-1 ring-yellow-400' : 'border-gray-200 focus:border-[#e91e8c]'"
              @input="clearError('email')"
            />
          </div>

          <!-- Password -->
          <label class="text-[11px] font-medium text-white uppercase tracking-[0.8px] mb-1.5" for="password-input">
            Password
          </label>
          <div class="relative mb-3.5">
            <Icon icon="lucide:lock-keyhole" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              id="password-input"
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              autocomplete="new-password"
              class="w-full border rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#1a1857] bg-gray-50 outline-none transition-colors focus:bg-white placeholder:text-gray-300"
              :class="formErrors.password ? 'border-yellow-400 focus:border-yellow-400 ring-1 ring-yellow-400' : 'border-gray-200 focus:border-[#e91e8c]'"
              @input="clearError('password')"
            />
          </div>

          <!-- Confirm Password -->
          <label class="text-[11px] font-medium text-white uppercase tracking-[0.8px] mb-1.5" for="confirm-password-input">
            Confirm Password
          </label>
          <div class="relative mb-3.5">
            <Icon icon="lucide:shield-check" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              id="confirm-password-input"
              v-model="form.confirmPassword"
              type="password"
              placeholder="••••••••"
              autocomplete="new-password"
              class="w-full border rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#1a1857] bg-gray-50 outline-none transition-colors focus:bg-white placeholder:text-gray-300"
              :class="formErrors.confirmPassword ? 'border-yellow-400 focus:border-yellow-400 ring-1 ring-yellow-400' : 'border-gray-200 focus:border-[#e91e8c]'"
              @input="clearError('confirmPassword')"
            />
          </div>

          <!-- Error message -->
          <p v-if="error" class="text-[#ffffff] text-xs mb-2 -mt-2">{{ error }}</p>

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

          <!-- Back to login -->
          <p class="text-center mt-3 text-xs text-white/70">
            Already have an account?
            <RouterLink to="/login" class="text-white font-bold hover:underline">
              Log in
            </RouterLink>
          </p>
        </div>

        <!-- Card Footer -->
        <div class="bg-olive-900 border-t border-pink-100 py-2.5 text-center">
          <span
            class="text-[10px] font-bold tracking-[2px] text-[#776a85]"
            style="font-family: 'Nunito', sans-serif"
          >
            ID #2026 · EXAMPULSE
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

.animate-blob { animation: blob 7s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

@keyframes blob {
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(30px, -50px) scale(1.1); }
  66%  { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}
</style>
