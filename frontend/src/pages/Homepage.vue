<script setup lang="ts">
import HeroSection from '../components/homepage/HeroSection.vue';
import OverviewSection from '../components/homepage/OverviewSection.vue';
import FeaturesSection from '../components/homepage/FeaturesSection.vue';
import ChatSection from '../components/homepage/ChatSection.vue';
import ContactSection from '../components/homepage/ContactSection.vue';
import FooterSection from '../components/homepage/FooterSection.vue';
</script>

<template>
  <HeroSection id="home" />
  <OverviewSection id="about" />
  <FeaturesSection id="features" />
  <ChatSection />

  <ContactSection id="contact" />
  <FooterSection />
</template>

