<template>
  <div>
    <v-app>
      <app-header />
      <nuxt />
    </v-app>
  </div>
</template>

<script>
import appHeader from '@/components/TheHeader'
export default {
  components: { appHeader }
}
</script>

<style lang="scss">
@import '~assets/sass/main.scss';

.page-enter-active, .page-leave-active {
  transition: opacity .4s
}
.page-enter, .page-leave-active {
  opacity: 0
}

</style>
