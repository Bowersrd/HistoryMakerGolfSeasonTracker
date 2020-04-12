<template>
  <div class="video-wrapper">
    <video
      id="playoffVideo"
      width="1200"
      controls
      autoplay
      src="../assets/video/playoffs.mp4"
    ></video>
    <transition name="fade">
      <v-btn
        dark
        tile
        class="mt-8 grey darken-4"
        v-show="showButton"
        @click="closeVideo"
        >Start Playoffs</v-btn
      >
    </transition>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      showButton: false
    };
  },
  methods: {
    closeVideo() {
      this.$store.dispatch("season/setVideoStatus");
    }
  },
  created() {
    setTimeout(() => {
      this.showButton = true;
    }, 10000);
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/sass/main.scss";

.video-wrapper {
  @include flex-center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: rgba($black, 0.98);
  position: absolute;
  z-index: 99;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
