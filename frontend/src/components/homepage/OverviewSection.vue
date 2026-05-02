<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FeaturesBackground from './FeaturesBackground.vue';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement[]>([]);

const overviewCards = [

    { 
        title: 'Smart Question Builder', 
        desc: 'Drag-and-drop builder with multiple question types — multiple choice, true/false, short answer, and more.', 
        icon: 'lucide:file-edit', 
        color: 'green' 
    },
    { 
        title: 'AI-Assisted Creation', 
        desc: 'Let our AI suggest questions based on your topic. Save hours of prep time while keeping full editorial control.', 
        icon: 'lucide:sparkles', 
        color: 'purple' 
    },
    { 
        title: 'Instant Grading', 
        desc: 'Auto-grade submissions and get detailed reports on class performance and individual progress.', 
        icon: 'lucide:zap', 
        color: 'pink' 
    },
    { 
        title: 'Beautiful Templates', 
        desc: 'Choose from 100+ professionally designed templates that make your exams look polished and engaging.', 
        icon: 'lucide:layout-template', 
        color: 'blue' 
    },
    { 
        title: 'Exam Security', 
        desc: 'Time limits, question shuffling, and browser lock to keep assessments fair and secure.', 
        icon: 'lucide:shield-check', 
        color: 'yellow' 
    },
    { 
        title: 'Share Anywhere', 
        desc: 'Share via link, QR code, or embed in your LMS. Works on all devices seamlessly.', 
        icon: 'lucide:share-2', 
        color: 'orange' 
    },
];

onMounted(() => {
    if (sectionRef.value && cardsRef.value.length) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.value,
                start: 'top top',
                end: '+=250%',
                scrub: 1.5,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    // Reset selection if scrolling away from the end state
                    if (self.progress < 0.99 && selectedCard.value !== null) {
                        onCardLeave(cardsRef.value[selectedCard.value], selectedCard.value);
                        selectedCard.value = null;
                    }
                },
                onLeave: () => {
                    // Clear selection when section is finished
                    if (selectedCard.value !== null) {
                        onCardLeave(cardsRef.value[selectedCard.value], selectedCard.value);
                        selectedCard.value = null;
                    }
                },
                onLeaveBack: () => {
                    // Clear selection when scrolling back past the start
                    if (selectedCard.value !== null) {
                        onCardLeave(cardsRef.value[selectedCard.value], selectedCard.value);
                        selectedCard.value = null;
                    }
                }
            }
        });

        // Initial stack state
        gsap.set(cardsRef.value, {
            xPercent: -50,
            yPercent: -50,
            left: '50%',
            top: '50%',
            rotation: 0,
            opacity: 0,
            scale: 0.8
        });

        // Animate cards into a fan
        tl.to(cardsRef.value, {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.5
        })
        .to(cardsRef.value[0], { xPercent: -210, yPercent: -40, rotation: -25, duration: 1 }, 'fan')
        .to(cardsRef.value[1], { xPercent: -140, yPercent: -60, rotation: -15, duration: 1 }, 'fan')
        .to(cardsRef.value[2], { xPercent: -70, yPercent: -70, rotation: -5, duration: 1 }, 'fan')
        .to(cardsRef.value[3], { xPercent: 0, yPercent: -70, rotation: 5, duration: 1 }, 'fan')
        .to(cardsRef.value[4], { xPercent: 70, yPercent: -60, rotation: 15, duration: 1 }, 'fan')
        .to(cardsRef.value[5], { xPercent: 140, yPercent: -40, rotation: 25, duration: 1 }, 'fan');
    }
});

const contentRefs = ref<HTMLElement[]>([]);

const selectedCard = ref<number | null>(null);

const selectCard = (index: number) => {
    if (selectedCard.value === index) {
        onCardLeave(contentRefs.value[index], index);
        selectedCard.value = null;
        return;
    }
    if (selectedCard.value !== null) {
        onCardLeave(contentRefs.value[selectedCard.value], selectedCard.value);
    }
    selectedCard.value = index;
    onCardEnter(contentRefs.value[index]);
};

