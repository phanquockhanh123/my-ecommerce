<template>
  <app-layout>
    <router-view />
    
    <QuickView />
  </app-layout>
</template>
<script>
import AppLayout from "@/components/global/AppLayout";
import QuickView from '@/components/global/QuickView';
export default  {
  components: {
    AppLayout,
    QuickView
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
