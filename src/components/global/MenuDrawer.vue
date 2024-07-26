<template>
  <div class="menu_drawer">
    <v-navigation-drawer
      class="pr-0 cart-drawer"
      v-model="drawer"
      location="right"
      width="370"
      temporary
    ></v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    }
  },
  inject: ["Emitter"],
  mounted() {
    this.Emitter.on("openMenu")
  }
}
</script>