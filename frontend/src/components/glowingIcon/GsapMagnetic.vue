<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

const props = defineProps<{
    strength?: number;
}>();

const strength = props.strength ?? 0.35;
const el = ref<HTMLElement | null>(null);

let onMove: (e: MouseEvent) => void;
let onLeave: () => void;

onMounted(() => {
    const node = el.value;
    if (!node) return;

    onMove = (e: MouseEvent) => {
        const rect = node.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;

        gsap.to(node, {
            x,
            y,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    onLeave = () => {
        gsap.to(node, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
        });
    };

    node.addEventListener('mousemove', onMove);
    node.addEventListener('mouseleave', onLeave);
});

onUnmounted(() => {
    const node = el.value;
    if (!node) return;
    node.removeEventListener('mousemove', onMove);
    node.removeEventListener('mouseleave', onLeave);
});
</script>

<template>
    <div ref="el" class="inline-block">
        <slot />
    </div>
</template>
