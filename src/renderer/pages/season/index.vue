<template>
  <div id="wrapper">
    <div id="main-menu">
      <div id="menu-buttons">
        <nuxt-link to="/season/setup" class="menu-item" @click.native="newSeason">
          <v-icon dark size="100px">fas fa-calendar-alt</v-icon>
          <div class="menu-item-sub">
            <p>Start New Season</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/season/home" class="menu-item" :class="[ activeSeason ? '' : 'inactive' ]">
          <v-icon dark size="100px">fas fa-angle-double-right</v-icon>
          <div class="menu-item-sub">
            <p>Continue Season</p>
          </div>
        </nuxt-link>
      </div>
      <v-btn class="mt-10 back-btn" dark large fab color="#083666" to="/">
        <v-icon>fas fa-long-arrow-alt-left</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      newSeason () {
        this.$store.dispatch('season/resetSeason')
      }
    },
    computed: {
      activeSeason () {
        return this.$store.state.season.activeSeason
      }
    }
  }
</script>

<style lang="scss">
@import '~assets/sass/main.scss';

#wrapper {
  @include flex-center;
  width: 100%;
  height: 100vh;
  background: url('~assets/img/background-main.jpg')
}

#main-menu {
  @include flex-center;
  flex-direction: column;
  width: 100%;
  h1 {
    font-size: 5rem;
    font-weight: bold;
    text-transform: uppercase;
    color: $blue;
    margin: 85px 0 10px;
  }
}

#menu-buttons {
  @include flex-center;
}

.menu-item {
  @include flex-center;
  width: 275px;
  height: 225px;
  background: $red;
  flex-direction: column;
  margin: 0 5px;
  opacity: 0.75;
  transition: all 0.5s;
  &:hover {
    opacity: 1;
    transform: scale(1.10);
    z-index: 1;
  }
  i {
    width: 100%;
    height: 165px;
    color: $white;
  }
}

.menu-item-sub {
  @include flex-center;
  width: 100%;
  height: 60px;
  background: $blue;
  p {
    color: $white;
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }
}

.inactive {
  pointer-events:none;
  filter: grayscale(100%);
}

</style>
