<script setup lang="ts">
import { Notivue } from "notivue";
import { Icon } from "@iconify/vue";


const typeStyles: Record<string, string> = {
  success: "bg-popover border-border text-popover-foreground",
  error: "bg-destructive border-destructive text-destructive-foreground",
  info: "bg-popover border-border text-popover-foreground",
  warning: "bg-popover border-border text-popover-foreground",
  promise: "bg-popover border-border text-popover-foreground"
};

const typeIconStyles: Record<string, string> = {
  success: "text-primary",
  error: "text-destructive-foreground",
  info: "text-blue-500",
  warning: "text-yellow-500",
  promise: "text-muted-foreground"
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
      class="group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all min-w-[300px]"
      :class="typeStyles[item.type]"
    >
      <div class="flex items-start gap-3 grow">
        <Icon
          :icon="typeIcons[item.type]"
          class="w-5 h-5 shrink-0 mt-0.5"
          :class="typeIconStyles[item.type]"
        />

        <div class="grid gap-1 grow">
          <h4 v-if="item.title" class="text-sm font-semibold leading-none tracking-tight">
            {{ item.title }}
          </h4>
          <p class="text-sm opacity-90">
            {{ item.message }}
          </p>
        </div>
      </div>

      <button
        @click="item.clear"
        class="absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        :class="item.type === 'error' ? 'text-destructive-foreground hover:text-destructive-foreground focus:ring-destructive focus:ring-offset-destructive' : 'text-muted-foreground hover:text-foreground focus:ring-ring'"
      >
        <Icon icon="lucide:x" class="w-4 h-4" />
      </button>
    </div>
  </Notivue>
</template>
