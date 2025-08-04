<template>
  <section id="welcome" class="welcome">
    <div class="first_container">
      <h1 class="title">Nickytrip</h1>
    </div>
    <div class="subContainer">
      <div class="second_container">

        <video playsinline autoplay muted loop ref="videoRef" @loadeddata="handleVideoLoaded">
          <source :src="video" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

      </div>
      <div class="third_container">
        <h3>{{ t('home.firstHeadling') }}</h3>
        <h3 class="second-headline">{{ t('home.secondHeadling') }}</h3>
        <div class="buttons_container">
          <router-link :to="`/projects`">{{ t('nav.projects') }}</router-link>
          <router-link :to="`/about`">{{ t('nav.about') }}</router-link>
          <router-link :to="`/contact-me`">{{ t('nav.contact') }}</router-link>
        </div>

      </div>
    </div>
  </section>

</template>

<script setup>

import video from '@/assets/images/video.webm'
import fallback from '@/assets/images/fallback.svg'

import { useI18n } from 'vue-i18n';
import { useDataStore } from '@/stores/useDataStore';
const dataStore = useDataStore();
import { onMounted, ref } from 'vue';
const videoRef = ref(null)
const videoLoaded = ref(false)


const { t } = useI18n();
onMounted(() => {
  dataStore.startLoading()
});
const handleVideoLoaded = () => {
  videoLoaded.value = true
  dataStore.stopLoading()
}

</script>

<style lang="stylus" scoped>

#welcome
  font-family: 'Syne'
  height: 100vh
  .first_container
    height: 50%
    width: 100%;
    background-color: $greyColor
    display: flex
    .title
      margin: auto auto
      text-align: center
      font-size: 10rem
  .subContainer
    height: 50%
    display: flex
    .second_container
      width: 60%;
      height: 100%

      video
        width: 100%;
        height: 100%;
        object-fit: fill;
    .third_container
      width: 40%;
      height: 100%
      background-color: $pinkColor
      padding: 3rem 1rem 0rem 2rem;
      h3
        font-weight: 600
      .buttons_container
        display: flex
        height: 10rem;
        justify-content: center
        align-items: center
        gap: 2rem
        a
          all: unset
          cursor: pointer
          color: inherit
          font-size: 1.5rem
          position: relative;
          display: inline-block;
          text-decoration: none;
          overflow: hidden;
          &::before
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            width: 0;
            background-color: black;
            transition: width 0.3s ease;
          &:hover::before
            width: 100%;
@media screen and (max-width: 1140px)
  #welcome
    .first_container
      .title
        font-size: 7rem;
    .subContainer
      .third_container
        h3
          font-size: 2rem;

@media screen and (max-width: 768px)
  #welcome
    .first_container
      height: 30vh;
      .title
        font-size: 2rem;
    .subContainer
      flex-direction: column-reverse;
      height: 70vh;
      .second_container
        width: 100%;
        height: 50%;
        video
          height: 100%;
      .third_container
        width: 100%;
        height: 50%;
        padding: 1rem;
        text-align: center

        h3
          font-size: 1.5rem;
        .second-headline
          text-decoration: underline;
        .buttons_container
          border-top: 1px solid;
          height: 25%;
          margin-top: 1rem;
          width: 100%;
          padding: 1rem 0rem;
          a
            border-bottom: 1px solid;
            font-size: 1rem;
@media screen and (orientation: landscape) and (max-width: 850px)
  #welcome
    .subContainer
      .third_container
        padding: 1rem 1rem 0rem 1rem;
        h3
          font-size: 1.5rem;
        .buttons_container
          padding: 1rem
          height: auto
          a
            font-size: 1rem;
</style>
