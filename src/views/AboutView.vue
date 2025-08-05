<template>
  <div>
    <router-link to="/" class="back_button">
      <img src="@/assets/icons/arrow_right.svg" alt="">
    </router-link>
    <div class="about">

      <div class="info_container">
        <div class="text_container" ref="menuItems">
          <h2>{{ t('about.title') }} </h2>
          <p>
            {{ t('about.description') }}
          </p>
          <a href="@/assets/images/CV Nicolas Palomares.pdf" download class="resume">↓ {{ t('about.resume') }}</a>
          <a href="@/assets/images/Arbeitszeugnis_nicolas-palomares.pdf" download class="letter">↓ {{
            t('about.recomendationLetter')
          }}</a>
        </div>
        <a href="https://open.spotify.com/artist/620JplsGiq6Lg433rE4DLe?si=XQQsXnWhSHu6ZOXXmKbD0g"
          class="img_container">
          <img src="@/assets/icons/playing.svg" class="img_cover" alt="">
          <img src="@/assets/icons/album.jpg" class="img_album" alt="">
        </a>
      </div>
    </div>
    <HistoryItem />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import HistoryItem from '../components/HistoryItem.vue';
import gsap from 'gsap';
import { SplitText } from 'gsap/all'
gsap.registerPlugin(SplitText)
let tl
const menuItems = ref("menuItems")
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

onMounted(() => {
  tl = gsap.timeline({ paused: true })
  tl.to(menuItems.value, {
    right: 0,
    duration: 0.5,
    ease: 'power2.out',
    opacity: 1,
    display: 'block',
  }, 0)
})

</script>



<style lang="stylus" scoped>
.back_button
  width 3rem
  height: 3rem
  position: absolute
  left: 2rem;
  transform: rotate(180deg);
  top: 1.6rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover
      color: $pinkColor
      scale: 1.1
.about
  padding-top: 10rem
  .info_container
    display: flex;
    justify-content: center;
    gap: 4rem;
    margin-top: 3rem;
    .text_container
      h2
        color $redColor
      .resume, .letter
        all: unset
        cursor: pointer

        font-size: 1.2rem
        position: relative;
        display: inline-block;
        text-decoration: none;
        overflow: hidden;
        margin-top: 1rem;
        &::before
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0;
          background-color: $redColor;
          transition: width 0.3s ease;
        &:hover::before
          width: 100%;
      .resume
        color: $redColor
        &::before
          background-color: $redColor;
      .letter
        color: $blueColor
        margin-left: 2rem
        &::before
          background-color: $blueColor;


    div
      width 50%

    .img_container
      width 10rem
      height 10rem
      position relative
      transition: scale 0.3s ease-in-out
      cursor pointer
      img
        position absolute

      .img_cover
        width 100%
        height 100%
        animation turn 6s linear infinite
      .img_album
        top: 10%;
        left: 10%;
        width: 80%;
        height: 80%;
        border-radius: 50%;
      &:hover
        scale: 1.1


    @keyframes turn
      from
        transform rotate(0deg)
      to
        transform rotate(360deg)



@media screen and (max-width: 768px)
  .back_button
    left: 2rem
  .about
    padding-top: 5rem
    .info_container
      flex-direction: column;
      align-items: center;
      .text_container
        width 100%
        padding: 0 3rem;
  .trigger-section
    height: 80vh

</style>
