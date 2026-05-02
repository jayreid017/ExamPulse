<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import gsap from 'gsap';
import ExamPulse from "../assets/img/puff.png";

const isMenuOpen = ref(false);
const isDarkTheme = ref(true); // Default to dark for Hero
const isScrolled = ref(false);
const menuRef = ref<HTMLElement | null>(null);
const menuLinks = ref<HTMLElement[]>([]);

let observer: IntersectionObserver | null = null;

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Intersection Observer to detect section themes
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const theme = entry.target.getAttribute('data-nav-theme');
                isDarkTheme.value = theme === 'dark';
            }
        });
    }, {
        threshold: 0,
        rootMargin: '-10% 0px -90% 0px' // Detect when section is at the top
    });

    // Observe all sections with data-nav-theme
    document.querySelectorAll('[data-nav-theme]').forEach((section) => {
        observer?.observe(section);
    });
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    observer?.disconnect();
});

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
    <nav 
        class="w-full h-20 fixed top-0 left-0 z-50 transition-all duration-500 ease-in-out"
        :class="[
            isScrolled 
                ? (isDarkTheme ? 'bg-primary/20 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm') 
                : 'bg-transparent'
        ]"
    >
        <div class="w-full h-full grid grid-cols-3 items-center px-6 lg:px-8">
            <!-- Left: Logo -->
            <div class="flex items-center">
                <router-link to="/#home" @click="closeMenu" class="flex items-center gap-2 group">
                    <img :src="ExamPulse" alt="ExamPulse Logo" class="w-9 h-9 transition-transform group-hover:scale-110">
                    <span 
                        class="text-xl font-text2 font-bold leading-tight transition-colors duration-500"
                        :class="isDarkTheme ? 'text-white' : 'text-primary'"
                    >
                        ExamPulse
                    </span>
                </router-link>
            </div>

            <!-- Center: Menu Links -->
            <div class="hidden md:flex items-center justify-center">
                <ul class="flex items-center gap-2 font-text1 text-[11px] uppercase tracking-[0.2em] font-bold">
                    <li 
                        v-for="item in ['Home', 'Features', 'About Us', 'Contact']" 
                        :key="item"
                    >
                        <router-link 
                            :to="'/#' + item.toLowerCase().replace(' ', '')"
                            class="px-5 py-2 rounded-full transition-all duration-300"
                            :class="[
                                isDarkTheme 
                                    ? 'text-white/60 hover:text-white hover:bg-white/10' 
                                    : 'text-gray-500 hover:text-primary hover:bg-primary/5'
                            ]"
                        >
                            {{ item }}
                        </router-link>
                    </li>
                </ul>
            </div>

            <!-- Right: Get Started + Mobile Toggle -->
            <div class="flex items-center justify-end gap-4">
                <router-link
                    to="/register"
                    class="hidden md:inline-flex px-6 py-2.5 text-xs font-text1 uppercase tracking-widest font-bold rounded-full transition-all duration-500 shadow-lg active:scale-95"
                    :class="[
                        isDarkTheme 
                            ? 'bg-secondary text-primary hover:bg-white hover:shadow-secondary/20' 
                            : 'bg-primary text-white hover:bg-primary/90 hover:shadow-primary/20'
                    ]"
                >
                    Get Started
                </router-link>

                <!-- Mobile Menu Toggle -->
                <button
                    @click="toggleMenu"
                    class="md:hidden p-2 focus:outline-none transition-colors duration-500 z-50"
                    :class="isMenuOpen ? 'text-white' : (isDarkTheme ? 'text-white' : 'text-primary')"
                >
                    <Icon :icon="isMenuOpen ? 'lucide:x' : 'lucide:menu'" class="text-2xl" />
                </button>
            </div>
        </div>

        <!-- Full-screen Mobile Menu -->
        <Teleport to="body">
            <div
                ref="menuRef"
                class="fixed inset-0 bg-primary z-100 md:hidden flex items-center justify-center overflow-hidden w-screen h-screen"
                style="visibility: hidden;"
            >
                <!-- Overlay Header -->
                <div class="absolute top-0 left-0 w-full h-20 flex items-center justify-between px-6 lg:px-8">
                    <router-link to="/#home" @click="closeMenu" class="flex items-center gap-2">
                        <img :src="ExamPulse" alt="Logo" class="w-10 h-10">
                        <span class="text-xl font-text2 font-bold text-white">ExamPulse</span>
                    </router-link>
                    <button
                        @click="closeMenu"
                        class="p-2 focus:outline-none text-white hover:text-secondary transition-colors"
                    >
                        <Icon icon="lucide:x" class="text-3xl" />
                    </button>
                </div>

                <!-- Watermark -->
                <div class="absolute -bottom-10 left-0 right-0 pointer-events-none select-none overflow-hidden flex justify-center opacity-5">
                    <h2 class="text-[15vw] font-text2 font-bold text-white tracking-[0.5em] uppercase leading-none whitespace-nowrap">
                        ExamPulse
                    </h2>
                </div>

                <!-- Menu Links -->
                <div class="flex flex-col items-center justify-center space-y-12 w-full px-10">
                    <ul class="flex flex-col items-center space-y-8 font-text2">
                        <li v-for="item in ['HOME', 'FEATURES', 'ABOUT US', 'CONTACT']" :key="item"
                            :ref="(el) => el && menuLinks.push(el as HTMLElement)"
                            class="text-white text-5xl font-bold tracking-widest hover:text-secondary transition-colors"
                        >
                            <router-link :to="'/#' + item.toLowerCase().replace(' ', '')" @click="closeMenu">{{ item }}</router-link>
                        </li>
                    </ul>

                    <div :ref="(el) => el && menuLinks.push(el as HTMLElement)" class="w-full max-w-xs pt-8">
                        <router-link to="/register" @click="closeMenu" class="block w-full text-center text-primary bg-secondary px-8 py-5 rounded-2xl font-bold text-xl shadow-2xl active:scale-[0.98] transition-transform font-text1 uppercase tracking-widest">
                            Get Started
                        </router-link>
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