<template>
  <v-layout class="rounded rounded-md">
    <AppAdminNav />

    <AdminSiderBar />

    <v-main class="mt-10 ml-5">
      <router-view></router-view>
    </v-main> 
  </v-layout>
</template>



<script>
import AdminSiderBar from "./AdminSiderBar.vue";
import AppAdminNav from "./AppAdminNav.vue";

export default {
  components: {
    AppAdminNav,
    AdminSiderBar
  }
};
</script>
