<script setup lang="ts">

</script>

<template>
  <footer class="bg-olive-800 border-t border-olive-800 text-white py-12 px-6 lg:px-8 relative z-10 w-full  shrink-0">
    <div class="max-w-7xl mx-auto flex flex-col justify-between items-center gap-6 relative z-10">
     <div>
    
     </div>
      
      <div class="text-gray-400 text-sm">
        &copy; {{ new Date().getFullYear() }} ExamPulse. All rights reserved.
      </div>
      
      <div class="flex gap-4">
        <a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" class="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
    <!-- Background watermark -->
    <div class=" pointer-events-none select-none leading-none flex justify-start items-end pt-4 w-full">
      <h2 class="text-7xl md:text-[8rem] lg:text-[10rem] font-magilio font-bold text-white/3 tracking-widest uppercase leading-none -mb-4 md:-mb-8 lg:-mb-12">
        ExamPulse
      </h2>
    </div>
  </footer>
</template>
