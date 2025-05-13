<script setup>
import { ref, onMounted } from 'vue'
import icon from '@/assets/icons/arrow_down.svg?url'

onMounted(() => {

})

</script>


<template>
    <section class="sections-container" ref="triggerRef">
        <a class="section-1" href="#apps">
            <h1 class="title">Apps</h1>
            <img :src="icon" class="icon bounce" alt="">
            <h1 class="subtitle">1</h1>
        </a>
        <a class="section-2" href="#companies">
            <h1 class="title">Companies</h1>
            <h1 class="subtitle">2</h1>
            <img :src="icon" class="icon bounce" alt="">

        </a>
        <a class="section-3" href="#about">
            <h1 class="title">About me</h1>
            <h1 class="subtitle">3</h1>
            <img :src="icon" class="icon bounce" alt="">

        </a>
    </section>
</template>


<style lang="stylus" scoped>
.sections-container
    font-family: 'IBM Plex Serif'
    overflow: hidden
    a
        all: unset;
        cursor: pointer;
        color: inherit;

    .section-1, .section-2, .section-3
        text-decoration: none
        display: flex;
        justify-content: space-between;
        padding: 2rem 5rem;
        height: 33%
        position relative
        cursor pointer
        transition: all 0.3s ease-in-out
        .title
            font-size: 189px;
            font-weight: 600;
        .subtitle
            font-size: 370px;
            line-height: 360px;
        .icon
            position: absolute;
            width: 4rem;
            bottom: 1rem;
            left: 50%;
        &:hover
            scale: 1.04
        .bounce
            animation: bounce 1s infinite ease-in-out;
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(10px);
            }
        }
    .section-1
        background-color: $blueColor
    .section-2
        background-color: $greyColor
    .section-3
        background-color: $pinkColor
</style>
