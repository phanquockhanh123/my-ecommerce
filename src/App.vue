<template>
    <router-view />

    <QuickView />
    <v-snackbar v-model="bar" location="left bottom" max-width="300">
      {{ itemTitle}} has been added to your cart successfully!
      <template v-slot:actions><v-icon @click="bar = false">mdi-close</v-icon>
      </template>
    </v-snackbar>

</template>
<script>
import QuickView from '@/components/global/QuickView';
export default {
  components: {
    QuickView
  },
  data: () => ({
    bar: false,
    itemTitle: "",
  }),
  inject: ['Emitter'],
  mounted() {
    this.Emitter.on('showMsg', (data) => {
      this.itemTitle = data;
      this.bar = true;
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
