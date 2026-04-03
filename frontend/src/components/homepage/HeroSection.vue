<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import logo3d from '../../assets/logo_3d.svg';

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
    <div class="page-container flex flex-col items-center justify-center text-center mt-8 ">
        
        <!-- 3D Logo Centered -->

        <div class="relative flex justify-center mb-8 w-full animate-fade-in-up">
            <!-- Top left floated box -->
            <div class="absolute top-12 left-8 md:left-[18%] w-32 h-14 md:w-64 md:h-28 -rotate-12 
                        flex items-center justify-center p-4 md:p-8
                        bg-linear-to-br from-red-500/20 to-red-900/10 backdrop-blur-md 
                        border border-red-500/30 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.2)]
                        text-white font-magilio font-medium text-lg md:text-5xl
                        hover:scale-110 hover:-rotate-6 hover:from-red-500/30 hover:to-red-900/20 transition-all duration-300
                        cursor-default select-none z-20">
                Create
            </div>
            
            <img ref="logoRef" :src="logo3d" alt="ExamPulse 3D Logo" class="w-64 md:w-[600px] h-auto hover:scale-105 transition-transform duration-500 z-10 mix-blend-multiply" />

            <!-- Bottom right floated box -->
            <div class="absolute bottom-12 right-8 md:right-[22%] w-32 h-14 md:w-64 md:h-28 rotate-12 
                        flex items-center justify-center p-4 md:p-8
                        bg-linear-to-br from-red-600/20 to-red-900/10 backdrop-blur-md 
                        border border-red-500/30 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.2)]
                        text-gray-100 font-magilio font-medium text-lg md:text-5xl
                        hover:scale-110 hover:rotate-6 hover:from-red-600/30 hover:to-red-900/20 transition-all duration-300
                        cursor-default select-none z-20 delay-100">
                Analyze
            </div>
        </div>
        <div class="w-full h-full flex items-center justify-left">
            <h1 class="text-5xl md:text-9xl font-magilio font-bold text-red-500/70 leading-tight">
           ExamPulse
        </h1>
        </div>

    </div>
</template>
