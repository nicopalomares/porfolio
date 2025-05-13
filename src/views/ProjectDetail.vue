<template>
    <div class="project_detail_container" v-if="actualProject">
        <img class="back_button" src="@/assets/icons/arrow_right.svg" alt="" @click="goBack()">
        <div class="project_detail_image">
            <img :src="actualProject.images[0]" alt="Project Image" />
        </div>
        <h1>{{ actualProject.title }}</h1>

        <div class="project_detail_text">

            <table>
                <tbody>
                    <tr>
                        <td>
                            <h6>Company</h6>
                        </td>
                        <td>
                            <p>Siemmens</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6>Year</h6>
                        </td>
                        <td>
                            <p>2024</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6>Tools</h6>
                        </td>
                        <td>
                            <p>Vue</p>
                            <p>Strapi</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                efficitur, nunc ut bibendum facilisis, nisi nunc aliquet nunc, nec
                tincidunt nunc nunc eget nunc. Donec efficitur, nunc ut bibendum
                facilisis, nisi nunc aliquet nunc, nec tincidunt nunc nunc eget
                nunc.
            </p>
        </div>

        <div class="project_detail_image">
            <img :src="img" alt="Project Image" v-for="img in actualProject.images.slice(1)" :key="img.id" />
        </div>

        <div></div>

    </div>

</template>


<script setup>
import { ref, onMounted } from 'vue'
import qrioImage from '@/assets/images/qrio-image.svg'
import mseGruppeImage from '@/assets/images/mse-gruppe.svg'
import next125Image from '@/assets/images/next125.svg'
import greenlyImage from '@/assets/images/greenly.webp'
import omniviseImage from '@/assets/images/siemmens.svg'
import nextImage from '@/assets/icons/disc1.svg'
import { useRoute, useRouter } from 'vue-router'
import img1Omnivise from '@/assets/images/omnisive/IMG1.png'
import img2Omnivise from '@/assets/images/omnisive/IMG2.png'
import img3Omnivise from '@/assets/images/omnisive/IMG3.png'
import { getProjectById } from '@/api/api'



const route = useRoute()
const router = useRouter()
const projectId = route.params.projectId
const actualProject = ref(null)

const appsContent = [
    {
        title: 'Omnivise App',
        subtitle: 'Oeding design',
        icon: omniviseImage,
        images:
            [img1Omnivise,
                img2Omnivise,
                img3Omnivise,
            ],
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

function goBack() {
    router.back()
}


onMounted(async () => {
    // This is where you can add any logic that needs to run when the component is mounted
    // For example, you could fetch data or set up event listeners
    let { data } = await getProjectById(projectId)
    console.log(data)
    let project = data
    actualProject.value = project
})

</script>

<style lang="stylus">
.project_detail_container
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
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
            border-radius: 20px;
            margin-bottom: 1rem;
    .project_detail_text
        display: flex;
        justify-content: flex-start
        width 70%
        h1
            font-size: 2rem;
            margin-bottom: 0.5rem;
            border-bottom: 1px solid #000;


</style>