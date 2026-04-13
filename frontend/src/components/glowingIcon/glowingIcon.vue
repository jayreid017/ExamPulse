<template>
  <svg
    :width="s.icon"
    :height="s.icon"
    :viewBox="viewBox"
    fill="none"
    :stroke="c.stroke"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    :style="svgStyle"
    :title="title"
    class="glow-icon"
    @click="$emit('click')"
  >
    <slot />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'sky' },
  size:    { type: String, default: 'md' },
  pulse:   { type: Boolean, default: true },
  title:   { type: String, default: '' },
  viewBox: { type: String, default: '0 0 24 24' },
})

defineEmits(['click'])

const VARIANTS = {
  sky:     { stroke: '#7dd3fc', filter: '#38bdf8' },
  violet:  { stroke: '#c4b5fd', filter: '#8b5cf6' },
  emerald: { stroke: '#6ee7b7', filter: '#10b981' },
  rose:    { stroke: '#fda4af', filter: '#f43f5e' },
  amber:   { stroke: '#fcd34d', filter: '#f59e0b' },
}

const SIZES = {
  sm: { icon: 20 },
  md: { icon: 28 },
  lg: { icon: 36 },
  xl: { icon: 44 },
}

const c = computed(() => VARIANTS[props.variant] ?? VARIANTS.sky)
const s = computed(() => SIZES[props.size] ?? SIZES.md)

const svgStyle = computed(() => ({
  filter: `drop-shadow(0 0 6px ${c.value.filter}) drop-shadow(0 0 16px ${c.value.filter})`,
  transition: 'transform 0.2s ease',
  cursor: 'pointer'
}))
</script>

<style scoped>
.glow-icon:active {
  transform: scale(0.95);
}
</style>