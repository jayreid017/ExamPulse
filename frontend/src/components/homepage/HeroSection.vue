<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { Icon } from '@iconify/vue';
import BackgroundGrid from '../BackgroundGrid.vue';
import GsapMagnetic from '../glowingIcon/GsapMagnetic.vue';

const cards = ref([
    {
        tag: 'Quiz · 10 Questions',
        tagColor: 'green',
        title: 'Chapter 5 — Science Quiz',
        desc: 'Photosynthesis & plant biology',
        progress: 72,
        meta: '24 / 32 students completed',
        offset: 0,
        backDesc: 'Test student knowledge on cellular energy and plant growth cycles.',
    },
    {
        tag: 'Activity · Fill in Blanks',
        tagColor: 'purple',
        title: 'Grammar Worksheet',
        desc: 'Parts of speech & sentence structure',
        progress: 55,
        meta: '18 / 32 students completed',
        offset: 48,
        backDesc: 'A comprehensive review of nouns, verbs, and complex sentence types.',
    },
    {
        tag: 'Exam · 40 pts',
        tagColor: 'pink',
        title: 'Midterm — World History',
        desc: 'WW2 & post-war reconstruction',
        progress: 90,
        meta: 'Avg score: 87%',
        offset: 0,
        backDesc: 'Final assessment covering the major conflicts and peace treaties of 1945.',
    },
]);

const tagClass: Record<string, string> = {
    green:  'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200',
    purple: 'bg-violet-50  text-violet-600  ring-1 ring-violet-200',
    pink:   'bg-pink-50    text-pink-600    ring-1 ring-pink-200',
};

const fillClass: Record<string, string> = {
    green:  'bg-emerald-500',
    purple: 'bg-violet-500',
    pink:   'bg-pink-500',
};

const cardBgClass: Record<string, string> = {
    green:  'bg-[#c8f0d8]', // mint
    purple: 'bg-[#e4d9f7]', // lilac
    pink:   'bg-[#fde8f0]', // blush
};

const glowClass: Record<string, string> = {
    green:  '0 8px 40px 0 rgba(200,240,216,0.35)',
    purple: '0 8px 40px 0 rgba(228,217,247,0.35)',
    pink:   '0 8px 40px 0 rgba(253,232,240,0.35)',
};

onMounted(() => {
    gsap.from('.hero-card', {
        duration: 0.6,
        opacity: 0,
        y: 28,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
    });
});
</script>

<template>
    <div class="min-h-screen relative overflow-hidden">
        <BackgroundGrid>
            <div class="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-0 px-6 lg:px-10 w-full h-full  py-24 lg:py-0 overflow-hidden page-container">
                <!-- Left column: Text -->
                <div class="flex flex-col justify-center max-w-2xl mt-4 lg:mt-0 z-10">
                    
                    <div class="bg-primary border border-secondary/50 rounded-full px-4 py-1.5 text-white/90 w-fit text-xs uppercase font-text1 tracking-wider shadow-sm mb-6">
                        <Icon icon="lucide:sparkles" class="inline-block mr-2" />
                        For Teachers, Students & Educators
                    </div>
                    
                    <h1 class="text-white text-4xl sm:text-5xl lg:text-6xl font-text2 font-bold leading-tight lg:leading-[1.1] tracking-tight">
                        Create <em class="text-secondary font-text2 not-italic">Exams</em> &amp; Activities with Ease
                    </h1>
                    
                    <p class="text-white/80 text-base sm:text-lg lg:text-lg mt-6 font-text3 leading-relaxed max-w-xl">
                        Design beautiful quizzes, assessments, and learning activities in minutes. Engage your students, track progress, and make education fun.
                    </p>
                   
                   <div class="mt-8 lg:mt-10 flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center justify-start font-text1 text-md">
                        <router-link to="/register" class="w-full sm:w-auto px-8 py-3 bg-secondary text-primary cursor-pointer rounded-full font-semibold hover:bg-white hover:scale-105 transition-all shadow-lg active:scale-95">
                            <Icon icon="lucide:sparkles" class="inline-block mr-2" />
                            Start Creating 
                        </router-link>
                        <button class="w-full sm:w-auto px-8 py-3 border border-white text-white cursor-pointer rounded-full font-semibold hover:bg-white hover:text-primary transition-all group hover:border-white">
                           See How it Works
                            <Icon icon="lucide:arrow-right" class="inline-block mr-2 transition-colors" />
                        </button>
                    </div>
                </div>
                <!-- Right column: Floating Cards -->
                <div class="hidden lg:flex flex-col justify-center items-end z-10 gap-4 pr-2 cursor-pointer">
                    <GsapMagnetic
                        v-for="card in cards"
                        :key="card.title"
                    >
                        <div class="group h-[160px] w-[300px] perspective-[1000px] hero-card" :style="{ transform: `translateX(${card.offset}px)` }">
                            <div class="relative h-full w-full transition-all duration-700 transform-3d group-hover:rotate-y-180">
                                <!-- Front Face -->
                                <div 
                                    :class="['absolute inset-0 border border-black/5 rounded-2xl p-4 shadow-xl backface-hidden', cardBgClass[card.tagColor]]"
                                    :style="{ boxShadow: glowClass[card.tagColor] }"
                                >
                                    <!-- Tag -->
                                    <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-text1 uppercase tracking-wider font-medium mb-3', tagClass[card.tagColor]]">
                                        {{ card.tag }}
                                    </span>
                                    <!-- Title & desc -->
                                    <h4 class="text-gray-900 text-sm font-text2 font-semibold leading-snug">{{ card.title }}</h4>
                                    <p class="text-gray-600 text-xs font-text1 mt-0.5 mb-3">{{ card.desc }}</p>
                                    <!-- Progress bar -->
                                    <div class="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            :class="['h-full rounded-full transition-all', fillClass[card.tagColor]]"
                                            :style="{ width: card.progress + '%' }"
                                        ></div>
                                    </div>
                                    <p class="text-gray-600 text-[11px] font-text1 mt-2">{{ card.meta }}</p>
                                </div>

                                <!-- Back Face -->
                                <div 
                                    :class="['absolute inset-0 border border-black/5 rounded-2xl p-5 shadow-xl rotate-y-180 backface-hidden flex flex-col justify-between items-center text-center', cardBgClass[card.tagColor]]"
                                    :style="{ boxShadow: glowClass[card.tagColor] }"
                                >
                                    <div class="flex-1 flex flex-col justify-center">
                                        <h4 class="text-gray-900 text-xs font-text2 font-bold mb-2 uppercase tracking-widest">Template Details</h4>
                                        <p class="text-gray-800 text-[12px] font-text1 leading-relaxed px-1">
                                            {{ card.backDesc }}
                                        </p>
                                    </div>
                                    <button class="w-full mt-2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-sm">
                                        Use Template
                                    </button>
                                </div>
                            </div>
                        </div>
                    </GsapMagnetic>
                </div>
            </div>
        </BackgroundGrid>
    </div>
</template>
