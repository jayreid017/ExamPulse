<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const beamRef = ref<HTMLElement | null>(null);

onMounted(() => {
    if (beamRef.value) {
        gsap.fromTo(beamRef.value, 
            { y: '100vh' },
            { 
               y: '-30vh',
               duration: 3.5,
               ease: "none",
               repeat: -1
            }
        );
    }
});
</script>

<template>
    <div class="relative min-h-screen bg-linear-to-br from-primary to-[#213823] overflow-hidden">
        <!-- grid lines -->
        <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(144,238,144,0.1)_1px,transparent_1px)] bg-size-[210px_200px]"></div>
        <!-- light beam -->
        <div ref="beamRef" class="absolute left-0 right-0 top-0 h-[30vh] bg-[linear-gradient(90deg,rgba(152,251,152,0.5)_1px,transparent_1px)] bg-size-[210px_200px] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_50%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_50%,transparent)]" style="will-change: transform;"></div>
        
        <!-- content -->
        <slot></slot>
    </div>
</template>
