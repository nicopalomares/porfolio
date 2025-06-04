<template>
    <header>

        <div class="menu-container">
            <div class="language-selector">
                <!-- <span>{{ t('lang') }}:</span> -->
                <a href="#" class="menu-item-name">Home</a>
                <ul class="menu-item-list">
                    <li @click="setLanguage('en')" style="margin-right: 8px">English</li>
                    <li @click="setLanguage('de')">Japanese</li>
                </ul>

            </div>


            <div class="hamburger" :class="{ open: isOpen }" @click="toggleMenu" v-on:mouseenter="inMouseEnter()">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <nav class="menu" ref="menu">
                <ul ref="menuItems">
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Proyectos</a></li>
                    <li><a href="#">Sobre mí</a></li>
                    <li><a href="#">Contacto</a></li>
                </ul>
            </nav>
        </div>
    </header>

</template>

<script setup>


import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, watch, onMounted, watchEffect } from 'vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

gsap.registerPlugin(SplitText)

const route = useRoute()

const { locale } = useI18n();

const setLanguage = (newLang) => {
    locale.value = newLang;
    localStorage.setItem('lang', newLang);
};

watchEffect(() => {
    const storedLang = localStorage.getItem('lang');
    if (storedLang) {
        locale.value = storedLang;
    }
});

const isOpen = ref(false)
const menu = ref(null)
const container = ref(null)
const menuItems = ref(null)

let tl

onMounted(() => {
    tl = gsap.timeline({ paused: true })
    tl.to(menu.value, {
        right: 0,
        duration: 0.5,
        ease: 'power2.out',
        display: 'block',
    }, 0)
    tl.to(container.value, {
        opacity: 0, // Opacidad baja para el fondo
        duration: 0.3,
        ease: 'power1.out'
    }, 0)
    tl.from(menuItems.value.querySelectorAll('li'), {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'power1.out',
        stagger: 0.1, // retraso entre ítems
    }, 0.2)
})

watch(isOpen, (val) => {
    if (val) {
        tl.play()

    } else {
        tl.reverse()
    }
})

function inMouseEnter() {
    console.log("hey")
    tl.to(menu.value, {
        right: 0,
        duration: 0.5,
        ease: 'power2.out',
        display: 'block',
    }, 0)
}

function toggleMenu() {
    isOpen.value = !isOpen.value
}
</script>

<style lang="stylus" scoped>
.menu-container
    position: relative;

.hamburger
    cursor: pointer;
    width: 30px;
    height: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
    position: absolute;
    right: 2rem;
    top: 2rem;

.language-selector
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
    position: absolute;
    right: 8%;
    top: 1.5rem;



.hamburger:hover span:nth-child(1)
    transform: translateX(3px);


.hamburger:hover span:nth-child(2)
    transform: translateX(-3px);


.hamburger:hover span:nth-child(3)
    transform: translateX(2px);

.hamburger.open span:nth-child(1)
    transform: rotate(45deg) translate(5px, 5px);


.hamburger.open span:nth-child(2)
    opacity: 0;

.hamburger.open span:nth-child(3)
    transform: rotate(-45deg) translate(5px, -5px);

.hamburger span
    display: block;
    height: 4px;
    background: black;
    border-radius: 2px;
    transition: all 0.3s ease;

.hamburger.open span:nth-child(1)
    transform: rotate(45deg) translate(5px, 5px);

.hamburger.open span:nth-child(2)
    opacity: 0;

.hamburger.open span:nth-child(3)
    transform: rotate(-45deg) translate(6px, -6px);

.menu
    position: fixed;
    z-index: 1;
    top: 0;
    width: 100%;
    height: 100vh;
    color: black;
    padding: 50px 20px;
    transition: right 0.3s ease;
    display: none;
    background-color: $primaryColor ;


.menu ul
    list-style: none;
    padding: 0;

.menu li
    margin: 20px 0;

.menu a
    color: black;
    text-decoration: none;
    font-size: 1.5rem;

</style>