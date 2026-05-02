<script setup lang="ts">
import HeroSection from '../components/homepage/HeroSection.vue';
import OverviewSection from '../components/homepage/OverviewSection.vue';
import FeaturesSection from '../components/homepage/FeaturesSection.vue';
import ContactSection from '../components/homepage/ContactSection.vue';
import FooterSection from '../components/homepage/FooterSection.vue';
import Navbar from '../components/Navbar.vue';
</script>

<template>
  <Navbar/>
  <HeroSection id="home" data-nav-theme="dark" />
  <OverviewSection id="about" data-nav-theme="light" />
  <FeaturesSection id="features" data-nav-theme="light" />
  <ChatSection data-nav-theme="light" />

  <ContactSection id="contact" data-nav-theme="light" />
  <FooterSection data-nav-theme="dark" />
</template>

