<template>
    <header>

        <div class="menu-container">
            <div class="language-selector" v-click-outside-element="() => isOpenDropdown = false">
                <button @click="toggleDropdown" class="dropdown-toggle ">
                    {{ lang }}
                </button>
                <transition @enter="onEnter" @leave="onLeave">
                    <ul v-if="isOpenDropdown" ref="dropdown" class="dropdown-menu ">
                        <li v-for="lang in availableLanguages" :key="lang" @click="changeLanguage(lang)"
                            class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            {{ lang }}
                        </li>
                    </ul>
                </transition>
            </div>


            <div class="hamburger" :class="{ open: isOpen }" @click="toggleMenu" v-on:mouseenter="inMouseEnter()">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <nav class="menu" ref="menu">
                <ul ref="menuItems">
                    <li><router-link @click="toggleMenu" :to="'/'">{{ t('nav.home') }}</router-link></li>
                    <li><router-link @click="toggleMenu" :to="'/projects'">{{ t('nav.projects') }}</router-link></li>
                    <li><router-link @click="toggleMenu" :to="'/about'">{{ t('nav.about') }}</router-link></li>
                    <li><router-link @click="toggleMenu" :to="'/contact-me'">{{ t('nav.contact') }}</router-link></li>
                </ul>
            </nav>
        </div>
    </header>

</template>

<script setup>


import { useRoute } from 'vue-router'
import { ref, watch, onMounted, watchEffect, computed } from 'vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

gsap.registerPlugin(SplitText)

const route = useRoute()
const lang = ref('EN')
const allLanguages = ['ES', 'EN', 'DE']
const isOpen = ref(false)
const menu = ref(null)
const container = ref(null)
const menuItems = ref(null)
const isOpenDropdown = ref(false)
let tl


function toggleDropdown() {
    isOpenDropdown.value = !isOpenDropdown.value
}
function changeLanguage(language) {
    switch (language) {
        case 'ES':
            setLanguage('es')
            break
        case 'EN':
            setLanguage('en')
            break
        case 'DE':
            setLanguage('de')
            break
        default:
            setLanguage('en')
    }
    isOpenDropdown.value = false
}

function onEnter(el) {
    gsap.fromTo(
        el,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    )
}

const availableLanguages = computed(() =>
    allLanguages.filter(la => la !== lang.value)
)

function onLeave(el) {
    gsap.to(el, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => (isOpenDropdown.value = false)
    })
}

const { locale } = useI18n();

const setLanguage = (newLang) => {
    console.log("Changing language to:", newLang)
    locale.value = newLang;
    lang.value = newLang.toUpperCase();
    localStorage.setItem('lang', newLang);
    availableLanguages.value = allLanguages.filter(l => l !== newLang.value)
};

watchEffect(() => {
    const storedLang = localStorage.getItem('lang');
    if (storedLang) {
        locale.value = storedLang;
    }
});





onMounted(() => {

    tl = gsap.timeline({ paused: true })
    tl.to(menu.value, {
        right: 0,
        duration: 0.5,
        ease: 'power2.out',
        opacity: 1,
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
    tl.to(menu.value, {
        right: 0,
        duration: 0.5,
        ease: 'power2.out',
    }, 0)
}

function toggleMenu() {
    isOpen.value = !isOpen.value
}
</script>

<style lang="stylus" scoped>
.menu-container
    position: relative;
    width: 100%;
    height: 5rem;

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
    width: 3rem;



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
    z-index: 2;
    top: 0;
    width: 100%;
    height: 100vh;
    color: black;
    padding: 50px 20px;
    transition: right 0.3s ease;
    opacity: 0
    background-color: $primaryColor ;
    display: none
    ul
        text-align: center
        li:first-child
            a
                color: $redColor;
        li:nth-child(2)
            a
                color: $yellowColor;
        li:nth-child(3)
            a
                color: $blueColor;
        li:nth-child(4)
            a
                color: $pinkColor;

.dropdown-menu
    list-style none
    padding: 0rem
    text-align: center
.dropdown-toggle
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 1px solid;
    background: none;
    cursor pointer
    transition: scale 0.3s ease;
    &:hover
        scale: 1.05;
.menu ul
    list-style: none;
    padding: 0;

.menu li
    margin: 20px 0;

.menu a
    color: black;
    text-decoration: none;
    font-size: 1.5rem;
@media screen and (max-width: 768px)
    .language-selector
        right: 5rem;

</style>