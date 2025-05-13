<template>
    <section class="trigger-section" ref="triggerRef">
        <div class="animation_container" ref="containerRef">
            <div class="arrow">
                <div class="stick top first">
                    <div class="text-container">
                        <div class="text">
                            <h1>H1 2021-2023</h1>
                            <h2>Lilla Software Studio</h2>
                            <p>Front end and Mobile developer
                                .Mendoza, Argentina</p>
                        </div>
                    </div>
                </div>
                <div class="circle first"></div>
                <div class="stick second">
                    <div class="text-container">
                        <div class="text">
                            <h1>H1 2021-2023</h1>
                            <h2>Qrio</h2>
                            <p>Front end and Mobile developer
                                .Mendoza, Argentina</p>
                        </div>
                    </div>
                </div>
                <div class="circle second"></div>
                <div class="stick top third">
                    <div class="text-container">
                        <div class="text">
                            <h1>H1 2023-Now</h1>
                            <h2>Oeding desing</h2>
                            <p>Front end developer
                                .Mendoza, Argentina</p>
                        </div>
                    </div>
                </div>
                <div class="circle third"></div>
                <div class="stick four"></div>
                <div class="circle four"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const triggerRef = ref(null)
const containerRef = ref(null)

let observer = null

onMounted(() => {
    const sticks = containerRef.value.querySelectorAll('.stick')
    const circles = containerRef.value.querySelectorAll('.circle')
    const arrow = containerRef.value.querySelectorAll('.arrow')
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(arrow, {
                    duration: 2,
                    width: '100%',
                    ease: 'power2.out',
                    opacity: 1
                })
                if (sticks.length > 0) {
                    sticks.forEach((stick, index) => {
                        if (stick.classList.contains('top')) {
                            gsap.to(stick, {
                                duration: 2,
                                height: '30vh',
                                ease: 'power2.out',
                                opacity: 1

                            })
                        } else {
                            gsap.to(stick, {
                                duration: 2,
                                height: '30vh',
                                ease: 'power2.out',
                                y: '30vh',
                                opacity: 1
                            })
                        }
                    })
                }
                gsap.to(circles, {
                    duration: 2,
                    height: '5rem',
                    width: '5rem',
                    ease: 'power2.out',
                    opacity: 1
                })
            }
        })
    }, {
        threshold: 0.5
    })

    if (triggerRef.value) {
        observer.observe(triggerRef.value)
    }
})

onUnmounted(() => {
    if (observer && triggerRef.value) {
        observer.unobserve(triggerRef.value)
    }
})
</script>

<style lang="stylus" scoped>
.trigger-section
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center
    position: relative;
    background-color: $primaryColor
    font-family: 'IBM Plex Serif'

    .animation_container
        width: 100%;
        height: 4px;
        position relative
        max-width: 1750px;
        .arrow
            position: absolute;
            top: 50%;
            height: 4px;
            width: 0;
            background: black;
            opacity :0
            transform: translateY(-50%);
        .arrow::after
            content: "";
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%) rotate(-45deg);
            width: 20px;
            height: 20px;
            border-right: 4px solid #000;
            border-bottom: 4px solid #000;
        .stick
            opacity :0
            position: absolute;
            bottom:1px;
            width : 4px;
            height: 0
            &.first
                left: 0;
                background-color: $pinkColor
                .text
                    top: -4rem;
            &.second
                left:35%;
                background-color: $greyColor
                .text
                    top: 4rem;
            &.third
                left: 65%;
                background-color: $yellowColor
                .text
                    top: -4rem;
            &.four
                left:95%;
                background-color: $redColor
            .text-container
                position: relative
                .text
                    width: 40rem;
                    position: absolute;
                    left: 5rem;
                    h1
                        font-size: 37px
                    h2
                        font-size: 60px
                    p
                        font-size: 34px
        .circle
            width: 0;
            height: 0;
            position: absolute;
            border-radius: 50%;
            opacity :0
            bottom: -2.5rem;

            &.first
                left: -2.5rem;
                background-color: $pinkColor
            &.second
                left: calc(35% - 2.5rem);
                background-color: $greyColor
            &.third
                left: calc(65% - 2.5rem);
                background-color: $yellowColor
            &.four
                left: calc(95% - 2.5rem);
                background-color: $redColor
    .title
      margin: auto auto
      text-align: center
      font-size: 10rem



  </style>
