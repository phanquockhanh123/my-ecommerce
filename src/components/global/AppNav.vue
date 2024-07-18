<template>
    <div class="nav-bar">
        <v-app-bar>
            <v-app-bar-nav-icon @click="openCart"></v-app-bar-nav-icon>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    inject: ["Emitter"],
    emits: ["openCart"],
    methods: {
        openCart() {
            this.$emit("openCart");
        }
    }
}
</script>

