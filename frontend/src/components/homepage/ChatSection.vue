<script setup lang="ts">
import { Icon } from '@iconify/vue';
import school from '../../assets/img/happykid.jpg';
</script>

<template>
    <section class="w-full min-h-[70vh] bg-olive-800 py-10 flex items-center justify-center relative overflow-hidden">
        <!-- Floating background styling for depth -->
        <div class="absolute top-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-gray-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <!-- Big EXAM text -->
        <div class="absolute top-0 right-0 z-0 pointer-events-none select-none leading-none flex justify-end items-start overflow-hidden">
            <h2 class="text-9xl md:text-[20rem] lg:text-[30rem] font-magilio font-bold text-white/3 tracking-widest uppercase leading-none -mt-[0.1em]">
                EXAM
            </h2>
        </div>

        <!-- Big PULSE text -->
        <div class="absolute bottom-0 left-0 z-0 pointer-events-none select-none leading-none flex items-end overflow-hidden">
            <h2 class="text-9xl md:text-[20rem] lg:text-[30rem] font-magilio font-bold text-white/3 tracking-widest uppercase leading-none -mb-[0.15em]">
                PULSE
            </h2>
        </div>

        <div class="w-full max-w-4xl px-6 flex flex-col space-y-6 relative z-10">
            <!-- Teacher message 1 -->
            <div class="flex w-full items-end space-x-3 lg:space-x-4 animate-fade-in-up">
                <div class="w-10 h-10 lg:w-12 lg:h-12 shrink-0 rounded-full bg-linear-to-br from-blue-600 to-blue-800 border-2 border-white/10 flex items-center justify-center shadow-xl text-xl">
                    👨‍🏫
                </div>
                <div class="flex flex-col max-w-[80%] md:max-w-[60%]">
                    <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl rounded-bl-sm px-6 py-4 shadow-xl">
                        <p class="text-gray-200 font-merriweather leading-relaxed">Class, no more paper exams.</p>
                    </div>
                </div>
            </div>

            <!-- Teacher message 2 (Image + Text) -->
            <div class="flex w-full items-end space-x-3 lg:space-x-4 animate-fade-in-up" style="animation-delay: 0.1s">
                <div class="w-10 h-10 lg:w-12 lg:h-12 shrink-0"></div> <!-- Placeholder for alignment -->
                <div class="flex flex-col max-w-[85%] md:max-w-[70%]">
                    <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl rounded-bl-sm p-2 shadow-2xl relative mt-1">
                        <div class="relative overflow-hidden rounded-2xl mb-2">
                            <img :src="school" alt="classroom" class="w-full max-h-[300px] md:max-h-[400px] object-cover">
                            <div class="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none"></div>
                        </div>
                        <p class="text-gray-200 font-merriweather px-3 pb-2 pt-1 leading-relaxed text-sm md:text-base">This is ExamPulse—a smarter way to take exams.</p>
                    </div>
                    <span class="text-xs text-gray-500 mt-2 ml-2 font-medium tracking-wide">10:42 AM</span>
                </div>
            </div>

            <!-- Student message 1 -->
            <div class="flex w-full items-end justify-end space-x-3 lg:space-x-4 animate-fade-in-up" style="animation-delay: 0.2s">
                <div class="flex flex-col items-end max-w-[80%] md:max-w-[60%]">
                    <div class="bg-linear-to-br from-red-500/90 to-red-700/90 backdrop-blur-xl border border-red-400/30 rounded-3xl rounded-br-sm px-6 py-3 shadow-[0_5px_20px_rgba(239,68,68,0.2)]">
                        <p class="text-white/95 font-merriweather leading-relaxed">Online? 😲</p>
                    </div>
                </div>
                <!-- Student avatar -->
                <div class="w-10 h-10 lg:w-12 lg:h-12 shrink-0 rounded-full bg-linear-to-br from-red-400 to-red-600 border-2 border-red-500/30 flex items-center justify-center shadow-xl text-xl">
                    👨‍🎓
                </div>
            </div>

            <!-- Teacher message 3 -->
            <div class="flex w-full items-end space-x-3 lg:space-x-4 animate-fade-in-up" style="animation-delay: 0.3s">
                <div class="w-10 h-10 lg:w-12 lg:h-12 shrink-0 rounded-full bg-linear-to-br from-blue-600 to-blue-800 border-2 border-white/10 flex items-center justify-center shadow-xl text-xl">
                    👨‍🏫
                </div>
                <div class="flex flex-col max-w-[80%] md:max-w-[60%]">
                    <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl rounded-bl-sm px-6 py-4 shadow-xl">
                        <p class="text-gray-200 font-merriweather leading-relaxed">Yes. Faster, easier, anytime.</p>
                    </div>
                </div>
            </div>

            <!-- Student message 2 -->
            <div class="flex w-full items-end justify-end space-x-3 lg:space-x-4 animate-fade-in-up" style="animation-delay: 0.4s">
                <div class="flex flex-col items-end max-w-[80%] md:max-w-[60%]">
                    <div class="bg-linear-to-br from-red-500/90 to-red-700/90 backdrop-blur-xl border border-red-400/30 rounded-3xl rounded-br-sm px-6 py-3 shadow-[0_5px_20px_rgba(239,68,68,0.2)] flex items-center justify-between">
                        <p class="text-white/95 font-merriweather leading-relaxed pr-3">Nice, ready na! 😄</p>
                        <Icon icon="lucide:check-check" class="text-white/80 text-lg shrink-0" />
                    </div>
                    <span class="text-xs text-gray-500 mt-2 mr-2 font-medium tracking-wide text-right">10:45 AM</span>
                </div>
                <!-- Student avatar -->
                <div class="w-10 h-10 lg:w-12 lg:h-12 shrink-0 rounded-full bg-linear-to-br from-red-400 to-red-600 border-2 border-red-500/30 flex items-center justify-center shadow-xl text-xl">
                    👨‍🎓
                </div>
            </div>
        </div>
    </section>
</template>
