<template>
    <div v-if="data.isLoading" class="loading-overlay">
        <div class="loader"></div>
    </div>
</template>

<script setup>
import { useDataStore } from '@/stores/useDataStore';
const data = useDataStore()
</script>

<style lang="stylus">
.loading-overlay
    width 100vw
    height 100vh
    position fixed
    top 0
    left 0
    display flex
    justify-content center
    align-items center
    .loader
        border: 6px solid #f3f3f3;
        border-top: 6px solid #333;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 0.7s linear infinite;
        display: block;

@keyframes spin
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
</style>