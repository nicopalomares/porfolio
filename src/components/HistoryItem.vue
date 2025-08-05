<template>
    <section class="trigger-section" ref="triggerRef">

        <div class="animation_container" ref="containerRef" v-if="isDesktop">
            <div class="arrow">
                <template v-for="(job, index) in jobs" :key="index">
                    <div :class="['stick', job.class, index == 0 || index == 2 ? 'top' : '']">
                        <div class="text-container">
                            <div class="text">
                                <h1>{{ job.period }}</h1>
                                <h2>{{ job.company }}</h2>
                                <p>{{ job.role }}<br>.{{ job.location }}</p>
                            </div>
                        </div>
                    </div>
                    <div :class="['circle', job.class]"></div>
                </template>
                <div class="stick four"></div>
                <div class="circle four"></div>
            </div>
        </div>

        <!-- Y algo similar para el else (mobile) -->

        <div v-else class="mobile-container">
            <div class="text first">
                <h1>H1 2021-2023</h1>
                <h2>Lilla Software Studio</h2>
                <p>Front end and Mobile developer
                    .Mendoza, Argentina</p>
            </div>
            <div class="stick first">
                <div class="circle first"></div>
            </div>

            <div class="text second">
                <h1>H1 2021-2023</h1>
                <h2>Qrio</h2>
                <p>Front end and Mobile developer
                    .Mendoza, Argentina</p>
            </div>
            <div class="stick second">
                <div class="circle second"></div>
            </div>
            <div class="text third">
                <h1>H1 2023-Now</h1>
                <h2>Oeding desing</h2>
                <p>Front end developer
                    .Mendoza, Argentina</p>
            </div>
            <div class="stick third">
                <div class="circle third"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'




const jobs = [
    {
        period: 'H1 2021-2023',
        company: 'Lilla Software Studio',
        role: 'Front end and Mobile developer',
        location: 'Mendoza, Argentina',
        class: 'first'
    },
    {
        period: 'H1 2021-2023',
        company: 'Qrio',
        role: 'Front end and Mobile developer',
        location: 'Mendoza, Argentina',
        class: 'second'
    },
    {
        period: 'H1 2023-Now',
        company: 'Oeding design',
        role: 'Front end developer',
        location: 'Leipzig, Germany',
        class: 'third'
    }
]

const isDesktop = ref(window.innerWidth >= 768)
const containerRef = ref(null)
const triggerRef = ref(null)
let observer = null

function updateWidth() {
    isDesktop.value = window.innerWidth >= 768
    if (isDesktop.value) {
        setupObserver()
    } else if (observer && triggerRef.value) {
        observer.unobserve(triggerRef.value)
    }
}

function setupObserver() {
    if (!containerRef.value || !triggerRef.value) return

    const sticks = containerRef.value.querySelectorAll('.stick')
    const circles = containerRef.value.querySelectorAll('.circle')
    const arrow = containerRef.value.querySelectorAll('.arrow')

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(arrow, {
                    duration: 2,
                    width: '90%',
                    ease: 'power2.out',
                    opacity: 1
                })

                sticks.forEach((stick) => {
                    const animation = {
                        duration: 2,
                        height: '30vh',
                        ease: 'power2.out',
                        opacity: 1
                    }

                    if (!stick.classList.contains('top')) {
                        animation.y = '30vh'
                    }

                    gsap.to(stick, animation)
                })

                gsap.to(circles, {
                    duration: 2,
                    height: '5rem',
                    width: '5rem',
                    ease: 'power2.out',
                    opacity: 1
                })
            }
        })
    }, { threshold: 0.5 })

    observer.observe(triggerRef.value)
}

onMounted(() => {
    window.addEventListener('resize', updateWidth)
    updateWidth()
})

onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
    if (observer && triggerRef.value) {
        observer.unobserve(triggerRef.value)
    }
})
</script>

<style lang="stylus" scoped>
  .back_button
    width 3rem
    height: 3rem
    position: absolute
    left: 4rem
    transform: rotate(180deg);
    top: 1.6rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover
        color: $pinkColor
        scale: 1.1
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
        max-width: 1100px;
        // padding: 0 6rem;
        .arrow
            position: absolute;
            top: 50%;
            height: 4px;
            width: 0;
            background: black;
            opacity :0
            transform: translateY(-50%);
            left: 5%;
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
                    top: 3rem;
            &.second
                left:35%;
                background-color: $greyColor
                .text
                    top: 4rem;
            &.third
                left: 65%;
                background-color: $yellowColor
                .text
                    top: 3rem;
            &.four
                left:90%;
                background-color: $redColor
            .text-container
                position: relative
                .text
                    width: 25rem;
                    position: absolute;
                    left: 2rem;
                    h1
                        font-size: 20px
                    h2
                        font-size: 30px
                    p
                        font-size: 25px
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
                left: calc(90% - 2.5rem);
                background-color: $redColor
    .title
      margin: auto auto
      text-align: center
      font-size: 10rem
@media screen and (max-width: 768px)
    .back_button
        left: 2rem;
    .trigger-section
    .mobile-container
        display: flex
        flex-direction: column;
        align-items: center;
        .text
            width 75%
            margin-bottom: 1rem;
            margin-top: 1rem;
            h1
                font-size: 20px
            h2
                font-size: 20px
            p
                font-size: 14px
        .second
            text-align: end
        .stick
            height: 4px
            width 80vw
            position: relative;
            &.first
                background-color: $pinkColor
                .text
                    top: -4rem;
                    text-align: flex-end
            &.second
                background-color: $greyColor
                .text
                    top: 4rem;
            &.third
                background-color: $yellowColor
                .text
                    top: -4rem;
            &.four
                left:95%;
                background-color: $redColor
        .circle
            width: 3rem;
            height: 3rem;
            position: absolute;
            border-radius: 50%;
            &.first
                right: -1.5rem;
                top: -1.5rem
                background-color: $pinkColor
            &.second
                left: 0rem;
                top: -1.5rem;
                background-color: $greyColor
            &.third
                background-color: $yellowColor
                right: -1.5rem;
                top: -1.5rem
            &.four
                background-color: $redColor

</style>
