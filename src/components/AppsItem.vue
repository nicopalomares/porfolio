<template>
    <section id="apps" ref="triggerRef">
        <a href="/projects">Projects</a>
        <div class="cards_container">
            <div v-for="app in appsContent" :href="app.link" :key="app.title" class="card"
                :style="{ backgroundColor: app.bgColor }">
                <h3 class="title">{{ app.title }}</h3>
                <h4 class="subtitle">{{ app.subtitle }}</h4>
                <img :src="app.icon" alt="" class="icon bounce">
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import icon from '@/assets/icons/disc1.svg'


const appsContent = [
    {
        title: 'Omnivise App',
        subtitle: 'Oeding design',
        id: 1,
        icon: icon,
        link: '#apps',
        bgColor: 'rgba(146, 218, 255, 1)'
    },
    {
        title: 'Mse Gruppe',
        subtitle: 'Oeding design',
        id: 2,
        icon: icon,
        link: '#companies',
        bgColor: 'rgba(236, 235, 224, 1)'
    },
    {
        title: 'Next 125',
        subtitle: 'Oeding desing',
        id: 3,
        icon: icon,
        link: '#ECEBE0',
        bgColor: 'rgba(183, 177, 42, 1)'
    },
    {
        title: 'Greenly',
        subtitle: 'lilla software studio',
        id: 4,
        icon: icon,
        link: '#about',
        bgColor: 'rgba(255, 248, 86, 1)'
    },
    {
        title: 'QRIO',
        subtitle: 'QRIO',
        id: 5,
        icon: icon,
        link: '#about',
        bgColor: 'rgba(249, 187, 203, 1)'
    },
    {
        title: 'Next is yours',
        subtitle: 'You',
        id: 6,
        icon: icon,
        link: '#about',
        bgColor: 'rgba(255, 86, 44, 1)'
    },
]


</script>

<style lang="stylus" scoped>
    #apps
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        .cards_container
            max-width: 91rem
            display: flex;
            flex-wrap: wrap;
            justify-content: center
            align-items: center

            border-radius: 1rem

            .card
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width 30rem
                height: 30rem
                border: 1px solid $greyColor
                border-radius: 1rem

                h4
                    font-size: 28px


                .bounce
                    animation: bounce 4s linear infinite;
                @keyframes bounce {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
    .section-1
        background-color: $blueColor
    .section-2
        background-color: $greyColor
    .section-3
        background-color: $pinkColor
</style>
