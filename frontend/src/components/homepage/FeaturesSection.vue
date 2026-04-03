<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { Icon } from '@iconify/vue';

const features = [
    { number: '01', category: 'Creation', title: 'Seamless Exam Creation', description: 'Easily build quizzes with diverse question formats tailored to your curriculum.', icon: 'lucide:file-edit' },
    { number: '02', category: 'Access', title: 'Learn Anywhere', description: 'Access and complete assignments securely from any device at your convenience.', icon: 'lucide:laptop' },
    { number: '03', category: 'Analytics', title: 'Instant Insights', description: 'Get immediate feedback with automated grading and detailed performance reports.', icon: 'lucide:bar-chart-3' },
    { number: '04', category: 'Security', title: 'Trusted Platform', description: 'Maintain academic integrity with robust anti-cheating mechanisms.', icon: 'lucide:shield-check' }
];

const featureRefs = ref<HTMLElement[]>([]);

onMounted(() => {
    if (featureRefs.value.length > 0) {
        const tl = gsap.timeline({ repeat: -1 });
        featureRefs.value.forEach((card) => {
            const bg = card.querySelector('.feature-bg');
            const meta = card.querySelector('.feature-meta');
            const title = card.querySelector('.feature-title');

            tl.to(bg, { opacity: 1, duration: 0.5, ease: "power2.inOut" })
              .to([meta, title], { color: "#ef4444", duration: 0.5, ease: "power2.inOut" }, "<")
              .to({}, { duration: 2 })
              .to(bg, { opacity: 0, duration: 0.4, ease: "power2.inOut" })
              .to([meta, title], { color: "#a3a3a3", duration: 0.4, ease: "power2.inOut" }, "<");
        });
    }
});
</script>

<template>
    <section class="max-w-6xl mx-auto px-6 py-16">
        <div class="text-red-400 font-magilio font-bold text-3xl mb-16 flex items-center justify-center">
            Why Choose ExamPulse?
        </div>
        
        <div class="relative font-merriweather">
            <div class="absolute top-0 bottom-0 left-1/2 w-0.5 bg-red-400/50"></div>
            <div class="absolute left-0 right-0 top-1/2 h-0.5 bg-red-400/50"></div>

            <div class="grid grid-cols-1 md:grid-cols-2 ">
                <div v-for="feature in features" :key="feature.number"
                    ref="featureRefs"
                    class="relative flex flex-col items-center p-16  overflow-hidden">
                    
                    <!-- Animated background gradient -->
                    <div class="feature-bg absolute inset-0 bg-linear-to-r from-red-500/10 to-red-200/5 opacity-0 pointer-events-none"></div>

                    <div class="relative z-10 flex flex-col items-center space-y-3">
                        <Icon :icon="feature.icon" class="text-4xl text-red-400 mb-2" />
                        <span class="feature-meta text-neutral-400 font-bold tracking-widest text-sm uppercase text-center">
                            {{ feature.number }} / {{ feature.category }}
                        </span>
                        <h3 class="feature-title text-2xl font-merriweather font-bold text-neutral-400 text-center">{{ feature.title }}</h3>
                        <p class="text-gray-600 text-center leading-relaxed font-light max-w-1/2">{{ feature.description }}</p>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
</template> 
