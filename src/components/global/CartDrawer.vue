<template>
  <div class="drawer">
    <v-navigation-drawer v-model="drawer" location="right" temporary>
      <p>Navbar</p>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  inject: ["Emitter"],
  data() {
    return {
      drawer: false,
    };
  },
  methods: {},
  mounted() {
    this.Emitter.on("openCart", () => {
      this.drawer = true;
    });
  },
};
</script>
