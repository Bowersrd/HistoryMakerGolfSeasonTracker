<template>
  <header>
    <v-system-bar class="titlebar" fixed window dark color="#083666">
      <v-icon class="mr-3">fas fa-golf-ball</v-icon>
      <span>History Maker Golf Season Tracker</span>
      <v-spacer></v-spacer>
      <v-icon class="drag" @click="minimize">mdi-minus</v-icon>
      <v-icon class="drag" @click="close">mdi-close</v-icon>
    </v-system-bar>
  </header>
</template>

<script>
export default {
  methods: {
    close: () => {
      window.close()
    },
    minimize: () => {
      const { remote } = require('electron')
      remote.BrowserWindow.getFocusedWindow().minimize()
    }
  }
}
</script>

<style scoped>

.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

.drag {
  -webkit-app-region: no-drag;
}

</style>
