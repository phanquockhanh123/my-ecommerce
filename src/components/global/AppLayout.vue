<template>
  <div class="layout">
    <v-layout class="position-relative">
      <CartDrawer :windowWidth="windowWidth"/>
      <MenuDrawer :windowWidth="windowWidth"/>
      <v-main
        :style="`padding-top: ${
          $route.name == 'checkout' ? '0px' : windowWidth <= 990 ? '60px' : '150px'
        };`"
      >
        <slot></slot>
      </v-main>

      <AppNav v-if="$route.name != 'checkout' && windowWidth > 990" />
      <ReponsiveNav v-show="windowWidth <= 990 && $route.name != 'checkout'" />
      <FixedNav v-if="$route.name != 'checkout' && windowWidth > 990" />
      <AppFooter v-if="$route.name != 'checkout'" />
    </v-layout>
  </div>
</template>
<script>
import AppNav from "./AppNav.vue";
import CartDrawer from "./CartDrawer.vue";
import AppFooter from "./AppFooter.vue";
import FixedNav from "./FixedNav.vue";
import ReponsiveNav from "./ReponsiveNav.vue";
import MenuDrawer from "./MenuDrawer.vue";

export default {
  components: {
    CartDrawer,
    AppNav,
    AppFooter,
    FixedNav,
    ReponsiveNav,
    MenuDrawer
  },
  data: () => ({
    drawer: true,
    windowWidth: 0,
  }),
  mounted() {
    this.windowWidth = window.innerWidth;
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
      console.log(this.windowWidth);
    };
  },
};
</script>
