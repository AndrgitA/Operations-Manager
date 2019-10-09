<template lang="pug">
  div#app.scroll-container.overflow-hidden-hidden.back_cyan-1
    menu-bar(v-if="$route.path != '/login' && $route.path != '/'")
    router-view(:key="$store.state.flagUpdate")
    container-modals(
      v-if="$store.state.modals.length > 0"
    )
    container-notifications(
      v-if="$store.state.notifications.length > 0"
    )
</template>

<script>
import MenuBar from "@/components/menu/MenuBar.vue";
import ContainerModals from '@/components/modals/ContainerModals.vue';
import ContainerNotifications from '@/components/notifications/ContainerNotifications.vue';

export default {
  name: "App",
  componentName: "App",
  components: {
    MenuBar,
    ContainerModals, ContainerNotifications
  }
}
</script>

<style lang="scss">
@import '~styles/styleGuide.scss';
@import '~styles/styleCore.scss';

html {
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 0;
  border: 0;
  margin: 0;
}
body {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0;
  border: 0;
  margin: 0;
  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5;
    -webkit-box-shadow: none;
    background-color: $grey33;
  }
  width: 100vw;
  height: 100vh;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // background-image: linear-gradient(to right, red, blue);
  height: 100vh;
  min-width: $global-container-width;
  // min-width: 1240px;
  // width: 1240px;
}
</style>