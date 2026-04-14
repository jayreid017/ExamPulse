<template>
  <div v-if="isVisible" class="fixed inset-0 z-[9999] font-poppins pointer-events-none">
    <section
      ref="introEl"
      class="intro fixed top-0 left-0 w-screen h-screen bg-black flex justify-center items-center pointer-events-auto overflow-hidden text-white"
    >
      <div 
        ref="textEl" 
        class="text-[clamp(2rem,5vw,5rem)] font-bold uppercase tracking-widest text-center"
      >
        Loading
      </div>
      
      <!-- Red sweep animation element -->
      <div 
        ref="introRedEl" 
        class="absolute bottom-0 left-0 w-full h-[30%] bg-[#f21010]"
      >
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

// Allows parent components to listen for when the preloader finishes its intro
const emit = defineEmits(['complete'])

const isVisible = ref(true)
const introEl = ref(null)
const textEl = ref(null)
const introRedEl = ref(null)

onMounted(() => {
  // Set initial states
  gsap.set(introRedEl.value, { scaleY: 0, transformOrigin: 'bottom' })

  const introTL = gsap.timeline({
    onComplete: () => {
      isVisible.value = false
      emit('complete')
    }
  })

  // 1. Font cycling animation
  introTL
    .to(textEl.value, { duration: 0.1, fontFamily: 'Anton' })
    .to(textEl.value, { duration: 0.1, fontFamily: 'Jost' })
    .to(textEl.value, { duration: 0.1, fontFamily: 'Alkatra' })
    .to(textEl.value, { duration: 0.1, fontFamily: 'Nova Oval' })
    .to(textEl.value, { duration: 0.1, fontFamily: 'Oswald' })
    .to(textEl.value, { duration: 0.1, fontFamily: 'PT Serif' })
    .to(textEl.value, { duration: 0.1, fontFamily: 'Lexend' })
    .to(textEl.value, { duration: 0.1, fontFamily: 'Poppins' })
    .to(textEl.value, { duration: 0.1, fontFamily: 'Titillium Web' })
    
    // 2. Animate out sequence
    // Red block sweeps up
    .to(introRedEl.value, { duration: 1, scaleY: 2, ease: 'expo.inOut' }, '+=0.2')
    // Background sweeps up to reveal underneath
    .to(introEl.value, { duration: 1, scaleY: 0, transformOrigin: 'top', ease: 'expo.inOut' }, '-=0.8')
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Alkatra&family=Anton&family=Bebas+Neue&family=Jost:ital,wght@1,600&family=Lexend:wght@700&family=Nova+Oval&family=Oswald:wght@500&family=PT+Serif:wght@700&family=Titillium+Web&family=Poppins:wght@400;600;700;900&display=swap');

.intro {
  transform-origin: top;
}
</style>
