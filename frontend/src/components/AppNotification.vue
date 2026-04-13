<script setup lang="ts">
import { Notivue } from "notivue";
import { Icon } from "@iconify/vue";


const typeStyles: Record<string, string> = {
  success: "bg-green-500/80 border-l-[4px]  border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]",
  error: "bg-red-500/80 border-l-[4px]  border-red-500 shadow-[0_0_20px_rgba(251,44,54,0.2)]",
  info: "bg-blue-500/80 border-l-[4px]  border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)]",
  warning: "bg-yellow-500/80 border-l-[4px]  border-yellow-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]",
  promise: "bg-gray-500/80 border-l-[4px]  border-gray-500 shadow-[0_0_20px_rgba(107,114,128,0.2)]"
};

const typeIconStyles: Record<string, string> = {
  success: "text-green-500",
  error: "text-red-500",
  info: "text-blue-500",
  warning: "text-yellow-500",
  promise: "text-gray-500"
};

const typeIcons: Record<string, string> = {
  success: "lucide:check-circle-2",
  error: "lucide:alert-circle",
  info: "lucide:info",
  warning: "lucide:alert-triangle",
  promise: "lucide:loader"
};
</script>

<template>
  <Notivue v-slot="item">
    <div
      class="flex items-center gap-3 px-4 py-3 text-white min-w-[300px] backdrop-blur-md transition-all duration-300"
      :class="typeStyles[item.type]"
    >
      <Icon
        :icon="typeIcons[item.type]"
        class="w-6 h-6 shrink-0"
        :class="typeIconStyles[item.type]"
      />

      <div class="grow">
        <h4 v-if="item.title" class=" text-xs">
          {{ item.title }}
        </h4>
        <p class="text-xs">
          {{ item.message }}
        </p>
      </div>

      <button
        @click="item.clear"
        class="p-1 hover:bg-white/20 rounded-full ml-2"
      >
        <Icon icon="lucide:x" class="w-4 h-4" />
      </button>
    </div>
  </Notivue>
</template>
