<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { Icon } from '@iconify/vue';
import gsap from 'gsap';
import ExamPulse from "../assets/ExamPulse_Logo.png";

const isMenuOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);
const menuLinks = ref<HTMLElement[]>([]);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};

watch(isMenuOpen, (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : '';
    newVal ? animateMenuIn() : animateMenuOut();
});

const animateMenuIn = async () => {
    menuLinks.value = [];
    await nextTick();

    if (menuRef.value) {
        const tl = gsap.timeline();

        tl.fromTo(menuRef.value,
            { autoAlpha: 0, clipPath: 'circle(0% at 95% 5%)' },
            { autoAlpha: 1, clipPath: 'circle(150% at 95% 5%)', duration: 0.7, ease: 'power3.inOut' }
        );

        if (menuLinks.value.length > 0) {
            tl.fromTo(menuLinks.value,
                { y: 40, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.08, ease: 'back.out(1.5)' },
                '-=0.35'
            );
        }
    }
};

const animateMenuOut = () => {
    if (menuRef.value) {
        gsap.to(menuRef.value, {
            autoAlpha: 0,
            clipPath: 'circle(0% at 95% 5%)',
            duration: 0.5,
            ease: 'power3.inOut',
        });
    }
};
</script>

<template>
    <nav class="w-full h-20 bg-jb-dirtywhite/80 backdrop-blur-md sticky top-0 z-50 border-b border-black/5">
        <div class="w-full h-full flex items-center justify-between px-6 lg:px-8">
            <!-- Logo Section -->
            <div class="flex items-center">
                <router-link to="/#home" @click="closeMenu" class="flex items-center">
                    <img :src="ExamPulse" alt="Logo" class="w-12 h-12">
                </router-link>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex flex-1 items-center justify-center">
                <ul class="flex items-center gap-8 font-merriweather text-sm">
                    <li class="text-gray-600 hover:text-red-400 transition-colors">
                        <router-link to="/#home">Home</router-link>
                    </li>
                    <li class="text-gray-600 hover:text-red-400 transition-colors">
                        <router-link to="/#features">Features</router-link>
                    </li>
                    <li class="text-gray-600 hover:text-red-400 transition-colors">
                        <router-link to="/#about">About Us</router-link>
                    </li>
                    <li class="text-gray-600 hover:text-red-400 transition-colors">
                        <router-link to="/#contact">Contact</router-link>
                    </li>
                </ul>
            </div>

            <!-- Desktop Sign In -->
            <div class="hidden md:flex items-center justify-end">
                <router-link to="/login">
                    <button class="text-white bg-red-400 px-6 py-2 rounded-lg font-merriweather text-sm hover:bg-red-500 transition-colors shadow-md shadow-red-500/20">
                        Sign in
                    </button>
                </router-link>
            </div>

            <!-- Mobile Menu Toggle Button -->
            <div class="md:hidden flex items-center z-50">
                <button
                    @click="toggleMenu"
                    class="p-2 focus:outline-none transition-colors duration-300"
                    :class="isMenuOpen ? 'text-white' : 'text-gray-600'"
                >
                    <Icon :icon="isMenuOpen ? 'lucide:x' : 'lucide:menu'" class="text-3xl" />
                </button>
            </div>
        </div>

        <!-- Full-screen Mobile Menu -->
        <Teleport to="body">
            <div
                ref="menuRef"
                class="fixed inset-0 bg-olive-800 z-100 md:hidden flex items-center justify-center overflow-hidden w-screen h-screen"
                style="visibility: hidden;"
            >
                <!-- Overlay Header -->
                <div class="absolute top-0 left-0 w-full h-20 flex items-center justify-between px-6 lg:px-8">
                    <router-link to="/#home" @click="closeMenu" class="flex items-center">
                        <img :src="ExamPulse" alt="Logo" class="w-12 h-12">
                    </router-link>
                    <button
                        @click="closeMenu"
                        class="p-2 focus:outline-none text-white hover:text-red-400 transition-colors"
                    >
                        <Icon icon="lucide:x" class="text-3xl" />
                    </button>
                </div>

                <!-- Watermark -->
                <div class="absolute -bottom-10 left-0 right-0 pointer-events-none select-none overflow-hidden flex justify-center opacity-10">
                    <h2 class="text-8xl font-magilio font-bold text-white tracking-widest uppercase leading-none whitespace-nowrap">
                        ExamPulse
                    </h2>
                </div>

                <!-- Menu Links -->
                <div class="flex flex-col items-center justify-center space-y-10 w-full px-10">
                    <ul class="flex flex-col items-center space-y-6 font-magilio">
                        <li
                            :ref="(el) => el && menuLinks.push(el as HTMLElement)"
                            class="text-white text-4xl font-bold tracking-widest hover:text-red-400 transition-colors"
                        >
                            <router-link to="/#home" @click="closeMenu">HOME</router-link>
                        </li>
                        <li
                            :ref="(el) => el && menuLinks.push(el as HTMLElement)"
                            class="text-white text-4xl font-bold tracking-widest hover:text-red-400 transition-colors"
                        >
                            <router-link to="/#features" @click="closeMenu">FEATURES</router-link>
                        </li>
                        <li
                            :ref="(el) => el && menuLinks.push(el as HTMLElement)"
                            class="text-white text-4xl font-bold tracking-widest hover:text-red-400 transition-colors"
                        >
                            <router-link to="/#about" @click="closeMenu">ABOUT US</router-link>
                        </li>
                        <li
                            :ref="(el) => el && menuLinks.push(el as HTMLElement)"
                            class="text-white text-4xl font-bold tracking-widest hover:text-red-400 transition-colors"
                        >
                            <router-link to="/#contact" @click="closeMenu">CONTACT</router-link>
                        </li>
                    </ul>

                    <div
                        :ref="(el) => el && menuLinks.push(el as HTMLElement)"
                        class="w-full max-w-xs pt-8"
                    >
                        <button class="w-full text-white bg-red-500 px-8 py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-black/20 active:scale-[0.98] transition-transform font-merriweather uppercase tracking-widest">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
    </nav>
</template>

<style scoped>
button {
    -webkit-tap-highlight-color: transparent;
}
</style>