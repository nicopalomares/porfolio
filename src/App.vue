<script setup>
import { RouterView, useRoute } from 'vue-router'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import NavBar from './components/NavBar.vue'
import { useI18n } from 'vue-i18n'
import LoadingOverlay from './components/LoadingOverlay.vue'
const { locale } = useI18n();
gsap.registerPlugin(SplitText)
const route = useRoute()


</script>

<template>

  <nav-bar />
  <div class="page-content" ref="container">
    <router-view v-slot="{ Component }" :key="route.params.id">
      <transition :name="route.meta.direction === 'back' ? 'slide-back' : 'slide'" mode="out-in">
        <component :is="Component" :key="locale" />
      </transition>
      <LoadingOverlay />
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

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s ease;
  position: absolute;
  width: 100%;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}

.slide-back-enter-active,
.slide-back-leave-active {
  transition: transform 0.4s ease;
  position: absolute;
  width: 100%;
}
.slide-back-enter-from {
  transform: translateX(-100%);
}
.slide-back-leave-to {
  transform: translateX(100%);
}
</style>
