<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#f5fdf7]">
    <!-- Radial Gradients -->
    <div class="absolute inset-0" style="background: 
      radial-gradient(ellipse 80% 60% at 70% 50%, rgba(168,216,185,.35) 0%, transparent 70%),
      radial-gradient(ellipse 50% 50% at 10% 80%, rgba(200,240,216,.40) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 85% 10%, rgba(228,217,247,.30) 0%, transparent 55%);
    "></div>

    <!-- Floating Blobs -->
    <div class="blob blob1"></div>
    <div class="blob blob2"></div>
    <div class="blob blob3"></div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.45;
  animation: float 8s ease-in-out infinite;
  will-change: transform;
}

.blob1 { 
  width: 320px; 
  height: 320px; 
  background: #c8f0d8; 
  top: -60px; 
  right: 15%; 
  animation-delay: 0s; 
}

.blob2 { 
  width: 200px; 
  height: 200px; 
  background: #e4d9f7; 
  bottom: 10%; 
  left: 5%; 
  animation-delay: 2s; 
}

.blob3 { 
  width: 150px; 
  height: 150px; 
  background: #fde8f0; 
  top: 30%; 
  right: 5%; 
  animation-delay: 4s; 
}
</style>
