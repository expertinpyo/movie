<template>
  <div>
    <div class="bg">
      <!-- video -->
      <video muted autoplay loop>
        <source src="@/assets/movieintro.mp4" type="video/mp4">
      </video>
      <div class="button-container-3 animate__animated animate__fadeInDown animate__delay-5s">
        <span class="mas" style="font-size: 15px">Start</span>
      <button type="button" name="Hover" style="font-size: 15px" @click="GoGo">Start</button>
      </div>
    </div>
    <!-- audio -->
    <audio autoplay loop>
      <source src="@/assets/theLastWaltz.mp3" type="audio/mp3">
    </audio>
  </div>
</template>

<script>


import { mapActions, mapGetters } from 'vuex'


export default {
  name: 'IntroView',
  methods: {
    ...mapActions(['GoGo', 'ReStart',])
  },
  computed: {
    ...mapGetters(['isStart',])
  },
  created() {
    this.ReStart()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/introbtn.scss";


.bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0px auto;
  position: absolute;
}
video {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>

