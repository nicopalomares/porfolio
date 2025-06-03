<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, watch, onMounted, watchEffect } from 'vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import NavBar from './components/NavBar.vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n();


gsap.registerPlugin(SplitText)
const route = useRoute()


</script>

<template>

  <nav-bar />
  <div class="page-content" ref="container">
    <router-view v-slot="{ Component }" :key="route.params.id">
      <transition name="slide" mode="out-in">
        <component :is="Component" :key="locale" />
      </transition>
    </router-view>
  </div>



</template>

<style scoped lang="stylus">
.slide-enter-active,
.slide-leave-active
  transition: all 0.5s ease;


.slide-enter-from
  transform: translateX(100%);
  opacity: 0;


.slide-leave-to
  transform: translateX(-100%);
  opacity: 0;


.logo
  display: block;
  margin: 0 auto 2rem;


</style>
