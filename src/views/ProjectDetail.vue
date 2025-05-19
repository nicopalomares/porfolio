<template>
    <div class="project_detail_container" v-if="project">
        <router-link to="/projects">
            <img class="back_button" src="@/assets/icons/arrow_right.svg" alt="">
        </router-link>

        <div class="project_detail_image">
            <img :src="fullImageUrl(project.images[0].url)" alt="Project Image" />
        </div>


        <div class="project_detail_text">
            <h1>{{ project.title }}</h1>
            <div class="table">
                <table>
                    <tbody>

                        <tr>
                            <td>
                                <h4>Company</h4>
                            </td>
                            <td>
                                <p>Siemmens</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Year</h4>
                            </td>
                            <td>
                                <p>2024</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Tools</h4>
                            </td>
                            <td class="tool_container">
                                <div v-for="(tool) in project.tool" :key="tool.id">
                                    <p>{{ tool.name }}</p>
                                    <img class="icon" :src="fullImageUrl(tool.url)" alt="">
                                </div>
                            </td>
                        </tr>

                        <StrapiBlocks :content="contentRichText" />

                    </tbody>
                </table>

            </div>

        </div>

        <div class="project_detail_image">
            <img :src="fullImageUrl(img.url)" alt="Project Image" v-for="img in project.images.slice(1)"
                :key="img.id" />
        </div>

        <div class="container_next" v-if="nextProject">
            <router-link class="project" :to="`/projects/${nextProject.id}`">
                <h3>Next Project</h3>
                <h3>
                    {{ nextProject.title }}
                </h3>
            </router-link>

        </div>

    </div>

</template>


<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataStore } from "@/stores/useDataStore.js"
import { StrapiBlocks } from 'vue-strapi-blocks-renderer';



const content = [
    {
        type: 'paragraph',
        children: [{ type: 'text', text: 'A simple paragraph' }],
    },
];


const dataStore = useDataStore()
const baseUrl = import.meta.env.VITE_BASE_URL
const route = useRoute()
const router = useRouter()
const project = ref(null)
const nextProject = ref(null)

const fullImageUrl = (fileName) => `${baseUrl}${fileName}`
const goBack = () => router.back()
const setData = async () => {
    let projectId = route.params.id
    const actualProject = await dataStore.fetchProjectById(projectId)
    project.value = actualProject
    console.log(actualProject, "actualProject")
    let nexProjectIndex = dataStore.projects.findIndex(item => item.id == projectId) + 1
    nextProject.value = dataStore.projects[nexProjectIndex]
}
const RichTextRenderer = {
    render() {
        return dcoumentT(project.value.description)
    }
}

const contentRichText = computed(() => {
    if (project.value.description) {
        return project.value.description
    } else {
        return []
    }

})

onMounted(async () => {
    setData()
})

watch(() => route.params.id, () => {
    setData()
})

// const appsContent = [
//     {
//         title: 'Omnivise App',
//         subtitle: 'Oeding design',
//         icon: omniviseImage,
//         images:
//             [img1Omnivise,
//                 img2Omnivise,
//                 img3Omnivise,
//             ],
//         id: 1,
//         link: '#apps',
//         bgColor: 'rgba(146, 218, 255, 1)'
//     },
//     {
//         title: 'Mse Gruppe',
//         subtitle: 'Oeding design',
//         id: 2,
//         icon: mseGruppeImage,
//         link: '#companies',
//         bgColor: 'rgba(236, 235, 224, 1)'
//     },
//     {
//         title: 'Next 125',
//         subtitle: 'Oeding desing',
//         id: 3,
//         icon: next125Image,
//         link: '#ECEBE0',
//         bgColor: '#fff'
//     },
//     {
//         title: 'Greenly',
//         subtitle: 'lilla software studio',
//         icon: greenlyImage,
//         id: 4,
//         link: '#about',
//         bgColor: 'rgba(255, 248, 86, 1)'
//     },
//     {
//         title: 'QRIO',
//         subtitle: 'QRIO',
//         icon: qrioImage,
//         id: 5,
//         link: '#about',
//         bgColor: 'rgba(249, 187, 203, 1)'
//     },
//     {
//         title: 'Next is yours',
//         subtitle: 'You',
//         icon: nextImage,
//         id: 6,
//         link: '#about',
//         bgColor: 'rgba(255, 86, 44, 1)'
//     },
// ]

</script>

<style lang="stylus">
.project_detail_container
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-family: 'Syne'
    .back_button
        width 3rem
        height: 3rem
        position: absolute
        left: 4rem
        transform: rotate(180deg);
        top: 3rem;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover
            color: $pinkColor
            scale: 1.1


    .project_detail_image
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        img
            object-fit: cover;
            height: auto;
            width: 70vw;
            object-fit: cover;
            border-radius: 0px 0px 20px 20px
            margin-bottom: 1rem;
    .project_detail_text
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        width: 70%;
        .table
            display: flex
            height: 15rem
            table
                width 50%
            p
                width 50%
            td
                vertical-align: top;

            .tool_container
                display flex
                gap: 2rem
                .icon
                    width 2rem

            h4
                color: #5b5bc1
        h1
            font-size: 2rem;
            margin-bottom: 0.5rem;
            border-bottom: 1px solid #000;
    .container_next
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 1rem 5rem;
        a
            all: unset
            cursor: pointer
            color: inherit
            position: relative
            display: flex;
            justify-content: space-between
            width 100%
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


</style>