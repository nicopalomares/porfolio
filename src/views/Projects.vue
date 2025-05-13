<script setup>
import qrioImage from '@/assets/images/qrio-image.svg'
import mseGruppeImage from '@/assets/images/mse-gruppe.svg'
import next125Image from '@/assets/images/next125.svg'
import greenlyImage from '@/assets/images/greenly.webp'
import omniviseImage from '@/assets/images/siemmens.svg'
import nextImage from '@/assets/icons/disc1.svg'
import { ref, onMounted } from 'vue'
import { getProjects } from '@/api/api'
import { computed } from 'vue'

const baseUrl = import.meta.env.VITE_BASE_URL

const fullImageUrl = (fileName) => `${baseUrl}${fileName}`

const actualIndex = ref(0)
const projects = ref([0])
const actualColor = ref(['rgba(146, 218, 255, 1)', 'rgba(236, 235, 224, 1)'])

const handleChange = (newIndex) => {
    if (actualIndex.value[1] == newIndex) return
    actualIndex.value = newIndex

}

onMounted(async () => {
    let { data } = await getProjects()
    projects.value = data
})

const appsContent = [
    {
        title: 'Omnivise App',
        subtitle: 'Oeding design',
        icon: omniviseImage,
        id: 1,
        link: '#apps',
        bgColor: 'rgba(146, 218, 255, 1)'
    },
    {
        title: 'Mse Gruppe',
        subtitle: 'Oeding design',
        id: 2,
        icon: mseGruppeImage,
        link: '#companies',
        bgColor: 'rgba(236, 235, 224, 1)'
    },
    {
        title: 'Next 125',
        subtitle: 'Oeding desing',
        id: 3,
        icon: next125Image,
        link: '#ECEBE0',
        bgColor: '#fff'
    },
    {
        title: 'Greenly',
        subtitle: 'lilla software studio',
        icon: greenlyImage,
        id: 4,
        link: '#about',
        bgColor: 'rgba(255, 248, 86, 1)'
    },
    {
        title: 'QRIO',
        subtitle: 'QRIO',
        icon: qrioImage,
        id: 5,
        link: '#about',
        bgColor: 'rgba(249, 187, 203, 1)'
    },
    {
        title: 'Next is yours',
        subtitle: 'You',
        icon: nextImage,
        id: 6,
        link: '#about',
        bgColor: 'rgba(255, 86, 44, 1)'
    },
]

</script>

<template>
    <section id="projects">
        <div class="container">
            <transition name="fade" mode="out-in">
                <div class="image_container" :style="{ backgroundColor: appsContent[actualIndex].bgColor }">
                    <img :src="fullImageUrl(project.company)" alt="" v-for="(project, index) in projects" :key="index"
                        :class="index == actualIndex ? 'active' : ''" />
                </div>
            </transition>


            <div class="projects_container">
                <h1 class="title">Projects</h1>
                <div class="projects_list" v-for="(project, index) in projects" :key="index">
                    <a class="project"
                        :style="{ color: actualColor == appsContent[index].bgColor ? actualColor : 'inherit' }"
                        v-on:mouseenter="handleChange(index)" :href="`/projects/${project.id}`">
                        {{ project.title }}
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="stylus" scoped>
    #projects
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        .container
            display: flex
            justify-content: center
            gap: 5rem
            .projects_container
                padding: 2rem
                .title
                    border-bottom: 1px solid black
            .projects_list
                display: flex;
                flex-direction: column;
                a
                    all: unset
                    cursor: pointer
                    color: inherit
                    position: relative
                    padding-left: 2rem
                    transition: all 0.3s ease
                    font-size: 2rem
                    border-bottom: 1px solid black
                    &:hover
                        color: $pinkColor
                        transform: translateX(5px)
                    &::after
                        content: ''
                        position: absolute
                        left: 0em
                        top 20%
                        width: 2rem
                        height: 2rem
                        background-image: url('./src/assets/icons/arrow_right.svg')
                        background-size: contain
                        background-repeat: no-repeat
                        opacity: 0
                        transform: translateX(-5px)
                        transition: all 0.3s ease
                    &:hover::after
                        opacity: 1
                        transform: translateX(0)

                .project
                    cursor pointer

            .image_container
                width: 45vw;
                height: 45vw;
                background-color: black;
                position relative
                border-radius: 4rem;
                display: flex;
                justify-content: center;
                transition: all 0.6s ease
                align-items: center;
                img
                    width: 60%
                    height: 60%
                    position: absolute
                    opacity 0
                    z-index 1
                    transition: all 0.3s ease
                .active
                    z-index : 2
                    opacity: 1

</style>
