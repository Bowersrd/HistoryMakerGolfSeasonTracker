<template>
  <div id="settings-wrapper">
    <h1>Settings</h1>
    <v-btn class="reset-button" color="#CC0001" @click="resetGolfers"
      >Reset Golfers</v-btn
    >
    <v-btn class="reset-button" color="#CC0001" @click="resetCourses"
      >Reset Courses</v-btn
    >
    <v-btn class="reset-button" color="#CC0001" @click="resetEverything"
      >Reset Everything</v-btn
    >
    <v-btn class="mt-10 back-btn" dark large fab color="#083666" to="/">
      <v-icon>fas fa-long-arrow-alt-left</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    resetGolfers() {
      this.$store.dispatch("golfers/resetGolfers");
    },
    resetCourses() {
      this.$store.dispatch("courses/resetCourses");
    },
    resetEverything() {
      this.$store.dispatch("golfers/resetGolfers");
      this.$store.dispatch("courses/resetCourses");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/sass/main.scss";

#settings-wrapper {
  width: 100%;
  height: 100vh;
  background: url("~assets/img/background-main.jpg");
  @include flex-center;
  flex-direction: column;
}

h1 {
  color: $blue;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 4.5rem;
}
</style>
