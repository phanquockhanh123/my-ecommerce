<template>
  <v-card class="mx-auto mt-15" width="300" height="100vh">
    <v-list v-model:opened="open">
      <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>

      <v-list-group value="Admin">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Admin" prepend-icon="mdi-account-circle">

          </v-list-item>
        </template>

        <v-list-item
          v-for="([title, icon], i) in admins"
          :key="i"
          :prepend-icon="icon"
          :title="title"
          :value="title"
        ></v-list-item>
      </v-list-group>

      <v-list-group value="Actions">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Actions" prepend-icon="mdi-account-circle"></v-list-item>
        </template>

        <v-list-item
          v-for="([title, icon], i) in cruds"
          :key="i"
          :prepend-icon="icon"
          :title="title"
          :value="title"
        ></v-list-item>
      </v-list-group>

      <v-list-group value="Categories">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Categories" prepend-icon="mdi-account-circle"></v-list-item>
        </template>

        <v-list-item
          v-for="([title, icon, link], i) in categories"
          :key="i"
          :prepend-icon="icon"
          :title="title"
          :value="title"
          @click="$router.push(link)"
        ></v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    open: ["Users"],
    admins: [
      ["Management", "mdi-account-multiple-outline"],
      ["Settings", "mdi-cog-outline"],
    ],
    cruds: [
      ["Create", "mdi-plus-outline"],
      ["Read", "mdi-file-outline"],
    ],
    categories: [
      ["List Categories", "mdi-plus-outline", { name: "admin_categories" }],
      ["Categories", "mdi-file-outline", { name: "admin_products" }],
    ],
  }),
};
</script>
