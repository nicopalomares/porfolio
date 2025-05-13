<template>
  <section id="welcome" class="welcome">
    <div class="first_container">
      <h1 class="title">Nickytrip</h1>
    </div>
    <div class="subContainer">
      <div class="second_container">
        <video autoplay muted loop>
          <source src="/src/assets/images/65390-514139029_small.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="third_container">
        <h3>Building your dreams</h3><br>
        <h3>Software developer
          & musician</h3>
        <div class="buttons_container">
          <a href="/projects">See my work</a>
          <a href="/history">About me</a>
        </div>

      </div>
    </div>
  </section>

</template>

<style lang="stylus" scoped>

#welcome

  font-family: 'Syne'
  .first_container
    height: 50vh;
    width: 100%;
    background-color: $greyColor

    display: flex
    .title
      margin: auto auto
      text-align: center
      font-size: 10rem
  .subContainer
    height: 50vh
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
        height: 50%
        justify-content: center
        align-items: center
        gap: 2rem
        a
          all: unset
          cursor: pointer
          color: inherit
          font-size: 2rem
          position: relative;
          display: inline-block;
          color: black;
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

</style>