const onCardEnter = (el: HTMLElement) => {
    gsap.to(el, {
        y: -40,
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
    });
};

const onCardLeave = (el: HTMLElement, index: number) => {
    gsap.to(el, {
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        overwrite: 'auto'
    });
};

const borderColorClass: Record<string, string> = {
    green:  'border-emerald-500',
    purple: 'border-violet-500',
    pink:   'text-pink-500', // Wait, I'll use border classes
    blue:   'border-blue-500',
    yellow: 'border-amber-500',
    orange: 'border-orange-500',
};

// Actually I'll just use a cleaner approach
const selectionClasses: Record<string, string> = {
    green:  'border-emerald-500 ring-emerald-500/20',
    purple: 'border-violet-500 ring-violet-500/20',
    pink:   'border-pink-500 ring-pink-500/20',
    blue:   'border-blue-500 ring-blue-500/20',
    yellow: 'border-amber-500 ring-amber-500/20',
    orange: 'border-orange-500 ring-orange-500/20',
};

const iconColorClass: Record<string, string> = {
    green:  'text-emerald-600',
    purple: 'text-violet-600',
    pink:   'text-pink-600',
    blue:   'text-blue-600',
    yellow: 'text-amber-600',
    orange: 'text-orange-600',
};

const cardBgClass: Record<string, string> = {
    green:  'bg-[#c8f0d8]',
    purple: 'bg-[#e4d9f7]',
    pink:   'bg-[#fde8f0]',
    blue:   'bg-[#d1e9ff]',
    yellow: 'bg-[#fff4d1]',
    orange: 'bg-[#ffe4d1]',
};
</script>

<template>
   
    <section ref="sectionRef" class="w-full min-h-screen py-16 relative overflow-hidden flex flex-col items-center z-20">
        <FeaturesBackground />
        <!-- Text Content -->
        <div class="max-w-4xl px-6 text-center z-20 mb-8">
            <div class="bg-secondary backdrop-blur-md border border-secondary/30 rounded-full 
            shadow-[0_4px_20px_rgba(200,240,216,0.2)] w-fit mx-auto px-6 py-2 text-primary font-text2 font-bold text-sm uppercase tracking-widest mb-6">
                Features
            </div>
            <h2 class="text-2xl md:text-3xl font-text2 text-gray-900 mb-6 tracking-tight">
               <em class="text-primary font-bold">Everything</em>  you need <em class="text-primary font-bold">to teach</em> better
            </h2>
        </div>

        <!-- Fan Container -->
        <div class="relative w-full h-[400px] mt-12 flex items-center justify-center">
            <div 
                v-for="(card, index) in overviewCards" 
                :key="index"
                :ref="(el) => { if (el) cardsRef[index] = el as HTMLElement }"
                @click="selectCard(index)"
                class="absolute w-[280px] h-[360px] cursor-pointer will-change-transform"
                :style="{ zIndex: selectedCard === index ? 100 : index + 10 }"
            >
                <div 
                    :ref="(el) => { if (el) contentRefs[index] = el as HTMLElement }"
                    class="w-full h-full rounded-3xl p-8 flex flex-col justify-between shadow-xl border-2 transition-all duration-300"
                    :class="[
                        cardBgClass[card.color],
                        selectedCard === index ? 'ring-4 shadow-2xl ' + selectionClasses[card.color] : 'border-black/5'
                    ]"
                >
                    <div>
                        <div class="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mb-6">
                            <Icon :icon="card.icon" :class="['text-3xl', iconColorClass[card.color]]" />
                        </div>
                        <h3 class="text-xl font-text2 text-gray-900 mb-3">{{ card.title }}</h3>
                        <p class="text-gray-600 font-text1 text-sm leading-relaxed">
                            {{ card.desc }}
                        </p>
                    </div>
                    
                    <div class="pt-6 border-t border-black/5">
                        <span class="text-xs font-bold uppercase tracking-widest text-primary">Learn More</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Scoped styles for section if needed */
</style>
