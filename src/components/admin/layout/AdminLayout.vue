<template>
  <v-layout class="rounded rounded-md">
    <AppAdminNav />

    <AdminSiderBar />

    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      Main Content
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
