<template>
    <section id="projects">
        <div class="container" v-if="!dataStore.isLoading">
            <router-link to="/" class="back_button">
                <img src="@/assets/icons/arrow_right.svg" alt="">
            </router-link>
            <transition name="fade" mode="out-in">
                <div class="image_container" :style="{ backgroundColor: appsContent[actualIndex].bgColor }">
                    <img :src="fullImageUrl(project.company.icon)" alt="" v-for="(project, index) in dataStore.projects"
                        :key="index" :class="index == actualIndex ? 'active' : ''" />
                </div>
            </transition>
            <div class="projects_container">
                <h1 class="title">{{ t('nav.home') }}</h1>
                <router-link class="project" v-for="(project, index) in dataStore.projects" :key="index"
                    :class="{ first: index === 0 }"
                    :style="{ color: actualColor == appsContent[index].bgColor ? actualColor : 'inherit' }"
                    v-on:mouseenter="handleChange(index)" :to="`/projects/${project.id}`">{{ project.title
                    }}</router-link>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useDataStore } from "@/stores/useDataStore.js"
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

const baseUrl = import.meta.env.VITE_BASE_URL
const dataStore = useDataStore()
const fullImageUrl = (fileName) => `${baseUrl}${fileName}`
const actualIndex = ref(0)
const actualColor = ref(['rgba(146, 218, 255, 1)', 'rgba(236, 235, 224, 1)'])
const { locale } = useI18n();
let language = localStorage.getItem('lang')

const handleChange = (newIndex) => {
    if (actualIndex.value[1] == newIndex) return
    actualIndex.value = newIndex

}

onMounted(async () => {
    dataStore.fetchProjects(language)
})

watch(locale, () => {
    dataStore.fetchProjects(language)
});

const appsContent = [
    {
        bgColor: 'rgba(146, 218, 255, 1)'
    },
    {
        bgColor: 'rgba(255, 86, 44, 1)'
    },
    {
        bgColor: '#5b5bc1'
    },
    {
        bgColor: 'rgba(255, 248, 86, 1)'
    },
    {
        bgColor: 'black'
    },
    {
        bgColor: 'rgba(146, 218, 255, 1)'
    },
    {
        bgColor: 'rgba(255, 86, 44, 1)'
    },
    {
        bgColor: '#5b5bc1'
    },
    {
        bgColor: 'rgba(255, 248, 86, 1)'
    },
    {
        bgColor: 'black'
    },
]

</script>




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
        .back_button
            width 3rem
            height: 3rem
            position: absolute
            left: 4rem
            transform: rotate(180deg);
            top: 2rem;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            &:hover
                color: $pinkColor
                scale: 1.1
        .projects_container
            padding: 2rem
            display: flex
            flex-direction: column
            width 45%
            .project
                border: 1px solid black;
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
            .project.first
                border-top: 1px solid black



        .image_container
            width: 40vw;
            background-color: black;
            position relative
            max-width: 50rem;
            border-radius: 4rem;
            display: flex;
            justify-content: center;
            transition: all 0.6s ease
            align-items: center;
            img
                width: 60%
                position: absolute
                opacity 0
                z-index 0
                transition: all 0.3s ease
            .active
                z-index : 1
                opacity: 1
@media screen and (max-width: 768px)
    #projects
        height: 100vh;
        .container
            flex-direction: column;
            gap: 2rem;
            width: 100%;
            .back_button
                left: 2rem;
                top: 2rem;
            .projects_container
                width: 100%;
                padding: 1rem 2rem;
                .project
                    padding-left: 0.5rem;
                    &::after
                        background-image: none
                        width: 0;
                .title
                    font-size: 2rem;
                    border-bottom: none;
            .projects_list
                a
                    font-size: 1.2rem;
                    padding-left: 1rem;
            .image_container
                display: none
</style>
