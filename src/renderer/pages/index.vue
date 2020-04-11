<template>
  <div id="wrapper">
    <div id="main-menu">
      <h1>History Maker Golf</h1>
      <div id="menu-buttons">
        <nuxt-link :to="card.route" class="menu-item" v-for="card in cards" :key="card.id">
          <v-icon dark size="100px">fas fa-{{ card.icon }}</v-icon>
          <div class="menu-item-sub">
            <p> {{ card.text }} </p>
          </div>
        </nuxt-link>
      </div>
      <nuxt-link to="/settings">
        <v-icon id="settings-icon" size="40px">fas fa-cog</v-icon>
      </nuxt-link>
      <p id="version">v1.0.1</p>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        cards: [
          {id: 0, text: 'Play Season', icon: 'trophy', route: '/season'},
          {id: 1, text: 'Golfer Manager', icon: 'users', route: '/golfers'},
          {id: 2, text: 'Course Manager', icon: 'globe-americas', route: '/courses'}
        ]
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

#settings-icon {
  color: $blue;
  position: absolute;
  bottom: 15px;
  right: 15px;
  cursor: pointer;
}

#version {
  color: $red;
  position: absolute;
  bottom: 0;
  left: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  user-select: none;
}

</style>
