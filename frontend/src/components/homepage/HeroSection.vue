<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import puff from '../../assets/img/puff.png';
import { Icon } from '@iconify/vue';
import BackgroundGrid from '../BackgroundGrid.vue';

const logoRef = ref<HTMLElement | null>(null);

onMounted(() => {
    if (logoRef.value) {
        gsap.from(logoRef.value, {
            duration: 0.7,
            scale: 0.5,
            opacity: 0,
            rotationY: 90,
            ease: "back.out(1.4)",
            delay: 0.1
        });
    }

});
</script>

<template>
    <div class="h-screen relative">
        <BackgroundGrid>
            <div class="absolute inset-0 grid grid-cols-2 items-center  px-10 w-full h-full page-container">
                <!-- Left column: Text -->
                <div class="flex flex-col justify-center">
                    <h1 class="text-8xl font-bold text-pink-400 font-text1 ">BrainyPuff</h1>
                    <p class="text-white text-md mt-4 font-text2">An all-in-one platform for teachers and students to create
                        quizzes, take exams, and track grades instantly.</p>
                   <div class="mt-6 flex gap-4">
                        <button
                            class="px-6 py-3 bg-yellow-400  text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Get Started
                        </button>
                        <button
                            class="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                            <Icon icon="lucide:play-circle" class="inline-block mr-2" />
                            Watch Video
                        </button>
                    </div>
                    <div class="mt-6">
                        <ul class="gap-4 text-gray-300 text-md font-text2">
                            <li class="flex items-center gap-2 py-1">
                                <Icon icon="lucide:check" class="inline-block mr-2 text-secondary" />
                                Quick Quiz Creation
                            </li>
                            <li class="flex items-center gap-2 py-1">
                                <Icon icon="lucide:check" class="inline-block mr-2 text-secondary" />
                                Instant Grading
                            </li>
                            <li class="flex items-center gap-2 py-1">
                                <Icon icon="lucide:check" class="inline-block mr-2 text-secondary" />
                                Progress Tracking
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Right column: Image -->
                <div class="flex justify-end items-end">
                    <img :src="puff" alt="" class="w-[500px] h-[500px] object-contain">
                </div>
                 <!-- Bottom section: Stats -->
        <div class="absolute bottom-0 left-0 right-0 z-10">
            <div class="page-container py-6">
                <div class="grid grid-cols-3 gap-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-10 py-6">
                    <!-- Stats cards -->
                    <div class="text-center">
                        <p class="text-3xl font-bold text-white font-text2">500+</p>
                        <p class="text-gray-300 text-sm font-text2">Teachers</p>
                    </div>
                    <div class="text-center">
                        <p class="text-3xl font-bold text-white font-text2">10K+</p>
                        <p class="text-gray-300 text-sm font-text2">Students</p>
                    </div>
                    <div class="text-center">
                        <p class="text-3xl font-bold text-white font-text2">24/7</p>
                        <p class="text-gray-300 text-sm font-text2">Support</p>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </BackgroundGrid>
    </div>
</template>
