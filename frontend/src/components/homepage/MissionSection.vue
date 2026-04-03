<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/vue';

gsap.registerPlugin(ScrollTrigger);

const missionItems = [
    'At ExamPulse, we believe that assessments should be more than just tests—they should be seamless, smart, and empowering.',
    'We created ExamPulse to transform the traditional way of conducting exams into a modern, digital experience. By combining simplicity with powerful features, we help teachers craft meaningful assessments and enable students to perform at their best—anytime, anywhere.',
    'Driven by innovation and a passion for education, ExamPulse is built to make every quiz, every exam, and every result matter.',
];

onMounted(() => {
    gsap.utils.toArray<HTMLElement>('.mission-arrow-h').forEach((arrow) => {
        gsap.fromTo(arrow, 
            { x: -50, opacity: 0 },
            { 
               x: 20, opacity: 1,
               scrollTrigger: {
                 trigger: arrow,
                 start: "top 90%",
                 end: "bottom 20%",
                 scrub: 1
               }
            }
        );
    });
    
    gsap.utils.toArray<HTMLElement>('.mission-arrow-v').forEach((arrow) => {
        gsap.fromTo(arrow, 
            { y: -30, opacity: 0 },
            { 
               y: 20, opacity: 1,
               scrollTrigger: {
                 trigger: arrow,
                 start: "top 90%",
                 end: "bottom 20%",
                 scrub: 1
               }
            }
        );
    });
    
    gsap.utils.toArray<HTMLElement>('.mission-box').forEach((box) => {
         gsap.fromTo(box,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1,
                scrollTrigger: {
                    trigger: box,
                    start: "top 90%",
                    end: "top 60%",
                    scrub: 1
                }
            }
         );
    });
});
</script>

<template>
   <section class="max-w-7xl mx-auto px-6 py-24 min-h-[40vh] flex items-center justify-center">
    <div class="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-6 md:gap-4 lg:gap-8 w-full">

        <template v-for="(item, index) in missionItems" :key="index">
            <!-- Box -->
            <div class="mission-box flex-1 bg-white/5 backdrop-blur-md border border-red-500/20 rounded-3xl p-8 shadow-xl flex flex-col justify-center">
                <p class="text-gray-300 font-merriweather leading-relaxed text-sm lg:text-base text-center">
                    {{ item }}
                </p>
            </div>

            <!-- Arrow (between items only) -->
            <template v-if="index < missionItems.length - 1">
                <div class="hidden md:flex flex-col justify-center items-center w-8 lg:w-16">
                    <Icon icon="lucide:arrow-right" class="mission-arrow-h text-red-500 text-3xl lg:text-5xl" />
                </div>
                <div class="flex md:hidden flex-col justify-center items-center h-16">
                    <Icon icon="lucide:arrow-down" class="mission-arrow-v text-red-500 text-5xl" />
                </div>
            </template>
        </template>

    </div>
</section>
</template>
